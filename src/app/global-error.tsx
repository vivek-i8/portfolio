'use client';

import { QuantumError } from '@/components/layout/QuantumError';

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <QuantumError
                    type="500"
                    reset={reset}
                />
            </body>
        </html>
    );
}
