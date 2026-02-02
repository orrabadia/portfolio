"use client"

import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Dither from "@/components/dither"

export default function DitherBackground() {
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"
  const isThoughts = pathname.startsWith("/thoughts")
  const opacity = isThoughts ? 0.025 : 0.10

  return (
    <div
      className="fixed inset-0 z-0 transition-opacity duration-500"
      style={{ opacity, pointerEvents: "none" }}
    >
      {isDark ? (
        <Dither
          waveSpeed={0.05}
          waveFrequency={3}
          waveAmplitude={0.3}
          waveColor={[0.44,0.98,0.00]}
        colorNum={4}
        pixelSize={2}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={1}
      />) : (
        <Dither
          waveSpeed={0.05}
          waveFrequency={3}
          waveAmplitude={0.3}
          waveColor={[1, 1, 1]}
          colorNum={4}
          pixelSize={1}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={1}
        />
      )}
    </div>
  )
}
