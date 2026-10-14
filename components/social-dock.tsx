"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { AtSign } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa"

import { CONTACT_INFO } from "@/constant/resume"
import { GooeyStatusTooltip } from "@/components/shadcn-space/tooltip/tooltip-09"
import type { LucideIcon } from "lucide-react"
import type { IconType } from "react-icons"

const socials = [
  { label: "LinkedIn", handle: "mugishajoseph", href: "https://linkedin.com/in/mugishajoseph", icon: FaLinkedinIn as IconType },
  { label: "GitHub", handle: "mugishaj092", href: CONTACT_INFO.githubUrl, icon: FaGithub as IconType },
  { label: "Instagram", handle: "mugishajoseph", href: "https://instagram.com/mugishajoseph", icon: FaInstagram as IconType },
  { label: "WhatsApp", handle: "mugishajoseph", href: `https://wa.me/${CONTACT_INFO.phone.replace(/[^\d]/g, "")}`, icon: FaWhatsapp as IconType },
]

const CLOSE_DELAY = 150

// Glass containers/tiles (translucent + blurred); hover panels use the same glass style.
const tileClass = "flex size-12 items-center justify-center rounded-xl bg-transparent transition-colors hover:bg-white/10"
// The blur lives on a sibling layer, not on the container itself: a backdrop-filter ancestor
// would make the hover panels (children) blur only the container instead of the page behind.
const containerClass = "relative isolate flex flex-col items-center gap-1.5 rounded-[20px] p-1.5"
const GlassLayer = () => (
  <div
    aria-hidden
    className="glass-nav pointer-events-none absolute inset-0 -z-10 rounded-[20px] backdrop-blur-(--nav-blur) backdrop-saturate-[1.8]"
  />
)
const triggerClassName = "size-10 rounded-lg border-0 bg-transparent text-foreground hover:bg-transparent"
const panelClassName =
  "glass-nav !bg-[var(--nav-surface)] backdrop-blur-(--nav-blur) backdrop-saturate-[1.8] [&_div]:!text-foreground [&_span]:!text-foreground/80 [&_.rounded-full]:!bg-foreground/60"

export function SocialDock() {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => { if (timer.current) clearTimeout(timer.current) }
  const scheduleClose = () => { cancelClose(); timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY) }

  return (
    <div
      className="fixed bottom-6 right-5 z-40 hidden flex-col items-center gap-3 desktop:flex"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {/* Social pill — hidden until @ is hovered */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ type: "spring", bounce: 0.35, duration: 0.4 }}
            className={containerClass}
          >
            <GlassLayer />
            {socials.map(({ label, handle, href, icon }) => (
              <Link key={label} href={href ?? "#"} target="_blank" rel="noopener noreferrer" className={tileClass}>
                <GooeyStatusTooltip
                  gooey={false}
                  direction="right"
                  icon={icon as unknown as LucideIcon}
                  triggerLabel={label}
                  data={[{
                    key: "name",
                    label: (
                      <span className="inline-flex items-center gap-0.5">
                        <AtSign className="size-3" />
                        {handle}
                      </span>
                    ),
                    value: "→",
                    tone: "default",
                  }]}
                  className="min-h-0 w-auto"
                  triggerClassName={triggerClassName}
                  panelClassName={panelClassName}
                />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* @ trigger — always visible */}
      <div onMouseEnter={() => { cancelClose(); setOpen(true) }} className={containerClass}>
        <GlassLayer />
        <div className={tileClass}>
          <GooeyStatusTooltip
            gooey={false}
            direction="right"
            icon={AtSign}
            triggerLabel="Contact"
            data={[{ key: "email", label: CONTACT_INFO.email, value: "", tone: "default" }]}
            className="min-h-0 w-auto"
            triggerClassName={triggerClassName}
            panelClassName={panelClassName}
          />
        </div>
      </div>
    </div>
  )
}
