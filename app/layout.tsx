import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Providers from "./providers";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News Aggregator",
  description: "Your daily dose of trending news",
  icons: {
    icon: "/favicon.ico", // You can also use .png or .svg
    apple: "/favicon.png", // Optional for Apple devices
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Fallback for browsers that don’t use metadata */}
        <link rel="icon" href="/file.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/file.svg" />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
