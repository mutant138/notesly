"use client"
import { useEffect, useRef } from "react"
import type React from "react"

interface AdUnitProps {
  slot: string
  format?: "auto" | "fluid" | "rectangle" | "vertical"
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function AdUnit({ slot, format = "auto", responsive = true, className = "", style = {} }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    
    if (typeof window !== "undefined" && window.adsbygoogle && adRef.current && !initialized.current) {
      try {
        // Mark as initialized to prevent multiple initializations
        initialized.current = true

        // Push the ad with a unique key based on slot
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error("AdSense error in AdUnit component:", error)
      }
    }

    return () => {
      // Clean up on unmount if needed
      initialized.current = false
    }
  }, [slot])

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
          height: "100%",
          minHeight: "100px",
        }}
        data-ad-client="ca-pub-3644275241898653"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  )
}

