"use client"

import Link from "next/link"
import Image from "next/image"

import logoLight from "@/assets/logo-light.svg"
import logoDark from "@/assets/logo-dark.svg"
import { NavDesktop } from "@/components/nav-desktop"
import { NavMobile } from "@/components/nav-mobile"

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
]

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

        <NavMobile links={primaryLinks} />
      </div>
    </header>
  )
}
