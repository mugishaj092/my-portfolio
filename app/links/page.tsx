import type { Metadata } from "next"

import { LinksPage } from "@/components/links-page"

export const metadata: Metadata = {
  title: "Links — Mugisha Joseph",
  description: "Every place to find and contact Joseph Mugisha: GitHub, LinkedIn, Instagram, WhatsApp, email, portfolio and resume.",
}

export default function Page() {
  return <LinksPage />
}
