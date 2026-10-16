import type { Metadata } from "next"
import { PenLine } from "lucide-react"

import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Blog — Mugisha Joseph",
  description: "Notes on building software, coming soon.",
}

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Blog"
      title="Words are being written."
      description="I'm putting together notes on building products with React, Next.js and FastAPI — what worked, what broke, and what I'd do differently."
      icon={PenLine}
      notifySubject="Notify me when the blog launches"
      teasers={[
        { title: "Engineering notes", text: "Practical write-ups from real projects and production apps." },
        { title: "Lessons learned", text: "Honest takes on mistakes, trade-offs and decisions." },
        { title: "Guides & snippets", text: "Short, useful references you can copy and use." },
      ]}
    />
  )
}
