import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"], // Bold and ExtraBold
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  ),
  title: "TokenMingle",
  description: "The future of token-powered communities is here.",
  openGraph: {
    title: "TokenMingle Waitlist",
    description: "The future of token-powered communities is here.",
    images: [
      {
        url: "/ogpreview.png",
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
    images: ["/ogpreview.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
