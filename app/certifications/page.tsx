import type { Metadata } from "next"

import { CertificationsPage } from "@/components/certifications-page"

export const metadata: Metadata = {
  title: "Certifications — Mugisha Joseph",
  description: "Credentials and continuous learning: certificates with issuer, date and verification links.",
}

export default function Page() {
  return <CertificationsPage />
}
