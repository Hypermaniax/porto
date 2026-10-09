import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { techData, loadExtraTechs } from "@/data/tech-picker"
import type { TechLogoData } from "@/data/tech-logos"

type TechLogoProps = {
  slug: string
  size?: string
  className?: string
  title?: string
}

// Cache modul: logo tambahan hanya diunduh sekali sepanjang sesi,
// dan hanya bila ada slug di luar 31 inti yang perlu dirender.
let extraTechs: Promise<Record<string, TechLogoData>> | null = null

export default function TechLogo({ slug, size, className, title }: TechLogoProps) {
  const [entry, setEntry] = useState<TechLogoData | undefined>(() => techData(slug))

  useEffect(() => {
    if (techData(slug)) return
    extraTechs ??= loadExtraTechs()
    let alive = true
    extraTechs.then((extra) => {
      if (alive) setEntry(extra[slug] ?? techData(slug))
    })
    return () => {
      alive = false
    }
  }, [slug])

  // slug tidak dikenal (salah ketik DB) -> kotak tanda tanya
  if (!entry) {
    return (
      <span
        title={title ?? slug}
        className={cn(
          "grid place-items-center border-2 border-ink/40 text-[9px] font-bold text-ink/60",
          className,
        )}
        style={{ width: size, height: size }}
      >
        ?
      </span>
    )
  }

  const Icon = entry.Icon
  return (
    <span title={title ?? entry.title} className={cn("grid place-items-center", className)}>
      <Icon size={size} color={entry.color} />
    </span>
  )
}
