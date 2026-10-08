import gsap from "@/assets/brand/gsap.svg"
import { cn } from "@/lib/utils"

type BrandIconProps = {
  size?: number | string
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}

export default function GsapIcon({
  size = "1em",
  className,
  ...props
}: BrandIconProps) {
  return (
    <img
      src={gsap}
      alt=""
      draggable={false}
      style={{ width: size, height: size }}
      className={cn("block object-contain", className)}
      {...props}
    />
  )
}
