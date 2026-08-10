import * as React from "react"

import { cn } from "@/lib/utils"

function TechChip({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="tech-chip"
      className={cn(
        "glass inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-mono-tag text-on-surface backdrop-blur-(--backdrop-blur) backdrop-saturate-[1.6] [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:opacity-80",
        className
      )}
      {...props}
    />
  )
}

export { TechChip }
