'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  code?: string | undefined;
  title: string;
  description: string;
  showGoBack?: boolean | undefined;
  showHome?: boolean | undefined;
  homeHref?: string | undefined;
  homeLabel?: string | undefined;
  onReset?: (() => void) | undefined;
  resetLabel?: string | undefined;
  className?: string | undefined;
  minimal?: boolean | undefined;
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
          <span className="font-serif font-medium text-foreground">{title}</span>
          <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">{description}</p>
          {onReset && (
            <Button size="sm" variant="outline" onClick={onReset} className="mt-2 text-xs">
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
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[80px]"
        aria-hidden="true"
      />
      <div className="relative z-10 flex max-w-md w-full flex-col items-center justify-center gap-6 text-center">
        {code && (
          <h1 className="font-serif font-bold leading-none tracking-tight text-primary/10 text-[7rem] sm:text-[9rem]">
            {code}
          </h1>
        )}
        <div className={cn('flex flex-col gap-2', code && '-mt-6')}>
          <h2 className="font-serif font-bold text-foreground text-xl sm:text-2xl">{title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {showGoBack && (
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="h-10 px-5 text-xs uppercase tracking-wider"
            >
              Go Back
            </Button>
          )}
          {onReset && (
            <Button onClick={onReset} className="h-10 px-5 text-xs uppercase tracking-wider">
              {resetLabel}
            </Button>
          )}
          {showHome && !onReset && (
            <Button className="h-10 px-5 text-xs uppercase tracking-wider" asChild>
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
      code="404"
      title="Page Not Found"
      description="The page you are looking for might have been removed or is temporarily unavailable."
      className={className}
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
      code="500"
      title="Something Went Wrong"
      description="An unexpected error occurred. Please try again."
      onReset={onReset}
      showHome={false}
      className={className}
      minimal={minimal}
    />
  );
}
