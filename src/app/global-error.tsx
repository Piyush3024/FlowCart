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
      <body className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center bg-background text-foreground">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl">Critical Error</h1>
        <p className="text-sm text-muted-foreground max-w-md">
          A critical error occurred. Please refresh the page.
        </p>
        <button
          type="button"
          onClick={reset}
          className="px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
