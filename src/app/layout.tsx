import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import "./globals.css";
//import GoogleAdSense from "./component/GoogleAdSense";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notesly – The Best Note-Taking App",
  description: "Take and organize your notes effortlessly with Notesly, a powerful and minimalist note-taking app.",
  keywords: "note-taking, online notes, productivity, Notesly app, best note app",
  authors: [{ name: "Udhaya Surya", url: "https://space-themed-portolio.vercel.app/" }],
  creator: "Udhaya Surya",
  applicationName: "Notesly",
  robots: "index, follow",
  openGraph: {
    title: "Notesly – The Best Note-Taking App",
    description: "Take and organize your notes effortlessly with Notesly.",
    url: "https://notesly--ten.vercel.app/",
    siteName: "Notesly",
    images: [{ url: "https://notesly--ten.vercel.app/your-og-image.jpg", width: 1200, height: 630, alt: "Notesly – The Best Note-Taking App" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notesly – The Best Note-Taking App",
    description: "Take and organize your notes effortlessly with Notesly.",
    creator: "@Udhaya138",
    images: ["https://notesly--ten.vercel.app/your-twitter-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Notesly",
    url: "https://notesly.vercel.app/",
    description: "A powerful and minimalist note-taking app for productivity.",
    author: { "@type": "Person", name: "Udhaya Surya" },
  };

  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-3644275241898653" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3644275241898653"
          crossOrigin="anonymous"
        ></script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <GoogleAdSense /> */}
        {children}
      </body>
    </html>
  );
}
