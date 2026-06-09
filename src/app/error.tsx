'use client';

import { useEffect } from 'react';
import { GeneralError } from '@/components/shared/error-display';

export default function ErrorBoundary({
  error: err,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', err);
  }, [err]);

  return <GeneralError onReset={reset} />;
}
