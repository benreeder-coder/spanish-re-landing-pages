import type { Metadata } from "next";
import {
  Playfair_Display,
  Space_Mono,
  Roboto_Mono,
  Cormorant_Garamond,
  Inter,
  DM_Sans,
  Open_Sans,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Automation for Spanish Real Estate Agencies",
  description:
    "Fully automated, plug-and-play AI system for real estate agencies in Spain. Multilingual chatbot, AI listings, auto-publishing, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${spaceMono.variable} ${robotoMono.variable} ${cormorant.variable} ${inter.variable} ${dmSans.variable} ${openSans.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
