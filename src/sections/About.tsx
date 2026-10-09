import type { CSSProperties } from "react"
import Button from "@/components/Button"
import SectionHeading from "@/components/SectionHeading"
import { Badge } from "@/components/ui/badge"
import dict from "@/i18n/dict"
import {
  accentColorClass,
  misprintColor,
  type AccentColor,
} from "@/data/portfolio"
import { useContent } from "@/data/use-content"

const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]"

const statAccent: AccentColor[] = ["yellow", "blue", "pink"]
const statTilt = ["rotate-[-1.2deg]", "rotate-[0.8deg]", "rotate-[-0.7deg]"]
const termAccent = [
  "bg-yellow text-black",
  "bg-mint text-black",
  "bg-pink text-black",
  "bg-blue text-white",
]

export default function About() {
  const { profile, socials, stats, aboutInfo, aboutParagraphs } = useContent()

  return (
    <section
      className="relative overflow-hidden border-b-3 border-ink py-[clamp(64px,9vw,128px)]"
      id="about"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[4%] top-[28%] select-none font-display text-[20vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.08] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden"
      >
        About
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-(--pad)">
        <SectionHeading
          tone="blue"
          title={
            <>
              {dict.about.titlePart1}
              <span className="[text-shadow:5px_5px_0_var(--blue)]">
                {dict.about.titleAccent}
              </span>
              {dict.about.titlePart2}
            </>
          }
          description={dict.about.description}
        />

        <ul className="mb-[clamp(44px,6vw,80px)] grid list-none grid-cols-3 gap-5 p-0 max-mob:grid-cols-1">
          {stats.map((stat, index) => {
            const accent = statAccent[index % statAccent.length]
            return (
              <li key={stat.value} data-reveal>
                <div
                  style={
                    { "--misprint": misprintColor[accent] } as CSSProperties
                  }
                  className={`${accentColorClass[accent]} relative flex min-h-[128px] flex-col justify-between border-3 border-ink p-5 transition-[rotate,translate,box-shadow] duration-200 ${ease} ${statTilt[index % statTilt.length]} [box-shadow:9px_9px_0_var(--misprint)] hover:-translate-y-1 hover:rotate-0 hover:[box-shadow:13px_13px_0_var(--misprint)] max-mob:min-h-[104px]`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 font-mono text-sm font-bold leading-none opacity-40"
                  >
                    +
                  </span>
                  <strong className="font-display text-[clamp(38px,4.2vw,64px)] leading-[0.85] tracking-[-0.05em] [text-shadow:4px_4px_0_var(--misprint)]">
                    {stat.value}
                  </strong>
                  <span className="mt-4 text-[11px] font-bold uppercase tracking-[0.08em]">
                    {stat.label}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="grid grid-cols-[0.85fr_1.15fr] items-start gap-[clamp(40px,6vw,96px)] max-tab:grid-cols-1">
          <div className="relative" data-reveal>
            <div className="relative rotate-[-1.4deg]">
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 border-3 border-ink bg-mint"
              />
              <div className="relative border-3 border-ink bg-surface p-3 shadow-hard-lg">
                {profile.photo ? (
                  <img
                    className="block h-[clamp(360px,44vw,600px)] w-full border-3 border-ink object-cover"
                    src={profile.photo}
                    alt={`Portrait of ${profile.name}`}
                    loading="lazy"
                  />
                ) : (
                  <div className="grid h-[clamp(360px,44vw,600px)] w-full place-items-center border-3 border-dashed border-ink bg-surface font-mono text-xs font-bold uppercase tracking-[0.14em] opacity-70">
                    FIG. 02 (KOSONG)
                  </div>
                )}
              </div>

              <span
                aria-hidden="true"
                className="absolute -left-4 -top-3 h-9 w-24 rotate-[-7deg] border-y-2 border-ink bg-yellow opacity-90"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-4 h-9 w-24 rotate-[6deg] border-y-2 border-ink bg-pink opacity-90"
              />

              <span className="absolute bottom-5 left-5 inline-block -rotate-3 border-3 border-ink bg-surface px-3 py-2 text-[11px] font-bold uppercase tracking-[0.1em] shadow-hard-xs">
                {dict.about.meetYou}
              </span>
            </div>
            <p className="mt-6 text-[9px] font-bold">
              FIG. 02 — {profile.photoCredit}
            </p>
          </div>

          <div className="flex flex-col gap-6" data-reveal>
            <p className="m-0 font-display text-[clamp(28px,3.4vw,52px)] font-bold leading-[1.02] tracking-[-0.05em]">
              {dict.about.statementLead}{" "}
              <mark className="inline-block -rotate-1 border-2 border-ink bg-blue px-2 text-white shadow-hard-xs">
                {dict.about.statementMark}
              </mark>{" "}
              {dict.about.statementTrailing}
            </p>
            {aboutParagraphs.map((paragraph) => (
              <p
                className="m-0 max-w-[60ch] text-[15px] leading-[1.65]"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}

            <div className="relative mt-1 rotate-[0.6deg]">
              <span className="absolute -top-3 left-6 z-10 inline-block -rotate-2 border-2 border-ink bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-panel-foreground shadow-hard-xs">
                {dict.about.quickFacts}
              </span>
              <dl className="m-0 grid grid-cols-2 border-3 border-ink bg-surface shadow-[10px_10px_0_var(--pink)] max-mob:grid-cols-1 [&>div:nth-child(even)]:border-l-3 [&>div:nth-child(even)]:border-ink [&>div:nth-child(n+3)]:border-t-3 [&>div:nth-child(n+3)]:border-ink max-mob:[&>div:nth-child(even)]:border-l-0 max-mob:[&>div+div]:border-t-3 max-mob:[&>div+div]:border-ink">
                {aboutInfo.map((info, index) => (
                  <div key={info.term} className="p-5 pt-7">
                    <dt
                      className={`inline-block border-2 border-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] shadow-hard-xs ${
                        termAccent[index % termAccent.length]
                      }`}
                    >
                      {info.term}
                    </dt>
                    <dd className="mt-2.5 break-words font-display text-[clamp(14px,1.4vw,18px)] font-bold">
                      {info.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {socials.map((social) => (
                <Badge
                  key={social.label}
                  variant="neutral"
                  className="text-[11px] font-bold"
                  render={
                    <a href={social.href} target="_blank" rel="noreferrer" />
                  }
                >
                  {social.label} <span aria-hidden="true">↗</span>
                </Badge>
              ))}
            </div>

            <Button href="#contact" variant="black">
              {dict.about.moreAbout} <span aria-hidden="true">↗</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
