import { Link, useParams } from "react-router-dom"
import Button from "@/components/Button"
import JsonLd from "@/components/JsonLd"
import ProjectVisual from "@/components/ProjectVisual"
import TapeMarquee from "@/components/TapeMarquee"
import { Badge } from "@/components/ui/badge"
import dict from "@/i18n/dict"
import { dash } from "@/lib/dash"
import {
  accentColorClass,
  misprintColor,
} from "@/data/portfolio"
import { useContent, useProjectBySlug } from "@/data/use-content"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import NotFound from "@/pages/NotFound"

const container = "mx-auto w-full max-w-[1240px] px-(--pad)"
const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]"
const tilt = ["-rotate-[0.6deg]", "rotate-[0.5deg]", "-rotate-[0.4deg]"]
const metaTilt = [
  "-rotate-[1.2deg]",
  "rotate-[0.9deg]",
  "rotate-[-0.7deg]",
  "rotate-[1.1deg]",
]
const termAccent = [
  "bg-yellow text-black",
  "bg-mint text-black",
  "bg-pink text-black",
  "bg-blue text-white",
]

const metricAccent = [
  "bg-yellow text-black",
  "bg-mint text-black",
  "bg-blue text-white",
]

const galleryTilt = [
  "-rotate-[1.6deg]",
  "rotate-[1.3deg]",
  "-rotate-[1.1deg]",
  "rotate-[1.8deg]",
]

const galleryBacking = [
  "bg-[var(--misprint)]",
  "bg-blue",
  "bg-pink",
  "bg-mint",
]

type CaseTitleTone = "yellow" | "mint" | "pink" | "blue"
const caseToneClass: Record<CaseTitleTone, string> = {
  yellow: "bg-yellow",
  mint: "bg-mint",
  pink: "bg-pink",
  blue: "bg-blue",
}

function CaseTitle({
  title,
  meta,
  tone,
  counter,
  counterLabel,
}: {
  title: string
  meta: string
  tone: CaseTitleTone
  counter?: string
  counterLabel?: string
}) {
  return (
    <div className="relative mb-[clamp(40px,5vw,72px)] pt-7" data-reveal>
      <span className="absolute left-1 top-0 z-20 -rotate-3 border-3 border-ink bg-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-panel-foreground shadow-hard-xs">
        {meta}
      </span>

      <div className="flex items-end justify-between gap-6">
        <div className="relative min-w-0">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 translate-x-1.5 translate-y-1.5 select-none whitespace-nowrap font-display text-[clamp(40px,6.4vw,96px)] font-bold uppercase leading-[0.9] tracking-[-0.06em] text-transparent opacity-20 [-webkit-text-stroke:2px_var(--ink)] max-mob:text-[clamp(34px,12vw,54px)]"
          >
            {title}
          </span>
          <h2 className="relative m-0 font-display text-[clamp(40px,6.4vw,96px)] font-bold uppercase leading-[0.9] tracking-[-0.06em] [text-shadow:6px_6px_0_var(--misprint)] max-mob:text-[clamp(34px,12vw,54px)]">
            {title}
          </h2>
          <span
            aria-hidden="true"
            className={`mt-6 block h-2.5 w-32 border-3 border-ink ${caseToneClass[tone]}`}
          />
        </div>

        {counter && (
          <aside className="shrink-0 text-right max-mob:hidden">
            <strong className="block font-display text-[clamp(72px,10vw,160px)] font-bold leading-[0.72] tracking-[-0.08em] text-transparent [-webkit-text-stroke:3px_var(--ink)]">
              {counter}
            </strong>
            {counterLabel && (
              <span className="mt-2 inline-block -rotate-3 border-3 border-ink bg-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-panel-foreground">
                {counterLabel}
              </span>
            )}
          </aside>
        )}
      </div>
    </div>
  )
}

