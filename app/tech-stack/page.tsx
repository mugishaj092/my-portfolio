import type { Metadata } from "next"
import { Layers } from "lucide-react"

import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Tech Stack — Mugisha Joseph",
  description: "Technologies I use to build software, coming soon.",
}

export default function TechStackPage() {
  return (
    <ComingSoon
      eyebrow="Tech Stack"
      title="The tools behind the work."
      description="A curated look at the technologies I use to build software, grouped by frontend, backend, databases, tooling and infrastructure."
      icon={Layers}
      notifySubject="Notify me when the tech stack page launches"
      teasers={[
        { title: "Frontend & mobile", text: "The interfaces and apps I build every day." },
        { title: "Backend & data", text: "APIs, databases and the services behind them." },
        { title: "Tools & infrastructure", text: "How I ship, test and run software." },
      ]}
    />
  )
}
