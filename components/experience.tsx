"use client"

import { useState } from "react"
import Image, { type StaticImageData } from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronDown, ExternalLink, Plus } from "lucide-react"
import { SiAndela } from "react-icons/si"

import cmfLogo from "@/assets/image/cmf_logo.png"
import posinnoveLogo from "@/assets/image/posinnove_tech_logo.jpeg"
import { GlassCard } from "@/components/ui/glass-card"
import { TECH_ICONS, type TechIcon } from "@/components/ui/tech-icons"
import { EXPERIENCE } from "@/constant/resume"

const EASE = [0.16, 1, 0.3, 1] as const

type CompanyLogo =
  | { kind: "image"; src: StaticImageData; background?: boolean }
  | { kind: "icon"; Icon: TechIcon }

/** Real, verified marks only — Andela's is a maintained brand icon;
 * Posinnove and Children Might Foundation don't exist in any icon library,
 * so their actual logo files are used instead. No company here gets a
 * fabricated or guessed mark. */
const COMPANY_LOGOS: Record<string, CompanyLogo> = {
  "Children Might Foundation": {
    kind: "image",
    src: cmfLogo,
    background: false,
  },
  Posinnove: { kind: "image", src: posinnoveLogo },
  Andela: { kind: "icon", Icon: SiAndela },
}

function entryKey(role: string, company: string) {
  return `${company}-${role}`
}

function CompanyBadge({ company }: { company: string }) {
  const logo = COMPANY_LOGOS[company]

  if (logo?.kind === "image") {
    const bgClass = logo.background === false ? "" : "bg-white"
    return (
      <span
        aria-hidden
        className={`relative flex size-12 shrink-0 overflow-hidden rounded-pill border border-border ${bgClass}`}
      >
        <Image
          src={logo.src}
          alt=""
          fill
          sizes="48px"
          className="object-contain p-1.5"
        />
      </span>
    )
  }

  if (logo?.kind === "icon") {
    const Icon = logo.Icon
    return (
      <span
        aria-hidden
        className="flex size-12 shrink-0 items-center justify-center rounded-pill border border-border bg-background"
      >
        <Icon className="size-5 text-foreground" />
      </span>
    )
  }

  return (
    <span
      aria-hidden
      className="flex size-12 shrink-0 items-center justify-center rounded-pill border border-border bg-background text-label-lg text-foreground"
    >
      {company.charAt(0)}
    </span>
  )
}

/** The reusable timeline: a connecting spine + node per role, each opening
 * to its highlights. Used standalone on the resume page (under that page's
 * own heading) and inside `ExperienceSection` on the homepage. */
export function ExperienceList() {
  const prefersReducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState<string | null>(
    entryKey(EXPERIENCE[0].role, EXPERIENCE[0].company)
  )

  return (
    <div className="flex flex-col">
      {EXPERIENCE.map((job, index) => {
        const key = entryKey(job.role, job.company)
        const isOpen = expanded === key
        const isLast = index === EXPERIENCE.length - 1

        return (
          <motion.div
            key={key}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: EASE }}
            className="flex gap-4 tablet:gap-6"
          >
            <div className="flex w-12 shrink-0 flex-col items-center">
              <CompanyBadge company={job.company} />
              {!isLast && (
                <span aria-hidden className="mt-2 w-px flex-1 bg-border/60" />
              )}
            </div>

            <GlassCard className="mb-4 flex-1 p-5 transition-colors hover:border-glass-highlight tablet:p-6">
              <div className="flex flex-col gap-1 tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-4">
                <div>
                  <h3 className="text-headline-sm text-foreground">
                    {job.role}
                  </h3>
                  <p className="flex flex-wrap items-center gap-x-1.5 text-body-sm text-muted-foreground">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 underline-offset-2 hover:text-foreground hover:underline"
                      >
                        {job.company}
                        <ExternalLink aria-hidden className="size-3" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        {job.company}
                        <span
                          title="Add this company's URL in constant/resume.ts"
                          className="inline-flex items-center gap-0.5 rounded-pill border border-dashed border-border px-1.5 py-0.5 text-mono-caption text-muted-foreground/70"
                        >
                          <Plus aria-hidden className="size-2.5" />
                          link
                        </span>
                      </span>
                    )}
                    <span>· {job.location}</span>
                  </p>
                </div>

                <span className="shrink-0 rounded-pill border border-border px-2.5 py-1 text-mono-caption text-muted-foreground">
                  {job.startDate} — {job.endDate}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : key)}
                className="mt-3 flex items-center gap-1.5 text-label-lg text-foreground transition-colors hover:text-muted-foreground"
              >
                {isOpen ? "Show less" : "Show more"}
                <ChevronDown
                  aria-hidden
                  className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 flex flex-col gap-2">
                      {job.highlights.map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-body-md text-muted-foreground"
                        >
                          <span
                            aria-hidden
                            className="mt-2.5 size-1 shrink-0 rounded-pill bg-foreground/40"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {job.techStack && job.techStack.length > 0 ? (
                        job.techStack.map((tech) => {
                          const Icon = TECH_ICONS[tech]
                          return (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-1.5 rounded-pill border border-border px-2.5 py-1 text-mono-caption text-muted-foreground"
                            >
                              {Icon && <Icon aria-hidden className="size-3" />}
                              {tech}
                            </span>
                          )
                        })
                      ) : (
                        <span
                          title="Add this role's tech stack in constant/resume.ts"
                          className="inline-flex items-center gap-1 rounded-pill border border-dashed border-border px-2.5 py-1 text-mono-caption text-muted-foreground/70"
                        >
                          <Plus aria-hidden className="size-2.5" />
                          Add tech stack
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        )
      })}
    </div>
  )
}

/** Full homepage section: eyebrow-free heading + the timeline, matching the
 * About section's rhythm and heading scale. */
export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="experience"
      className="container-app scroll-mt-24 pb-section-mobile tablet:pb-section-tablet desktop:pb-section-desktop"
    >
      <motion.h2
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-headline-lg text-foreground"
      >
        Experience
      </motion.h2>

      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        className="mt-3 max-w-prose text-body-lg text-muted-foreground"
      >
        Roles I&apos;ve shipped production work in, across hospitality,
        education, and nonprofit sectors.
      </motion.p>

      <div className="mt-10">
        <ExperienceList />
      </div>
    </section>
  )
}
