import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./index.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { MobileBottomNav } from "@/components/MobileBottomNav";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Baha Kids",
  description: "Baha Kids E-Commerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jost.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col font-secondary bg-white text-brand-accent-2">
        <SmoothScrollProvider>
          {/* Header */}
          <Header />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <Footer />
          {/* Mobile Bottom Navigation Bar */}
          <MobileBottomNav />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
