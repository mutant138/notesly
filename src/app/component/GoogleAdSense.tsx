"use client"
import Script from "next/script"

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function GoogleAdSense() {
  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3644275241898653"
      crossOrigin="anonymous"
      onError={(e) => console.error("AdSense script failed to load", e)}
    />
  )
}

