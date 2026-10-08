import { cn } from "@/lib/utils"
import TechLogo from "@/components/TechLogo"
import type { MarqueeItem } from "@/data/portfolio"

const chipTilt = [
  "-rotate-3",
  "rotate-2",
  "-rotate-1",
  "rotate-3",
  "-rotate-2",
  "rotate-1",
]
const chipJitter = [
  "-translate-y-1.5",
  "translate-y-1",
  "-translate-y-0.5",
  "translate-y-1.5",
  "-translate-y-1",
  "translate-y-0.5",
]
const chipShadow = [
  "shadow-[5px_5px_0_#000]",
  "shadow-[5px_5px_0_#ff3d81]",
  "shadow-[5px_5px_0_#2b50ff]",
  "shadow-[5px_5px_0_#00e0a4]",
  "shadow-[5px_5px_0_#000]",
  "shadow-[5px_5px_0_#ff3d81]",
]
const chipSize = ["text-[15px]", "text-[20px]", "text-[16px]", "text-[22px]", "text-[15px]", "text-[18px]"]
const starColor = ["text-pink", "text-black", "text-blue", "text-black", "text-pink", "text-blue"]
const starSize = ["text-lg", "text-2xl", "text-base", "text-3xl", "text-lg", "text-2xl"]

function Star({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("select-none leading-none", className)}>
      ✦
    </span>
  )
}

function ChipTrack({
  items,
  "aria-hidden": ariaHidden,
}: {
  items: MarqueeItem[]
  "aria-hidden"?: boolean
}) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((item, index) => (
        <span
          key={item.label}
          className="mr-7 flex shrink-0 items-center gap-6 tab:mr-10 tab:gap-8"
        >
          <span
            className={cn(
              "flex items-center gap-2.5 border-3 border-black bg-white px-3.5 py-2 transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:rotate-0 hover:scale-105",
              chipTilt[index % chipTilt.length],
              chipJitter[index % chipJitter.length],
              chipShadow[index % chipShadow.length],
            )}
          >
            {item.slug ? <TechLogo slug={item.slug} size="1.5rem" /> : null}
            <span
              className={cn(
                "whitespace-nowrap font-display font-bold uppercase leading-none tracking-[-0.03em] text-black",
                chipSize[index % chipSize.length],
              )}
            >
              {item.label}
            </span>
          </span>
          <Star
            className={cn(
              starColor[index % starColor.length],
              starSize[index % starSize.length],
            )}
          />
        </span>
      ))}
    </div>
  )
}

function TextTrack({
  items,
  "aria-hidden": ariaHidden,
}: {
  items: MarqueeItem[]
  "aria-hidden"?: boolean
}) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((item) => (
        <span
          key={item.label}
          className="mr-7 flex shrink-0 items-center gap-6 tab:mr-10 tab:gap-8"
        >
          <span className="text-hollow whitespace-nowrap font-display text-[clamp(30px,4.4vw,64px)] font-bold uppercase leading-none tracking-[-0.04em]">
            {item.label}
          </span>
          <Star className="text-pink text-2xl" />
        </span>
      ))}
    </div>
  )
}

export default function Marquee({
  items,
  className,
}: {
  items: MarqueeItem[]
  className?: string
}) {
  return (
    <div className={cn("group/band relative w-full", className)}>
      <h2 className="sr-only">Technologies I build with</h2>

      <div className="relative z-10 -mx-[4%] w-[108%] -rotate-2 border-y-3 border-black bg-main shadow-[0_8px_0_0_var(--blue)]">
        <div className="overflow-hidden py-6">
          <div className="flex w-max animate-marquee group-hover/band:[animation-play-state:paused]">
            <ChipTrack items={items} />
            <ChipTrack items={items} aria-hidden />
          </div>
        </div>
      </div>

      <div className="relative z-0 -mx-[4%] -mt-1 w-[108%] rotate-1 border-y-3 border-ink bg-panel text-panel-foreground">
        <div className="overflow-hidden py-4">
          <div className="flex w-max animate-marquee2 group-hover/band:[animation-play-state:paused]">
            <TextTrack items={items} />
            <TextTrack items={items} aria-hidden />
          </div>
        </div>
      </div>
    </div>
  )
}
