"use client"

import { useId, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Layers } from "lucide-react"

import { cn } from "@/lib/utils"
import { TECH_ICONS } from "@/components/ui/tech-icons"

// ---------------------------------------------------------------------------
// Tech stack diagram: single-icon nodes wired into a center hub by orthogonal
// lines, with a glowing pulse traveling each line — replaces the static
// portrait as the About section's visual.
// ---------------------------------------------------------------------------

const VIEW_WIDTH = 640
const VIEW_HEIGHT = 480
const HUB_X = VIEW_WIDTH / 2
const HUB_Y = VIEW_HEIGHT / 2

interface StackNode {
  id: string
  skill: string
  x: number
  y: number
  delay: number
}

const STACK_NODES: StackNode[] = [
  { id: "figma", skill: "Figma", x: 70, y: 240, delay: 0.1 },
  { id: "typescript", skill: "TypeScript", x: 140, y: 90, delay: 0.2 },
  { id: "javascript", skill: "JavaScript", x: 250, y: 60, delay: 0.3 },
  { id: "nextjs", skill: "Next.js", x: 390, y: 60, delay: 0.4 },
  { id: "nodejs", skill: "Node.js", x: 500, y: 90, delay: 0.5 },
  { id: "react", skill: "React.js", x: 570, y: 240, delay: 0.6 },
  { id: "tailwind", skill: "Tailwind CSS", x: 140, y: 390, delay: 0.7 },
  { id: "postgresql", skill: "PostgreSQL", x: 250, y: 420, delay: 0.8 },
  { id: "mongodb", skill: "MongoDB", x: 390, y: 420, delay: 0.9 },
  { id: "firebase", skill: "Firebase", x: 500, y: 390, delay: 1.0 },
]

/** Radius of the ring traced right at the hub's border. */
const LOOP_RADIUS = 40

/** Each connector enters the hub, loops once around its border, then curves
 * back out to the node — the beam visibly passes through the hub's edge,
 * circles it, and re-emerges into its own connector. Every node sits at a
 * distinct angle from the hub, so the outbound curves never trace the same
 * line even though every loop shares the same ring. */
function connectorPath(node: StackNode) {
  const angle = Math.atan2(node.y - HUB_Y, node.x - HUB_X)
  const entryX = HUB_X + LOOP_RADIUS * Math.cos(angle)
  const entryY = HUB_Y + LOOP_RADIUS * Math.sin(angle)
  const farX = HUB_X - LOOP_RADIUS * Math.cos(angle)
  const farY = HUB_Y - LOOP_RADIUS * Math.sin(angle)

  const loop =
    `M ${entryX.toFixed(1)} ${entryY.toFixed(1)} ` +
    `A ${LOOP_RADIUS} ${LOOP_RADIUS} 0 0 1 ${farX.toFixed(1)} ${farY.toFixed(1)} ` +
    `A ${LOOP_RADIUS} ${LOOP_RADIUS} 0 0 1 ${entryX.toFixed(1)} ${entryY.toFixed(1)}`

  return `${loop} Q ${entryX.toFixed(1)} ${node.y} ${node.x} ${node.y}`
}

const AnimatedPath = ({
  d,
  id,
  beamDelay,
  active,
}: {
  d: string
  id: string
  beamDelay: number
  active: boolean
}) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        className="text-border"
      />
      <motion.path
        d={d}
        stroke="var(--color-primary)"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0, strokeWidth: 0 }}
        animate={{ opacity: active ? 0.85 : 0, strokeWidth: active ? 2.5 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
      <motion.path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="40 160"
        initial={{ strokeDashoffset: 200 }}
        animate={prefersReducedMotion ? undefined : { strokeDashoffset: -200 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          delay: beamDelay,
        }}
      />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </>
  )
}

export function TechStackFlow({ className }: { className?: string }) {
  const containerId = useId()
  const prefersReducedMotion = useReducedMotion()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className={cn("relative aspect-640/480 w-full", className)}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {STACK_NODES.map((node, index) => (
          <AnimatedPath
            key={node.id}
            d={connectorPath(node)}
            id={`${containerId}-${node.id}`}
            beamDelay={(index % 5) * 0.4}
            active={hoveredId === node.id}
          />
        ))}
      </svg>

      <div className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-border p-1.5 sm:rounded-2xl sm:p-3">
        <Layers aria-hidden className="size-5 text-foreground sm:size-9" />
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-primary/15 sm:rounded-2xl"
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {STACK_NODES.map((node) => {
        const Icon = TECH_ICONS[node.skill]
        const isHovered = hoveredId === node.id
        return (
          <motion.div
            key={node.id}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: node.delay }}
            style={{
              left: `${(node.x / VIEW_WIDTH) * 100}%`,
              top: `${(node.y / VIEW_HEIGHT) * 100}%`,
            }}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-foreground"
            onHoverStart={() => setHoveredId(node.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            <motion.div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-primary/25 blur-md"
              initial={false}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { opacity: isHovered ? 1 : 0, scale: isHovered ? 2.2 : 1 }
              }
              transition={{ duration: 0.25, ease: "easeOut" }}
            />
            <motion.div
              animate={
                prefersReducedMotion ? undefined : { scale: isHovered ? 1.3 : 1, y: isHovered ? -3 : 0 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {Icon && <Icon aria-hidden className="h-4 w-4 text-foreground sm:h-6 sm:w-6" />}
            </motion.div>
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute top-full z-30 mt-1.5 rounded-md bg-foreground px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-background shadow-sm"
                >
                  {node.skill}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

export default TechStackFlow
