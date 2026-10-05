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
  title: "TokenMingle",
  description: "The future of token-powered communities is here.",
  openGraph: {
    title: "TokenMingle Waitlist",
    description: "The future of token-powered communities is here.",
    images: [
      {
        url: "/api/og?username=@tokenmingle", // default fallback
        width: 1200,
        height: 630,
        alt: "TokenMingle Waitlist Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TokenMingle Waitlist",
    description: "The future of token-powered communities is here.",
    images: ["/api/og?username=@tokenmingle"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
