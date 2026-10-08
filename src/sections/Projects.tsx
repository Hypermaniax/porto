import { useMemo, useState, type CSSProperties } from "react"
import { StackContainer, StackCard } from "stack-on-scroll"
import Button from "@/components/Button"
import ProjectVisual from "@/components/ProjectVisual"
import SectionHeading from "@/components/SectionHeading"
import TechLogo from "@/components/TechLogo"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import dict from "@/i18n/dict"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useLang, type L10n } from "@/i18n/use-lang"
import {
  accentColorClass,
  misprintColor,
  projects,
  socials,
  type Project,
  type ProjectCategory,
  type ProjectStatus,
} from "@/data/portfolio"
import { techLogos } from "@/data/tech-logos"

type Filter = "ALL" | ProjectCategory

const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]"

const filterConfig: { value: Filter; label: L10n; dot: string; active: string }[] = [
  {
    value: "ALL",
    label: dict.work.filterAll,
    dot: "bg-ink",
    active:
      "aria-pressed:bg-ink aria-pressed:text-panel-foreground data-pressed:bg-ink data-pressed:text-panel-foreground",
  },
  {
    value: "FULLSTACK",
    label: { en: "FULLSTACK", id: "FULLSTACK" },
    dot: "bg-mint",
    active:
      "aria-pressed:bg-mint aria-pressed:text-black data-pressed:bg-mint data-pressed:text-black",
  },
  {
    value: "FRONTEND",
    label: { en: "FRONTEND", id: "FRONTEND" },
    dot: "bg-pink",
    active:
      "aria-pressed:bg-pink aria-pressed:text-black data-pressed:bg-pink data-pressed:text-black",
  },
]

const metricTilt = ["-rotate-2", "rotate-1", "-rotate-1"]
const cardTilt = ["rotate-[-0.8deg]", "rotate-[0.7deg]", "rotate-[-0.5deg]"]
const barcodePattern = [3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2]
const github = socials.find((item) => item.label === "GITHUB")?.href

function Barcode() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-4 items-stretch gap-[2px] opacity-80"
    >
      {barcodePattern.map((width, index) => (
        <span
          key={index}
          className="bg-current"
          style={{ width: `${width}px` }}
        />
      ))}
    </span>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="4"
        y="10"
        width="16"
        height="11"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="2.4"
      />
    </svg>
  )
}

