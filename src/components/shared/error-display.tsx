'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  className?: string | undefined;
  code?: string | undefined;
  description: string;
  homeHref?: string | undefined;
  homeLabel?: string | undefined;
  minimal?: boolean | undefined;
  onReset?: (() => void) | undefined;
  resetLabel?: string | undefined;
  showGoBack?: boolean | undefined;
  showHome?: boolean | undefined;
  title: string;
}

export function ErrorDisplay({
  code,
  title,
  description,
  showGoBack = true,
  showHome = true,
  homeHref = '/',
  homeLabel = 'Back to Store',
  onReset,
  resetLabel = 'Try Again',
  className,
  minimal = false,
}: ErrorDisplayProps) {
  if (minimal) {
    return (
      <div
        className={cn(
          'w-full rounded-xl border border-destructive/20 bg-destructive/5 p-6',
          className,
        )}
      >
        <div className="flex flex-col items-center justify-center gap-3 py-4 text-center">
          <span className="font-medium font-serif text-foreground">{title}</span>
          <p className="max-w-xs text-muted-foreground text-xs leading-relaxed">{description}</p>
          {onReset && (
            <Button className="mt-2 text-xs" onClick={onReset} size="sm" variant="outline">
              {resetLabel}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex min-h-[70vh] w-full items-center justify-center px-4',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]"
      />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center gap-6 text-center">
        {code && (
          <h1 className="font-bold font-serif text-[7rem] text-primary/10 leading-none tracking-tight sm:text-[9rem]">
            {code}
          </h1>
        )}
        <div className={cn('flex flex-col gap-2', code && '-mt-6')}>
          <h2 className="font-bold font-serif text-foreground text-xl sm:text-2xl">{title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {showGoBack && (
            <Button
              className="h-10 px-5 text-xs uppercase tracking-wider"
              onClick={() => window.history.back()}
              variant="outline"
            >
              Go Back
            </Button>
          )}
          {onReset && (
            <Button className="h-10 px-5 text-xs uppercase tracking-wider" onClick={onReset}>
              {resetLabel}
            </Button>
          )}
          {showHome && !onReset && (
            <Button asChild className="h-10 px-5 text-xs uppercase tracking-wider">
              <Link href={homeHref}>{homeLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function NotFoundError({ className }: { className?: string }) {
  return (
    <ErrorDisplay
      className={className}
      code="404"
      description="The page you are looking for might have been removed or is temporarily unavailable."
      title="Page Not Found"
    />
  );
}

export function GeneralError({
  className,
  minimal = false,
  onReset,
}: {
  className?: string;
  minimal?: boolean;
  onReset?: () => void;
}) {
  return (
    <ErrorDisplay
      className={className}
      code="500"
      description="An unexpected error occurred. Please try again."
      minimal={minimal}
      onReset={onReset}
      showHome={false}
      title="Something Went Wrong"
    />
  );
}
