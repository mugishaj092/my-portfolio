"use client"

import Link from "next/link"
import { Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { scrollToHash } from "@/lib/scroll-to-hash"

function RunProfileButton() {
  return (
    <Button
      render={
        <Link
          href="/#about"
          onClick={(event) => scrollToHash(event, "/#about")}
        />
      }
      nativeButton={false}
      className="h-9 gap-1.5 rounded-pill px-4"
    >
      <Play />
      Run Profile
    </Button>
  )
}

export { RunProfileButton }
