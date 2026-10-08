import type { ComponentProps, ReactNode } from "react"
import { Link } from "react-router-dom"
import { Button as UIButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ButtonVariant = "yellow" | "pink" | "blue" | "paper" | "black"

type ButtonProps = {
  children: ReactNode
  href?: string
  to?: string
  variant?: ButtonVariant
  download?: boolean
} & Omit<
  ComponentProps<typeof UIButton>,
  "children" | "variant" | "render" | "className"
> & {
    className?: string
  }

const variantStyles: Record<
  ButtonVariant,
  { ui: "default" | "neutral"; className: string }
> = {
  yellow: { ui: "default", className: "" },
  paper: { ui: "neutral", className: "" },
  black: { ui: "default", className: "bg-foreground text-background" },
  blue: { ui: "default", className: "bg-blue text-white" },
  pink: { ui: "default", className: "bg-pink" },
}

export default function Button({
  children,
  href,
  to,
  variant = "yellow",
  download,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const preset = variantStyles[variant]
  const merged = cn("h-13 px-6 text-sm", preset.className, className)

  if (to) {
    return (
      <UIButton
        variant={preset.ui}
        className={merged}
        nativeButton={false}
        render={<Link to={to} />}
      >
        {children}
      </UIButton>
    )
  }

  if (href) {
    return (
      <UIButton
        variant={preset.ui}
        className={merged}
        nativeButton={false}
        render={<a href={href} download={download} />}
      >
        {children}
      </UIButton>
    )
  }

  return (
    <UIButton variant={preset.ui} className={merged} type={type} {...rest}>
      {children}
    </UIButton>
  )
}
