import { Link, useParams } from "react-router-dom"
import Button from "@/components/Button"
import JsonLd from "@/components/JsonLd"
import ProjectVisual from "@/components/ProjectVisual"
import { Badge } from "@/components/ui/badge"
import dict from "@/i18n/dict"
import {
  accentColorClass,
  getProjectBySlug,
  projects,
} from "@/data/portfolio"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { useLang } from "@/i18n/use-lang"
import NotFound from "@/pages/NotFound"

const container = "mx-auto w-full max-w-[1240px] px-(--pad)"

export default function CaseStudy() {
  const { t } = useLang()
  const { slug } = useParams()
  const project = slug ? getProjectBySlug(slug) : undefined

  useDocumentMeta({
    title: project
      ? `${project.title} — ${t(dict.caseStudy.metaSuffix)} — Niko Agustio`
      : "Not found — Niko Agustio",
    description: project ? t(project.summary) : undefined,
  })

  if (!project) return <NotFound />

  const index = projects.findIndex((item) => item.slug === project.slug)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  const meta = [
    { term: t(dict.caseStudy.role), detail: t(project.role) },
    { term: t(dict.caseStudy.timeline), detail: project.timeline },
    { term: t(dict.caseStudy.year), detail: project.year },
    { term: t(dict.caseStudy.status), detail: project.status },
  ]

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: t(project.summary),
          dateCreated: project.year,
          keywords: project.tags.join(", "),
          author: {
            "@type": "Person",
            name: "Niko Agustio",
            url: "https://nikoagustio.com/",
          },
        }}
      />

      <section className="border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div className={container}>
          <Link
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.06em] transition-colors hover:text-blue"
            to="/#work"
          >
            <span aria-hidden="true">←</span> {t(dict.caseStudy.allWork)}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
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
          </div>

          <h1 className="m-0 mt-5 font-display text-[clamp(48px,9vw,132px)] font-bold uppercase leading-[0.86] tracking-[-0.06em]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-[56ch] text-[clamp(16px,1.5vw,21px)] font-bold leading-[1.5]">
            {t(project.subtitle)}
          </p>
        </div>
      </section>

      <section className="border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div className={container}>
          <div className="grid grid-cols-[0.85fr_1.15fr] items-start gap-[clamp(32px,5vw,72px)] max-tab:grid-cols-1">
            <dl className="m-0 grid grid-cols-1 border-3 border-ink bg-surface shadow-hard">
              {meta.map((item, itemIndex) => (
                <div
                  key={item.term}
                  className={`p-4 ${
                    itemIndex > 0 ? "border-t-3 border-ink" : ""
                  }`}
                >
                  <dt className="text-[10px] font-bold tracking-[0.08em]">
                    {item.term}
                  </dt>
                  <dd className="mt-1.5 font-display text-[15px] font-bold">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>

            <div className={accentColorClass[project.color]}>
              <div className="border-3 border-ink shadow-hard-lg">
                <ProjectVisual type={project.visual} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div className={container}>
          <div className="grid grid-cols-[0.4fr_0.6fr] items-start gap-[clamp(28px,5vw,72px)] max-tab:grid-cols-1">
            <h2 className="m-0 font-display text-[clamp(28px,3.5vw,48px)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
              {t(dict.caseStudy.challenge)}
            </h2>
            <p className="m-0 max-w-[64ch] text-[clamp(15px,1.2vw,18px)] leading-[1.7]">
              {t(project.challenge)}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div className={container}>
          <div className="grid grid-cols-[0.4fr_0.6fr] items-start gap-[clamp(28px,5vw,72px)] max-tab:grid-cols-1">
            <h2 className="m-0 font-display text-[clamp(28px,3.5vw,48px)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
              {t(dict.caseStudy.approach)}
            </h2>
            <ol className="m-0 flex list-none flex-col gap-5 p-0">
              {project.approach.map((step, stepIndex) => (
                <li key={index} className="flex gap-4">
                  <span className="font-mono text-sm font-bold">
                    {String(stepIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="max-w-[60ch] text-[15px] leading-[1.7]">
                    {t(step)}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div className={container}>
          <h2 className="m-0 font-display text-[clamp(28px,3.5vw,48px)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
            {t(dict.caseStudy.outcome)}
          </h2>
          <p className="mt-6 max-w-[64ch] text-[clamp(15px,1.2vw,18px)] leading-[1.7]">
            {t(project.outcome)}
          </p>

          <ul className="mt-10 grid list-none grid-cols-3 border-3 border-ink bg-surface p-0 shadow-hard [&>li+li]:border-l-3 [&>li+li]:border-ink max-mob:grid-cols-1 max-mob:[&>li+li]:border-l-0 max-mob:[&>li+li]:border-t-3">
            {project.metrics.map((metric) => (
              <li
                key={metric.value}
                className="flex flex-col gap-1.5 p-[18px] max-mob:p-[14px_12px]"
              >
                <strong className="font-display text-[clamp(28px,3vw,44px)] leading-[0.9] tracking-[-0.05em]">
                  {metric.value}
                </strong>
                <span className="text-[10px] font-bold">{t(metric.label)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div className={container}>
          <h2 className="m-0 font-display text-[clamp(28px,3.5vw,48px)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
            GALLERY
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 max-mob:grid-cols-1">
            {project.gallery.map((item) => (
              <figure key={item.caption.en} className="m-0">
                <div className="border-3 border-ink shadow-hard">
                  <ProjectVisual type={item.visual} />
                </div>
                <figcaption className="mt-3 text-[11px] font-bold">
                  {t(item.caption)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-3 border-ink py-[clamp(40px,6vw,80px)]">
        <div className={container}>
          <div className="grid grid-cols-2 gap-6 max-mob:grid-cols-1">
            <Link
              className="group border-3 border-ink bg-surface p-6 shadow-hard transition-[transform,box-shadow] duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg"
              to={`/work/${prev.slug}`}
            >
              <span className="text-[11px] font-bold tracking-[0.08em]">
                <span aria-hidden="true">←</span> {t(dict.caseStudy.previous)}
              </span>
              <p className="mt-2 font-display text-[clamp(24px,2.6vw,38px)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
                {prev.title}
              </p>
            </Link>
            <Link
              className="group border-3 border-ink bg-surface p-6 text-right shadow-hard transition-[transform,box-shadow] duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg max-mob:text-left"
              to={`/work/${next.slug}`}
            >
              <span className="text-[11px] font-bold tracking-[0.08em]">
                {t(dict.caseStudy.next)}{" "}
                <span aria-hidden="true">→</span>
              </span>
              <p className="mt-2 font-display text-[clamp(24px,2.6vw,38px)] font-bold uppercase leading-[0.95] tracking-[-0.04em]">
                {next.title}
              </p>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button to="/#contact">
              {t(dict.caseStudy.startProject)} <span aria-hidden="true">↗</span>
            </Button>
            <Button to="/#work" variant="paper">
              {t(dict.caseStudy.allWork)}
            </Button>
          </div>
        </div>
      </section>
    </article>
  )
}
