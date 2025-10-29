// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import { Inter } from 'next/font/google';
import Providers from './providers';
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'News Aggregator',
  description: 'Your daily dose of trending news',
  icons: {
    icon: [
      { url: '/favicon.ico' }, // classic ICO
      { url: '/favicon.png', type: 'image/png' }, // optional PNG
      { url: '/favicon.svg', type: 'image/svg+xml' }, // optional SVG
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
        <Providers>
          {/* Wrap client subtrees using router/search hooks in Suspense to satisfy Next’s prerender checks */}
          <Suspense fallback={null}>
            <ClientLayout>{children}</ClientLayout>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
