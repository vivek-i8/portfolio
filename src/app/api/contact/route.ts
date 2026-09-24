import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

function escapeHtml(str: string) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
    try {
        const clientIp = getClientIp(req);
        const rateLimit = checkRateLimit(`contact_${clientIp}`, { windowMs: 10 * 60 * 1000, maxRequests: 5 });

        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: 'Too many messages sent. Please try again in a few minutes.' },
                { status: 429, headers: { 'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString() } }
            );
        }

        const { name, email, subject, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
            return NextResponse.json({ error: 'Invalid field types' }, { status: 400 });
        }

        if (name.length > 100 || email.length > 100 || (subject && typeof subject === 'string' && subject.length > 200) || message.length > 5000) {
            return NextResponse.json({ error: 'Payload exceeds allowed character limit' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return NextResponse.json({ error: 'Invalid email address format' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER || '',
                pass: process.env.EMAIL_APP_PASSWORD || ''
            },
        });

        const safeName = escapeHtml(name.trim());
        const safeEmail = escapeHtml(email.trim());
        const rawSubject = typeof subject === 'string' ? subject.replace(/[\r\n]/g, ' ').trim() : 'No Subject';
        const safeSubject = escapeHtml(rawSubject || 'No Subject');
        const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br />');

        const mailOptions = {
            from: process.env.EMAIL_USER || '',
            to: process.env.EMAIL_USER || '',
            subject: `New Message: ${safeSubject}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
                    <h3 style="color: #333;">You have a new message from your website!</h3>
                    <p><strong>Name: </strong> ${safeName}</p>
                    <p><strong>Email: </strong> ${safeEmail}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; color: #555;">${safeMessage}</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send the message. Please try again later.' }, { status: 500 });
    }
}
