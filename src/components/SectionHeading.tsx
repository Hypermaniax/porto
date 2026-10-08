import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type SectionTone = "yellow" | "pink" | "blue" | "mint"

const toneClass: Record<SectionTone, string> = {
  yellow: "bg-yellow",
  pink: "bg-pink",
  blue: "bg-blue",
  mint: "bg-mint",
}

type SectionHeadingProps = {
  title: ReactNode
  description?: string
  counter?: string
  counterLabel?: string
  tone?: SectionTone
}

export default function SectionHeading({
  title,
  description,
  counter,
  counterLabel,
  tone = "yellow",
}: SectionHeadingProps) {
  return (
    <div className="mb-[clamp(40px,5vw,72px)]" data-reveal>
      <div className="grid grid-cols-[1fr_auto] items-end gap-8 max-tab:grid-cols-1 max-tab:items-start">
        <div>
          <h2 className="m-0 font-display text-[clamp(40px,6.4vw,96px)] font-bold uppercase leading-[0.9] tracking-[-0.06em] max-mob:text-[clamp(34px,12vw,54px)]">
            {title}
          </h2>
          <span
            aria-hidden="true"
            className={cn(
              "mt-6 block h-2.5 w-28 border-3 border-ink",
              toneClass[tone],
            )}
          />
          {description && (
            <p className="mt-6 max-w-[58ch] text-[clamp(15px,1.2vw,18px)] leading-[1.6]">
              {description}
            </p>
          )}
        </div>
        {counter && (
          <aside className="flex flex-col items-end text-right max-tab:items-start max-tab:text-left">
            <strong className="font-display text-[clamp(56px,7vw,104px)] leading-[0.8] tracking-[-0.08em]">
              {counter}
            </strong>
            {counterLabel && (
              <span className="mt-2 text-[11px] font-bold">{counterLabel}</span>
            )}
          </aside>
        )}
      </div>
    </div>
  )
}
