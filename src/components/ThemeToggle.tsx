import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`grid size-12 cursor-pointer place-items-center border-3 border-ink bg-surface text-ink transition-colors hover:bg-yellow hover:text-black ${className}`}
    >
      {isDark ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <Moon className="size-5" aria-hidden="true" />
      )}
    </button>
  )
}
