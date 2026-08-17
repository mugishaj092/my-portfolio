"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"

import { CircuitCard } from "@/components/ui/circuit-card"
import { PROJECTS } from "@/constant/resume"

const EASE = [0.16, 1, 0.3, 1] as const
const MAX_VISIBLE_TECH = 3

/** Homepage projects grid: one CircuitCard per entry in PROJECTS
 * (constant/resume.ts) — add a project there and it shows up here,
 * no JSX changes needed. */
export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="projects"
      className="container-app scroll-mt-24 pb-section-mobile tablet:pb-section-tablet desktop:pb-section-desktop"
    >
      <motion.h2
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-headline-lg text-foreground"
      >
        Projects
      </motion.h2>

      <motion.p
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        className="mt-3 max-w-prose text-body-lg text-muted-foreground"
      >
        A few things I&apos;ve built recently.
      </motion.p>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
        className="mt-10 grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3"
      >
        {PROJECTS.map((project) => (
          <CircuitCard key={project.name} liveUrl={project.liveUrl} githubUrl={project.githubUrl}>
            <div className="relative mb-3 h-40 overflow-hidden rounded-lg bg-muted/40">
              <Image
                src={project.image}
                alt={`${project.name} logo`}
                fill
                sizes="320px"
                className={
                  project.imageFit === "cover" ? "object-cover" : "object-contain p-8"
                }
              />
            </div>
            <h3 className="text-headline-sm text-foreground">{project.name}</h3>
            <p className="mt-2 line-clamp-2 text-body-sm text-muted-foreground">
              {project.description}
            </p>
            {project.techStack && project.techStack.length > 0 && (
              <div className="mt-4 flex flex-nowrap gap-2">
                {project.techStack.slice(0, MAX_VISIBLE_TECH).map((tech) => (
                  <span
                    key={tech}
                    className="shrink-0 rounded-pill border border-border px-2.5 py-1 text-mono-caption text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > MAX_VISIBLE_TECH && (
                  <span className="group/tooltip relative shrink-0">
                    <span className="cursor-default rounded-pill border border-border px-2.5 py-1 text-mono-caption text-muted-foreground">
                      +{project.techStack.length - MAX_VISIBLE_TECH}
                    </span>
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-48 -translate-x-1/2 rounded-lg bg-foreground px-3 py-1.5 text-mono-caption text-background opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100"
                    >
                      {project.techStack.slice(MAX_VISIBLE_TECH).join(", ")}
                    </span>
                  </span>
                )}
              </div>
            )}
          </CircuitCard>
        ))}
      </motion.div>
    </section>
  )
}
