"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, Award, BookOpen, Layers, Link2, Mail, Menu, X } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import type { ComponentType } from "react"

import { CONTACT_INFO } from "@/constant/resume"
import { scrollToHash } from "@/lib/scroll-to-hash"

type NavLink = { label: string; href: string }

type ExploreItem = {
  label: string
  description: string
  href: string
  icon: ComponentType<{ className?: string }>
}

const EXPLORE: ExploreItem[] = [
  { label: "Connect With Me", description: "Let's connect.", href: "/links", icon: Link2 },
  { label: "Tech Stack", description: "Tools of my trade.", href: "/tech-stack", icon: Layers },
  { label: "Certifications", description: "Skills, verified.", href: "/certifications", icon: Award },
  { label: "Guestbook", description: "Leave a message.", href: "/guestbook", icon: BookOpen },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function NavMobile({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const close = () => setOpen(false)

  // Lock page scroll while open, close on Escape, and close if the viewport grows to the desktop nav.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const media = window.matchMedia("(min-width: 1024px)")
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    media.addEventListener("change", onChange)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
      media.removeEventListener("change", onChange)
    }
  }, [open])

  const item = (i: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.05 + i * 0.05, ease: EASE },
  })

  return (
    <div className="desktop:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="glass-nav relative flex size-11 items-center justify-center rounded-full border border-glass-border text-foreground backdrop-blur-(--nav-blur) backdrop-saturate-[1.8]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "menu"}
            initial={reduceMotion ? false : { opacity: 0, rotate: -60, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 60, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            className="flex"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 -z-10 overflow-y-auto bg-background/90 backdrop-blur-xl"
          >
            <div className="container-app flex min-h-full flex-col pt-28 pb-10 tablet:pt-32">
              <nav aria-label="Primary" className="flex flex-col">
                {links.map((link, i) => (
                  <motion.div key={link.href} {...item(i)}>
                    <Link
                      href={link.href}
                      onClick={(event) => {
                        scrollToHash(event, link.href)
                        close()
                      }}
                      className="group flex items-center justify-between border-b border-foreground/10 py-4 text-headline-md text-foreground"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-mono-caption text-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                        {link.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-5 text-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                      />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.p
                {...item(links.length)}
                className="mt-10 text-mono-caption uppercase tracking-widest text-muted-foreground"
              >
                Explore
              </motion.p>
              <div className="mt-3 grid grid-cols-1 gap-3 tablet:grid-cols-2">
                {EXPLORE.map((entry, i) => {
                  const Icon = entry.icon
                  return (
                    <motion.div key={entry.href} {...item(links.length + 1 + i)}>
                      <Link
                        href={entry.href}
                        onClick={close}
                        className="group flex items-center gap-4 rounded-2xl border border-foreground/15 p-4 transition-colors duration-200 hover:border-foreground/40 hover:bg-foreground/[0.05]"
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-foreground/15">
                          <Icon className="size-5 text-foreground" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-label-lg text-foreground">{entry.label}</span>
                          <span className="block text-body-md text-muted-foreground">{entry.description}</span>
                        </span>
                        <ArrowUpRight aria-hidden className="size-4 shrink-0 text-foreground/40 transition-colors group-hover:text-foreground" />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                {...item(links.length + 1 + EXPLORE.length)}
                className="mt-auto flex items-center gap-3 pt-10"
              >
                <Link
                  href="/contact"
                  onClick={close}
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-foreground/20 bg-foreground/[0.08] px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.12]"
                >
                  Book a Call
                </Link>
                <Link
                  href={CONTACT_INFO.githubUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground/[0.08]"
                >
                  <FaGithub aria-hidden className="size-4" />
                </Link>
                <Link
                  href={`mailto:${CONTACT_INFO.email}`}
                  aria-label="Email"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground/[0.08]"
                >
                  <Mail aria-hidden className="size-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
