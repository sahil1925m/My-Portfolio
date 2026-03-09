import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Sahil | Portfolio",
  description: "B.Tech CSE '27",
};

import Navbar from "@/components/Navbar";
import Socials from "@/components/Socials";
import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-[#0a0a0a] text-white overflow-x-hidden antialiased tracking-tight`}
        suppressHydrationWarning
      >
        <ClientLayout>
          <Navbar />
          <Socials />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
