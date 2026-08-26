"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { SiGithub } from "react-icons/si"

import { scrollToHash } from "@/lib/scroll-to-hash"
import { CONTACT_INFO } from "@/constant/resume"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "GitHub", href: "/#github" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="container-app flex flex-col items-center gap-6 py-8 tablet:flex-row tablet:justify-between">
        <p className="text-body-sm text-muted-foreground">
          © {year} {CONTACT_INFO.name}
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => scrollToHash(event, link.href)}
              className="text-body-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            aria-label="Email"
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            <Mail aria-hidden className="size-4" />
          </a>
          {CONTACT_INFO.githubUrl && (
            <a
              href={CONTACT_INFO.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              <SiGithub aria-hidden className="size-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
