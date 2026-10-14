"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, AtSign, Briefcase, Clock, FileText, Mail, MapPin } from "lucide-react"
import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa"
import type { IconType } from "react-icons"

import PortraitLogo from "@/components/PortraitLogo"
import { IconSlideButton } from "@/components/ui/icon-slide-button"
import { CONTACT_INFO } from "@/constant/resume"
import { LINKS, type LinkGroup, type LinkItem } from "@/constant/links"

const GROUPS: LinkGroup[] = ["Social", "Contact", "Work"]
const SOCIAL_IDS = ["github", "linkedin", "instagram", "whatsapp"]

const ICONS: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  email: Mail as unknown as IconType,
  portfolio: Briefcase as unknown as IconType,
  resume: FileText as unknown as IconType,
}

// Live Kigali clock; renders nothing until mounted so server and client markup agree.
function LocalTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Kigali" }).format(new Date())
    const tick = () => setTime(format())
    const first = setTimeout(tick, 0)
    const id = setInterval(tick, 30_000)
    return () => {
      clearTimeout(first)
      clearInterval(id)
    }
  }, [])

  return <span className="tabular-nums">{time ? `${time} CAT` : "\u00a0"}</span>
}

function LinkCard({ item, featured }: { item: LinkItem; featured?: boolean }) {
  const Icon = ICONS[item.id]
  const external = item.external && item.href.startsWith("http")

  return (
    <Link
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-foreground/15 p-4 transition-colors duration-500 ease-out hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
        featured ? "col-span-2" : "col-span-2 tablet:col-span-1"
      }`}
    >
      {/* Soft translucent fill rises from the bottom */}
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full rounded-2xl bg-foreground/[0.07] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      />

      <div className="relative flex items-center justify-between">
        <Icon
          aria-hidden
          className="size-6 text-foreground transition-all duration-500 ease-out group-hover:scale-110"
        />
        {/* Two arrows: the first exits up-right while the second slides in from bottom-left */}
        <span className="relative flex size-7 items-center justify-center overflow-hidden rounded-full border border-foreground/20 text-foreground/60 transition-colors duration-500 group-hover:border-foreground/40 group-hover:text-foreground">
          <ArrowUpRight
            aria-hidden
            className="absolute size-3.5 transition-transform duration-500 ease-out group-hover:translate-x-5 group-hover:-translate-y-5"
          />
          <ArrowUpRight
            aria-hidden
            className="absolute size-3.5 -translate-x-5 translate-y-5 transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </span>
      </div>

      <div className="relative min-w-0 transition-transform duration-500 ease-out group-hover:translate-x-1">
        <span className="block text-label-lg text-foreground">
          {item.label}
        </span>
        <span className="mt-0.5 flex items-center gap-0.5 text-mono-caption text-foreground/55 transition-colors duration-500 group-hover:text-foreground/70">
          {SOCIAL_IDS.includes(item.id) && <AtSign aria-hidden className="size-3 shrink-0" />}
          <span className="truncate">{item.handle}</span>
        </span>
      </div>
    </Link>
  )
}

export function LinksPage() {

  return (
    <main className="relative flex flex-1 flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(50%_60%_at_20%_0%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent)]"
      />

      <section className="container-app grid grid-cols-1 gap-14 pt-28 pb-section-mobile tablet:pt-36 tablet:pb-section-tablet desktop:grid-cols-12 desktop:gap-16 desktop:pb-section-desktop">
        {/* Profile — left aligned, sticky on desktop */}
        <aside className="desktop:sticky desktop:top-32 desktop:col-span-5 desktop:self-start">
          <p className="text-mono-caption uppercase tracking-widest text-muted-foreground">Links</p>
          <h1 className="mt-3 text-headline-lg text-foreground">Find me online.</h1>
          <p className="mt-4 max-w-[30rem] text-body-lg text-muted-foreground">
            Social profiles, direct ways to reach me, and my work — everything in one place.
          </p>

          {/* Separate cards, same outline language as the link cards */}
          <div className="mt-8 grid max-w-[30rem] grid-cols-2 gap-3">
            <div className="col-span-2 flex items-center gap-4 rounded-2xl border border-foreground/15 p-4">
              <div className="size-16 shrink-0 overflow-hidden rounded-xl border border-foreground/15 p-1.5">
                <PortraitLogo className="size-full" />
              </div>
              <div className="min-w-0">
                <p className="text-label-lg text-foreground">{CONTACT_INFO.name}</p>
                <p className="mt-0.5 text-mono-caption text-foreground/55">{CONTACT_INFO.title}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/15 p-4">
              <p className="flex items-center gap-1.5 text-mono-caption uppercase tracking-widest text-foreground/55">
                <MapPin aria-hidden className="size-3.5" />
                Based in
              </p>
              <p className="mt-1.5 text-body-md text-foreground">{CONTACT_INFO.location}</p>
            </div>
            <div className="rounded-2xl border border-foreground/15 p-4">
              <p className="flex items-center gap-1.5 text-mono-caption uppercase tracking-widest text-foreground/55">
                <Clock aria-hidden className="size-3.5" />
                Local time
              </p>
              <p className="mt-1.5 text-body-md text-foreground">
                <LocalTime />
              </p>
            </div>
          </div>

          <div className="mt-3 grid max-w-[30rem] grid-cols-2 items-center gap-3 rounded-2xl border border-foreground/15 p-3">
            <IconSlideButton
              href={`mailto:${CONTACT_INFO.email}`}
              icon={<Mail size={16} />}
              className="w-full border border-foreground/20 bg-foreground/[0.08] text-foreground hover:bg-foreground/[0.12]"
            >
              Email me
            </IconSlideButton>
            <Link
              href="/resume"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-foreground/20 px-5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/[0.07]"
            >
              <FileText aria-hidden className="size-4" />
              Resume
            </Link>
          </div>
        </aside>

        {/* Grouped link cards */}
        <div className="flex flex-col gap-10 desktop:col-span-7">
          {GROUPS.map((group, groupIndex) => (
            <div key={group}>
              <h2 className="mb-3 flex items-center gap-3 text-mono-caption uppercase tracking-widest text-muted-foreground">
                <span className="text-foreground/40">{String(groupIndex + 1).padStart(2, "0")}</span>
                {group}
                <span aria-hidden className="h-px flex-1 bg-border" />
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {LINKS.filter((l) => l.group === group).map((item, i) => (
                  <LinkCard key={item.id} item={item} featured={group === "Social" && i === 0} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