function StatusStamp({ status }: { status: ProjectStatus }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute right-4 top-2 z-[5] -rotate-12 select-none border-[3.5px] border-current px-2.5 py-1 font-mono text-[clamp(13px,1.35vw,21px)] font-bold uppercase leading-none tracking-[0.2em] opacity-50 transition-[rotate,opacity] duration-300 ${ease} group-hover:-rotate-6 group-hover:opacity-75`}
      style={{
        WebkitMaskImage:
          "radial-gradient(3px 3px at 2px 2px, transparent 92%, black 100%)",
        WebkitMaskSize: "6px 6px",
        maskImage:
          "radial-gradient(3px 3px at 2px 2px, transparent 92%, black 100%)",
        maskSize: "6px 6px",
      }}
    >
      {status}
    </span>
  )
}

function ProjectCard({
  project,
  total,
  stacked,
  index,
}: {
  project: Project
  total: string
  stacked: boolean
  index: number
}) {
  const { t } = useLang()
  const titleId = `work-${project.slug}-title`

  return (
    <article
      aria-labelledby={titleId}
      style={{ "--misprint": misprintColor[project.color] } as CSSProperties}
      className={`${accentColorClass[project.color]} group relative flex flex-col gap-[clamp(16px,1.8vw,24px)] overflow-hidden border-3 border-ink p-[clamp(20px,3vw,40px)] transition-[rotate,translate,box-shadow] duration-300 ${ease} ${cardTilt[index % cardTilt.length]} [box-shadow:10px_10px_0_var(--misprint)] hover:rotate-0 hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:18px_18px_0_var(--misprint)] ${
        stacked ? "h-full" : "min-h-0"
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -top-8 select-none font-display text-[clamp(150px,19vw,260px)] font-bold uppercase leading-[0.8] tracking-[-0.07em] text-transparent opacity-[0.10] [-webkit-text-stroke:2px_currentColor]"
      >
        {project.number}
      </span>

      <header
        className="relative flex items-center gap-3 border-b-3 border-ink pb-[clamp(12px,1.4vw,18px)] font-mono text-xs font-bold tracking-[0.06em] max-mob:flex-wrap max-mob:gap-x-3 max-mob:gap-y-2 max-mob:text-[11px]"
      >
        <span className="sr-only">{t(dict.contact.statusLabel)} {project.status}</span>
        <span className="inline-flex items-baseline gap-1.5 text-[clamp(15px,1.3vw,19px)]">
          {project.number}
          <span className="opacity-40" aria-hidden="true">
            /
          </span>
          <span className="text-[0.78em] opacity-70">{total}</span>
        </span>
        <span className="mr-auto inline-flex items-center gap-2 uppercase">
          <span
            aria-hidden="true"
            className="size-2.5 shrink-0 border-2 border-ink bg-surface"
          />
          {project.category}
        </span>
        <Barcode />
        <span className="border-3 border-ink bg-surface px-2.5 py-1 text-ink shadow-hard-xs">
          {project.year}
        </span>
      </header>

      <div className="relative grid min-h-0 flex-1 grid-cols-[1.05fr_1fr] items-stretch gap-[clamp(22px,3.6vw,52px)] max-tab:grid-cols-1">
        <div className="flex min-h-0 flex-col gap-[clamp(12px,1.5vw,18px)]">
          <div>
            <h3
              id={titleId}
              className={`m-0 break-words font-display text-[clamp(40px,5.6vw,88px)] uppercase leading-[0.9] tracking-[-0.05em] [text-shadow:5px_5px_0_var(--misprint)] transition-transform duration-300 ${ease} group-hover:-translate-y-1 max-mob:text-[clamp(40px,14vw,60px)]`}
            >
              {project.title}
            </h3>
            <p className="mt-2.5 max-w-[42ch] text-[clamp(14px,1.2vw,17px)] font-bold leading-[1.35]">
              {t(project.subtitle)}
            </p>
          </div>

          <p className="m-0 line-clamp-2 max-w-[48ch] text-[clamp(13px,1.05vw,15px)] leading-[1.6] opacity-90">
            {t(project.summary)}
          </p>

          <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-3 border-t-3 border-ink pt-[clamp(10px,1.2vw,14px)] max-mob:grid-cols-1">
            <div className="flex items-baseline gap-2">
              <dt className="border-2 border-ink bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-black shadow-hard-xs">
                {t(dict.work.role)}
              </dt>
              <dd className="m-0 font-display text-[clamp(13px,1.1vw,16px)] font-bold">
                {t(project.role)}
              </dd>
            </div>
            <div className="flex items-baseline gap-2">
              <dt className="border-2 border-ink bg-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-black shadow-hard-xs">
                {t(dict.work.timeline)}
              </dt>
              <dd className="m-0 font-display text-[clamp(13px,1.1vw,16px)] font-bold">
                {project.timeline}
              </dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-1 max-mob:items-stretch">
            <Button
              to={`/work/${project.slug}`}
              variant="black"
              className={`after:absolute after:inset-0 after:z-[1] after:content-[''] max-mob:flex-1 max-mob:justify-center`}
            >
              {t(dict.work.readCase)}
              <span
                aria-hidden="true"
                className={`grid size-6 place-items-center border-2 border-current opacity-70 transition-transform duration-300 ${ease} group-hover:translate-x-1 group-hover:-translate-y-px`}
              >
                ↗
              </span>
            </Button>

            <ul
              className="m-0 flex list-none flex-wrap gap-2 p-0"
              aria-label={t(dict.work.builtWith)}
            >
              {project.stack.map((tech) => (
                <li key={tech}>
                  <span
                    className={`grid size-10 place-items-center border-3 border-black bg-white shadow-[3px_3px_0_#000] transition-transform duration-300 ${ease} group-hover:-translate-y-0.5`}
                  >
                    <TechLogo slug={tech} size="1.35rem" />
                    <span className="sr-only">{techLogos[tech].title}</span>
                  </span>
                </li>
              ))}
            </ul>

            {project.status === "PRELAUNCH" && (
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.04em] opacity-70 [&_svg]:size-[15px]">
                <LockIcon />
                PRELAUNCH
              </span>
            )}
          </div>
        </div>

        <div className="relative flex min-h-0 flex-col gap-4">
          <div className="relative min-h-[280px] flex-1 max-mob:min-h-[220px]">
            <span
              aria-hidden="true"
              className="absolute -bottom-2 -right-2 h-full w-full border-3 border-ink bg-black max-mob:-bottom-1.5 max-mob:-right-1.5 dark:bg-white"
            />
            <span
              aria-hidden="true"
              className="absolute -left-2 -top-3 z-[4] h-6 w-[72px] rotate-[-7deg] bg-yellow/95 shadow-[2px_2px_0_rgba(0,0,0,0.35)] max-mob:-left-1 max-mob:-top-2 max-mob:w-[56px]"
            />
            <span className="absolute left-4 top-3 z-[5] -rotate-3 border-3 border-ink bg-white px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-black shadow-hard-xs">
              FIG. {project.number}
            </span>
            <div className="relative h-full border-3 border-ink bg-paper p-2">
              <div className="h-full overflow-hidden border-3 border-ink">
                <div
                  className={`h-full transition-transform duration-700 ${ease} group-hover:scale-[1.04]`}
                >
                  <ProjectVisual type={project.visual} />
                </div>
              </div>
            </div>
            <StatusStamp status={project.status} />
            <span
              aria-hidden="true"
              className="absolute -bottom-3 left-4 z-[4] rotate-1 border-2 border-ink bg-white px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-black shadow-hard-xs max-mob:-bottom-2"
            >
              Exhibit {project.number} / {total}
            </span>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2" aria-label={t(dict.work.metricsAria)}>
            {project.metrics.map((metric, metricIndex) => (
              <div
                key={t(metric.label)}
                className={`min-w-0 flex-1 border-3 border-ink bg-white px-2.5 py-1.5 text-black shadow-hard-xs transition-[rotate] duration-300 ${ease} ${metricTilt[metricIndex % metricTilt.length]} group-hover:rotate-0`}
              >
                <strong className="block font-display text-[clamp(15px,1.5vw,20px)] leading-none tracking-[-0.04em]">
                  {metric.value}
                </strong>
                <span className="mt-1 block text-[8px] font-bold uppercase leading-[1.15] tracking-[0.04em] opacity-70">
                  {t(metric.label)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const { t } = useLang()
  const [filter, setFilter] = useState<Filter>("ALL")
  const isStacked = useMediaQuery("(min-width: 1024px)")

  const counts = useMemo(() => {
    const result = {} as Record<Filter, number>
    for (const { value } of filterConfig) {
      result[value] =
        value === "ALL"
          ? projects.length
          : projects.filter((project) => project.category === value).length
    }
    return result
  }, [])

  const items =
    filter === "ALL"
      ? projects
      : projects.filter((project) => project.category === filter)
  const total = String(items.length).padStart(2, "0")

  return (
    <section
      className="relative border-b-3 border-ink py-[clamp(64px,9vw,128px)]"
      id="work"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]" />
        <span className="absolute -right-[2%] top-[6%] select-none font-display text-[20vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.08] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden">
          Work
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-(--pad)">
        <SectionHeading
          tone="pink"
          title={
            <>
              {t(dict.work.titlePart1)}
              <span className="[text-shadow:5px_5px_0_var(--blue)]">
                {t(dict.work.titleAccent)}
              </span>
            </>
          }
          description={t(dict.work.description)}
          counter={total}
          counterLabel={t(dict.work.counterLabel)}
        />

        <div
          className="mb-10 border-b-3 border-ink pb-6 max-mob:mb-8"
          data-reveal
        >
          <ToggleGroup
            value={[filter]}
            onValueChange={(value) => {
              const next = value[0]
              if (next) setFilter(next as Filter)
            }}
            variant="outline"
            className="flex flex-wrap gap-2.5 max-mob:flex-nowrap max-mob:overflow-x-auto max-mob:pb-1.5"
            aria-label={t(dict.work.filterAria)}
          >
            {filterConfig.map(({ value, label, dot, active }) => (
              <ToggleGroupItem
                key={value}
                value={value}
                className={`gap-2 border-2 text-xs font-bold uppercase tracking-[0.06em] transition-[translate,box-shadow,background-color,color] aria-pressed:-translate-y-0.5 aria-pressed:shadow-hard-xs data-pressed:-translate-y-0.5 data-pressed:shadow-hard-xs max-mob:flex-none ${active}`}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block size-2.5 border-2 border-ink ${dot}`}
                />
                {t(label)}
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] tabular-nums opacity-60"
                >
                  {String(counts[value]).padStart(2, "0")}
                </span>
                <span className="sr-only">{counts[value]} {t(dict.work.countAll)}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-6 border-3 border-ink bg-surface p-8 shadow-hard">
            <p className="m-0 max-w-[42ch] font-bold">
              {t(dict.work.empty)}
            </p>
            <Button variant="paper" onClick={() => setFilter("ALL")}>
              {t(dict.work.viewAll)}
            </Button>
          </div>
        ) : isStacked && items.length > 1 ? (
          <StackContainer
            key={filter}
            inset={110}
            offset={72}
            height="min(78vh, 680px)"
            scaleStep={0.05}
            fadeStep={0.35}
          >
            {items.map((project, index) => (
              <StackCard key={project.title} index={index}>
                <ProjectCard
                  project={project}
                  total={total}
                  index={index}
                  stacked
                />
              </StackCard>
            ))}
          </StackContainer>
        ) : (
          <div className="flex flex-col gap-6">
            {items.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                total={total}
                index={index}
                stacked={false}
              />
            ))}
          </div>
        )}

        {items.length > 0 && github && (
          <div className="mt-[clamp(48px,6vw,88px)]" data-reveal>
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-start justify-between gap-5 border-3 border-ink bg-ink px-6 py-6 text-panel-foreground transition-[translate,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:10px_10px_0_var(--pink)] sm:flex-row sm:items-center sm:px-8"
            >
              <span className="font-display text-[clamp(22px,2.8vw,38px)] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
                {t(dict.work.githubTitle)}
              </span>
              <span className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.16em]">
                {t(dict.work.githubAction)}
                <span
                  aria-hidden="true"
                  className={`grid size-9 place-items-center border-2 border-current transition-[rotate,translate] duration-300 ${ease} group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-45`}
                >
                  ↗
                </span>
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
