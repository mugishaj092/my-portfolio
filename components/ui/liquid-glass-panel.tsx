"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

const MAX_TILT_DEGREES = 6

function LiquidGlassPanel({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const pointerXProgress = useMotionValue(0.5)
  const pointerYProgress = useMotionValue(0.15)

  const rotateX = useSpring(
    useTransform(pointerYProgress, [0, 1], [MAX_TILT_DEGREES, -MAX_TILT_DEGREES]),
    { stiffness: 150, damping: 18 }
  )
  const rotateY = useSpring(
    useTransform(pointerXProgress, [0, 1], [-MAX_TILT_DEGREES, MAX_TILT_DEGREES]),
    { stiffness: 150, damping: 18 }
  )
  const pointerX = useTransform(pointerXProgress, (value) => `${value * 100}%`)
  const pointerY = useTransform(pointerYProgress, (value) => `${value * 100}%`)

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerXProgress.set((event.clientX - rect.left) / rect.width)
    pointerYProgress.set((event.clientY - rect.top) / rect.height)
  }

  function resetPointer() {
    pointerXProgress.set(0.5)
    pointerYProgress.set(0.15)
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        "--pointer-x": pointerX,
        "--pointer-y": pointerY,
      } as React.CSSProperties}
      className="relative"
    >
      <div
        data-slot="liquid-glass-panel"
        className={cn(
          "liquid-glass overflow-hidden rounded-lg backdrop-blur-2xl backdrop-saturate-150",
          className
        )}
        {...props}
      >
        <div aria-hidden className="liquid-glass-shimmer pointer-events-none absolute inset-0" />
        <div aria-hidden className="liquid-glass-sheen pointer-events-none absolute inset-0" />
        {children}
      </div>
    </motion.div>
  )
}

export { LiquidGlassPanel }
