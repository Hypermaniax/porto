import { cn } from "@/lib/utils"
import type { ProjectVisual as ProjectVisualType } from "@/data/portfolio"

const motion = "transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"

const rootByType: Record<ProjectVisualType, string> = {
  dashboard: "",
  listing: "",
  booking: "",
}

export default function ProjectVisual({ type }: { type: ProjectVisualType }) {
  return (
    <div
      className={cn(
        "relative grid h-full min-h-[280px] place-items-center overflow-hidden border-3 border-black bg-[#e5e8e2] text-black max-mob:min-h-[230px]",
        rootByType[type],
      )}
      aria-hidden="true"
    >
      {type === "dashboard" && (
        <>
          <div
            className={cn(
              motion,
              "absolute inset-[7%] flex flex-col border-3 border-black bg-white group-hover:scale-[1.02]",
            )}
          >
            <div className="flex h-7 shrink-0 items-center gap-1.5 border-b-3 border-black bg-[#e5e8e2] px-3">
              <span className="size-2.5 rounded-full border-2 border-black bg-pink" />
              <span className="size-2.5 rounded-full border-2 border-black bg-yellow" />
              <span className="size-2.5 rounded-full border-2 border-black bg-mint" />
            </div>
            <div className="flex min-h-0 flex-1">
              <div className="flex w-[26%] flex-col gap-2.5 border-r-3 border-black p-3">
                <span className="h-2 w-full border-2 border-black bg-mint" />
                <span className="h-2 w-4/5 bg-black/80" />
                <span className="h-2 w-3/5 bg-black/30" />
                <span className="h-2 w-4/5 bg-black/30" />
                <span className="mt-auto h-2 w-2/3 bg-black/30" />
              </div>
              <div className="flex min-h-0 flex-1 flex-col p-3">
                <div className="flex h-[44%] items-end gap-2">
                  <span className="h-[35%] w-full border-2 border-black bg-blue" />
                  <span className="h-[65%] w-full border-2 border-black bg-blue" />
                  <span className="h-[48%] w-full border-2 border-black bg-yellow" />
                  <span className="h-[85%] w-full border-2 border-black bg-blue" />
                  <span className="h-[58%] w-full border-2 border-black bg-pink" />
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <span className="h-2.5 w-full bg-black/15" />
                  <span className="h-2.5 w-11/12 bg-black/10" />
                  <span className="h-2.5 w-4/5 bg-black/10" />
                </div>
                <span className="mt-auto self-end border-2 border-black bg-mint px-2 py-0.5 font-mono text-[10px] font-bold">
                  POPULATION 1,204
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {type === "listing" && (
        <>
          <div className="grid w-[84%] grid-cols-3 gap-3">
            {[
              { bg: "bg-blue", price: "$120" },
              { bg: "bg-pink", price: "$90" },
              { bg: "bg-mint", price: "$150" },
            ].map((card) => (
              <div
                key={card.price}
                className={cn(
                  motion,
                  "border-3 border-black bg-white p-2 group-hover:-translate-y-1",
                )}
              >
                <span
                  className={cn("block h-14 border-2 border-black", card.bg)}
                />
                <span className="mt-2 block h-2 w-3/4 bg-black/80" />
                <span className="mt-1.5 block h-2 w-1/2 bg-black/30" />
                <span className="mt-3 inline-block border-2 border-black bg-yellow px-1.5 py-0.5 font-mono text-[9px] font-bold">
                  {card.price}/DAY
                </span>
              </div>
            ))}
          </div>
          <span className="absolute bottom-[6%] right-[6%] z-[3] rotate-2 border-3 border-black bg-pink px-2.5 py-1 text-sm font-bold">
            BOOK NOW
          </span>
        </>
      )}

      {type === "booking" && (
        <>
          <div
            className={cn(
              motion,
              "flex w-[86%] border-3 border-black bg-white group-hover:-rotate-1",
            )}
          >
            <div className="flex-1 p-4">
              <span className="font-mono text-[10px] font-bold tracking-[0.2em]">
                ADMIT ONE
              </span>
              <p className="mt-2 font-display text-2xl font-bold leading-none tracking-[-0.04em]">
                BOOKING
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <span className="h-2 w-3/4 bg-black/70" />
                <span className="h-2 w-1/2 bg-black/30" />
                <span className="mt-1 h-2 w-2/3 bg-black/30" />
              </div>
            </div>
            <div className="border-l-3 border-dashed border-black" />
            <div className="grid w-[26%] place-items-center border-l-3 border-black bg-yellow p-3">
              <span className="flex h-14 items-end gap-[3px]">
                {[3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1].map((width, index) => (
                  <span
                    key={index}
                    className="bg-black"
                    style={{
                      width: `${width}px`,
                      height: `${55 + ((index * 37) % 45)}%`,
                    }}
                  />
                ))}
              </span>
            </div>
          </div>
          <span className="absolute bottom-[7%] left-[6%] z-[3] -rotate-3 border-3 border-black bg-mint px-2.5 py-1 text-sm font-bold">
            CONFIRMED
          </span>
        </>
      )}
    </div>
  )
}
