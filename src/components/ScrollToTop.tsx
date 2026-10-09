import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  // useLayoutEffect + behavior "instant": pergantian halaman WAJIB
  // potong langsung ke atas sebelum cat (paint) — jangan ikut
  // scroll-behavior: smooth global, kalau tidak halaman baru terlihat
  // "digulir dari bawah ke atas" dan terasa rusak.
  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname, hash])

  return null
}
