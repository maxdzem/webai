import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandPaletteProvider } from "@/components/command-palette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "webai — open prompt library for builders",
    template: "%s · webai",
  },
  description:
    "A free, open library of high-quality prompts for AI apps, agents and UI generation. Search, copy, remix. Community-driven, openly licensed.",
  keywords: [
    "prompts",
    "ai prompts",
    "prompt library",
    "open source prompts",
    "v0",
    "ui generation",
    "llm",
  ],
  openGraph: {
    title: "webai — open prompt library for builders",
    description:
      "A free, open library of high-quality prompts. Search, copy, remix.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CommandPaletteProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
