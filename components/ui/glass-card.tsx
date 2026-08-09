import * as React from "react"

import { cn } from "@/lib/utils"

function GlassCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-card"
      className={cn(
        "glass glass-shadow rounded-lg p-4 tablet:p-5 desktop:p-6",
        className
      )}
      {...props}
    />
  )
}

export { GlassCard }
