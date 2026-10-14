import { CONTACT_INFO } from "@/constant/resume"

export type LinkGroup = "Social" | "Contact" | "Work"

export type LinkItem = {
  id: string
  label: string
  handle: string
  /** One-line hint shown on the card. */
  blurb: string
  href: string
  group: LinkGroup
  /** Brand colour used for the hover glow. */
  color: string
  external?: boolean
}

const phoneDigits = CONTACT_INFO.phone.replace(/[^\d]/g, "")

export const LINKS: LinkItem[] = [
  { id: "github", label: "GitHub", handle: "mugishaj092", blurb: "Code, side projects and open source", href: CONTACT_INFO.githubUrl ?? "#", group: "Social", color: "#8b949e", external: true },
  { id: "linkedin", label: "LinkedIn", handle: "mugishajoseph", blurb: "Experience and professional network", href: "https://linkedin.com/in/mugishajoseph", group: "Social", color: "#0a66c2", external: true },
  { id: "instagram", label: "Instagram", handle: "mugishajoseph", blurb: "Life beyond the keyboard", href: "https://instagram.com/mugishajoseph", group: "Social", color: "#e1306c", external: true },
  { id: "whatsapp", label: "WhatsApp", handle: CONTACT_INFO.phone, blurb: "The fastest way to reach me", href: `https://wa.me/${phoneDigits}`, group: "Contact", color: "#25d366", external: true },
  { id: "email", label: "Email", handle: CONTACT_INFO.email, blurb: "For work, proposals and hellos", href: `mailto:${CONTACT_INFO.email}`, group: "Contact", color: "#f59e0b" },
  { id: "portfolio", label: "Portfolio", handle: "/#projects", blurb: "Selected projects and case studies", href: "/#projects", group: "Work", color: "#8b5cf6" },
  { id: "resume", label: "Resume", handle: "/resume", blurb: "Full experience, skills and education", href: "/resume", group: "Work", color: "#14b8a6" },
]
