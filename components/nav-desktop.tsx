"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { ComponentType } from "react"
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  CreditCard,
  Link2,
  ListChecks,
  MessageSquare,
  Search,
  Star,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { scrollToHash } from "@/lib/scroll-to-hash"

type IconComponent = ComponentType<{
  className?: string
  strokeWidth?: number
  "aria-hidden"?: boolean
}>

type NavLink = { label: string; href: string }

type FeatureCard = {
  label: string
  description: string
  href: string
  icon: IconComponent
}

type ListItem = {
  label: string
  description: string
  href: string
  icon: IconComponent
}

const featureCards: FeatureCard[] = [
  {
    label: "Guestbook",
    description: "Let me know you were here",
    href: "/guestbook",
    icon: BookOpen,
  },
  {
    label: "Bucket List",
    description: "Dreams with a deadline",
    href: "/bucket-list",
    icon: ListChecks,
  },
]

const listItems: ListItem[] = [
  {
    label: "Links",
    description: "All my links are here",
    href: "/links",
    icon: Link2,
  },
  {
    label: "Attribution",
    description: "Journey to create this site",
    href: "/attribution",
    icon: CreditCard,
  },
]

// Small delay before closing so the pointer can travel from the trigger to
// the panel (or briefly overshoot) without the menu flickering shut.
const CLOSE_DELAY_MS = 120

export function NavDesktop({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = null
  }
  const openMenu = () => {
    cancelClose()
    setOpen(true)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("pointerdown", onPointerDown)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open])

  useEffect(() => cancelClose, [])

  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <div
      ref={wrapperRef}
      className="relative isolate flex items-center gap-2"
      onMouseLeave={scheduleClose}
      onMouseEnter={() => open && cancelClose()}
    >
      {/* Expanding panel: sits behind the pill row so the nav itself appears to grow. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="more-panel"
            id="nav-more-panel"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scaleY: 0.6, scaleX: 0.94, filter: "blur(6px)" }
            }
            animate={{ opacity: 1, scaleY: 1, scaleX: 1, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scaleY: 0.7, scaleX: 0.96, filter: "blur(4px)" }
            }
            transition={{ duration: 0.38, ease }}
            style={{ transformOrigin: "top right", left: "-0.75rem", right: "-0.75rem" }}
            className="glass-nav absolute -top-3 -z-10 rounded-[28px] bg-background/10 px-3 pt-[4.25rem] pb-3 backdrop-blur-xl backdrop-saturate-[1.8]"
          >
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.05,
                    delayChildren: reduceMotion ? 0 : 0.08,
                  },
                },
              }}
              className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr 1.4fr" }}
            >
              {featureCards.map((card, i) => (
                <PanelItem key={card.href} reduceMotion={!!reduceMotion}>
                  {i === 0 ? (
                    <GuestbookTile card={card} onNavigate={() => setOpen(false)} />
                  ) : (
                    <FeatureTile card={card} onNavigate={() => setOpen(false)} />
                  )}
                </PanelItem>
              ))}

              <div className="flex flex-col gap-3">
                {listItems.map((item) => (
                  <PanelItem key={item.href} reduceMotion={!!reduceMotion}>
                    <ListTile item={item} onNavigate={() => setOpen(false)} />
                  </PanelItem>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-nav flex items-center gap-0.5 rounded-pill px-1.5 py-1.5 text-label-lg backdrop-blur-(--nav-blur) backdrop-saturate-[1.8]">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={(event) => scrollToHash(event, link.href)}
            className="rounded-pill px-3.5 py-1.5 text-foreground/80 transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}

        <button
          type="button"
          aria-expanded={open}
          aria-controls="nav-more-panel"
          onMouseEnter={openMenu}
          onFocus={openMenu}
          onClick={() => (open ? setOpen(false) : openMenu())}
          className="flex items-center gap-1 rounded-pill border border-glass-border px-3.5 py-1.5 text-foreground/80 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-expanded:text-foreground"
        >
          More
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform duration-300",
              open && "rotate-180"
            )}
          />
        </button>
      </div>

      <Link
        href="/contact"
        className="rounded-pill border border-glass-border bg-secondary px-5 py-2.5 text-label-lg text-secondary-foreground transition-colors hover:bg-muted"
      >
        Book a Call
      </Link>

      <button
        type="button"
        aria-label="Search"
        className="glass-nav flex size-11 shrink-0 items-center justify-center rounded-full border border-glass-border text-foreground/70 backdrop-blur-(--nav-blur) backdrop-saturate-[1.8] transition-colors hover:text-foreground"
      >
        <Search className="size-4" />
      </button>
    </div>
  )
}

function PanelItem({
  children,
  reduceMotion,
}: {
  children: React.ReactNode
  reduceMotion: boolean
}) {
  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.32 } },
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}

function GuestbookTile({
  card,
  onNavigate,
}: {
  card: FeatureCard
  onNavigate: () => void
}) {
  return (
    <Link
      href={card.href}
      onClick={onNavigate}
      className="group relative flex h-full min-h-36 flex-col justify-end overflow-hidden rounded-2xl p-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#0a0a0f_0%,#0d0a1a_40%,#080810_100%)]" />

      {/* Floating message cards decoration */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {/* card 1 */}
        <div className="absolute top-3 right-3 w-24 rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-1">
          <div className="mb-1.5 flex items-center gap-1.5">
            <div className="size-3 rounded-full bg-purple-400/60" />
            <div className="h-1.5 w-10 rounded-full bg-white/20" />
          </div>
          <div className="space-y-1">
            <div className="h-1 w-full rounded-full bg-white/15" />
            <div className="h-1 w-3/4 rounded-full bg-white/10" />
          </div>
          <div className="mt-1.5 flex gap-0.5">
            {[...Array(3)].map((_, i) => (
              <Star key={i} className="size-2 fill-yellow-400/60 text-yellow-400/60" />
            ))}
          </div>
        </div>
        {/* card 2 */}
        <div className="absolute top-14 right-8 w-20 rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-1 group-hover:-rotate-1">
          <div className="mb-1.5 flex items-center gap-1.5">
            <div className="size-3 rounded-full bg-blue-400/60" />
            <div className="h-1.5 w-8 rounded-full bg-white/20" />
          </div>
          <div className="space-y-1">
            <div className="h-1 w-full rounded-full bg-white/15" />
            <div className="h-1 w-1/2 rounded-full bg-white/10" />
          </div>
        </div>
        {/* message icon */}
        <MessageSquare
          className="absolute -top-2 -left-2 size-20 rotate-12 text-purple-500/10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
        />
      </div>

      {/* Bottom overlay */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <ArrowUpRight
        aria-hidden
        className="absolute top-3 left-3 size-4 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
      />
      <div className="relative">
        <p className="text-base font-semibold">{card.label}</p>
        <p className="text-xs text-white/70">{card.description}</p>
      </div>
    </Link>
  )
}

