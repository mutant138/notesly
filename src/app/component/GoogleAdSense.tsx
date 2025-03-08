"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function GoogleAdSense() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error in GoogleAdSense component:", e);
      }
    }
  }, [isLoaded]);

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3644275241898653"
      crossOrigin="anonymous"
      onLoad={() => setIsLoaded(true)} // Ensures script is fully loaded
      onError={(e) => console.error("AdSense script failed to load", e)}
    />
  );
}
