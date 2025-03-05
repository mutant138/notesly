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
  title: "Notesly – The Best Note-Taking App",
  description: "Take and organize your notes effortlessly with Notesly, a powerful and minimalist note-taking app.",
  keywords: "note-taking, online notes, productivity, Notesly app, best note app",
  authors: [{ name: "Udhaya surya", url: "https://space-themed-portolio.vercel.app/" }],
  creator: "Your Name",
  applicationName: "Notesly",
  robots: "index, follow",
  openGraph: {
    title: "Notesly – The Best Note-Taking App",
    description: "Take and organize your notes effortlessly with Notesly, a powerful and minimalist note-taking app.",
    url: "",
    siteName: "Notesly",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Notesly – The Best Note-Taking App",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Notesly – The Best Note-Taking App",
    description: "Take and organize your notes effortlessly with Notesly.",
    creator: "https://x.com/Udhaya138",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Notesly",
    "url": "https://notesly.vercel.app/",
    "description": "A powerful and minimalist note-taking app for productivity.",
    "author": {
      "@type": "Person",
      "name": "Udhaya surya"
    }
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
