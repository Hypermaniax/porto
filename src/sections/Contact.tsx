import ContactForm from "@/components/ContactForm"
import SectionHeading from "@/components/SectionHeading"
import dict from "@/i18n/dict"
import { misprintColor } from "@/data/portfolio"
import { useContent } from "@/data/use-content"
import type { AccentColor } from "@/data/portfolio"
import type { CSSProperties } from "react"

const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]"

const accentTile: Record<AccentColor, string> = {
  yellow: "bg-yellow",
  pink: "bg-pink",
  blue: "bg-blue text-white",
  mint: "bg-mint",
}

const channelTilt = ["rotate-[-0.6deg]", "rotate-[0.5deg]", "rotate-[-0.4deg]"]

export default function Contact() {
  const { profile } = useContent()

  const whatsappHref = `https://wa.me/${profile.phone.replace(/\D/g, "")}`

  const channels: {
    label: string
    glyph: string
    tile: AccentColor
    value: string
    href?: string
  }[] = [
    {
      label: "Email",
      glyph: "@",
      tile: "yellow",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      label: "WhatsApp",
      glyph: "✆",
      tile: "mint",
      value: profile.phone,
      href: whatsappHref,
    },
    {
      label: "Location",
      glyph: "⌖",
      tile: "pink",
      value: profile.location,
    },
  ]

  return (
    <section
      className="relative overflow-hidden border-b-3 border-ink py-[clamp(64px,9vw,128px)]"
      id="contact"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(var(--ink)_1.5px,transparent_1.6px)] [background-size:24px_24px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[4%] top-[34%] select-none font-display text-[20vw] font-bold uppercase leading-none tracking-[-0.07em] text-transparent opacity-[0.08] [-webkit-text-stroke:2px_var(--ink)] max-tab:hidden"
      >
        Contact
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-(--pad)">
        <SectionHeading
          tone="blue"
          title={
            <>
              {dict.contact.titlePart1}
              <span className="[text-shadow:5px_5px_0_var(--pink)]">
                {dict.contact.titleAccent}
              </span>
            </>
          }
          description={dict.contact.description}
          counter="24H"
          counterLabel={dict.contact.replyTime}
        />

        <div className="grid grid-cols-[0.9fr_1.1fr] items-start gap-[clamp(40px,6vw,96px)] max-tab:grid-cols-1">
          <div data-reveal className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-4 left-6 z-[6] -rotate-3 border-3 border-ink bg-yellow px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-black shadow-hard-xs"
            >
              {dict.contact.directLines}
            </span>

            <ul className="m-0 list-none p-0">
              {channels.map((channel, index) => (
                <li
                  key={channel.label}
                  className={`${index > 0 ? "mt-2.5" : ""}`}
                >
                  <div
                    className={`group flex items-stretch border-3 border-ink bg-white text-ink shadow-hard-xs transition-[rotate,translate,box-shadow] duration-200 ${ease} ${channelTilt[index % channelTilt.length]} hover:rotate-0 hover:-translate-y-1 hover:shadow-hard-sm`}
                  >
                    <span
                      aria-hidden="true"
                      className={`grid w-14 shrink-0 place-items-center border-r-3 border-ink text-2xl font-bold max-mob:w-12 ${accentTile[channel.tile]}`}
                    >
                      {channel.glyph}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5 px-4 py-3">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] opacity-70">
                        {dict.contact[channel.label.toLowerCase() as "email" | "whatsapp" | "location"]}
                      </span>
                      {channel.href ? (
                        <a
                          href={channel.href}
                          {...(channel.href.startsWith("http")
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                          className="m-0 break-words font-display text-[clamp(16px,1.6vw,22px)] font-bold transition-transform duration-200 group-hover:-translate-y-px"
                        >
                          {channel.value}
                        </a>
                      ) : (
                        <p className="m-0 break-words font-display text-[clamp(16px,1.6vw,22px)] font-bold">
                          {channel.value}
                        </p>
                      )}
                    </div>
                    {channel.href && (
                      <span
                        aria-hidden="true"
                        className={`grid shrink-0 place-items-center self-center border-2 border-ink text-sm opacity-70 transition-transform duration-300 ${ease} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 mr-3 size-8`}
                      >
                        ↗
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-7 max-w-[46ch] text-[13px] leading-[1.6]">
              {dict.contact.emailNote}
            </p>
            <span className="mt-3 inline-flex items-center gap-2 border-2 border-ink bg-mint px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black shadow-hard-xs">
              <span aria-hidden="true">✦</span>
              {dict.contact.replyChip}
            </span>
          </div>

          <div
            data-reveal
            style={{ transitionDelay: "90ms" }}
            className="relative"
          >
            <div
              style={{ "--misprint": misprintColor.yellow } as CSSProperties}
              className="relative border-3 border-ink bg-white shadow-[10px_10px_0_var(--misprint)] transition-[rotate,box-shadow] duration-200 rotate-[-0.5deg] hover:rotate-0 hover:[box-shadow:14px_14px_0_var(--misprint)]"
            >
              <span
                aria-hidden="true"
                className="absolute -left-2 -top-3 z-[5] h-6 w-24 rotate-[-6deg] bg-yellow/95 shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-2 z-[5] h-6 w-20 rotate-[5deg] bg-pink/95 shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
              />

              <div className="relative flex flex-wrap items-center justify-between gap-2 border-b-3 border-ink bg-ink px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-panel-foreground">
                <span>{dict.contact.intakeForm}</span>
                <span className="opacity-80">{dict.contact.allFieldsRequired}</span>
              </div>

              <div className="relative p-[clamp(20px,3vw,32px)]">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
