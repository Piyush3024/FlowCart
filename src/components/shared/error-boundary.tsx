'use client';

import { type FallbackProps, ErrorBoundary as RBErrorBoundary } from 'react-error-boundary';
import { Icons } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
}

function DefaultErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <Icons.warning aria-hidden="true" className="text-destructive" size={24} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold font-serif text-foreground text-lg">Something went wrong</h2>
        <p className="max-w-md text-muted-foreground text-sm">
          {error instanceof Error ? error.message : 'An unexpected error occurred'}
        </p>
      </div>
      <Button className="w-fit" onClick={resetErrorBoundary} size="sm" variant="outline">
        <Icons.refresh className="mr-2" size={14} />
        Try again
      </Button>
    </div>
  );
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <RBErrorBoundary FallbackComponent={fallback ?? DefaultErrorFallback}>
      {children}
    </RBErrorBoundary>
  );
}
