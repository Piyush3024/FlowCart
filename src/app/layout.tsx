import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import QueryProvider from '@/components/providers/query-provider';
import { inter, playfair } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://flowcart.vercel.app'),
  title: {
    default: 'FlowCart — Premium Lifestyle Store',
    template: '%s | FlowCart',
  },
  description:
    'Discover premium lifestyle products curated for the modern individual. Free shipping on orders over $100.',
  keywords: ['lifestyle', 'premium', 'ecommerce', 'fashion', 'accessories', 'home decor'],
  authors: [{ name: 'FlowCart Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flowcart.vercel.app',
    siteName: 'FlowCart',
    title: 'FlowCart — Premium Lifestyle Store',
    description: 'Discover premium lifestyle products curated for the modern individual.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FlowCart — Premium Lifestyle Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowCart — Premium Lifestyle Store',
    description: 'Discover premium lifestyle products curated for the modern individual.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${inter.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          href="#main-content"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem={false}
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