function FeatureTile({
  card,
  onNavigate,
}: {
  card: FeatureCard
  onNavigate: () => void
}) {
  const items = ["🏔️ Hike Kilimanjaro", "🌊 Learn to surf", "🎸 Play live"]
  return (
    <Link
      href={card.href}
      onClick={onNavigate}
      className="group relative flex h-full min-h-36 flex-col justify-end overflow-hidden rounded-2xl p-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#0a0f0a_0%,#0a1a0d_40%,#080f08_100%)]" />

      {/* Floating checklist decoration */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute top-3 right-3 w-24 space-y-1.5 rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`size-3 shrink-0 rounded-sm border ${i < 2 ? "border-emerald-400/60 bg-emerald-400/30" : "border-white/20"}`} />
              <div className="h-1 flex-1 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
        <ListChecks className="absolute -top-2 -left-2 size-20 -rotate-12 text-emerald-500/10 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110" />
      </div>

      {/* Bottom overlay */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <ArrowUpRight
        aria-hidden
        className="absolute top-3 left-3 size-4 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
      />
      <div className="relative">
        <p className="text-base font-semibold">{card.label}</p>
        <p className="text-xs text-white/70">{card.description}</p>
      </div>
    </Link>
  )
}

function ListTile({
  item,
  onNavigate,
}: {
  item: ListItem
  onNavigate: () => void
}) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      onClick={(event) => {
        scrollToHash(event, item.href)
        onNavigate()
      }}
      className="group flex items-center gap-3 rounded-2xl border border-glass-border bg-foreground/[0.03] p-2.5 outline-none transition-colors hover:bg-foreground/[0.07] focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-glass-border text-foreground/70 transition-colors group-hover:text-foreground">
        <Icon className="size-4 transition-transform duration-300 group-hover:scale-110" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground">
          {item.label}
        </span>
        <span className="block truncate text-xs text-muted-foreground">
          {item.description}
        </span>
      </span>
    </Link>
  )
}
