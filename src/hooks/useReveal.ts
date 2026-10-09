import { useEffect } from "react"

export function useReveal(tunda = false) {
  useEffect(() => {
    // tunda=true berarti tirai intro masih menutup: elemen jangan
    // di-reveal dulu, dan pengamat baru bekerja setelah tunda=false.
    if (tunda) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const canObserve = "IntersectionObserver" in window
    const nodes = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]")

    if (prefersReduced || !canObserve) {
      nodes().forEach((node) => node.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    )

    const observe = (node: HTMLElement) => observer.observe(node)

    const awal: HTMLElement[] = []
    nodes().forEach((node) => {
      // batch pertama: elemen yang sudah ada di viewport saat pengamat
      // mulai bekerja (halaman baru dibuka, atau kembali ke posisi scroll
      // lama). Disebarkan jeda berurutan supaya animasinya mekar cascade
      // terlihat jelas, bukan semua pop di frame yang sama.
      const rect = node.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        node.style.setProperty(
          "--reveal-delay",
          `${Math.min(awal.length * 90, 720)}ms`,
        )
        awal.push(node)
      }
      observe(node)
    })

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          if (node.matches("[data-reveal]")) observe(node)
          node.querySelectorAll<HTMLElement>("[data-reveal]").forEach(observe)
        })
      })
    })

    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutations.disconnect()
      observer.disconnect()
    }
  }, [tunda])
}
