import type { MouseEvent } from "react"

/**
 * Smooth-scrolls to an in-page hash target even when the URL already has
 * that hash — a plain <a>/<Link> only scrolls on browsers' native anchor
 * jump when the hash actually changes, so clicking a nav link twice (e.g.
 * "/#about" while already on "/#about") would otherwise do nothing.
 * No-ops (and lets Next.js handle normal navigation) for non-hash links
 * or hash links pointing at a different page.
 */
export function scrollToHash(
  event: MouseEvent<HTMLAnchorElement>,
  href: string
) {
  const hashIndex = href.indexOf("#")
  if (hashIndex === -1) return

  const path = href.slice(0, hashIndex) || "/"
  const hash = href.slice(hashIndex + 1)

  if (window.location.pathname !== path) return

  const target = document.getElementById(hash)
  if (!target) return

  event.preventDefault()
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  })
  window.history.pushState(null, "", href)
}
