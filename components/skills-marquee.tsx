"use client"

import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee"
import { TECH_ICONS } from "@/components/ui/tech-icons"
import { SKILLS } from "@/constant/resume"

const ALL_SKILLS = SKILLS.flatMap((group) => group.items)
const MIDPOINT = Math.ceil(ALL_SKILLS.length / 2)
const ROW_ONE = ALL_SKILLS.slice(0, MIDPOINT)
const ROW_TWO = ALL_SKILLS.slice(MIDPOINT)

function SkillRow({
  items,
  direction,
}: {
  items: string[]
  direction: "left" | "right"
}) {
  return (
    <Marquee>
      <MarqueeContent direction={direction} speed={28}>
        {items.map((skill) => {
          const Icon = TECH_ICONS[skill]
          return (
            <MarqueeItem
              key={skill}
              className="mx-6 flex items-center gap-2.5 text-foreground"
            >
              {Icon && <Icon aria-hidden className="size-7" />}
              <span className="text-headline-sm">{skill}</span>
            </MarqueeItem>
          )
        })}
      </MarqueeContent>
    </Marquee>
  )
}

export function SkillsMarquee() {
  return (
    <div className="flex flex-col gap-4">
      <SkillRow items={ROW_ONE} direction="left" />
      <SkillRow items={ROW_TWO} direction="right" />
    </div>
  )
}
