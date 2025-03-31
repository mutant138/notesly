import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAdSense from "./component/GoogleAdSense";
//import GoogleAdSense from "./component/GoogleAdSense";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
import Navbar from "./component/UI/Navbar";
import Footer from "./component/Footer/Footer";
export const metadata: Metadata = {
  title: "Notesly – The open source pdf notes",
  description: "Find and download your required topic handwritten pdf freely.",
  keywords: "note-taking, online notes, productivity, Notesly app, best notes, freepdfs, pdf, studymaterialsfree, ",
  authors: [{ name: "Udhaya Surya", url: "https://space-themed-portolio.vercel.app/" }],
  creator: "Udhaya Surya",
  applicationName: "Notesly",
  robots: "index, follow",
  openGraph: {
    title: "Notesly – The open source pdf notes",
    description: "Find and download your required topic handwritten pdf freely.",
    url: "https://notesly.vercel.app/",
    siteName: "Notesly",
    images: [{ url: "https://notesly.vercel.app/your-og-image.jpg", width: 1200, height: 630, alt: "Notesly – The Best Note-Taking App" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notesly – The open source pdf notes",
    description: "Find and download your required topic handwritten pdf freely.",
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
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3644275241898653"
          crossOrigin="anonymous"
        ></script> */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
     
        <GoogleAdSense/>
        <Navbar />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
