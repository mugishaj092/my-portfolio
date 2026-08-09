import Link from "next/link"
import { FolderGit2, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CodeTypewriter, type CodeLine } from "@/components/ui/code-typewriter"
import { LiquidGlassPanel } from "@/components/ui/liquid-glass-panel"
import { CONTACT_INFO, TAGLINE } from "@/constant/resume"

const syntax = {
  comment: "text-neutral-500 italic",
  keyword: "text-fuchsia-400",
  component: "text-amber-300",
  variable: "text-sky-300",
  prop: "text-sky-300",
  string: "text-emerald-300",
  punctuation: "text-neutral-400",
}

const codeLines: CodeLine[] = [
  [{ text: "// Welcome to my workspace", className: syntax.comment }],
  [
    { text: "import", className: syntax.keyword },
    { text: " { ", className: syntax.punctuation },
    { text: "Developer", className: syntax.component },
    { text: " } ", className: syntax.punctuation },
    { text: "from", className: syntax.keyword },
    { text: " ", className: syntax.punctuation },
    { text: "'./universe'", className: syntax.string },
    { text: ";", className: syntax.punctuation },
  ],
  [],
  [
    { text: "const", className: syntax.keyword },
    { text: " ", className: syntax.punctuation },
    { text: "Portfolio", className: syntax.variable },
    { text: " = () => {", className: syntax.punctuation },
  ],
  [
    { text: "  ", className: syntax.punctuation },
    { text: "return", className: syntax.keyword },
    { text: " (", className: syntax.punctuation },
  ],
  [
    { text: "    <", className: syntax.punctuation },
    { text: "Developer", className: syntax.component },
  ],
  [
    { text: "      name", className: syntax.prop },
    { text: "=", className: syntax.punctuation },
    { text: `"${CONTACT_INFO.name}"`, className: syntax.string },
  ],
  [
    { text: "      role", className: syntax.prop },
    { text: "=", className: syntax.punctuation },
    { text: `"${CONTACT_INFO.title}"`, className: syntax.string },
  ],
  [
    { text: "      location", className: syntax.prop },
    { text: "=", className: syntax.punctuation },
    { text: `"${CONTACT_INFO.location}"`, className: syntax.string },
  ],
  [{ text: "    />", className: syntax.punctuation }],
  [{ text: "  );", className: syntax.punctuation }],
  [{ text: "};", className: syntax.punctuation }],
]

export function Hero() {
  return (
    <section className="container-app grid grid-cols-1 items-center gap-12 pt-32 pb-section-mobile tablet:pt-40 tablet:pb-section-tablet desktop:grid-cols-12 desktop:pt-48 desktop:pb-section-desktop">
      <div className="flex flex-col items-start gap-6 desktop:col-span-7">
        <p className="flex items-center gap-2 text-headline-lg text-foreground/80">
          Hello <span aria-hidden>👋</span>
        </p>
        <h1 className="text-headline-display text-foreground">
          I&apos;m {CONTACT_INFO.name}
        </h1>
        <p className="max-w-prose text-body-lg text-muted-foreground">
          A {CONTACT_INFO.title} <span aria-hidden>💻</span> {TAGLINE}
        </p>
        <Button
          render={<Link href="/contact" />}
          nativeButton={false}
          className="h-11 rounded-pill px-6"
        >
          Say Hello
        </Button>
      </div>

      <div className="relative w-full desktop:col-span-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-accent/10 blur-3xl"
        />

        <LiquidGlassPanel>
          <div className="relative flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="size-2.5 rounded-pill bg-red-500" />
            <span className="size-2.5 rounded-pill bg-yellow-500" />
            <span className="size-2.5 rounded-pill bg-green-500" />
            <span className="ml-2 text-mono-caption text-neutral-400">
              portfolio.tsx
            </span>
          </div>

          <pre className="relative overflow-x-auto px-4 py-4 text-mono-tag">
            <CodeTypewriter lines={codeLines} />
          </pre>

          <div className="relative flex flex-wrap gap-3 border-t border-white/10 px-4 py-4">
            <Button
              render={<Link href="/about" />}
              nativeButton={false}
              className="h-9 gap-1.5 rounded-pill px-4"
            >
              <Play />
              Run Profile
            </Button>
            <Button
              render={<Link href="/work" />}
              nativeButton={false}
              variant="glass"
              className="h-9 gap-1.5 rounded-pill border-white/15 bg-white/5 px-4 text-neutral-100 hover:bg-white/10"
            >
              <FolderGit2 />
              View Projects
            </Button>
          </div>
        </LiquidGlassPanel>
      </div>
    </section>
  )
}
