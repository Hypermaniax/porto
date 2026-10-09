
// File ini sekarang HANYA berisi TIPE + SETTING TAMPILAN (tema).
//
// Data konten TIDAK ADA lagi di sini — semuanya berpindah ke
// src/data/content.ts (fallback kosong) dan disuplai backend
// (GET /api/content dari Firestore).
//
// Yang sengaja tetap di sini (bukan konten, tidak perlu dari DB):
//   - tipe (Project, Service, dsb.) yang dipakai lintas komponen
//   - warna tema (accentColorClass, misprintColor, techCategoryColor)
//   - navItems (daftar section navigasi)

import type { TechSlug } from "@/data/tech-logos"

export type AccentColor = "yellow" | "blue" | "pink" | "mint"

// Kelas Tailwind untuk tiap warna aksen.
export const accentColorClass: Record<AccentColor, string> = {
  yellow: "bg-yellow text-black",
  blue: "bg-blue text-white",
  pink: "bg-pink text-black",
  mint: "bg-mint text-black",
}

// Warna "misprint" = bayangan offset khas gaya brutalist kartu.
export const misprintColor: Record<AccentColor, string> = {
  yellow: "#2b50ff",
  blue: "#ff3d81",
  pink: "#ffe600",
  mint: "#ff3d81",
}

export const navItems: { id: string; label: string }[] = [
  { id: "services", label: "SERVICES" },
  { id: "about", label: "ABOUT" },
  { id: "stack", label: "STACK" },
  { id: "work", label: "WORK" },
  { id: "contact", label: "CONTACT" },
]

export type TechCategory = "FRONTEND" | "BACKEND" | "DATABASE" | "TOOLS"

// Warna aksen per kategori tech stack.
export const techCategoryColor: Record<TechCategory, AccentColor> = {
  FRONTEND: "blue",
  BACKEND: "mint",
  DATABASE: "yellow",
  TOOLS: "pink",
}

export type Service = {
  number: string
  title: string
  description: string
  tags: string[]
  stack: string[]
  color: AccentColor
  order?: number
}

export type TechItem = {
  name: string
  slug: TechSlug
  category: TechCategory
  order?: number
}

export type ProjectCategory = "FULLSTACK" | "FRONTEND"

export type ProjectStatus = "LIVE" | "PRELAUNCH"

export type ProjectVisual = "dashboard" | "listing" | "booking"

export type ProjectMetric = { value: string; label: string }

export type ProjectGalleryItem = {
  visual: ProjectVisual
  caption: string
  image?: string
}

export type Project = {
  number: string
  slug: string
  title: string
  subtitle: string
  summary: string
  year: string
  role: string
  timeline: string
  tags: string[]
  stack: string[]
  status: ProjectStatus
  color: AccentColor
  visual: ProjectVisual
  category: ProjectCategory
  image?: string
  liveUrl?: string
  repoUrl?: string
  challenge: string
  approach: string[]
  outcome: string
  metrics: ProjectMetric[]
  gallery: ProjectGalleryItem[]
  order?: number
}

export type Certification = {
  title: string
  issuer: string
  date: string
  color: AccentColor
  order?: number
}

export type MarqueeItem = { label: string; slug?: string; order?: number }
