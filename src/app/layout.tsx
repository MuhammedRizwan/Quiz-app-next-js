import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ResultProvider } from "@/context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: " Mind Bender",
  description: "quiz game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ResultProvider>
      <body className={inter.className}>{children}</body>
      </ResultProvider>
    </html>
  );
}
