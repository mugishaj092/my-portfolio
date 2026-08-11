import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ExperienceList } from "@/components/experience";
import { GlassCard } from "@/components/ui/glass-card";
import { TechChip } from "@/components/ui/tech-chip";
import { TECH_ICONS } from "@/components/ui/tech-icons";
import {
  CERTIFICATIONS,
  EDUCATION,
  REFERENCES,
  SKILLS,
  SUMMARY,
} from "@/constant/resume";

export const metadata: Metadata = {
  title: "Resume — Mugisha Joseph",
  description:
    "Full experience, skills, certifications, and education for Joseph Mugisha, a full-stack and mobile developer.",
};

export default function ResumePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="container-app pt-32 pb-section-mobile tablet:pt-40 tablet:pb-section-tablet desktop:pt-48 desktop:pb-section-desktop">
        <Link
          href="/#about"
          className="inline-flex items-center gap-1.5 text-label-lg text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back
        </Link>

        <h1 className="mt-6 max-w-3xl text-headline-display text-foreground">
          Experience &amp; background
        </h1>
        <p className="mt-6 max-w-prose text-body-lg text-muted-foreground">
          {SUMMARY}
        </p>

        <div className="mt-16">
          <h2 className="text-headline-md text-foreground">Experience</h2>
          <div className="mt-6">
            <ExperienceList />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-headline-md text-foreground">Skills</h2>
          <div className="mt-6 flex flex-col gap-6">
            {SKILLS.map((group) => (
              <div key={group.category}>
                <h3 className="text-label-lg text-muted-foreground">
                  {group.category}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {group.items.map((item) => {
                    const Icon = TECH_ICONS[item];
                    return (
                      <TechChip key={item}>
                        {Icon && <Icon aria-hidden />}
                        {item}
                      </TechChip>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 tablet:grid-cols-2">
          <div>
            <h2 className="text-headline-md text-foreground">
              Certifications
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {CERTIFICATIONS.map((cert) => (
                <GlassCard key={cert.title} className="p-5">
                  <p className="text-label-lg text-foreground">
                    {cert.title}
                  </p>
                  <p className="mt-1 text-body-sm text-muted-foreground">
                    {cert.issuer} · {cert.date}
                    {cert.location ? ` · ${cert.location}` : ""}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-headline-md text-foreground">Education</h2>
            <div className="mt-6 flex flex-col gap-4">
              {EDUCATION.map((entry) => (
                <GlassCard key={entry.institution} className="p-5">
                  <p className="text-label-lg text-foreground">
                    {entry.degree}
                  </p>
                  <p className="mt-1 text-body-sm text-muted-foreground">
                    {entry.institution} · {entry.date} · {entry.location}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-headline-md text-foreground">References</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 tablet:grid-cols-2">
            {REFERENCES.map((reference) => (
              <GlassCard key={reference.name} className="p-5">
                <p className="text-label-lg text-foreground">
                  {reference.name}
                </p>
                <p className="mt-1 text-body-sm text-muted-foreground">
                  {reference.role} · {reference.company}
                </p>
                {reference.contactAvailable && (
                  <p className="mt-3 flex items-center gap-2 text-mono-caption text-muted-foreground">
                    <span aria-hidden className="status-dot" />
                    Contact available on request
                  </p>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
