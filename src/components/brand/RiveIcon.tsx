import rive from "@/assets/brand/rive.svg"
import { cn } from "@/lib/utils"

type BrandIconProps = {
  size?: number | string
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}

export default function RiveIcon({
  size = "1em",
  className,
  ...props
}: BrandIconProps) {
  return (
    <img
      src={rive}
      alt=""
      draggable={false}
      style={{ width: size, height: size }}
      className={cn("block object-contain", className)}
      {...props}
    />
  )
}
