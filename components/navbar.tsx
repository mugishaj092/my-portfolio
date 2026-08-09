"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, Search } from "lucide-react"

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

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
]

const moreLinks = [
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
          <div className="glass-nav flex items-center gap-0.5 rounded-pill px-1.5 py-1.5 text-label-lg backdrop-blur-(--nav-blur) backdrop-saturate-[1.8]">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-pill px-3.5 py-1.5 text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-pill border border-glass-border px-3.5 py-1.5 text-foreground/80 outline-none transition-colors hover:text-foreground aria-expanded:text-foreground"
                  />
                }
              >
                More
                <ChevronDown className="size-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {moreLinks.map((link) => (
                  <DropdownMenuItem
                    key={link.href}
                    render={<Link href={link.href} />}
                  >
                    {link.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            href="/contact"
            className="rounded-pill border border-glass-border bg-secondary px-5 py-2.5 text-label-lg text-secondary-foreground transition-colors hover:bg-muted"
          >
            Book a Call
          </Link>

          <div className="relative">
            <div aria-hidden className={glowOrbClassName} />
            <Button
              variant="glass"
              size="icon"
              className={glassOrbButtonClassName}
              aria-label="Search"
            >
              <Search className="size-4" />
            </Button>
          </div>
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
                  render={<Link href={link.href} />}
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
