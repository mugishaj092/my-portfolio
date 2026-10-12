"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

import logoLight from "@/assets/logo-light.svg"
import logoDark from "@/assets/logo-dark.svg"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavDesktop } from "@/components/nav-desktop"
import { scrollToHash } from "@/lib/scroll-to-hash"

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
]

const moreLinks = [
  { label: "Resume", href: "/resume" },
  { label: "Stack", href: "/stack" },
  { label: "Playground", href: "/playground" },
  { label: "Contact", href: "/contact" },
]

const glowOrbClassName =
  "pointer-events-none absolute inset-0 -z-10 scale-[1.9] rounded-full bg-accent/20 blur-2xl"

const glassOrbButtonClassName = "size-11 rounded-full"

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4 tablet:pt-5 desktop:pt-6">
      <div className="container-app flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Origin home"
          className="flex shrink-0 items-center"
        >
          <Image
            src={logoLight}
            alt="Origin"
            className="block h-8 w-auto dark:hidden"
            priority
          />
          <Image
            src={logoDark}
            alt="Origin"
            className="hidden h-8 w-auto dark:block"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-2 desktop:flex">
          <NavDesktop links={primaryLinks} />
        </nav>

        <div className="relative desktop:hidden">
          <div aria-hidden className={glowOrbClassName} />
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="glass"
                  size="icon"
                  className={glassOrbButtonClassName}
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              {primaryLinks.map((link) => (
                <DropdownMenuItem
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      onClick={(event) => scrollToHash(event, link.href)}
                    />
                  }
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              {moreLinks.map((link) => (
                <DropdownMenuItem
                  key={link.href}
                  render={<Link href={link.href} />}
                >
                  {link.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href="/contact" />}>
                Book a Call
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
