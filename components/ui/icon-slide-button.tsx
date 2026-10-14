import type { ComponentProps, ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type IconSlideButtonProps = {
  href: string
  icon?: ReactNode
  children: ReactNode
  className?: string
} & Omit<ComponentProps<"a">, "children" | "className" | "href">

// Pill button whose icon bubble slides to the opposite side on hover while the label shifts over.
export function IconSlideButton({ href, icon, children, className, ...anchorProps }: IconSlideButtonProps) {
  return (
    <Button
      render={<a href={href} {...anchorProps} />}
      nativeButton={false}
      className={cn(
        "group relative h-12 w-fit cursor-pointer overflow-hidden rounded-full p-1 text-sm font-medium transition-all duration-500",
        icon ? "ps-6 pe-14 hover:ps-14 hover:pe-6" : "px-6",
        className,
      )}
    >
      <span className="relative z-10 transition-all duration-500">{children}</span>
      {icon && (
        <div className="absolute right-1 flex size-10 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-44px)]">
          {icon}
        </div>
      )}
    </Button>
  )
}
