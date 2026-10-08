import { cn } from "@/lib/utils"
import { techLogos, type TechSlug } from "@/data/tech-logos"

type TechLogoProps = {
  slug: TechSlug
  size?: number | string
  className?: string
}

export default function TechLogo({
  slug,
  size = "1.5rem",
  className,
}: TechLogoProps) {
  const { Icon, color } = techLogos[slug]

  return (
    <Icon
      size={size}
      color={color}
      className={cn("block shrink-0", className)}
      aria-hidden="true"
    />
  )
}
