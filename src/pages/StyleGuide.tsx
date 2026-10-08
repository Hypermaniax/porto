import { useState, type ReactNode } from "react"
import Button from "@/components/Button"
import ThemePlayground from "@/components/styleguide/ThemePlayground"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { toast } from "@/components/ui/toast"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

const container = "mx-auto w-full max-w-[1240px] px-(--pad)"

const swatches = [
  { name: "PAPER", className: "bg-paper" },
  { name: "SURFACE", className: "bg-surface" },
  { name: "INK", className: "bg-ink" },
  { name: "PANEL", className: "bg-panel" },
  { name: "YELLOW", className: "bg-yellow" },
  { name: "PINK", className: "bg-pink" },
  { name: "BLUE", className: "bg-blue" },
  { name: "MINT", className: "bg-mint" },
]

const spacing = [
  { label: "4", className: "size-1" },
  { label: "8", className: "size-2" },
  { label: "16", className: "size-4" },
  { label: "24", className: "size-6" },
  { label: "32", className: "size-8" },
  { label: "48", className: "size-12" },
  { label: "64", className: "size-16" },
]

function ToggleDemo() {
  const [value, setValue] = useState<string[]>(["ALL"])
  return (
    <ToggleGroup
      value={value}
      onValueChange={(next) => {
        if (next[0]) setValue(next)
      }}
      variant="outline"
      aria-label="Toggle demo"
    >
      {["ALL", "DESIGN", "CODE"].map((item) => (
        <ToggleGroupItem key={item} value={item} className="text-xs">
          {item}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-t-3 border-ink py-[clamp(32px,4vw,56px)]">
      <h2 className="m-0 mb-8 font-display text-[clamp(24px,3vw,40px)] font-bold uppercase leading-none tracking-[-0.04em]">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function StyleGuide() {
  useDocumentMeta({
    title: "Style Guide — Niko Agustio",
    description:
      "The neo-brutalist design system behind this portfolio: tokens, type, spacing, and components.",
  })

  return (
    <div className={container}>
      <div className="py-[clamp(40px,6vw,80px)]">
        <h1 className="m-0 font-display text-[clamp(40px,7vw,104px)] font-bold uppercase leading-[0.9] tracking-[-0.06em]">
          STYLE GUIDE
        </h1>
        <p className="mt-6 max-w-[58ch] text-[clamp(15px,1.2vw,18px)] leading-[1.6]">
          The tokens and components that keep this portfolio consistent. Tweak
          them live and watch the whole site follow.
        </p>
        <div className="mt-10">
          <ThemePlayground />
        </div>
      </div>

      <Section title="COLOR">
        <div className="grid grid-cols-4 gap-4 max-tab:grid-cols-2">
          {swatches.map((swatch) => (
            <div
              key={swatch.name}
              className="border-3 border-ink shadow-hard-sm"
            >
              <div className={`h-20 border-b-3 border-ink ${swatch.className}`} />
              <p className="m-0 bg-surface px-3 py-2 text-[10px] font-bold tracking-[0.08em]">
                {swatch.name}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="TYPOGRAPHY">
        <div className="flex flex-col gap-6">
          <p className="m-0 font-display text-[clamp(40px,6vw,80px)] font-bold leading-[0.9] tracking-[-0.06em]">
            DISPLAY / Aa
          </p>
          <p className="m-0 font-display text-3xl font-bold uppercase leading-none tracking-[-0.03em]">
            HEADING / Aa
          </p>
          <p className="m-0 text-base leading-[1.6]">
            Body / Space Mono — used for interface copy and longer text.
          </p>
          <p className="m-0 font-mono text-xs font-bold uppercase tracking-[0.08em]">
            LABEL / MONO CAPS
          </p>
        </div>
      </Section>

      <Section title="SPACING">
        <div className="flex flex-wrap items-end gap-5">
          {spacing.map((step) => (
            <div key={step.label} className="flex flex-col items-center gap-2">
              <span
                className={`${step.className} border-3 border-ink bg-yellow`}
              />
              <span className="font-mono text-[11px] font-bold">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="BORDER & SHADOW">
        <div className="grid grid-cols-4 gap-6 max-tab:grid-cols-2">
          <div className="grid h-24 place-items-center border-2 border-ink bg-surface text-[11px] font-bold">
            BORDER 2
          </div>
          <div className="grid h-24 place-items-center border-3 border-ink bg-surface text-[11px] font-bold">
            BORDER 3
          </div>
          <div className="grid h-24 place-items-center border-3 border-ink bg-surface shadow-hard-sm text-[11px] font-bold">
            SHADOW SM
          </div>
          <div className="grid h-24 place-items-center border-3 border-ink bg-surface shadow-hard text-[11px] font-bold">
            SHADOW HARD
          </div>
          <div className="grid h-24 place-items-center border-3 border-ink bg-surface shadow-hard-lg text-[11px] font-bold">
            SHADOW LG
          </div>
          <div className="grid h-24 place-items-center border-3 border-ink bg-surface shadow-hard-xs text-[11px] font-bold">
            SHADOW XS
          </div>
        </div>
      </Section>

      <Section title="BUTTONS">
        <div className="flex flex-wrap gap-4">
          <Button>YELLOW</Button>
          <Button variant="pink">PINK</Button>
          <Button variant="blue">BLUE</Button>
          <Button variant="paper">PAPER</Button>
          <Button variant="black">BLACK</Button>
          <Button disabled>DISABLED</Button>
        </div>
      </Section>

      <Section title="BADGES">
        <div className="flex flex-wrap items-center gap-4">
          <Badge>DEFAULT</Badge>
          <Badge variant="neutral">NEUTRAL</Badge>
          <Badge className="border-3 border-ink bg-yellow text-black">
            ACCENT
          </Badge>
        </div>
      </Section>

      <Section title="CARD">
        <Card className="max-w-md">
          <CardContent className="flex flex-col gap-3">
            <h3 className="m-0 font-display text-2xl font-bold uppercase">
              Card title
            </h3>
            <p className="m-0 text-sm leading-[1.6]">
              Cards carry a 2px ink border, a hard shadow, and sharp corners.
            </p>
            <Badge variant="neutral" className="text-[10px] font-bold">
              TOKEN-DRIVEN
            </Badge>
          </CardContent>
        </Card>
      </Section>

      <Section title="CONTROLS">
        <div className="grid grid-cols-2 gap-8 max-tab:grid-cols-1">
          <div className="flex flex-col gap-5">
            <ToggleDemo />
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-bold tracking-[0.08em]">
                INPUT
              </span>
              <Input placeholder="TYPE SOMETHING..." />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-bold tracking-[0.08em]">
                TEXTAREA
              </span>
              <Textarea rows={3} placeholder="A FEW MORE WORDS..." />
            </label>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Button
              type="button"
              onClick={() =>
                toast.add({
                  title: "TOAST SAMPLE",
                  description: "Neo-brutalist feedback, sharp and loud.",
                  type: "success",
                })
              }
            >
              TRIGGER TOAST <span aria-hidden="true">↗</span>
            </Button>
            <p className="m-0 max-w-[42ch] text-[13px] leading-[1.6]">
              Toasts use the shared toast manager, so any component can fire
              one without extra wiring.
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}
