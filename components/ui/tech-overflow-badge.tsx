"use client"

import { useState } from "react"

import { TechIcon } from "@/components/ui/tech-icon"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export interface TechOverflowBadgeProps {
  /** The tech names hidden behind the "+N" badge. */
  items: string[]
}

/** A "+N" chip that reveals the remaining tech-stack items in a tooltip on
 * hover/focus. Built on Base UI's Tooltip (via the shadcn tooltip-04
 * recipe), which portals into document.body and handles collision-aware
 * positioning itself — collisionBoundary is set to the trigger's own
 * project card, so the tooltip shifts to stay inside the card's width
 * instead of spilling into the page past it. */
export function TechOverflowBadge({ items }: TechOverflowBadgeProps) {
  const [card, setCard] = useState<Element | null>(null)

  return (
    <Tooltip>
      <TooltipTrigger
        ref={(node) => setCard(node?.closest(".group") ?? null)}
        // Stops CircuitCard's cursor-tracked 3D tilt from updating while
        // this is hovered — the glass tooltip's backdrop-filter sampling a
        // live-transforming surface underneath it causes visible rendering
        // corruption in Chromium, and a card that keeps tilting under a
        // tooltip you're trying to read is bad UX regardless.
        onMouseMove={(event) => event.stopPropagation()}
        className="shrink-0 cursor-default rounded-pill border border-border px-2.5 py-1 text-mono-caption text-muted-foreground outline-none transition-colors hover:border-primary/50 hover:text-foreground focus-visible:border-primary/50 focus-visible:text-foreground"
      >
        +{items.length}
      </TooltipTrigger>
      <TooltipContent
        sideOffset={10}
        collisionBoundary={card ?? undefined}
        collisionPadding={12}
        className="flex w-max max-w-none flex-nowrap gap-1.5 rounded-2xl border border-glass-border bg-glass-surface p-2.5 text-foreground shadow-2xl shadow-black/25 backdrop-blur-(--backdrop-blur) backdrop-saturate-[1.6]"
      >
        {items.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill border border-glass-border bg-glass-highlight/25 py-1 pl-2 pr-2.5 text-mono-caption text-foreground"
          >
            <TechIcon name={item} className="size-3 shrink-0 opacity-80" />
            {item}
          </span>
        ))}
      </TooltipContent>
    </Tooltip>
  )
}

export default TechOverflowBadge
