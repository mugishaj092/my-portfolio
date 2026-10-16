import type { ComponentType } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react"

import { CONTACT_INFO } from "@/constant/resume"

type ComingSoonProps = {
  eyebrow: string
  title: string
  description: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  /** Short teasers of what the page will contain. */
  teasers: { title: string; text: string }[]
  /** Mail subject used by the "Notify me" button. */
  notifySubject: string
}

export function ComingSoon({ eyebrow, title, description, icon: Icon, teasers, notifySubject }: ComingSoonProps) {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      {/* Faint grid that fades out toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(60%_55%_at_50%_30%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_oklch,var(--accent)_16%,transparent),transparent)]"
      />

      <section className="container-app flex flex-1 flex-col items-center pt-32 pb-section-mobile tablet:pt-40 tablet:pb-section-tablet desktop:pb-section-desktop">
        {/* Orbit: icon inside slowly pulsing concentric rings */}
        <div className="relative flex size-44 items-center justify-center tablet:size-56">
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full border border-foreground/10 [animation-duration:4s]" />
          <span aria-hidden className="absolute inset-6 rounded-full border border-foreground/10" />
          <span aria-hidden className="absolute inset-12 rounded-full border border-foreground/15" />
          <span className="relative flex size-20 items-center justify-center rounded-3xl border border-foreground/20 bg-foreground/[0.05] tablet:size-24">
            <Icon aria-hidden className="size-9 text-foreground tablet:size-10" strokeWidth={1.5} />
          </span>
        </div>

        <p className="mt-10 inline-flex items-center gap-2 rounded-pill border border-foreground/15 px-3.5 py-1.5 text-mono-caption uppercase tracking-widest text-foreground/80">
          <span className="status-dot" aria-hidden />
          {eyebrow} · Coming soon
        </p>

        <h1 className="mt-6 max-w-[48rem] text-center text-headline-display text-foreground">{title}</h1>
        <p className="mt-5 max-w-[36rem] text-center text-body-lg text-muted-foreground">{description}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(notifySubject)}`}
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-foreground/20 bg-foreground/[0.08] px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.12]"
          >
            <Mail aria-hidden className="size-4" />
            Notify me
            <ArrowUpRight aria-hidden className="size-4 text-foreground/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/15 px-6 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back home
          </Link>
        </div>

        {/* What to expect */}
        <ul className="mt-16 grid w-full max-w-[56rem] grid-cols-1 gap-3 tablet:grid-cols-3">
          {teasers.map((teaser, i) => (
            <li key={teaser.title} className="rounded-2xl border border-foreground/15 p-5">
              <span className="text-mono-caption text-foreground/40">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 text-label-lg text-foreground">{teaser.title}</h2>
              <p className="mt-1.5 text-body-md text-muted-foreground">{teaser.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
