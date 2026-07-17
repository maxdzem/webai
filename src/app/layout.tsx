import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPaletteProvider } from "@/components/CommandPalette";
import { PALETTE_ITEMS } from "@/lib/templates";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Motion Web — Animated Templates & AI Design Prompts",
  description:
    "Build beautiful animated landing pages in minutes with ready-to-use prompts and templates. Just copy, paste, and launch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CommandPaletteProvider templates={PALETTE_ITEMS}>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
