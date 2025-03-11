"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
import type React from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "autorelaxed";
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style = {},
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadAds = () => {
        if (window.adsbygoogle && adRef.current && !initialized.current) {
          console.log("✅ Pushing AdSense ad...");
          initialized.current = true;
          window.adsbygoogle.push({});
        }
      };

      if (window.adsbygoogle) {
        console.log("✅ AdSense detected, pushing ads.");
        loadAds();
      } else {
        console.warn("🚨 AdSense script not yet loaded. Waiting...");
        const interval = setInterval(() => {
          if (window.adsbygoogle) {
            console.log("✅ AdSense script loaded. Pushing ads...");
            loadAds();
            clearInterval(interval);
          }
        }, 500);
      }
    }
  }, [slot]);

  return (
    <div
      className={className}
      style={{
        minHeight: "100px",
        width: "100%",
        display: "block",
        textAlign: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minWidth: "320px",
          height: "100%",
          minHeight: "100px",
        }}
        data-ad-client="ca-pub-3644275241898653"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
