import Image from "next/image";
import { BadgeCheck, MapPin } from "lucide-react";

import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon";
import { CircuitCard } from "@/components/ui/circuit-card";
import { cn } from "@/lib/utils";
import { ExpandableText } from "@/components/ui/expandable-text";
import { TechOverflowBadge } from "@/components/ui/tech-overflow-badge";
import {
  formatMonth,
  getIssuer,
  sortedCertificates,
  type Certificate,
  type Issuer,
} from "@/constant/certifications";

const MAX_VISIBLE_SKILLS = 2;
const HERO_BG_FADE = "linear-gradient(to bottom, black 70%, transparent 100%)";

/** Issuer logo: image file first, then brand icon, then the issuer's first letter. */
function IssuerLogo({
  issuer,
  className,
}: {
  issuer: Issuer;
  className: string;
}) {
  const Icon = issuer.icon;
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-background/60 text-foreground ${className}`}
    >
      {issuer.logo ? (
        <Image
          src={issuer.logo}
          alt={`${issuer.name} logo`}
          fill
          sizes="96px"
          className="object-contain p-1.5"
        />
      ) : Icon ? (
        <Icon aria-hidden className="size-1/2" />
      ) : (
        <span aria-hidden className="text-label-lg">
          {issuer.name.charAt(0).toUpperCase()}
        </span>
      )}
    </span>
  );
}

/** Same anatomy as the Projects cards: image on top, title, short copy, tag chips,
 * and a hover-revealed button for the credential link. */
function CertificateCard({ cert }: { cert: Certificate }) {
  const skills = cert.skills ?? [];
  const issuer = getIssuer(cert.issuer);

  return (
    <CircuitCard
      containerClassName="h-full"
      className="flex h-full flex-col"
      liveUrl={cert.credentialUrl}
      liveLabel="View credential"
      downloadUrl={cert.downloadUrl}
      downloadLabel="Download certificate"
    >
      {/* Fixed aspect ratio so every preview is the same size, whatever the scan's shape */}
      <div className="relative mb-3 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg bg-muted/40 ring-1 ring-inset ring-border/60">
        {cert.image ? (
          <Image
            src={cert.image}
            alt={`${cert.title} certificate`}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "transition-transform duration-500 ease-out group-hover:scale-[1.03]",
              cert.imageFit === "cover" ? "object-cover" : "object-contain p-8"
            )}
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-foreground/70">
            <IssuerLogo issuer={issuer} className="size-16" />
            <span className="text-mono-caption uppercase tracking-widest">
              {issuer.name}
            </span>
          </div>
        )}

        {/* Visible on touch too, where the hover-only action buttons can't be reached */}
        {cert.credentialId && (
          <span className="glass absolute bottom-2.5 left-2.5 inline-flex max-w-[calc(100%-1.25rem)] items-center gap-1.5 rounded-pill px-2.5 py-1 text-mono-caption text-foreground backdrop-blur-(--backdrop-blur)">
            <BadgeCheck aria-hidden className="size-3.5 shrink-0" />
            <span className="truncate">{cert.credentialId}</span>
          </span>
        )}
      </div>

      {/* Title and description always reserve two lines, so one-line and two-line cards
          keep their chips and footer on the same baseline. */}
      <h3
        title={cert.title}
        className="line-clamp-2 min-h-[2lh] text-[15px] leading-5 font-medium text-foreground"
      >
        {cert.title}
      </h3>
      <ExpandableText
        text={cert.description}
        className="mt-1 text-[12.5px] leading-[18px] text-muted-foreground"
      />

      {/* Fixed-height row: stays reserved with zero skills; chips truncate instead of wrapping */}
      <div className="mt-3 mb-4 flex h-7 min-w-0 flex-nowrap items-center gap-2">
        {skills.slice(0, MAX_VISIBLE_SKILLS).map((skill) => (
          <span
            key={skill}
            title={skill}
            className="inline-flex h-7 min-w-0 max-w-[45%] items-center rounded-pill border border-border px-2.5 text-mono-caption text-muted-foreground"
          >
            <span className="truncate">{skill}</span>
          </span>
        ))}
        {skills.length > MAX_VISIBLE_SKILLS && (
          <TechOverflowBadge items={skills.slice(MAX_VISIBLE_SKILLS)} />
        )}
      </div>

      {/* Issuer + date on the left, location on the right; pinned to the bottom so cards line up */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <IssuerLogo issuer={issuer} className="size-9" />
          <div className="min-w-0">
            <p className="truncate text-label-sm text-foreground/80">
              {issuer.name}
            </p>
            <p className="text-mono-caption text-muted-foreground">
              {formatMonth(cert.issued)}
              {cert.expires && <span> – {formatMonth(cert.expires)}</span>}
            </p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-mono-caption text-muted-foreground">
          <MapPin aria-hidden className="size-3.5" />
          {cert.location ?? "Online"}
        </span>
      </div>
    </CircuitCard>
  );
}

export function CertificationsPage() {
  const certificates = sortedCertificates();
  const issuerNames = [...new Set(certificates.map((c) => c.issuer))];
  const latest = certificates[0];

  const stats = [
    {
      label: "Certificates",
      value: String(certificates.length).padStart(2, "0"),
    },
    { label: "Issuers", value: String(issuerNames.length).padStart(2, "0") },
    { label: "Latest", value: latest ? formatMonth(latest.issued) : "—" },
  ];

  return (
    <main className="relative isolate flex flex-1 flex-col overflow-hidden">
      {/* Same hexagon backdrop as the home hero, fading out toward the bottom */}
      <HexagonBackground
        aria-hidden
        hexagonSize={90}
        className="absolute inset-0 -z-20"
        style={{ maskImage: HERO_BG_FADE, WebkitMaskImage: HERO_BG_FADE }}
      />

      <section className="container-app pt-28 pb-section-mobile tablet:pt-36 tablet:pb-section-tablet desktop:pb-section-desktop">
        <header className="flex flex-col gap-5 tablet:flex-row tablet:items-end tablet:justify-between">
          <div>
            <h1 className="text-headline-lg text-foreground">Certifications</h1>
            <p className="mt-2 max-w-[36rem] text-body-md text-muted-foreground">
              Skills, verified — credentials and continuous learning.
            </p>
          </div>

          <dl className="flex flex-wrap items-center gap-2">
            {stats.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-baseline gap-2 rounded-pill border border-foreground/15 bg-foreground/[0.03] px-3.5 py-1.5"
              >
                <dd className="text-label-lg text-foreground">{value}</dd>
                <dt className="text-mono-caption uppercase tracking-widest text-foreground/55">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </header>

        <div
          aria-hidden
          className="mt-6 h-px bg-gradient-to-r from-foreground/25 via-foreground/10 to-transparent"
        />

        <ul className="mt-6 grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
          {certificates.map((cert) => (
            <li key={`${cert.issuer}-${cert.title}`} className="h-full">
              <CertificateCard cert={cert} />
            </li>
          ))}
        </ul>

        {certificates.length === 0 && (
          <p className="mt-10 rounded-3xl border border-dashed border-foreground/20 p-10 text-center text-body-md text-muted-foreground">
            No certificates yet. Add one in constant/certifications.ts.
          </p>
        )}
      </section>
    </main>
  );
}
