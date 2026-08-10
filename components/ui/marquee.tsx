"use client"

import type { HTMLAttributes } from "react"
import type { MarqueeProps as FastMarqueeProps } from "react-fast-marquee"
import FastMarquee from "react-fast-marquee"
import { cn } from "@/lib/utils"

// A true alpha mask on the scrolling content, not a background-colored
// overlay div — an overlay can only ever approximate whatever sits behind
// the marquee (ambient blur, theme, etc.), while a mask fades the real
// pixels to transparent and lets that backdrop show through exactly as it
// is. No "background" color to keep in sync, in either theme.
const EDGE_FADE_MASK =
  "linear-gradient(to right, transparent, black 12%, black 88%, transparent)"

export type MarqueeProps = HTMLAttributes<HTMLDivElement>

export const Marquee = ({ className, style, ...props }: MarqueeProps) => (
  <div
    className={cn("relative w-full overflow-hidden", className)}
    style={{
      maskImage: EDGE_FADE_MASK,
      WebkitMaskImage: EDGE_FADE_MASK,
      ...style,
    }}
    {...props}
  />
)

export type MarqueeContentProps = FastMarqueeProps

export const MarqueeContent = ({
  loop = 0,
  autoFill = true,
  pauseOnHover = true,
  ...props
}: MarqueeContentProps) => (
  <FastMarquee autoFill={autoFill} loop={loop} pauseOnHover={pauseOnHover} {...props} />
)

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div className={cn("mx-2 flex-0 object-contain", className)} {...props} />
)
