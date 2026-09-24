'use client';

import { useEffect } from 'react';
import { QuantumError } from '@/components/layout/QuantumError';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <QuantumError
            type="500"
            reset={reset}
        />
    );
}
