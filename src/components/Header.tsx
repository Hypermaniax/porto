import { Link, useLocation } from "react-router-dom"
import Button from "@/components/Button"
import ThemeToggle from "@/components/ThemeToggle"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import dict from "@/i18n/dict"
import { navItems } from "@/data/portfolio"
import { useContent } from "@/data/use-content"
import { useScrollSpy } from "@/hooks/useScrollSpy"

const sectionIds = navItems.map((item) => item.id)

export default function Header() {
  const { pathname } = useLocation()
  const { profile, socials } = useContent()
  const isHome = pathname === "/"
  const activeId = useScrollSpy(sectionIds, isHome)
  const menuTicker = dict.menu.ticker

  return (
    <header className="sticky top-3 z-50 px-(--pad) max-mob:top-2">
      <div className="relative mx-auto grid min-h-[76px] w-full max-w-[1240px] grid-cols-[auto_1fr_auto] items-center gap-4 border-3 border-ink bg-paper px-4 py-2.5 shadow-hard max-mob:min-h-[64px] max-mob:gap-2 max-mob:px-3 max-mob:py-2">
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 -translate-x-1.5 -translate-y-1.5 bg-pink"
        />

        <Link
          className="relative grid size-14 -rotate-3 place-items-center border-3 border-ink bg-surface font-display text-[30px] font-bold leading-none shadow-hard-xs transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:rotate-0 hover:scale-105 max-mob:size-11 max-mob:text-[24px]"
          to="/"
          aria-label={`${profile.name} home`}
        >
          {profile.initials.charAt(0)}
          <span className="text-pink">{profile.initials.charAt(1)}</span>
          <span
            aria-hidden="true"
            className="absolute -right-1.5 -top-1.5 size-3 border-2 border-ink bg-mint"
          />
        </Link>

        <nav
          className="flex justify-center gap-1 max-mob:hidden"
          aria-label={dict.header.primaryNav}
        >
          {navItems.map((item, index) => {
            const id = item.id
            const isActive = isHome && activeId === id
            return (
              <Link
                key={item.id}
                to={`/#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={
                  isActive
                    ? "-rotate-1 border-3 border-ink bg-blue px-4 py-2 text-[13px] font-bold text-white shadow-hard-xs transition-transform"
                    : "border-3 border-transparent px-4 py-2 text-[13px] font-bold transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                }
              >
                <span
                  aria-hidden="true"
                  className="mr-1.5 align-super font-mono text-[9px] tracking-normal opacity-50"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center justify-self-end gap-3 max-mob:gap-2">
          <ThemeToggle className="max-mob:hidden" />

          <Sheet>
            <SheetTrigger
              className="group flex size-12 cursor-pointer flex-col items-center justify-center gap-2 border-3 border-ink bg-yellow transition-colors hover:bg-ink max-mob:size-11"
              aria-label={dict.header.openMenu}
            >
              <span className="h-[3px] w-[24px] bg-black transition-all group-hover:bg-yellow group-data-[popup-open]:translate-y-[5.5px] group-data-[popup-open]:rotate-45" />
              <span className="h-[3px] w-[24px] bg-black transition-all group-hover:bg-yellow group-data-[popup-open]:-translate-y-[5.5px] group-data-[popup-open]:-rotate-45" />
            </SheetTrigger>

            <SheetContent
              side="left"
              showCloseButton={false}
              className="w-full! max-w-none! gap-0! border-0! bg-main p-0 text-black sm:max-w-none!"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>{dict.header.menuTitle}</SheetTitle>
                <SheetDescription>{dict.header.primaryNav}</SheetDescription>
              </SheetHeader>

              <div className="relative flex h-full flex-1 flex-col overflow-hidden">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:radial-gradient(#000_1.5px,transparent_1.6px)] [background-size:24px_24px]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-6 top-[26%] select-none font-display text-[40vw] font-bold uppercase leading-none tracking-[-0.09em] text-transparent opacity-[0.12] [-webkit-text-stroke:2px_#000] max-mob:text-[64vw]"
                >
                  Menu
                </span>

                <div className="relative z-10 flex items-center justify-between border-b-3 border-black px-5 py-5 sm:px-10">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em]">
                    Menu / 05
                  </span>
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <SheetClose
                      className="grid size-12 cursor-pointer place-items-center border-3 border-black bg-transparent transition-colors hover:bg-black hover:text-yellow"
                      aria-label={dict.header.closeMenu}
                    >
                      <span className="font-display text-2xl leading-none">✕</span>
                    </SheetClose>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="relative z-10 h-3.5 [background-image:repeating-linear-gradient(45deg,#000_0_12px,#ff3d81_12px_24px)]"
                />

                <nav
                  className="relative z-10 flex flex-1 flex-col justify-center px-5 sm:px-10"
                  aria-label={dict.header.primaryNav}
                >
                  {navItems.map((item, index) => {
                    const id = item.id
                    const isActive = isHome && activeId === id
                    return (
                      <SheetClose
                        key={item.id}
                        nativeButton={false}
                        render={
                          <Link
                            to={`/#${id}`}
                            aria-current={isActive ? "true" : undefined}
                            className="group/nav animate-hero-rise flex items-center gap-4 border-b-3 border-black py-2.5 transition-colors hover:bg-black hover:text-yellow sm:gap-6 sm:py-3.5"
                            style={{ animationDelay: `${index * 70 + 120}ms` }}
                          />
                        }
                      >
                        <span
                          className={
                            "grid size-9 shrink-0 place-items-center border-2 border-black font-mono text-[11px] leading-none transition-colors group-hover/nav:border-yellow sm:size-10 " +
                            (isActive ? "bg-black text-yellow" : "")
                          }
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[clamp(40px,12vw,104px)] font-bold uppercase leading-[0.9] tracking-[-0.055em]">
                          {item.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="ml-auto -translate-x-3 font-display text-2xl leading-none opacity-0 transition-all duration-300 group-hover/nav:translate-x-0 group-hover/nav:opacity-100 sm:text-3xl"
                        >
                          ↗
                        </span>
                      </SheetClose>
                    )
                  })}
                </nav>

                <div className="relative z-10 flex overflow-hidden border-t-3 border-black bg-black py-2.5 text-yellow">
                  <div className="flex w-max animate-marquee2">
                    {[0, 1].map((track) => (
                      <div
                        key={track}
                        className="flex shrink-0 items-center"
                        aria-hidden={track === 1}
                      >
                        {[...menuTicker, ...menuTicker].map((text, index) => (
                          <span
                            key={`${text}-${index}`}
                            className="mr-6 flex shrink-0 items-center gap-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
                          >
                            {text}
                            <span aria-hidden="true" className="text-pink">
                              ✦
                            </span>
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-10">
                  <SheetClose
                    render={
                      <a
                        className="font-mono text-xs font-bold uppercase tracking-[0.1em] hover:text-pink"
                        href={`mailto:${profile.email}`}
                      />
                    }
                  >
                    {profile.email} <span aria-hidden="true">↗</span>
                  </SheetClose>
                  <div className="flex items-center gap-4">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs font-bold uppercase tracking-[0.1em] hover:text-pink"
                      >
                        {social.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button to="/#contact" className="-rotate-1 max-mob:hidden">
            {dict.header.hireMe} <span aria-hidden="true">↗</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
