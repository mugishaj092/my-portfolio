"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

/** Two-line clamp that always reserves its height, so neighbouring cards stay aligned.
 * When the text is actually cut off, a "more" pill sits on the end of line two.
 * Hover (mouse) or tap/Enter on it grows a panel with the full text over the
 * content below; "less", Escape, or leaving closes it. Short text is left alone. */
export function ExpandableText({
  text,
  className,
}: {
  text?: string
  className?: string
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const [truncated, setTruncated] = useState(false)
  const [open, setOpen] = useState(false)
  const [maxHeight, setMaxHeight] = useState<number>()
  const reduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    const el = textRef.current
    if (!el) return
    const check = () => setTruncated(el.scrollHeight > el.clientHeight + 1)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(el)
    return () => observer.disconnect()
  }, [text])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const shown = truncated && open

  /** The panel may grow down to the card's bottom edge, never past it; longer text scrolls. */
  function openPanel() {
    const wrapper = wrapperRef.current
    const card = wrapper?.closest("li") ?? wrapper?.parentElement
    if (wrapper && card) {
      const panelTop = wrapper.getBoundingClientRect().top - 8
      setMaxHeight(Math.max(96, card.getBoundingClientRect().bottom - panelTop - 12))
    }
    setOpen(true)
  }

  return (
    <div
      ref={wrapperRef}
      className={cn("relative min-h-[2lh]", className)}
      onPointerEnter={(e) => e.pointerType === "mouse" && truncated && openPanel()}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <p ref={textRef} className="line-clamp-2">
        {/* Two floats carve a pill-sized notch out of line two, so the text (and its
            ellipsis) stops before the button instead of running underneath it. */}
        <span aria-hidden className="float-right h-[1lh]" />
        <span aria-hidden className="float-right clear-right h-[1lh] w-[5rem]" />
        {text}
      </p>

      {truncated && (
        <button
          type="button"
          aria-expanded={shown}
          onClick={() => (open ? setOpen(false) : openPanel())}
          className="group/more absolute right-0 bottom-0 rounded-full outline-none"
        >
          <span className="flex h-5 items-center gap-1 rounded-full border border-border bg-muted/40 px-2 text-mono-caption text-muted-foreground transition-colors duration-200 group-hover/more:border-primary/40 group-hover/more:bg-primary/10 group-hover/more:text-primary group-focus-visible/more:ring-2 group-focus-visible/more:ring-ring">
            more
            <ChevronDown
              aria-hidden
              className="size-3 transition-transform duration-200 group-hover/more:translate-y-0.5"
            />
          </span>
        </button>
      )}

      <AnimatePresence>
        {shown && (
          <motion.div
            role="tooltip"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 40, y: 4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 40, y: 4 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{ maxHeight }}
            className="absolute -inset-x-2.5 -top-2 z-20 flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-lg shadow-black/10"
          >
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2.5 pt-2 [scrollbar-width:thin]">
              <p>{text}</p>
            </div>
            <div className="px-2.5 pt-1 pb-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="group/less ml-auto block rounded-full outline-none"
              >
                <span className="flex h-5 items-center gap-1 rounded-full border border-border bg-muted/50 px-2 text-mono-caption font-medium text-foreground/80 transition-colors duration-200 group-hover/less:border-primary group-hover/less:text-primary group-focus-visible/less:ring-2 group-focus-visible/less:ring-ring">
                  less
                  <ChevronDown
                    aria-hidden
                    className="size-3 rotate-180 transition-transform duration-200 group-hover/less:-translate-y-0.5"
                  />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
