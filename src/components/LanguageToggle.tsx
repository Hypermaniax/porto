import { useLang, type Lang } from "@/i18n/use-lang"

const options: { code: Lang; label: string; aria: string }[] = [
  { code: "en", label: "EN", aria: "English" },
  { code: "id", label: "ID", aria: "Indonesia" },
]

export default function LanguageToggle({
  className = "",
}: {
  className?: string
}) {
  const { lang, setLang } = useLang()

  return (
    <div
      role="group"
      aria-label="Bahasa / Language"
      className={`inline-flex border-3 border-ink bg-surface text-ink ${className}`}
    >
      {options.map((option, index) => {
        const active = lang === option.code
        return (
          <button
            key={option.code}
            type="button"
            aria-pressed={active}
            aria-label={option.aria}
            onClick={() => setLang(option.code)}
            className={`cursor-pointer px-2.5 py-1 font-mono text-[11px] font-bold leading-none transition-colors ${
              index > 0 ? "border-l-3 border-ink" : ""
            } ${
              active
                ? "bg-ink text-panel-foreground"
                : "bg-transparent hover:bg-yellow hover:text-black"
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