function ExhibitFrame({
  children,
  stamp,
  tapeTilt = "rotate-[-7deg]",
  tape = true,
}: {
  children: React.ReactNode
  stamp?: string
  tapeTilt?: string
  tape?: boolean
}) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="absolute -bottom-2 -right-2 h-full w-full border-3 border-ink bg-[var(--misprint)] max-mob:-bottom-1.5 max-mob:-right-1.5"
      />
      {tape && (
        <span
          aria-hidden="true"
          className={`absolute -left-2 -top-3 z-[4] h-6 w-[72px] bg-yellow/95 shadow-[2px_2px_0_rgba(0,0,0,0.35)] max-mob:-left-1 max-mob:-top-2 max-mob:w-[56px] ${tapeTilt}`}
        />
      )}
      {stamp && (
        <span
          className="absolute left-4 top-3 z-[5] -rotate-3 border-3 border-ink bg-white px-2.5 py-1 font-display text-[clamp(12px,1.2vw,17px)] font-bold uppercase leading-none tracking-[-0.02em] text-black shadow-hard-sm"
          aria-hidden="true"
        >
          {stamp}
        </span>
      )}
      <span
        aria-hidden="true"
        className="absolute -right-1.5 -top-1.5 z-[6] size-3 border-r-3 border-t-3 border-ink"
      />
      <span
        aria-hidden="true"
        className="absolute -right-3.5 top-1.5 z-[6] h-3 w-[3px] bg-ink"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-3.5 right-1.5 z-[6] h-[3px] w-3 bg-ink"
      />
      {children}
    </div>
  )
}

