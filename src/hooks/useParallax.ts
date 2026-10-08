import { useEffect } from "react"

export function useParallax() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (prefersReduced) return

    let nodes: HTMLElement[] = []
    const collect = () => {
      nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-parallax]"),
      )
    }
    collect()

    let frame = 0
    const update = () => {
      frame = 0
      const viewportH = window.innerHeight
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect()
        if (rect.bottom < -240 || rect.top > viewportH + 240) return
        const center = rect.top + rect.height / 2
        const progress = (center - viewportH / 2) / viewportH
        const strength = Number(node.dataset.parallax) || 48
        node.style.setProperty(
          "--parallax-y",
          `${(-progress * strength).toFixed(1)}px`,
        )
      })
    }

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const mutations = new MutationObserver(() => {
      collect()
      requestUpdate()
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    update()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      mutations.disconnect()
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}
