import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Events App",
  description: "Generated events app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Toaster />
        <main className="p-5 xl:py-6 xl:px-10">{children}</main>
      </body>
    </html>
  );
}