export default function CaseStudy() {
  const { profile, projects } = useContent()
  const { slug } = useParams()
  const project = useProjectBySlug(slug)

  useDocumentMeta({
    title: project
      ? `${project.title} — ${dict.caseStudy.metaSuffix} — Niko Agustio`
      : "Not found — Niko Agustio",
    description: project ? project.summary : undefined,
  })

  if (!project) return <NotFound />

  const index = projects.findIndex((item) => item.slug === project.slug)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  const meta: { term: string; detail: string; accent?: boolean }[] = [
    { term: dict.caseStudy.role, detail: dash(project.role) },
    { term: dict.caseStudy.timeline, detail: dash(project.timeline) },
    { term: dict.caseStudy.year, detail: dash(project.year) },
    { term: dict.caseStudy.status, detail: dash(project.status), accent: true },
  ]

  const galleryLetters = ["A", "B", "C", "D"]
  const challengeParagraphs = (project.challenge || "-")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  const tapeItems = [
    project.title,
    `CASE FILE ${project.number}`,
    project.year,
    project.status,
  ]

  const outcomePanel: Record<string, string> = {
    yellow: "bg-yellow text-black",
    blue: "bg-blue text-white",
    pink: "bg-pink text-black",
    mint: "bg-mint text-black",
  }

  return (
    <article
      className="overflow-x-clip"
      style={{ "--misprint": misprintColor[project.color] } as React.CSSProperties}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          dateCreated: project.year,
          keywords: project.tags.join(", "),
          author: {
            "@type": "Person",
            name: "Niko Agustio",
            url: "https://nikoagustio.com/",
          },
        }}
      />

      <section className="relative border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div className={container}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <span
              className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]"
            />
            <span
              className="absolute -right-[1%] -top-[6vw] select-none font-display text-[26vw] font-bold uppercase leading-[0.8] tracking-[-0.07em] text-transparent opacity-[0.09] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden"
              style={{ color: "transparent" }}
              data-parallax="90"
            >
              {project.number}
            </span>
          </div>

          <div className="relative z-10" data-reveal>
            <Link
              className="inline-flex items-center gap-2 border-b-3 border-ink pb-1 font-mono text-xs font-bold uppercase tracking-[0.08em] transition-colors hover:text-blue"
              to="/#work"
            >
              <span aria-hidden="true">←</span> {dict.caseStudy.allWork}
            </Link>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Badge className="border-3 border-ink bg-panel px-3 py-1.5 text-[11px] font-bold text-panel-foreground">
                {project.category}
              </Badge>
              <Badge variant="neutral" className="text-[11px] font-bold">
                {project.year}
              </Badge>
              <Badge
                variant="neutral"
                className="text-[11px] font-bold tracking-[0.08em]"
              >
                {project.status}
              </Badge>
              <span className="ml-auto inline-flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] opacity-70 max-tab:ml-0">
                CASE FILE №{project.number}
                <span
                  aria-hidden="true"
                  className="inline-flex h-4 items-stretch gap-[2px] opacity-80"
                >
                  {[3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1].map((width, i) => (
                    <span
                      key={i}
                      className="bg-current"
                      style={{ width: `${width}px` }}
                    />
                  ))}
                </span>
              </span>
            </div>

            <h1 className="relative m-0 mt-5 break-words font-display text-[clamp(48px,9vw,132px)] font-bold uppercase leading-[0.86] tracking-[-0.06em] [text-shadow:6px_6px_0_var(--misprint)] max-mob:text-[clamp(34px,10.5vw,52px)] max-mob:[text-shadow:4px_4px_0_var(--misprint)]">
              {project.title}
            </h1>

            <p className="mt-6 max-w-[56ch] text-[clamp(16px,1.6vw,22px)] font-bold leading-[1.5]">
              {dash(project.subtitle)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y-3 border-ink py-3 font-mono text-[11px] font-bold uppercase tracking-[0.08em]">
              <span>{dash(project.role)}</span>
              <span aria-hidden="true" className="opacity-40">
                /
              </span>
              <span>{project.timeline}</span>
              <span aria-hidden="true" className="opacity-40 max-tab:hidden">
                /
              </span>
              <span className="max-tab:hidden">{profile.name.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]" />
          <span className="absolute -right-[2%] top-[22%] select-none font-display text-[20vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.08] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden" data-parallax="60">
            DATA
          </span>
        </div>
        <TapeMarquee items={tapeItems} />
        <div className={`${container} relative z-10 pt-[clamp(20px,3vw,44px)]`}>
          <div className="grid grid-cols-[0.85fr_1.15fr] items-start gap-[clamp(32px,5vw,72px)] max-tab:grid-cols-1">
            <div className="relative rotate-[-0.8deg]" data-reveal="left">
              <span
                aria-hidden="true"
                className="absolute -left-3 -top-3 h-full w-full border-3 border-ink bg-blue"
              />

              <span
                aria-hidden="true"
                className="absolute -top-4 left-6 z-30 inline-block -rotate-3 border-3 border-ink bg-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-panel-foreground shadow-hard-xs"
              >
                {dict.caseStudy.specSheet}
              </span>

              <span
                aria-hidden="true"
                className="absolute -left-3 -top-3 z-30 font-mono text-2xl font-bold leading-none"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute -right-3 -top-3 z-30 font-mono text-2xl font-bold leading-none"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -left-3 z-30 font-mono text-2xl font-bold leading-none"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 z-30 font-mono text-2xl font-bold leading-none"
              >
                +
              </span>

              <div className="relative z-10 border-3 border-ink bg-surface shadow-[12px_12px_0_var(--misprint)]">
                <dl className="m-0 grid grid-cols-2 max-mob:grid-cols-1 [&>div:nth-child(even)]:border-l-3 [&>div:nth-child(even)]:border-ink [&>div:nth-child(n+3)]:border-t-3 [&>div:nth-child(n+3)]:border-ink max-mob:[&>div:nth-child(even)]:border-l-0 max-mob:[&>div+div]:border-t-3 max-mob:[&>div+div]:border-ink">
                  {meta.map((item, itemIndex) => (
                    <div
                      key={item.term}
                      data-reveal
                      style={{ "--reveal-delay": `${itemIndex * 70}ms` } as React.CSSProperties}
                      className={`relative flex min-w-0 flex-col p-[clamp(20px,2.2vw,32px)] pt-[clamp(30px,3vw,46px)] ${
                        termAccent[itemIndex % termAccent.length]
                      }`}
                    >
                      <dt className="inline-block w-fit border-2 border-ink bg-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-panel-foreground shadow-hard-xs">
                        {item.term}
                      </dt>
                      {item.accent ? (
                        <dd className="m-0 mt-4 w-fit -rotate-3 border-3 border-ink bg-surface px-3 py-1.5 font-display text-[clamp(22px,2.6vw,42px)] font-bold uppercase leading-none tracking-[-0.03em] text-ink shadow-hard-xs">
                          {item.detail}
                        </dd>
                      ) : (
                        <dd className="m-0 mt-4 break-words font-display text-[clamp(21px,2.4vw,42px)] font-bold uppercase leading-[1] tracking-[-0.04em]">
                          {item.detail}
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
                <div
                  aria-hidden="true"
                  className="flex items-center gap-3 border-t-3 border-ink bg-ink px-3 py-2 text-panel-foreground"
                >
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] opacity-80">
                    REF {project.number} · {project.status}
                  </span>
                  <span className="ml-auto flex h-4 items-stretch gap-[2px] opacity-90">
                    {[2, 1, 3, 1, 2, 3, 1, 2, 3, 1, 2].map((w, i) => (
                      <span
                        key={i}
                        className="bg-current"
                        style={{ width: `${w}px` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            </div>

            <figure className="m-0" data-reveal="right">
              <div className="relative rotate-[1.2deg]">
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 translate-x-3.5 translate-y-3.5 border-3 border-ink ${accentColorClass[project.color]}`}
                />
                <span
                  aria-hidden="true"
                  className="absolute -left-2 -top-2 z-20 font-mono text-xl font-bold leading-none"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -bottom-2 z-20 font-mono text-xl font-bold leading-none"
                >
                  +
                </span>

                <div className="group relative border-3 border-ink bg-surface p-3 shadow-hard-lg">
                  <ExhibitFrame tape={false}>
                    <div className="relative p-1">
                      <ProjectVisual type={project.visual} image={project.image} />
                    </div>
                  </ExhibitFrame>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute -left-4 -top-3 h-9 w-24 rotate-[-7deg] border-y-2 border-ink bg-yellow opacity-90"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 -right-4 h-9 w-24 rotate-[6deg] border-y-2 border-ink bg-[var(--misprint)] opacity-90"
                />

                <span className="absolute bottom-6 left-5 z-20 inline-block -rotate-3 border-3 border-ink bg-surface px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] shadow-hard-xs">
                  {project.category} · {project.year}
                </span>
              </div>
              <figcaption className="mt-7 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-8 w-24 shrink-0 [background-image:repeating-linear-gradient(90deg,var(--ink)_0_2px,transparent_2px_4px,var(--ink)_4px_5px,transparent_5px_9px)]"
                />
                <span className="min-w-0 break-words font-mono text-[10px] font-bold uppercase tracking-[0.1em] opacity-70">
                  FIG. {project.number} — {project.title} · {project.year}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]" />
          <span className="absolute -left-[2%] top-[30%] select-none font-display text-[20vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.08] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden" data-parallax="60">
            Challenge
          </span>
        </div>

        <div className={`${container} relative z-10`}>
          <CaseTitle
            title={dict.caseStudy.challenge}
            meta={`${project.category} · ${project.year}`}
            tone="yellow"
          />

          <div className="relative -mt-[clamp(8px,1.4vw,28px)]">
            <span
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 h-full w-full border-3 border-ink bg-[var(--misprint)]"
            />
            <span
              aria-hidden="true"
              className="absolute -left-3 -top-3 h-full w-full border-3 border-ink bg-blue max-mob:hidden"
            />

            <article
              className="relative z-10 grid grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] border-3 border-ink bg-surface shadow-hard-lg max-tab:grid-cols-1"
              data-reveal="scale"
            >
              <span
                aria-hidden="true"
                className="absolute -left-2 -top-2 z-20 font-mono text-xl font-bold leading-none"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-2 z-20 font-mono text-xl font-bold leading-none"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-2 -left-2 z-20 font-mono text-xl font-bold leading-none"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-2 -right-2 z-20 font-mono text-xl font-bold leading-none"
              >
                +
              </span>

              <div className="relative flex flex-col items-start justify-between gap-[clamp(24px,3vw,40px)] border-r-3 border-ink bg-yellow p-[clamp(24px,3vw,44px)] max-tab:border-r-0 max-tab:border-b-3" data-reveal="left">
                <span
                  aria-hidden="true"
                  className="font-display text-[clamp(96px,13vw,200px)] font-bold leading-[0.75] tracking-[-0.06em] text-transparent [-webkit-text-stroke:3px_#000]"
                >
                  ?
                </span>

                <div className="hidden flex-1 items-stretch gap-3 pt-6 tab:flex">
                  <span
                    aria-hidden="true"
                    className="my-1 w-0 shrink-0 border-l-3 border-dashed border-black/40"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
                    {dict.caseStudy.challenge}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="w-fit -rotate-3 border-3 border-ink bg-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-panel-foreground shadow-hard-xs">
                    {project.category}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-4 w-24 [background-image:repeating-linear-gradient(90deg,#000_0_2px,transparent_2px_4px,#000_4px_5px,transparent_5px_9px)]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[clamp(18px,2.2vw,30px)] p-[clamp(24px,3vw,48px)]">
                {challengeParagraphs[0] && (
                  <p
                    data-reveal
                    style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                    className="m-0 max-w-[44ch] font-display text-[clamp(20px,2.2vw,36px)] font-bold leading-[1.28] tracking-[-0.02em] first-letter:float-left first-letter:mr-[clamp(10px,1.2vw,18px)] first-letter:mt-1 first-letter:text-[clamp(46px,5.5vw,84px)] first-letter:font-bold first-letter:leading-[0.72] first-letter:[text-shadow:4px_4px_0_var(--misprint)]"
                  >
                    {challengeParagraphs[0]}
                  </p>
                )}
                {challengeParagraphs.slice(1).map((paragraph, paragraphIndex) => (
                  <div
                    key={paragraphIndex}
                    data-reveal
                    style={{ "--reveal-delay": `${180 + paragraphIndex * 80}ms` } as React.CSSProperties}
                    className="flex gap-[clamp(12px,1.4vw,20px)] border-t-3 border-ink pt-[clamp(16px,2vw,26px)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] size-3 shrink-0 rotate-45 border-2 border-ink bg-[var(--misprint)]"
                    />
                    <p className="m-0 max-w-[62ch] text-[clamp(15px,1.35vw,19px)] leading-[1.75]">
                      {paragraph}
                    </p>
                  </div>
                ))}
                <ul
                  aria-label={`${project.title} stack`}
                  className="mt-auto flex list-none flex-wrap gap-2 border-t-3 border-ink p-0 pt-[clamp(16px,2vw,24px)]"
                >
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border-2 border-ink bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-black shadow-hard-xs"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]" />
          <span className="absolute -right-[2%] top-[24%] select-none font-display text-[20vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.08] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden" data-parallax="60">
            Approach
          </span>
        </div>
        <div className={container}>
          <CaseTitle
            title={dict.caseStudy.approach}
            meta={`${project.approach.length} STEPS`}
            tone="mint"
          />
          <div className="relative -mt-[clamp(8px,1.4vw,28px)]">
            <ol className="m-0 flex list-none flex-col gap-[clamp(14px,1.8vw,24px)] p-0">
              {project.approach.map((step, stepIndex) => {
                const stepNumber = String(stepIndex + 1).padStart(2, "0")
                const isLast = stepIndex === project.approach.length - 1
                return (
                  <li
                    key={stepIndex}
                    data-reveal="left"
                    style={{ "--reveal-delay": `${stepIndex * 90}ms` } as React.CSSProperties}
                    className="relative flex items-stretch gap-[clamp(14px,2vw,28px)]"
                  >
                    <div className="relative flex flex-col items-center">
                      <span className="grid size-[clamp(48px,5vw,64px)] shrink-0 place-items-center border-3 border-ink bg-mint font-display text-[clamp(20px,2vw,28px)] font-bold text-black [box-shadow:4px_4px_0_var(--misprint)]">
                        {stepNumber}
                      </span>
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="mt-1 w-[3px] flex-1 bg-ink/30"
                        />
                      )}
                    </div>

                    <div
                      className={`group relative flex flex-1 flex-col gap-[clamp(10px,1.2vw,16px)] overflow-hidden border-3 border-ink bg-surface p-[clamp(18px,2.2vw,32px)] text-foreground transition-[rotate,translate,box-shadow] duration-200 ${ease} ${tilt[stepIndex % tilt.length]} [box-shadow:6px_6px_0_var(--misprint)] hover:-translate-y-1 hover:rotate-0 hover:[box-shadow:10px_10px_0_var(--misprint)]`}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-3 right-1 select-none font-display text-[clamp(64px,9vw,132px)] font-bold leading-[0.68] tracking-[-0.06em] text-transparent opacity-[0.09] [-webkit-text-stroke:2px_var(--ink)]"
                      >
                        {stepNumber}
                      </span>

                      <span
                        aria-hidden="true"
                        className="absolute right-2.5 top-1.5 font-mono text-base font-bold leading-none opacity-30"
                      >
                        +
                      </span>

                      <div className="relative flex items-center gap-3">
                        <span className="w-fit border-2 border-ink bg-mint px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black">
                          STEP {stepNumber}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-3 flex-1 opacity-30 [background-image:repeating-linear-gradient(90deg,#000_0_1px,transparent_1px_3px,#000_3px_4px,transparent_4px_8px)]"
                        />
                      </div>

                      <p className="relative m-0 max-w-[56ch] font-display text-[clamp(16px,1.7vw,24px)] font-bold leading-[1.3] tracking-[-0.01em]">
                        {step}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
            <span
              aria-hidden="true"
              className="mt-6 flex h-2.5 items-stretch gap-[3px] opacity-40"
            >
              {[4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 3, 1, 2].map((w, i) => (
                <span key={i} className="bg-current" style={{ width: `${w}px` }} />
              ))}
            </span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]" />
          <span className="absolute -left-[2%] top-[22%] select-none font-display text-[20vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.08] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden" data-parallax="60">
            Outcome
          </span>
        </div>
        <div className={container}>
          <CaseTitle
            title={dict.caseStudy.outcome}
            meta={`${project.status} · ${project.year}`}
            tone="pink"
          />

          <div className="relative -mt-[clamp(8px,1.4vw,28px)]">
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 -right-1.5 h-full w-full border-3 border-ink bg-[var(--misprint)] max-mob:-bottom-1 max-mob:-right-1"
            />
            <span
              aria-hidden="true"
              className="absolute -top-3 left-6 z-30 -rotate-6 border-[3px] border-ink bg-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-panel-foreground shadow-hard-xs"
            >
              RESULT
            </span>
            <div
              className={`relative z-10 flex flex-col overflow-hidden border-[4px] border-ink [box-shadow:14px_14px_0_var(--ink)] max-mob:[box-shadow:8px_8px_0_var(--ink)] ${outcomePanel[project.color]}`}
              data-reveal="scale"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-1 -top-8 select-none font-display text-[clamp(140px,20vw,300px)] font-bold leading-[0.6] opacity-[0.14]"
              >
                &rdquo;
              </span>
              <span
                aria-hidden="true"
                className="absolute right-4 top-4 font-mono text-2xl font-bold leading-none opacity-50"
              >
                +
              </span>

              <p className="relative m-0 max-w-[28ch] p-[clamp(28px,3.6vw,56px)] pb-[clamp(22px,2.8vw,38px)] font-display text-[clamp(26px,3.4vw,52px)] font-bold leading-[1.12] tracking-[-0.03em]">
                {dash(project.outcome)}
              </p>

              <div className="flex items-center gap-4 bg-ink px-4 py-3 text-panel-foreground">
                <span
                  aria-hidden="true"
                  className="h-4 w-28 opacity-90 [background-image:repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_9px)]"
                />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                  {project.category} · {project.year}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-auto font-mono text-base font-bold leading-none"
                >
                  +
                </span>
              </div>
            </div>
          </div>

          <ul className="mt-12 grid list-none grid-cols-3 gap-[clamp(24px,2.6vw,40px)] p-0 max-mob:grid-cols-1">
            {project.metrics.map((metric, metricIndex) => {
              const metricNumber = String(metricIndex + 1).padStart(2, "0")
              return (
                <li
                  key={`${metric.value}-${metricIndex}`}
                  data-reveal
                  style={{ "--reveal-delay": `${metricIndex * 90}ms` } as React.CSSProperties}
                  className={`group relative transition-[rotate,translate] duration-200 ${ease} ${metaTilt[metricIndex % metaTilt.length]} hover:-translate-x-1 hover:-translate-y-1 hover:rotate-0`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 z-0 translate-x-2.5 translate-y-2.5 border-3 border-ink bg-[var(--misprint)] transition-transform duration-200 group-hover:translate-x-4 group-hover:translate-y-4"
                  />
                  <div
                    className={`relative z-10 flex flex-col gap-[clamp(16px,1.8vw,24px)] border-[4px] border-ink p-[clamp(22px,2.4vw,34px)] pt-[clamp(32px,3.2vw,42px)] [box-shadow:10px_10px_0_var(--ink)] transition-shadow duration-200 group-hover:[box-shadow:16px_16px_0_var(--ink)] ${metricAccent[metricIndex % metricAccent.length]}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-2 -top-3 z-20 -rotate-6 border-[3px] border-ink bg-ink px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-panel-foreground"
                    >
                      METRIC {metricNumber}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute right-3 top-3 font-mono text-xl font-bold leading-none opacity-40"
                    >
                      +
                    </span>

                    <strong className="relative font-display text-[clamp(42px,4.6vw,74px)] font-bold leading-[0.82] tracking-[-0.06em]">
                      {dash(metric.value)}
                    </strong>

                    <span className="flex items-center gap-3">
                      <span className="border-2 border-current px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                        {dash(metric.label)}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-2.5 flex-1 opacity-50 [background-image:repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_9px)]"
                      />
                    </span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <span className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]" />
          <span className="absolute -right-[2%] top-[24%] select-none font-display text-[20vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.08] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden" data-parallax="60">
            Gallery
          </span>
        </div>

        <div className={`${container} relative z-10`}>
          <CaseTitle
            title={dict.caseStudy.gallery}
            meta={`${project.gallery.length} ${dict.caseStudy.plates}`}
            tone="blue"
            counter={String(project.gallery.length).padStart(2, "0")}
            counterLabel={dict.caseStudy.plates}
          />

          <div className="grid grid-cols-2 gap-[clamp(30px,3.6vw,56px)] max-mob:grid-cols-1">
            {project.gallery.map((item, itemIndex) => {
              const plate = galleryLetters[itemIndex] ?? String(itemIndex + 1)
              return (
                <figure
                  key={itemIndex}
                  data-reveal={itemIndex % 2 === 0 ? "left" : "right"}
                  className={`group relative m-0 transition-[rotate,translate] duration-300 ${ease} ${galleryTilt[itemIndex % galleryTilt.length]} hover:-translate-y-1.5 hover:rotate-0 max-mob:rotate-0 tab:even:mt-16`}
                >
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 z-0 translate-x-4 translate-y-4 border-3 border-ink transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6 ${galleryBacking[itemIndex % galleryBacking.length]}`}
                    />

                    <div className="relative z-10 border-[4px] border-ink bg-surface p-[clamp(10px,1.2vw,18px)] [box-shadow:8px_8px_0_var(--ink)] transition-shadow duration-300 group-hover:[box-shadow:14px_14px_0_var(--ink)]">
                      <span
                        aria-hidden="true"
                        className="absolute left-4 top-4 z-30 -rotate-3 border-3 border-ink bg-ink px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-panel-foreground shadow-hard-xs"
                      >
                        PLATE {plate}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute right-4 top-4 z-30 font-mono text-2xl font-bold leading-none opacity-50"
                      >
                        +
                      </span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-4 right-4 z-30 select-none font-display text-[clamp(52px,6vw,96px)] font-bold leading-[0.7] tracking-[-0.07em] text-transparent opacity-[0.14] [-webkit-text-stroke:2px_var(--ink)]"
                      >
                        {plate}
                      </span>
                      {itemIndex % 2 === 0 && (
                        <span
                          aria-hidden="true"
                          className="absolute -left-3 -top-3 z-30 h-6 w-20 rotate-[-8deg] bg-yellow/95 shadow-[2px_2px_0_rgba(0,0,0,0.35)]"
                        />
                      )}

                      <div className="relative overflow-hidden border-3 border-ink">
                        <ProjectVisual type={item.visual} image={item.image} />
                      </div>
                    </div>
                  </div>

                  <figcaption className="relative z-10 mt-5 flex items-center gap-3 border-[4px] border-ink bg-ink px-3 py-2 text-panel-foreground">
                    <span className="shrink-0 border-[3px] border-panel-foreground px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                      FIG. {plate}
                    </span>
                    <span className="min-w-0 flex-1 text-[11px] font-bold">
                      {dash(item.caption)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-3 w-16 shrink-0 opacity-90 max-mob:hidden [background-image:repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_9px)]"
                    />
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <TapeMarquee
          items={[dict.caseStudy.allWork, profile.name.toUpperCase()]}
        />
        <div className={`${container} pt-[clamp(20px,3vw,44px)]`}>
          <div className="grid grid-cols-2 gap-[clamp(18px,2.2vw,32px)] max-mob:grid-cols-1">
            {[
              { target: prev, isPrev: true },
              { target: next, isPrev: false },
            ].map(({ target, isPrev }) => (
              <Link
                key={target.slug}
                to={`/work/${target.slug}`}
                data-reveal={isPrev ? "left" : "right"}
                className={`group relative block transition-[rotate,translate] duration-300 ${ease} ${isPrev ? "-rotate-[0.6deg] max-mob:rotate-0" : "rotate-[0.6deg] max-mob:rotate-0"} hover:-translate-y-1 hover:rotate-0`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-1.5 translate-y-1.5 border-3 border-ink bg-[var(--misprint)] transition-transform duration-300 group-hover:translate-x-2.5 group-hover:translate-y-2.5"
                />

                <div className="relative z-10 flex items-stretch border-3 border-ink bg-surface">
                  {isPrev && (
                    <span
                      aria-hidden="true"
                      className={`w-2.5 shrink-0 border-r-3 border-ink ${accentColorClass[target.color]}`}
                    />
                  )}

                  <div
                    className={`flex min-w-0 flex-1 flex-col gap-3 p-[clamp(18px,2.2vw,30px)] ${isPrev ? "text-left" : "text-right"}`}
                  >
                    <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                      {isPrev && (
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:-translate-x-1"
                        >
                          ←
                        </span>
                      )}
                      {isPrev ? dict.caseStudy.previous : dict.caseStudy.next}
                      {!isPrev && (
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      )}
                    </span>

                    <p className="m-0 font-display text-[clamp(20px,2.4vw,34px)] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
                      {target.title}
                    </p>

                    <span
                      className={`mt-auto flex items-center gap-3 border-t-3 border-ink pt-3 ${isPrev ? "" : "flex-row-reverse"}`}
                    >
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">
                        {target.category} · {target.year}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-14 opacity-60 [background-image:repeating-linear-gradient(90deg,var(--ink)_0_2px,transparent_2px_4px,var(--ink)_4px_5px,transparent_5px_9px)]"
                      />
                    </span>
                  </div>

                  {!isPrev && (
                    <span
                      aria-hidden="true"
                      className={`w-2.5 shrink-0 border-l-3 border-ink ${accentColorClass[target.color]}`}
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-5" data-reveal>
            <Button to="/#contact">
              {dict.caseStudy.startProject} <span aria-hidden="true">↗</span>
            </Button>
            <Button to="/#work" variant="paper">
              {dict.caseStudy.allWork}
            </Button>
            <span
              aria-hidden="true"
              className="h-4 min-w-24 flex-1 opacity-40 [background-image:repeating-linear-gradient(90deg,var(--ink)_0_2px,transparent_2px_4px,var(--ink)_4px_5px,transparent_5px_9px)]"
            />
          </div>
        </div>
      </section>
    </article>
  )
}
