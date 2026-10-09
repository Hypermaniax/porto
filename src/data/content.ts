import { createContext } from "react"
import type {
  Certification,
  MarqueeItem,
  Project,
  ProjectGalleryItem,
  ProjectMetric,
  Service,
  TechItem,
} from "@/data/portfolio"

// ---------------------------------------------------------------
// Tipe + fallback kosong untuk Content Layer.
// ---------------------------------------------------------------
// NILAI AWAL sengaja KOSONG: tidak ada lagi data statis di frontend.
// Begitu halaman dibuka, ContentProvider (content-provider.tsx)
// meminta GET /api/content ke backend (Firestore) dan mengganti isi
// state-nya. Kalau API gagal/mati, bagian yang datanya tidak ada
// menampilkan pesan "belum ada data" — bukan data palsu.
//
// Cara pakai di komponen:
//   const { profile, projects } = useContent()   // dari use-content.ts
// ---------------------------------------------------------------

export type Profile = {
  name: string
  firstName: string
  wordmark: string
  initials: string
  email: string
  phone: string
  role: string
  location: string
  tagline: string
  photo: string
  photoCredit: string
}

export type Social = { label: string; href: string }
export type AboutInfoItem = { term: string; detail: string }
export type Stat = { value: string; label: string }

// Bentuk konten yang dipakai seluruh komponen.
export type Content = {
  profile: Profile
  socials: Social[]
  stats: Stat[]
  aboutInfo: AboutInfoItem[]
  aboutParagraphs: string[]
  services: Service[]
  techStack: TechItem[]
  projects: Project[]
  certifications: Certification[]
  marqueeItems: MarqueeItem[]
}

// Nilai awal KOSONG (menunggu data dari API backend).
// Data statis (dari portfolio.ts) sebagai nilai awal/fallback.
export const fallbackContent: Content = {
  profile: {
    name: "",
    firstName: "",
    wordmark: "",
    initials: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    tagline: "",
    photo: "",
    photoCredit: "",
  },
  socials: [],
  stats: [],
  aboutInfo: [],
  aboutParagraphs: [],
  services: [],
  techStack: [],
  projects: [],
  certifications: [],
  marqueeItems: [],
}

// Bentuk data mentah yang dikirim backend (lihat api-porto/models.go):
// satu dokumen "content/site" berisi profile, about, services, dst.
// Semua field boleh hilang/null runtime — oleh karena itu semua
// aksesnya opsional, dan fromBackend yang menjinakkan datanya.
type BackendContent = {
  // Backend menaruh sosmed di dalam profile (portfolio.ts tidak).
  profile?: Profile & { socials: Social[] }
  about?: {
    info: AboutInfoItem[]
    paragraphs: string[]
    stats: Stat[]
  }
  services?: Service[]
  techStack?: TechItem[]
  projects?: Project[]
  certifications?: Certification[]
  marquee?: MarqueeItem[]
}

// Penjinak data (jaga-jaga): admin bisa menyimpan project/konten
// dengan field kosong. Backend Go mengirim `null` untuk array yang
// kosong, dan field teks bisa kosong/null. Dua helper ini menjaga
// agar front-end tidak pernah memanggil .map() di atas null atau
// menampilkan "undefined".
const array = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

const text = (value: unknown): string => (typeof value === "string" ? value : "")

function normalizeProject(p: Project): Project {
  return {
    ...p,
    slug: text(p.slug),
    title: text(p.title),
    subtitle: text(p.subtitle),
    summary: text(p.summary),
    year: text(p.year),
    role: text(p.role),
    timeline: text(p.timeline),
    tags: array<string>(p.tags),
    stack: array<string>(p.stack),
    challenge: text(p.challenge),
    approach: array<string>(p.approach),
    outcome: text(p.outcome),
    metrics: array<ProjectMetric>(p.metrics).map((m) => ({
      value: text(m?.value),
      label: text(m?.label),
    })),
    gallery: array<ProjectGalleryItem>(p.gallery).map((g) => ({
      visual: (g?.visual ?? "listing") as ProjectGalleryItem["visual"],
      caption: text(g?.caption),
      image: g?.image || undefined,
    })),
    image: p.image || undefined,
    liveUrl: p.liveUrl || undefined,
    repoUrl: p.repoUrl || undefined,
    number: text(p.number) || "--",
  }
}

// fromBackend menerjemahkan bentuk backend -> bentuk komponen:
// statis pakai nama bebas (aboutInfo, marqueeItems), backend
// mengemasnya di dalam `about` dan `marquee`.
// Semua array/teks tetap dijamin "ada" (array kosong/string kosong),
// bukan null — biar komponen aman di-.map() dan di-render.
export function fromBackend(data: BackendContent): Content {
  return {
    profile: {
      name: text(data.profile?.name),
      firstName: text(data.profile?.firstName),
      wordmark: text(data.profile?.wordmark),
      initials: text(data.profile?.initials),
      email: text(data.profile?.email),
      phone: text(data.profile?.phone),
      role: text(data.profile?.role),
      location: text(data.profile?.location),
      tagline: text(data.profile?.tagline),
      photo: text(data.profile?.photo),
      photoCredit: text(data.profile?.photoCredit),
    },
    socials: array<Social>(data.profile?.socials).map((s) => ({
      label: text(s?.label),
      href: text(s?.href),
    })),
    stats: array<Stat>(data.about?.stats).map((s) => ({
      value: text(s?.value),
      label: text(s?.label),
    })),
    aboutInfo: array<AboutInfoItem>(data.about?.info).map((i) => ({
      term: text(i?.term),
      detail: text(i?.detail),
    })),
    aboutParagraphs: array<string>(data.about?.paragraphs),
    services: array<Service>(data.services),
    techStack: array<TechItem>(data.techStack),
    projects: array<Project>(data.projects).map(normalizeProject),
    certifications: array<Certification>(data.certifications),
    marqueeItems: array<MarqueeItem>(data.marquee),
  }
}

export const ContentContext = createContext<Content | null>(null)
