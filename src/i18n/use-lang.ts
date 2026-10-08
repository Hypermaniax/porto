import { createContext, useContext } from "react"

export type Lang = "en" | "id"

export type L10n = { en: string; id: string }

export type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (value: L10n) => string
}

export const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = "portfolio-lang"

export function getStored(): Lang | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === "en" || value === "id" ? value : null
  } catch {
    return null
  }
}

export function detectInitial(): Lang {
  const stored = getStored()
  if (stored) return stored
  if (navigator.language?.toLowerCase().startsWith("id")) return "id"
  return "en"
}

export function storeLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    void 0
  }
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used within LanguageProvider")
  return ctx
}
