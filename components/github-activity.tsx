"use client"

import type { CSSProperties } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, Code2, Flame, GitCommitHorizontal } from "lucide-react"
import { SiGithub } from "react-icons/si"

import type { GithubActivityData } from "@/types/github"

const EASE = [0.16, 1, 0.3, 1] as const

/** Sequential ramp, one hue (foreground — white in dark mode, ink in light
 * mode) light -> dark — magnitude, not identity. */
const LEVEL_CLASSNAMES = [
  "bg-foreground/8",
  "bg-foreground/25",
  "bg-foreground/45",
  "bg-foreground/70",
  "bg-foreground",
] as const

function levelFor(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (max <= 1) return 4
  const ratio = count / max
  if (ratio > 0.75) return 4
  if (ratio > 0.5) return 3
  if (ratio > 0.25) return 2
  return 1
}

function formatCellTitle(date: string, count: number) {
  const label = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
  return `${count} contribution${count === 1 ? "" : "s"} on ${label}`
}

const CELL_CLASSNAME = "size-2.75 rounded-xs"

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const

/** Each week is one column, evenly dividing the available width — the
 * calendar scales to fit the card instead of overflowing it. */
function gridColumns(count: number): CSSProperties {
  return { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }
}

function MonthLabels({
  weeks,
}: {
  weeks: GithubActivityData["contributionWeeks"]
}) {
  const months = weeks.map((week) => {
    const firstDay = week.find((day) => day !== null)
    return firstDay ? new Date(firstDay.date).getUTCMonth() : null
  })

  return (
    <div aria-hidden className="grid gap-0.75" style={gridColumns(weeks.length)}>
      {months.map((month, weekIndex) => (
        <div key={weekIndex}>
          {month !== null && month !== months[weekIndex - 1] && (
            <span className="block -translate-y-px whitespace-nowrap text-mono-caption text-muted-foreground">
              {MONTH_LABELS[month]}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function ContributionCalendar({
  weeks,
}: {
  weeks: GithubActivityData["contributionWeeks"]
}) {
  const max = Math.max(1, ...weeks.flat().map((day) => day?.count ?? 0))

  return (
    <div className="flex flex-col gap-1.5">
      {/* Below tablet width, 50+ weeks can't shrink to fit without the
       * cells becoming illegibly small — so the calendar keeps a
       * comfortable minimum size and scrolls horizontally on mobile,
       * then drops the floor and fits the card exactly from tablet up. */}
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-150 flex-col gap-1.5 tablet:min-w-0">
          <MonthLabels weeks={weeks} />

          <div aria-hidden className="grid gap-0.75" style={gridColumns(weeks.length)}>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-0.75">
                {week.map((day, dayIndex) =>
                  day ? (
                    <div
                      key={day.date}
                      title={formatCellTitle(day.date, day.count)}
                      className={`aspect-square w-full rounded-xs ${LEVEL_CLASSNAMES[levelFor(day.count, max)]}`}
                    />
                  ) : (
                    <div key={dayIndex} className="aspect-square w-full rounded-xs" />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 pt-1">
        <span className="text-mono-caption text-muted-foreground">Less</span>
        {LEVEL_CLASSNAMES.map((levelClassName, level) => (
          <div key={level} className={`${CELL_CLASSNAME} ${levelClassName}`} />
        ))}
        <span className="text-mono-caption text-muted-foreground">More</span>
      </div>
    </div>
  )
}

export interface GithubActivityProps {
  data: GithubActivityData | null
}

/** Homepage GitHub Activity section: a live contribution calendar plus
 * repo/language/follower stats pulled from the GitHub GraphQL API (see
 * lib/github.ts). Renders nothing if the API call failed or no token is
 * configured — no placeholder numbers ever show. */
export function GithubActivity({ data }: GithubActivityProps) {
  const prefersReducedMotion = useReducedMotion()

  if (!data) return null

  function rise(delay = 0) {
    return {
      initial: prefersReducedMotion ? false : { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.6, delay, ease: EASE },
    }
  }

  const stats = [
    { label: "Contributions", value: data.totalContributions, Icon: GitCommitHorizontal },
    { label: "Day streak", value: data.dayStreak, Icon: Flame },
    { label: "Languages", value: data.languageCount, Icon: Code2 },
  ]

  return (
    <section
      id="github"
      className="container-app scroll-mt-24 pb-section-mobile tablet:pb-section-tablet desktop:pb-section-desktop"
    >
      <motion.h2 {...rise()} className="text-headline-lg text-foreground">
        GitHub Activity
      </motion.h2>

      <motion.p
        {...rise(0.08)}
        className="mt-3 max-w-prose text-body-lg text-muted-foreground"
      >
        Building consistently, one commit at a time. Explore my coding
        activity, open-source contributions, and the projects I&apos;m
        actively working on.
      </motion.p>

      <motion.div {...rise(0.16)} className="mt-10">
        <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-4 tablet:p-5 desktop:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SiGithub aria-hidden className="size-4 text-foreground/70" />
              <p className="text-label-lg text-foreground">
                Contributions in the last year
              </p>
            </div>
            <span className="text-mono-caption text-muted-foreground">
              {data.totalContributions.toLocaleString()} total
            </span>
          </div>

          <ContributionCalendar weeks={data.contributionWeeks} />

          <div className="grid grid-cols-2 gap-2.5 border-t border-border pt-5 tablet:grid-cols-4">
            {stats.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="group flex gap-3 rounded-lg border border-border bg-foreground/2 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-foreground/4"
              >
                <span className="flex aspect-square shrink-0 items-center justify-center rounded-md border border-border bg-foreground/8 text-foreground transition-colors group-hover:border-foreground/30 group-hover:bg-foreground/12">
                  <Icon aria-hidden className="size-4" />
                </span>
                <div>
                  <p className="text-headline-sm text-foreground">
                    {value.toLocaleString()}
                  </p>
                  <p className="mt-1 text-mono-caption text-muted-foreground">
                    {label}
                  </p>
                </div>
              </div>
            ))}

            <a
              href={data.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative col-span-2 overflow-hidden rounded-lg border border-border bg-foreground/2 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-foreground/4 tablet:col-span-1"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-foreground/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <span aria-hidden className="absolute right-3 top-3 size-8">
                <span className="absolute inset-0 rounded-md bg-foreground/50 motion-safe:animate-[pulse-tight_1.8s_ease-out_infinite]" />
                <span className="relative flex size-8 items-center justify-center rounded-md bg-foreground text-background ">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>

              <div className="relative flex items-center gap-3 pr-9">
                <SiGithub aria-hidden className="size-5 shrink-0 text-foreground" />
                <div>
                  <p className="text-label-lg text-foreground">
                    @{data.username}
                  </p>
                  <p className="mt-1 text-mono-caption text-muted-foreground">
                    Click to view profile
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default GithubActivity
