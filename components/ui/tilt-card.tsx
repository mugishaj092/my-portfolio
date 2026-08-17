"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

export interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Max tilt in degrees at the card's edge. Kept modest by default for a
   * restrained, professional feel rather than a showy gimmick. */
  maxTilt?: number
}

const SPRING = { stiffness: 220, damping: 20, mass: 0.5 }

/** Wraps a card in a cursor-tracked 3D tilt — reads as premium hardware
 * responding to the pointer, not a novelty effect. Disabled entirely under
 * reduced motion. */
export function TiltCard({ children, className, maxTilt = 3 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

  const rotateX = useSpring(tiltX, SPRING)
  const rotateY = useSpring(tiltY, SPRING)
  const scale = useSpring(1, SPRING)

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    tiltY.set((x - 0.5) * maxTilt * 2)
    tiltX.set(-(y - 0.5) * maxTilt * 2)
  }

  function handleMouseEnter() {
    if (prefersReducedMotion) return
    scale.set(1.006)
  }

  function handleMouseLeave() {
    tiltX.set(0)
    tiltY.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        scale: prefersReducedMotion ? 1 : scale,
        transformPerspective: 900,
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  )
}

export default TiltCard
