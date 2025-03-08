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
  const adRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle && adRef.current) {
      // Delay pushing the ad to allow the container to render properly
      const timer = setTimeout(() => {
        try {
          window.adsbygoogle.push({});
        } catch (error) {
          console.error("AdSense error in AdUnit component:", error);
        }
      }, 500); // Delay of 500ms

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, []);

  return (
    <div
      className={className}
      style={{
        minHeight: "100px", // Ensure a visible container
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
          textAlign: "center",
          minHeight: "100px", // Prevents collapsing
          ...style,
        }}
        data-ad-client="ca-pub-3644275241898653"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
