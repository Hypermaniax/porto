import { useEffect, useState } from "react"
import Button from "@/components/Button"
import { toast } from "@/components/ui/toast"

type Overrides = {
  paper: string
  yellow: string
  pink: string
  blue: string
  mint: string
  shadow: number
}

const defaults: Overrides = {
  paper: "#e5e8e2",
  yellow: "#ffe600",
  pink: "#ff3d81",
  blue: "#2b50ff",
  mint: "#00e0a4",
  shadow: 8,
}

const colorFields: { key: keyof Omit<Overrides, "shadow">; label: string }[] = [
  { key: "paper", label: "PAPER" },
  { key: "yellow", label: "YELLOW" },
  { key: "pink", label: "PINK" },
  { key: "blue", label: "BLUE" },
  { key: "mint", label: "MINT" },
]

const shadowVars = [
  "--shadow",
  "--shadow-sm",
  "--shadow-xs",
  "--shadow-lg",
] as const

const STORAGE_KEY = "porto-theme-overrides"

function applyOverrides(overrides: Overrides) {
  const root = document.documentElement
  root.style.setProperty("--paper", overrides.paper)
  root.style.setProperty("--yellow", overrides.yellow)
  root.style.setProperty("--pink", overrides.pink)
  root.style.setProperty("--blue", overrides.blue)
  root.style.setProperty("--mint", overrides.mint)

  const size = overrides.shadow
  root.style.setProperty("--shadow", `${size}px ${size}px 0 0 var(--ink)`)
  root.style.setProperty(
    "--shadow-sm",
    `${size * 0.625}px ${size * 0.625}px 0 var(--ink)`,
  )
  root.style.setProperty(
    "--shadow-xs",
    `${size * 0.5}px ${size * 0.5}px 0 var(--ink)`,
  )
  root.style.setProperty(
    "--shadow-lg",
    `${size * 1.5}px ${size * 1.5}px 0 var(--ink)`,
  )
}

function clearOverrides() {
  const root = document.documentElement
  const vars = [
    "--paper",
    "--yellow",
    "--pink",
    "--blue",
    "--mint",
    ...shadowVars,
  ]
  vars.forEach((name) => root.style.removeProperty(name))
}

function readStored(): Overrides {
  if (typeof window === "undefined") return defaults
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return defaults
  try {
    return { ...defaults, ...(JSON.parse(stored) as Partial<Overrides>) }
  } catch {
    return defaults
  }
}

export default function ThemePlayground() {
  const [overrides, setOverrides] = useState<Overrides>(readStored)

  useEffect(() => {
    applyOverrides(overrides)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
  }, [overrides])

  const update = <K extends keyof Overrides>(key: K, value: Overrides[K]) => {
    setOverrides((current) => ({ ...current, [key]: value }))
  }

  const reset = () => {
    clearOverrides()
    localStorage.removeItem(STORAGE_KEY)
    setOverrides(defaults)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(overrides, null, 2))
      toast.add({
        title: "TOKENS COPIED",
        description: "Theme overrides copied to your clipboard.",
        type: "success",
      })
    } catch {
      toast.add({
        title: "COPY FAILED",
        description: "Your browser blocked clipboard access.",
        type: "error",
      })
    }
  }

  return (
    <div className="border-3 border-ink bg-surface p-[clamp(20px,3vw,32px)] shadow-hard">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="m-0 font-display text-[clamp(22px,2.4vw,32px)] font-bold uppercase leading-none tracking-[-0.04em]">
            THEME PLAYGROUND
          </h3>
          <p className="mt-2 text-[13px]">
            Edit the tokens live. Changes apply to the whole site and persist
            in this browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="paper" onClick={copy}>
            COPY JSON
          </Button>
          <Button type="button" variant="black" onClick={reset}>
            RESET
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 max-mob:grid-cols-1">
        {colorFields.map(({ key, label }) => (
          <label
            key={key}
            className="flex items-center justify-between gap-3 border-3 border-ink bg-paper px-4 py-3"
          >
            <span className="text-[11px] font-bold tracking-[0.08em]">
              {label}
            </span>
            <span className="flex items-center gap-3">
              <code className="font-mono text-[11px]">
                {overrides[key].toUpperCase()}
              </code>
              <input
                type="color"
                value={overrides[key]}
                onChange={(event) => update(key, event.target.value)}
                aria-label={`${label} color`}
                className="size-9 cursor-pointer border-3 border-ink bg-transparent p-0"
              />
            </span>
          </label>
        ))}
      </div>

      <label className="mt-6 flex flex-col gap-3">
        <span className="text-[11px] font-bold tracking-[0.08em]">
          SHADOW OFFSET — {overrides.shadow}px
        </span>
        <input
          type="range"
          min={0}
          max={20}
          step={1}
          value={overrides.shadow}
          onChange={(event) => update("shadow", Number(event.target.value))}
          aria-label="Shadow offset"
          className="h-3 w-full cursor-pointer appearance-none border-3 border-ink bg-paper accent-blue"
        />
      </label>
    </div>
  )
}
