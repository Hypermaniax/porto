import { useContext, useMemo } from "react"
import { ContentContext, type Content } from "@/data/content"
import type { Project } from "@/data/portfolio"

// useContent = "ambil konten terkini" di komponen mana pun.
export function useContent(): Content {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error("useContent must be used within ContentProvider")
  return ctx
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
