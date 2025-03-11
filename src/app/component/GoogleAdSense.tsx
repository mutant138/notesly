"use client";
import { useEffect, useState } from "react";

export default function GoogleAdSense() {
  const [adsLoaded, setAdsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !document.querySelector("#adsbygoogle-init")) {
      const script = document.createElement("script");
      script.id = "adsbygoogle-init";
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3644275241898653";
      script.crossOrigin = "anonymous";
      script.async = true;
      script.onload = () => {
        console.log("✅ AdSense script loaded successfully!");
        setAdsLoaded(true);
      };
      script.onerror = (e) => console.error("❌ AdSense script failed to load", e);
      document.body.appendChild(script);
    } else {
      console.log("✅ AdSense script already loaded.");
      setAdsLoaded(true);
    }
  }, []);

  return null; // No UI needed, just loading the script
}
