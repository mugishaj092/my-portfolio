import type { Metadata } from "next"
import { Award } from "lucide-react"

import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Certifications — Mugisha Joseph",
  description: "Credentials and continuous learning, coming soon.",
}

export default function CertificationsPage() {
  return (
    <ComingSoon
      eyebrow="Certifications"
      title="Always learning."
      description="Verified credentials and continuous learning, each with its issuer, completion date and a link you can check."
      icon={Award}
      notifySubject="Notify me when the certifications page launches"
      teasers={[
        { title: "Verified credentials", text: "Certificates you can check at the source." },
        { title: "Issuer & date", text: "Who issued each one and when it was completed." },
        { title: "Credential links", text: "Direct links to verify every certificate." },
      ]}
    />
  )
}
