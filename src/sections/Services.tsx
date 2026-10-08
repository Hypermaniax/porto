import { Fragment, type CSSProperties } from "react"
import SectionHeading from "@/components/SectionHeading"
import TechLogo from "@/components/TechLogo"
import dict from "@/i18n/dict"
import { accentColorClass, misprintColor, services } from "@/data/portfolio"
import { useLang } from "@/i18n/use-lang"

const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]"

const tilt = ["rotate-[-1.2deg]", "rotate-[0.9deg]", "rotate-[-0.7deg]"]
const offset = ["", "md:-translate-y-3", "md:translate-y-8"]

export default function Services() {
  const { t } = useLang()

  return (
    <section
      className="relative overflow-hidden border-b-3 border-ink py-[clamp(64px,9vw,128px)]"
      id="services"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[4%] top-[42%] select-none font-display text-[20vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.08] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden"
      >
        Services
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-(--pad)">
        <SectionHeading
          tone="yellow"
          title={
            <>
              {t(dict.services.titlePart1)}
              <span className="[text-shadow:5px_5px_0_var(--pink)]">
                {t(dict.services.titleAccent)}
              </span>
              {t(dict.services.titlePart2)}
            </>
          }
          description={t(dict.services.description)}
          counter={String(services.length).padStart(2, "0")}
          counterLabel={t(dict.services.counterLabel)}
        />

        <div className="grid grid-flow-dense grid-cols-1 gap-6 md:grid-cols-6 md:gap-8">
          {services.map((service, index) => {
            const wide = index === 0
            return (
              <div
                key={t(service.title)}
                data-reveal
                className={`relative ${
                  wide ? "md:col-span-6" : "md:col-span-3"
                } ${offset[index]}`}
              >
                <article
                  style={
                    {
                      "--misprint": misprintColor[service.color],
                    } as CSSProperties
                  }
                  className={`${accentColorClass[service.color]} group relative flex h-full flex-col overflow-hidden border-3 border-ink p-[clamp(22px,2.6vw,40px)] transition-[rotate,translate,box-shadow] duration-200 ${ease} ${tilt[index]} [box-shadow:10px_10px_0_var(--misprint)] hover:-translate-x-1 hover:-translate-y-1 hover:rotate-0 hover:[box-shadow:18px_18px_0_var(--misprint)]`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 font-mono text-base font-bold leading-none opacity-30"
                  >
                    +
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 font-mono text-base font-bold leading-none opacity-30"
                  >
                    +
                  </span>

                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-[clamp(40px,4.6vw,72px)] font-bold leading-none tracking-[-0.05em] [text-shadow:5px_5px_0_var(--misprint)]">
                      {service.number}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid size-12 shrink-0 place-items-center border-3 border-black bg-black text-xl text-white transition-[rotate] duration-300 ${ease} group-hover:rotate-45 max-mob:size-10`}
                    >
                      ↗
                    </span>
                  </div>

                  <div
                    className={`flex flex-1 flex-col pt-6 ${
                      wide
                        ? "md:flex-row md:items-end md:justify-between md:gap-14"
                        : ""
                    }`}
                  >
                    <div className={wide ? "md:max-w-[46ch]" : ""}>
                      <h3 className="m-0 font-display text-[clamp(30px,3.2vw,50px)] uppercase leading-[0.92] tracking-[-0.05em]">
                        {t(service.title)}
                      </h3>
                      <p className="mt-4 max-w-[52ch] text-sm leading-[1.6]">
                        {t(service.description)}
                      </p>
                      <ul className="mt-6 flex list-none flex-wrap gap-2 border-t-3 border-ink p-0 pt-4">
                        {service.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border-2 border-ink bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-black shadow-hard-xs"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {wide && (
                      <div
                        aria-hidden="true"
                        className="hidden shrink-0 flex-col items-center gap-1.5 md:flex"
                      >
                        {["DATA MODEL", "REST API", "RESPONSIVE UI"].map(
                          (step, stepIndex) => (
                            <Fragment key={step}>
                              {stepIndex > 0 && (
                                <span className="font-mono text-sm font-bold leading-none">
                                  ↓
                                </span>
                              )}
                              <span className="border-2 border-ink bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black shadow-hard-xs">
                                {step}
                              </span>
                            </Fragment>
                          ),
                        )}
                      </div>
                    )}

                    <ul
                      className="mt-auto flex list-none flex-wrap gap-2 p-0 pt-8 md:pt-0"
                      aria-label={`${t(service.title)} toolkit`}
                    >
                      {service.stack.map((slug, stackIndex) => (
                        <li key={slug}>
                          <span
                            className={`grid place-items-center border-3 border-black bg-white shadow-[4px_4px_0_#000] ${
                              wide
                                ? "size-14 max-mob:size-11"
                                : "size-11 max-mob:size-10"
                            }`}
                            style={{
                              transform: `rotate(${
                                (stackIndex - (service.stack.length - 1) / 2) * 6
                              }deg)`,
                            }}
                          >
                            <TechLogo
                              slug={slug}
                              size={wide ? "2rem" : "1.6rem"}
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            )
          })}
        </div>

        <div className="mt-[clamp(56px,7vw,104px)]" data-reveal>
          <a
            href="#contact"
            className="group flex flex-col items-start justify-between gap-5 border-3 border-ink bg-ink px-6 py-6 text-panel-foreground transition-[translate,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:10px_10px_0_var(--yellow)] sm:flex-row sm:items-center sm:px-8"
          >
            <span className="font-display text-[clamp(22px,2.8vw,38px)] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
              {t(dict.services.ctaTitle)}
            </span>
            <span className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.16em]">
              {t(dict.services.ctaAction)}
              <span
                aria-hidden="true"
                className={`grid size-9 place-items-center border-2 border-current transition-[rotate,translate] duration-300 ${ease} group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-45`}
              >
                ↗
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
