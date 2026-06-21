'use client';

export default function GlobalError({
  error: _err,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center text-foreground">
        <h1 className="font-bold font-serif text-4xl sm:text-5xl">Critical Error</h1>
        <p className="max-w-md text-muted-foreground text-sm">
          A critical error occurred. Please refresh the page.
        </p>
        <button
          className="rounded-lg bg-foreground px-6 py-2.5 font-medium text-background text-sm"
          onClick={reset}
          type="button"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
