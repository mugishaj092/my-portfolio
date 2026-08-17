"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react"
import { Globe } from "lucide-react"
import { SiGithub } from "react-icons/si"

import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

export interface CircuitCardProps {
  children: React.ReactNode
  /** Live/deployed URL — shown as a glass "Live" button over the card, revealed on hover. */
  liveUrl?: string
  /** Repo URL — shown as a glass "GitHub" button over the card, revealed on hover. */
  githubUrl?: string
  className?: string
  containerClassName?: string
  /** Max cursor-tracked tilt in degrees at the card's edge. */
  maxTilt?: number
}

const SPRING = { stiffness: 200, damping: 20, mass: 0.6 }

/** A project card that responds to the cursor with real 3D perspective —
 * tilt plus a lifted content layer — while a circuit-board trace sweeps its
 * border and corner nodes idle with a faint pulse, like power is always
 * live. Shares its traveling-gradient language with the About section's
 * connector diagram, but the interaction itself (tilt, not a pin drop) is
 * its own thing. */
export function CircuitCard({
  children,
  liveUrl,
  githubUrl,
  className,
  containerClassName,
  maxTilt = 5,
}: CircuitCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const lift = useMotionValue(0)

  const rotateX = useSpring(tiltX, SPRING)
  const rotateY = useSpring(tiltY, SPRING)
  const liftSpring = useSpring(lift, SPRING)
  const contentZ = useTransform(liftSpring, (v) => v * 28)
  const contentShadow = useTransform(
    liftSpring,
    (v) => `0 ${8 + v * 20}px ${20 + v * 30}px -12px rgba(0,0,0,${0.12 + v * 0.16})`
  )

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    tiltY.set((x - 0.5) * maxTilt * 2)
    tiltX.set(-(y - 0.5) * maxTilt * 2)
  }

  function handleEnter() {
    setIsHovered(true)
    lift.set(1)
  }

  function handleLeave() {
    setIsHovered(false)
    tiltX.set(0)
    tiltY.set(0)
    lift.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      className={cn("group relative", containerClassName)}
    >
      <div className="relative overflow-hidden rounded-2xl p-px">
        <motion.div
          aria-hidden
          className="absolute inset-[-60%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, var(--color-primary) 7%, transparent 16%)",
          }}
          initial={{ rotate: 0, opacity: 0 }}
          animate={
            prefersReducedMotion
              ? undefined
              : { rotate: isHovered ? 360 : 0, opacity: isHovered ? 1 : 0 }
          }
          transition={{
            rotate: { duration: 2.2, repeat: isHovered ? Infinity : 0, ease: "linear" },
            opacity: { duration: 0.3 },
          }}
        />

        <motion.div
          style={{
            translateZ: prefersReducedMotion ? 0 : contentZ,
            boxShadow: prefersReducedMotion ? undefined : contentShadow,
          }}
          className={cn(
            "relative overflow-hidden rounded-[15px] border border-border bg-card p-4",
            className
          )}
        >
          {children}

          {(liveUrl || githubUrl) && (
            <motion.div
              className="absolute right-3 top-3 flex items-center gap-2"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -8 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ pointerEvents: isHovered ? "auto" : "none" }}
            >
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open live site"
                  title="Live"
                  className="glass inline-flex size-8 items-center justify-center rounded-full text-foreground backdrop-blur-(--backdrop-blur) backdrop-saturate-[1.6] transition-colors hover:bg-glass-highlight/40"
                >
                  <Globe aria-hidden className="size-3.5" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open GitHub repository"
                  title="GitHub"
                  className="glass inline-flex size-8 items-center justify-center rounded-full text-foreground backdrop-blur-(--backdrop-blur) backdrop-saturate-[1.6] transition-colors hover:bg-glass-highlight/40"
                >
                  <SiGithub aria-hidden className="size-3.5" />
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CircuitCard
