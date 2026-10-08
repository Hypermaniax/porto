import { cn } from "@/lib/utils"

type AvailableBadgeProps = {
  label?: string
  className?: string
}

export default function AvailableBadge({
  label = "LET’S WORK TOGETHER • ",
  className,
}: AvailableBadgeProps) {
  const ring = label + label

  return (
    <div
      className={cn(
        "relative grid size-[118px] place-items-center max-mob:size-[96px]",
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full border-3 border-ink bg-paper shadow-hard-xs" />
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 size-full animate-spin-slow"
      >
        <defs>
          <path
            id="available-badge-ring"
            d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
          />
        </defs>
        <text className="fill-ink font-mono text-[8.5px] font-bold uppercase tracking-[0.16em]">
          <textPath href="#available-badge-ring">{ring}</textPath>
        </text>
      </svg>
      <span className="grid size-12 place-items-center border-3 border-ink bg-yellow text-2xl leading-none shadow-hard-xs max-mob:size-10 max-mob:text-xl">
        ↗
      </span>
    </div>
  )
}
