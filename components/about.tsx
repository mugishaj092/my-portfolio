"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronDown } from "lucide-react"

import PortraitLogo from "@/components/PortraitLogo"
import { SkillsMarquee } from "@/components/skills-marquee"
import { Button } from "@/components/ui/button"
import { ABOUT } from "@/constant/resume"

const EASE = [0.16, 1, 0.3, 1] as const

const TEXT_FADE_MASK =
  "linear-gradient(to bottom, black 60%, transparent 100%)"

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)

  function rise(delay = 0) {
    return {
      initial: prefersReducedMotion ? false : { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.6, delay, ease: EASE },
    }
  }

  const [firstParagraph, ...restParagraphs] = ABOUT.paragraphs

  return (
    <section
      id="about"
      className="container-app scroll-mt-24 pb-section-mobile tablet:pb-section-tablet desktop:pb-section-desktop"
    >
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 scale-105 rounded-full bg-primary/8 blur-3xl"
        />

        <div className="grid grid-cols-1 items-center gap-10 desktop:grid-cols-12 desktop:gap-16">
          <motion.div
            {...rise()}
            className="hidden text-foreground tablet:mx-auto tablet:block desktop:order-2 desktop:col-span-5 desktop:mx-0 desktop:justify-self-center"
          >
            <PortraitLogo className="h-72 w-72" />
          </motion.div>

          <div className="desktop:order-1 desktop:col-span-7">
            <motion.h2
              {...rise(0.08)}
              className="text-headline-lg text-foreground"
            >
              {ABOUT.title}
            </motion.h2>

            <motion.div
              {...rise(0.2)}
              style={
                expanded
                  ? undefined
                  : {
                      maskImage: TEXT_FADE_MASK,
                      WebkitMaskImage: TEXT_FADE_MASK,
                    }
              }
              className="mt-8 flex max-w-prose flex-col gap-5 text-body-lg text-muted-foreground"
            >
              <p>{firstParagraph}</p>

              <AnimatePresence initial={false}>
                {expanded &&
                  restParagraphs.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
              </AnimatePresence>
            </motion.div>

            <Button
              variant="ghost"
              onClick={() => setExpanded((value) => !value)}
              className="mt-4 gap-1.5 px-0 text-label-lg text-foreground hover:bg-transparent hover:underline"
            >
              {expanded ? "Read less" : "Read more"}
              <ChevronDown
                aria-hidden
                className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </Button>
          </div>
        </div>

        <motion.div {...rise(0.32)} className="mt-14">
          <SkillsMarquee />
        </motion.div>
      </div>
    </section>
  )
}
