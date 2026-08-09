import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mugisha Joseph",
  description:
    "Portfolio of Mugisha Joseph, a full-stack and mobile developer building performant, accessible, and aesthetically refined products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -top-40 -left-32 size-105 rounded-full bg-accent/8 blur-[110px]" />
            <div className="absolute top-24 -right-32 size-95 rounded-full bg-accent/6 blur-[110px]" />
          </div>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
