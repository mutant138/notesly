"use client";
import { useEffect, useRef } from "react";
interface AdUnitProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical";
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
  useEffect(() => {
    if (typeof window !== "undefined" && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }
  }, []);
  return (
    <div className={className} style={{ minHeight: "100px", ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center", ...style }}
        data-ad-client="ca-pub-3644275241898653"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
        ref={adRef}
      />
    </div>
  );
}
