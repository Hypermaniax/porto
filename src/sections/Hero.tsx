import { useState } from "react"
import AvailableBadge from "@/components/AvailableBadge"
import Button from "@/components/Button"
import Marquee from "@/components/ui/marquee"
import TechLogo from "@/components/TechLogo"
import dict from "@/i18n/dict"
import { useContent } from "@/data/use-content"
import type { TechSlug } from "@/data/tech-logos"

const heroStack: TechSlug[] = ["laravel", "vuejs", "typescript", "nextdotjs"]

const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]"

export default function Hero() {
  const { profile, marqueeItems } = useContent()
  // foto lama tidak menimpa buruk lama: fade-in setelah bener-bener terunduh
  const [fotoSiap, setFotoSiap] = useState(false)
  return (
    <section className="relative overflow-hidden" id="hero">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[2%] top-[56%] select-none font-display text-[22vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.09] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden"
      >
        Fullstack
      </span>
      <span
        aria-hidden="true"
        className="absolute left-4 top-1/2 -translate-y-1/2 rotate-180 text-[11px] font-bold uppercase tracking-[0.34em] opacity-40 [writing-mode:vertical-rl] max-tab:hidden"
      >
        {dict.hero.verticalLabel}
      </span>

      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(32px,5vw,72px)] px-(--pad) py-[clamp(40px,7vw,96px)_clamp(36px,5vw,72px)] max-tab:grid-cols-1">
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-7 top-9 -rotate-12 font-display text-4xl leading-none text-pink max-mob:hidden"
          >
            ✦
          </span>
          <span
            aria-hidden="true"
            className="absolute -right-2 bottom-14 hidden rotate-12 font-display text-3xl leading-none text-blue tab:block"
          >
            ✱
          </span>

          <p
            className="animate-hero-rise mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] opacity-60"
            style={{ animationDelay: "40ms" }}
          >
            {dict.hero.eyebrow}
          </p>

          <h1 className="animate-hero-rise m-0 flex -rotate-[0.8deg] flex-col items-start font-display text-[clamp(50px,8.6vw,116px)] font-bold leading-[0.86] tracking-[-0.06em] max-mob:text-[clamp(44px,15vw,68px)]">
            <span className="mb-2.5 flex w-fit items-center gap-2.5 border-2 border-ink bg-main px-3 py-1 text-[0.24em] tracking-[0.1em] text-black shadow-hard-xs">
              <span aria-hidden="true" className="inline-block size-2.5 bg-pink" />
              {dict.hero.greeting}
            </span>
            <span className="relative inline-block pb-[0.08em] [text-shadow:6px_6px_0_var(--blue)] after:absolute after:bottom-0 after:left-0 after:right-[0.1em] after:h-[10px] after:bg-pink after:content-[''] max-mob:after:h-[7px]">
              {profile.name.toUpperCase()}
            </span>
          </h1>

          <p
            className="animate-hero-rise mt-[30px] text-[clamp(15px,1.5vw,19px)] font-bold leading-[1.5]"
            style={{ animationDelay: "120ms" }}
          >
            {dict.hero.introLead}{" "}
            <span className="inline-block -rotate-1 border-2 border-ink bg-yellow px-2 py-0.5 text-black shadow-hard-xs">
              {profile.role.toUpperCase()}
            </span>{" "}
            {dict.hero.introTrailing}
          </p>

          <p
            className="animate-hero-rise mt-5 max-w-[52ch] text-[clamp(14px,1.15vw,17px)] leading-[1.6]"
            style={{ animationDelay: "200ms" }}
          >
            {dict.hero.pitchLead}{" "}
            <span className="inline-block rotate-1 bg-main px-1.5 text-main-foreground shadow-hard-xs">
              RESTFUL APIS
            </span>{" "}
            {dict.hero.pitchTrailing}
          </p>

          <div
            className="animate-hero-rise mt-9 flex flex-wrap gap-4"
            style={{ animationDelay: "280ms" }}
          >
            <Button href="#work" className="group -rotate-1 gap-3 pl-6 pr-3">
              {dict.hero.viewWork}
              <span
                aria-hidden="true"
                className={`grid size-7 place-items-center border-2 border-black bg-white text-black transition-transform duration-300 ${ease} group-hover:translate-x-0.5 group-hover:translate-y-0.5`}
              >
                ↓
              </span>
            </Button>
            <Button
              href="#contact"
              variant="paper"
              className="group rotate-1 gap-3 pl-6 pr-3"
            >
              {dict.hero.requestCv}
              <span
                aria-hidden="true"
                className={`grid size-7 place-items-center border-2 border-black bg-yellow text-black transition-transform duration-300 ${ease} group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
              >
                ↗
              </span>
            </Button>
          </div>

          <div
            className="animate-hero-rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t-3 border-ink pt-5 text-[11px] font-bold uppercase tracking-[0.08em]"
            style={{ animationDelay: "360ms" }}
          >
            <span className="flex items-center gap-2.5">
              <span className="relative flex size-2.5" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex size-2.5 rounded-full border-2 border-ink bg-mint" />
              </span>
              {dict.hero.available}
            </span>
            <span aria-hidden="true" className="opacity-40">
              /
            </span>
            <span>{profile.location}</span>
            <span aria-hidden="true" className="ml-auto text-pink">
              ✦
            </span>
          </div>
        </div>

        <div className="relative max-tab:mx-auto max-tab:mt-6 max-tab:w-full max-tab:max-w-[540px]">
          <div className="relative rotate-[1.2deg]">
            <span
              aria-hidden="true"
              className="absolute -left-5 -top-5 size-24 -rotate-6 border-3 border-ink bg-mint max-mob:-left-3 max-mob:-top-3 max-mob:size-16"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 border-3 border-ink bg-blue"
            />

            <div className="relative border-3 border-ink bg-surface p-3 shadow-hard-lg">
              <div
                className="animate-hero-wipe overflow-hidden border-3 border-ink"
                style={{ animationDelay: "120ms" }}
              >
                {profile.photo ? (
                  <img
                    className={`block h-[clamp(360px,44vw,600px)] w-full object-cover transition-opacity duration-700 ${fotoSiap ? "opacity-100" : "opacity-0"}`}
                    src={profile.photo}
                    alt={`${dict.hero.portraitAlt} ${profile.name}`}
                    onLoad={() => setFotoSiap(true)}
                  />
                ) : (
                  <div className="grid h-[clamp(360px,44vw,600px)] w-full place-items-center border-3 border-dashed border-ink bg-surface font-mono text-xs font-bold uppercase tracking-[0.14em] opacity-70">
                    FIG. 01 (KOSONG)
                  </div>
                )}
              </div>
            </div>

            <span
              aria-hidden="true"
              className="absolute -left-8 top-[21%] z-10 w-[120%] -rotate-[5deg] border-y-2 border-ink py-1 opacity-95 [background-image:repeating-linear-gradient(45deg,var(--yellow)_0_10px,#000_10px_20px)] max-mob:hidden"
            />

            <div
              className="animate-hero-rise absolute -right-6 -top-6 z-20 max-mob:-right-3 max-mob:-top-3"
              style={{ animationDelay: "520ms" }}
            >
              <AvailableBadge />
            </div>

            <div
              className="animate-hero-rise absolute -left-5 bottom-24 z-20 -rotate-6 border-3 border-ink bg-pink px-3 py-2 text-black shadow-hard-xs max-mob:-left-3 max-mob:bottom-20"
              style={{ animationDelay: "580ms" }}
            >
              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] opacity-70">
                {dict.hero.basedIn}
              </span>
              <span className="block font-display text-sm font-bold leading-tight">
                {profile.location}
              </span>
            </div>

            <div
              className="animate-hero-rise absolute -bottom-5 right-5 z-20 flex gap-2 max-mob:right-4"
              style={{ animationDelay: "640ms" }}
            >
              {heroStack.map((slug, index) => (
                <span
                  key={slug}
                  className="grid size-11 place-items-center border-3 border-black bg-white shadow-[4px_4px_0_#000] max-mob:size-10"
                  style={{ transform: `rotate(${(index - 1.5) * 5}deg)` }}
                >
                  <TechLogo slug={slug} size="1.6rem" />
                </span>
              ))}
            </div>

            <span
              aria-hidden="true"
              className="absolute -left-3 -bottom-3 font-mono text-xl font-bold leading-none text-ink"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="absolute -right-1 top-1/2 font-mono text-xl font-bold leading-none text-ink"
            >
              +
            </span>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-8 w-24 shrink-0 [background-image:repeating-linear-gradient(90deg,var(--ink)_0_2px,transparent_2px_4px,var(--ink)_4px_5px,transparent_5px_9px)]"
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.08em] opacity-70">
              FIG. 01 — {profile.photoCredit}
            </p>
          </div>
        </div>
      </div>

      <Marquee items={marqueeItems} />
    </section>
  )
}
