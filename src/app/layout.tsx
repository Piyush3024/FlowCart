import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import QueryProvider from '@/components/providers/query-provider';
import { inter, playfair } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FlowCart — Premium Lifestyle Store',
    template: '%s | FlowCart',
  },
  description:
    'Discover premium lifestyle products curated for the modern individual. Free shipping on orders over $100.',
  keywords: ['lifestyle', 'premium', 'ecommerce', 'fashion', 'accessories'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FlowCart',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'var(--card)',
                  color: 'var(--card-foreground)',
                  border: '1px solid var(--border)',
                },
              }}
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
