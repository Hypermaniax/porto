import { useMemo, useState, type CSSProperties } from "react"
import SectionHeading from "@/components/SectionHeading"
import TechLogo from "@/components/TechLogo"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  accentColorClass,
  misprintColor,
  techCategoryColor,
  techStack,
  type TechCategory,
} from "@/data/portfolio"

type Filter = "ALL" | TechCategory

const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]"

const filterConfig: { value: Filter; dot: string; active: string }[] = [
  {
    value: "ALL",
    dot: "bg-ink",
    active:
      "aria-pressed:bg-ink aria-pressed:text-panel-foreground data-pressed:bg-ink data-pressed:text-panel-foreground",
  },
  {
    value: "FRONTEND",
    dot: "bg-blue",
    active:
      "aria-pressed:bg-blue aria-pressed:text-white data-pressed:bg-blue data-pressed:text-white",
  },
  {
    value: "BACKEND",
    dot: "bg-mint",
    active:
      "aria-pressed:bg-mint aria-pressed:text-black data-pressed:bg-mint data-pressed:text-black",
  },
  {
    value: "DATABASE",
    dot: "bg-yellow",
    active:
      "aria-pressed:bg-yellow aria-pressed:text-black data-pressed:bg-yellow data-pressed:text-black",
  },
  {
    value: "TOOLS",
    dot: "bg-pink",
    active:
      "aria-pressed:bg-pink aria-pressed:text-black data-pressed:bg-pink data-pressed:text-black",
  },
]

const filters: Filter[] = filterConfig.map((item) => item.value)

const tileTilt = ["rotate-[-1.1deg]", "rotate-[0.9deg]"]
const plaqueTilt = ["-rotate-3", "rotate-2"]

export default function TechStack() {
  const [filter, setFilter] = useState<Filter>("ALL")

  const counts = useMemo(() => {
    const result = {} as Record<Filter, number>
    for (const category of filters) {
      result[category] =
        category === "ALL"
          ? techStack.length
          : techStack.filter((item) => item.category === category).length
    }
    return result
  }, [])

  const items =
    filter === "ALL"
      ? techStack
      : techStack.filter((item) => item.category === filter)

  return (
    <section
      className="relative overflow-hidden border-b-3 border-ink py-[clamp(64px,9vw,128px)]"
      id="stack"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[2%] top-[5%] select-none font-display text-[20vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.08] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden"
      >
        Stack
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-(--pad)">
        <SectionHeading
          tone="mint"
          title={
            <>
              MY DAILY{" "}
              <span className="[text-shadow:5px_5px_0_var(--mint)]">
                TOOLBOX
              </span>
            </>
          }
          description="Languages, frameworks, and tools I use to take a project from first sketch all the way to deploy."
          counter={String(items.length).padStart(2, "0")}
          counterLabel="TOOLS"
        />

        <div className="mb-10 border-b-3 border-ink pb-6" data-reveal>
          <ToggleGroup
            value={[filter]}
            onValueChange={(value) => {
              const next = value[0]
              if (next) setFilter(next as Filter)
            }}
            variant="outline"
            className="flex flex-wrap gap-2.5 max-mob:flex-nowrap max-mob:overflow-x-auto max-mob:pb-1.5"
            aria-label="Filter tech stack"
          >
            {filterConfig.map(({ value, dot, active }) => (
              <ToggleGroupItem
                key={value}
                value={value}
                className={`gap-2 border-2 text-xs font-bold uppercase tracking-[0.06em] transition-[translate,box-shadow,background-color,color] aria-pressed:-translate-y-0.5 aria-pressed:shadow-hard-xs data-pressed:-translate-y-0.5 data-pressed:shadow-hard-xs max-mob:flex-none ${active}`}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block size-2.5 border-2 border-ink ${dot}`}
                />
                {value}
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] tabular-nums opacity-60"
                >
                  {String(counts[value]).padStart(2, "0")}
                </span>
                <span className="sr-only">{counts[value]} tools</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <ul className="grid list-none grid-flow-dense grid-cols-6 gap-6 p-0 max-tab:grid-cols-4 max-mob:grid-cols-2">
          {items.map((item, index) => {
            const accent = techCategoryColor[item.category]
            return (
              <li
                key={item.name}
                data-reveal
                style={{ transitionDelay: `${(index % 6) * 55}ms` }}
              >
                <article
                  style={
                    { "--misprint": misprintColor[accent] } as CSSProperties
                  }
                  className={`${accentColorClass[accent]} group relative flex h-full flex-col overflow-hidden border-3 border-ink p-4 pt-5 transition-[rotate,translate,box-shadow] duration-200 ${ease} ${tileTilt[index % 2]} [box-shadow:8px_8px_0_var(--misprint)] hover:-translate-x-1 hover:-translate-y-1 hover:rotate-0 hover:[box-shadow:12px_12px_0_var(--misprint)]`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 -right-1 select-none font-display text-[92px] font-bold leading-none tracking-[-0.06em] text-transparent opacity-[0.18] [-webkit-text-stroke:2px_currentColor]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold tracking-[0.08em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="-rotate-2 border-2 border-black bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-black shadow-[3px_3px_0_#000]">
                      {item.category}
                    </span>
                  </div>

                  <span
                    className={`relative mx-auto my-auto grid size-[78px] place-items-center border-3 border-black bg-white shadow-[5px_5px_0_#000] transition-[rotate,scale] duration-300 ${ease} ${plaqueTilt[index % 2]} group-hover:-rotate-6 group-hover:scale-105 max-mob:size-[64px]`}
                  >
                    <TechLogo slug={item.slug} size="2.5rem" />
                  </span>

                  <p className="relative m-0 font-display text-[15px] font-bold leading-tight">
                    {item.name}
                  </p>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
