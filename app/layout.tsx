import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Job Application Assistant",
  description: "Generate a job application for a given job description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-800/80 bg-slate-950/60">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-[11px] font-semibold text-slate-950">
                  AI
                </span>
                <span className="font-medium tracking-tight">
                  AI Job Application Assistant
                </span>
              </div>
              <span className="hidden text-[11px] uppercase tracking-[0.16em] text-slate-400 md:inline">
                Smarter applications, faster
              </span>
            </div>
          </header>

          <div className="flex-1">{children}</div>

          <footer className="border-t border-slate-800/80 bg-slate-950/60">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} AI Job Application Assistant.</p>
              <p className="text-xs text-slate-500">
                Built with Next.js, Tailwind CSS, and AI.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
