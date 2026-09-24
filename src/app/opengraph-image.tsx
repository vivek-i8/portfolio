import { ImageResponse } from 'next/og';

export const alt = 'Vivek Kumawat — AI Systems & Software Portfolio';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundColor: '#0a0a0f',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Background ambient lighting */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-20%',
                        right: '-10%',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(193, 228, 74, 0.15) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '24px',
                    }}
                >
                    <div
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#c1e44a',
                        }}
                    />
                    <span
                        style={{
                            color: '#c1e44a',
                            fontSize: 20,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                        }}
                    >
                        AI Systems &amp; Software
                    </span>
                </div>

                <h1
                    style={{
                        fontSize: 64,
                        fontWeight: 900,
                        color: '#ffffff',
                        lineHeight: 1.1,
                        margin: 0,
                        marginBottom: '24px',
                        letterSpacing: '-0.03em',
                    }}
                >
                    Vivek Kumawat
                </h1>

                <p
                    style={{
                        fontSize: 28,
                        color: '#a1a1aa',
                        lineHeight: 1.4,
                        maxWidth: '900px',
                        margin: 0,
                    }}
                >
                    Autonomous Agents · Machine Learning Architectures · Acoustic Analysis · Distributed Backend Systems
                </p>

                <div
                    style={{
                        position: 'absolute',
                        bottom: '80px',
                        left: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                        color: '#71717a',
                        fontSize: 18,
                        fontFamily: 'monospace',
                    }}
                >
                    <span>Bengaluru, India</span>
                    <span>·</span>
                    <span>github.com/vivek-i8</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
