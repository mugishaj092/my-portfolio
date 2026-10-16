import type { Metadata } from "next"
import { BookOpen } from "lucide-react"

import { ComingSoon } from "@/components/coming-soon"

export const metadata: Metadata = {
  title: "Guestbook — Mugisha Joseph",
  description: "Leave a note for the portfolio, coming soon.",
}

export default function GuestbookPage() {
  return (
    <ComingSoon
      eyebrow="Guestbook"
      title="Leave your mark."
      description="A place for visitors to say hello, share feedback, or just let me know they stopped by. It's being built right now."
      icon={BookOpen}
      notifySubject="Notify me when the guestbook launches"
      teasers={[
        { title: "Sign the wall", text: "Leave a short message with your name." },
        { title: "Read the notes", text: "See what other visitors have written." },
        { title: "Stay in touch", text: "Add a link so we can connect afterwards." },
      ]}
    />
  )
}
