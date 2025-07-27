import localFont from "next/font/local";

import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@/lib/providers/query-client-provider";

import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Chulcheck",
  description: "출석체크 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased `}>
        <div className="min-h-screen flex justify-center">
          <div className="w-full max-w-md bg-[#F9FAFB] min-h-screen px-4 py-6 sm:px-6 lg:px-8">
            <SessionProvider>
              <QueryClientProvider>
                {children}
                <Toaster richColors />
              </QueryClientProvider>
            </SessionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
