import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  detectInitial,
  LangContext,
  storeLang,
  type Lang,
  type LangContextValue,
  type L10n,
} from "@/i18n/use-lang"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    storeLang(next)
  }, [])

  const t = useCallback((value: L10n) => value[lang], [lang])

  const value: LangContextValue = useMemo(
    () => ({ lang, setLang, t }),
    [lang, setLang, t],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
