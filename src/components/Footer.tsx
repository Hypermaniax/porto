import { Link } from "react-router-dom"
import dict from "@/i18n/dict"
import { useContent } from "@/data/use-content"

const container = "mx-auto w-full max-w-[1240px] px-(--pad)"

const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]"

const barcodePattern = [3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2]

const socialTilt = ["rotate-[-1.2deg]", "rotate-[1deg]"]

const socialTile = ["bg-yellow text-black border-black", "bg-blue text-white border-black"]

const navItems = [
  { labelKey: "home", to: "/" },
  { labelKey: "work", to: "/#work" },
  { labelKey: "styleGuide", to: "/styleguide" },
] as const

function Barcode() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-3.5 items-stretch gap-[2px] opacity-80"
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

export default function Footer() {
  const { profile, socials } = useContent()

  return (
    <footer className="relative overflow-hidden bg-panel text-panel-foreground [--focus-ring:var(--yellow)]">
      <span
        aria-hidden="true"
        className="block h-5 w-full border-b-3 border-panel-foreground bg-[repeating-linear-gradient(-45deg,var(--yellow)_0_18px,#000_18px_36px)]"
      />

      <div
        className={`${container} relative z-10 grid grid-cols-[1fr_auto] items-end gap-10 pb-8 pt-[clamp(40px,5vw,68px)] max-mob:grid-cols-1 max-mob:items-start`}
      >
        <div>
          <p className="m-0 max-w-[24ch] font-display text-[clamp(26px,3vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]">
            {profile.tagline}
          </p>
          <a
            className="group mt-4 inline-flex items-center gap-3"
            href={`mailto:${profile.email}`}
          >
            <span className="break-all border-b-3 border-panel-foreground pb-1 text-[clamp(16px,1.6vw,20px)] font-bold transition-colors duration-200 group-hover:border-yellow group-hover:text-yellow">
              {profile.email}
            </span>
            <span
              aria-hidden="true"
              className={`grid size-7 shrink-0 place-items-center border-2 border-current text-xs transition-[rotate,color] duration-300 ${ease} group-hover:rotate-45 group-hover:text-yellow`}
            >
              ↗
            </span>
          </a>
          <nav
            className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold"
            aria-label={dict.header.footerNav}
          >
            {navItems.map((item, index) => (
              <Link
                key={item.labelKey}
                className="transition-colors hover:text-yellow"
                to={item.to}
              >
                <span
                  aria-hidden="true"
                  className="mr-2 font-mono text-[9px] opacity-50"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {dict.footer[item.labelKey]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-end gap-5 max-mob:items-start">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] opacity-70">
            {dict.footer.elsewhere}
          </span>
          <div className="flex flex-wrap gap-2.5">
            {socials.map((social, index) => (
              <a
                key={social.label}
                className={`border-3 px-3.5 py-3 text-[11px] font-bold shadow-[4px_4px_0_var(--panel-foreground)] transition-[translate,box-shadow] duration-200 hover:-translate-y-1 hover:rotate-0 hover:[box-shadow:7px_7px_0_var(--panel-foreground)] ${socialTilt[index % socialTilt.length]} ${socialTile[index % socialTile.length]}`}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t-3 border-panel-foreground/25">
        <div
          className={`${container} flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em]`}
        >
          <span>
            © 2026 {profile.name.toUpperCase()}. {dict.footer.rights}
          </span>
          <span className="flex items-center gap-3">
            <Barcode />
            {profile.location.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute right-[7%] top-2 z-10 -rotate-6 border-3 border-black bg-white px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-black shadow-[4px_4px_0_#000]"
        >
          {dict.footer.endOfFile}
        </span>
        <p
          aria-hidden="true"
          className="pointer-events-none relative m-0 -mb-[0.2em] -mt-2 select-none text-center font-display text-[clamp(120px,30vw,420px)] font-bold leading-[0.72] tracking-[-0.07em] text-panel-foreground [text-shadow:14px_14px_0_var(--yellow)]"
        >
          {profile.wordmark}
          <span className="text-yellow">.</span>
        </p>
      </div>
    </footer>
  )
}
