import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Novu",
  description: "A fleet management app.",
  openGraph: {
    title: "Novu",
    description: "A fleet management app.",
    url: "https://novu.vercel.app/",
    siteName: "Novu",
    images: [
      {
        url: "https://novu.vercel.app/images/og.png",
        width: 1920,
        height: 1080,
        alt: "Novu",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novu",
    description: "A fleet management app.",
    creator: "@kumarsrajan02",
    images: ["https://novu.vercel.app/images/og.png"],
  },
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon-16x16.png",
    apple: "/favicons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
