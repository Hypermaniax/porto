import { cn } from "@/lib/utils"

type TapeMarqueeProps = {
  items: string[]
  className?: string
}

export default function TapeMarquee({ items, className }: TapeMarqueeProps) {
  const row = [...items, ...items]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-6 z-20 select-none overflow-x-clip max-mob:-top-5"
    >
      <div
        className={cn(
          "-mx-[5%] w-[110%] -rotate-1 border-y-3 border-ink bg-ink text-panel-foreground shadow-hard-xs",
          className,
        )}
      >
        <div className="flex w-max animate-marquee items-center py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] whitespace-nowrap max-mob:py-2 max-mob:text-[10px]">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center">
              {row.map((label, index) => (
                <span key={`${half}-${index}`} className="flex items-center">
                  <span className="px-6">{label}</span>
                  <span className="opacity-50">—</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
