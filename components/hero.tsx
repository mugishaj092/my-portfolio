"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { FolderGit2, Hand, LaptopMinimal } from "lucide-react"

import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon"
import { Button } from "@/components/ui/button"
import { CodeTypewriter, type CodeLine } from "@/components/ui/code-typewriter"
import { LiquidGlassPanel } from "@/components/ui/liquid-glass-panel"
import { RunProfileButton } from "@/components/ui/run-profile-button"
import { CONTACT_INFO, TAGLINE } from "@/constant/resume"

const syntax = {
  comment: "text-neutral-500 italic",
  keyword: "text-fuchsia-700 dark:text-fuchsia-400",
  component: "text-amber-700 dark:text-amber-300",
  variable: "text-sky-700 dark:text-sky-300",
  prop: "text-sky-700 dark:text-sky-300",
  string: "text-emerald-700 dark:text-emerald-300",
  punctuation: "text-neutral-600 dark:text-neutral-400",
}

const EASE = [0.16, 1, 0.3, 1] as const
const HERO_BG_FADE = "linear-gradient(to bottom, black 70%, transparent 100%)"

const codeLines: CodeLine[] = [
  [{ text: "// Welcome to my workspace", className: syntax.comment }],
  [
    { text: "import", className: syntax.keyword },
    { text: " { ", className: syntax.punctuation },
    { text: "Developer", className: syntax.component },
    { text: " } ", className: syntax.punctuation },
    { text: "from", className: syntax.keyword },
    { text: " ", className: syntax.punctuation },
    { text: "'./universe'", className: syntax.string },
    { text: ";", className: syntax.punctuation },
  ],
  [],
  [
    { text: "const", className: syntax.keyword },
    { text: " ", className: syntax.punctuation },
    { text: "Portfolio", className: syntax.variable },
    { text: " = () => {", className: syntax.punctuation },
  ],
  [
    { text: "  ", className: syntax.punctuation },
    { text: "return", className: syntax.keyword },
    { text: " (", className: syntax.punctuation },
  ],
  [
    { text: "    <", className: syntax.punctuation },
    { text: "Developer", className: syntax.component },
  ],
  [
    { text: "      name", className: syntax.prop },
    { text: "=", className: syntax.punctuation },
    { text: `"${CONTACT_INFO.name}"`, className: syntax.string },
  ],
  [
    { text: "      role", className: syntax.prop },
    { text: "=", className: syntax.punctuation },
    { text: `"${CONTACT_INFO.title}"`, className: syntax.string },
  ],
  [
    { text: "      location", className: syntax.prop },
    { text: "=", className: syntax.punctuation },
    { text: `"${CONTACT_INFO.location}"`, className: syntax.string },
  ],
  [{ text: "    />", className: syntax.punctuation }],
  [{ text: "  );", className: syntax.punctuation }],
  [{ text: "};", className: syntax.punctuation }],
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Content recedes gently as the visitor scrolls the hero out of view —
  // tracked only across the section's own height, not the whole page.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 50])

  function rise(delay = 0) {
    return {
      initial: prefersReducedMotion ? false : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay, ease: EASE },
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-32 pb-section-mobile tablet:pt-40 tablet:pb-section-tablet desktop:pt-48 desktop:pb-section-desktop"
    >
      <HexagonBackground
        aria-hidden
        hexagonSize={90}
        className="absolute inset-0 -z-20"
        style={{ maskImage: HERO_BG_FADE, WebkitMaskImage: HERO_BG_FADE }}
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { opacity: scrollOpacity, y: scrollY }}
        className="container-app grid grid-cols-1 items-center gap-12 desktop:grid-cols-12"
      >
        <div className="flex flex-col items-start gap-6 desktop:col-span-7">
          <motion.p
            {...rise()}
            className="flex items-center gap-2 text-headline-lg text-foreground/80"
          >
            Hello <Hand aria-hidden className="size-5 -rotate-12" />
          </motion.p>
          <motion.h1
            {...rise(0.08)}
            className="text-headline-display text-foreground"
          >
            I&apos;m {CONTACT_INFO.name}
          </motion.h1>
          <motion.p
            {...rise(0.16)}
            className="flex items-start gap-2 text-headline-sm text-foreground/80"
          >
            <LaptopMinimal aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>
              {CONTACT_INFO.title} · {CONTACT_INFO.location}
            </span>
          </motion.p>
          <motion.p
            {...rise(0.24)}
            className="max-w-prose text-body-lg text-muted-foreground"
          >
            {TAGLINE}
          </motion.p>
          <motion.div {...rise(0.32)}>
            <Button
              render={<a href={`mailto:${CONTACT_INFO.email}`} />}
              nativeButton={false}
              className="h-11 rounded-pill px-6"
            >
              Say Hello
            </Button>
          </motion.div>
        </div>

        <motion.div {...rise(0.2)} className="relative w-full desktop:col-span-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-primary/8 blur-3xl"
          />

          <LiquidGlassPanel>
            <div className="relative flex items-center gap-1.5 border-b border-black/10 px-4 py-3 dark:border-white/10">
              <span className="size-2.5 rounded-pill bg-red-500" />
              <span className="size-2.5 rounded-pill bg-yellow-500" />
              <span className="size-2.5 rounded-pill bg-green-500" />
              <span className="ml-2 text-mono-caption text-neutral-500 dark:text-neutral-400">
                portfolio.tsx
              </span>
            </div>

            <pre className="relative overflow-x-auto px-4 py-4 text-mono-tag">
              <CodeTypewriter lines={codeLines} />
            </pre>

            <div className="relative flex flex-wrap gap-3 border-t border-black/10 px-4 py-4 dark:border-white/10">
              <RunProfileButton />
              <Button
                render={<Link href="/work" />}
                nativeButton={false}
                variant="glass"
                className="h-9 gap-1.5 rounded-pill border-black/15 bg-black/5 px-4 text-neutral-900 hover:bg-black/10 dark:border-white/15 dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10"
              >
                <FolderGit2 />
                View Projects
              </Button>
            </div>
          </LiquidGlassPanel>
        </motion.div>
      </motion.div>
    </section>
  )
}
