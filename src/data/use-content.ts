import { useContext, useMemo } from "react"
import { ContentContext, ContentLoadedContext, type Content } from "@/data/content"
import type { Project } from "@/data/portfolio"

// useContent = "ambil konten terkini" di komponen mana pun.
export function useContent(): Content {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error("useContent must be used within ContentProvider")
  return ctx
}

// useContentLoaded = apakah pengambilan konten dari API sudah selesai.
// Berguna untuk gerbang animasi intro (jangan lomati saat masih fetch).
export function useContentLoaded(): boolean {
  return useContext(ContentLoadedContext)
}

// useProjectBySlug = cari proyek berdasarkan slug (dipakai CaseStudy).
export function useProjectBySlug(
  slug: string | undefined,
): Project | undefined {
  const { projects } = useContent()
  return useMemo(
    () => projects.find((project) => project.slug === slug),
    [projects, slug],
  )
}
