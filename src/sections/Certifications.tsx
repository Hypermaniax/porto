import type { CSSProperties } from "react"
import SectionHeading from "@/components/SectionHeading"
import dict from "@/i18n/dict"
import { accentColorClass, misprintColor } from "@/data/portfolio"
import { useContent } from "@/data/use-content"
import EmptyState from "@/components/EmptyState"

const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]"

const tilt = ["rotate-[-1.1deg]", "rotate-[0.9deg]"]
const offset = ["", "md:translate-y-6"]

export default function Certifications() {
  const { certifications } = useContent()

  return (
    <section
      className="relative overflow-hidden border-b-3 border-ink py-[clamp(64px,9vw,128px)]"
      id="certifications"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[3%] top-[38%] select-none font-display text-[20vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.08] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden"
      >
        Diploma
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-(--pad)">
        <SectionHeading
          tone="blue"
          title={
            <span className="[text-shadow:5px_5px_0_var(--pink)]">
              {dict.education.title}
            </span>
          }
          description={dict.education.description}
          counter={String(certifications.length).padStart(2, "0")}
          counterLabel={dict.education.counterLabel}
        />

        <div className="grid grid-flow-dense grid-cols-1 gap-8 md:grid-cols-2">
          {certifications.map((certification, index) => {
            return (
              <div
                key={certification.title}
                data-reveal
                style={{ transitionDelay: `${index * 90}ms` }}
                className={`relative ${offset[index] ?? ""}`}
              >
                <article
                  aria-label={`${certification.title} — ${certification.issuer}`}
                  style={
                    {
                      "--misprint": misprintColor[certification.color],
                    } as CSSProperties
                  }
                  className={`${accentColorClass[certification.color]} group relative flex min-h-[clamp(220px,24vw,300px)] flex-col overflow-hidden border-3 border-ink p-[clamp(22px,2.6vw,40px)] transition-[rotate,translate,box-shadow] duration-200 ${ease} ${tilt[index % tilt.length]} [box-shadow:10px_10px_0_var(--misprint)] hover:rotate-0 hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:16px_16px_0_var(--misprint)]`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 font-mono text-base font-bold leading-none opacity-30"
                  >
                    +
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-7 -right-1 select-none font-display text-[clamp(90px,10vw,150px)] font-bold uppercase leading-[0.8] tracking-[-0.07em] text-transparent opacity-[0.12] [-webkit-text-stroke:2px_currentColor]"
                  >
                    {certification.date.slice(-4)}
                  </span>

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="font-display text-[clamp(40px,4.6vw,72px)] font-bold leading-none tracking-[-0.05em] [text-shadow:5px_5px_0_var(--misprint)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="-rotate-2 border-2 border-black bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-black shadow-[3px_3px_0_#000]">
                      FILE {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-6">
                    <h3 className="m-0 max-w-[20ch] font-display text-[clamp(24px,2.6vw,40px)] uppercase leading-[0.95] tracking-[-0.04em]">
                      {certification.title}
                    </h3>
                    <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.06em]">
                      <span className="border-2 border-ink bg-white px-2 py-0.5 text-[10px] tracking-[0.1em] text-black shadow-hard-xs">
                        {dict.education.at}
                      </span>
                      {certification.issuer}
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-4 border-t-3 border-ink pt-4">
                      <time
                        className="border-2 border-ink bg-white px-2.5 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-black shadow-hard-xs"
                        dateTime={certification.date.replace(/–/g, "-")}
                      >
                        {certification.date}
                      </time>

                      <span
                        aria-hidden="true"
                        className={`relative grid size-12 shrink-0 rotate-45 place-items-center border-3 border-black bg-yellow shadow-[3px_3px_0_#000] transition-[rotate,scale] duration-300 ${ease} group-hover:rotate-[135deg] group-hover:scale-110`}
                      >
                        <span className="-rotate-45 text-lg leading-none transition-transform duration-300 group-hover:-rotate-[135deg]">
                          ★
                        </span>
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>

        {certifications.length === 0 && (
          <div className="mt-8">
            <EmptyState
              note={"No credentials listed yet — data comes from the API."}
            />
          </div>
        )}
      </div>
    </section>
  )
}
