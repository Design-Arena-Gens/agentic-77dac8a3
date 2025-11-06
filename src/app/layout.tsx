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
  title: "Ripplefy | Stream the Vibes",
  description:
    "A modern Spotify-inspired music experience powered by free Deezer public APIs.",
  metadataBase: new URL("https://agentic-77dac8a3.vercel.app"),
  openGraph: {
    title: "Ripplefy | Stream the Vibes",
    description:
      "Discover trending tracks, explore playlists, and play 30-second previews with a Spotify-like UI.",
    type: "website",
    url: "https://agentic-77dac8a3.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ripplefy | Stream the Vibes",
    description:
      "Discover trending tracks, explore playlists, and play previews in a Spotify-style interface.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        {children}
      </body>
    </html>
  );
}
