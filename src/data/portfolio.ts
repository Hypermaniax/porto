import type { TechSlug } from "@/data/tech-logos"
import type { L10n } from "@/i18n/use-lang"

export const profile = {
  name: "Niko Agustio",
  firstName: "Niko",
  wordmark: "niko",
  initials: "N.",
  email: "nikoagustio22@gmail.com",
  phone: "+62 851-5603-0835",
  role: {
    en: "Fullstack Developer",
    id: "Pengembang Fullstack",
  } satisfies L10n,
  location: "Indonesia / GMT+7",
  tagline: {
    en: "I build web apps end to end — database, API, and interface.",
    id: "Aku membangun aplikasi web end to end — database, API, dan antarmuka.",
  } satisfies L10n,
  photo: "/portrait.png",
  photoCredit: {
    en: "PERSONAL PORTRAIT",
    id: "POTRET PRIBADI",
  } satisfies L10n,
}

export type AccentColor = "yellow" | "blue" | "pink" | "mint"

export const accentColorClass: Record<AccentColor, string> = {
  yellow: "bg-yellow text-black",
  blue: "bg-blue text-white",
  pink: "bg-pink text-black",
  mint: "bg-mint text-black",
}

export const misprintColor: Record<AccentColor, string> = {
  yellow: "#2b50ff",
  blue: "#ff3d81",
  pink: "#ffe600",
  mint: "#ff3d81",
}

export const socials = [
  { label: "GITHUB", href: "https://github.com/nikoagustio" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/nikoagustio" },
]

export const navItems: { id: string; label: L10n }[] = [
  { id: "services", label: { en: "SERVICES", id: "LAYANAN" } },
  { id: "about", label: { en: "ABOUT", id: "TENTANG" } },
  { id: "stack", label: { en: "STACK", id: "STACK" } },
  { id: "work", label: { en: "WORK", id: "KARYA" } },
  { id: "contact", label: { en: "CONTACT", id: "KONTAK" } },
]

export const stats: { value: string; label: L10n }[] = [
  {
    value: "03",
    label: { en: "WEB APPS SHIPPED", id: "WEB APPS DIRILIS" },
  },
  {
    value: "01+",
    label: { en: "YEAR PRO EXPERIENCE", id: "TAHUN PENGALAMAN PRO" },
  },
  {
    value: "S1",
    label: { en: "INFORMATICS DEGREE", id: "SARJANA INFORMATIKA" },
  },
]

export const aboutInfo: { term: L10n; detail: L10n }[] = [
  {
    term: { en: "ROLE", id: "PERAN" },
    detail: { en: "Fullstack Developer", id: "Pengembang Fullstack" },
  },
  {
    term: { en: "FOCUS", id: "FOKUS" },
    detail: { en: "Laravel · Node · React/Next", id: "Laravel · Node · React/Next" },
  },
  {
    term: { en: "BASED IN", id: "LOKASI" },
    detail: { en: profile.location, id: profile.location },
  },
  {
    term: { en: "EMAIL", id: "EMAIL" },
    detail: { en: profile.email, id: profile.email },
  },
]

export const aboutParagraphs: L10n[] = [
  {
    en: "I build modern, responsive, well-structured web applications — RESTful APIs and interactive interfaces using the JavaScript and PHP ecosystems.",
    id: "Aku membangun aplikasi web modern, responsif, dan berstruktur rapi — RESTful API dan antarmuka interaktif di ekosistem JavaScript dan PHP.",
  },
  {
    en: "Strong on database management, MVC architecture, and frontend–backend integration, with a practical focus on clean, maintainable code.",
    id: "Kuat di pengelolaan database, arsitektur MVC, dan integrasi frontend–backend, dengan fokus praktis pada kode yang bersih dan mudah dirawat.",
  },
]

export type Service = {
  number: string
  title: L10n
  description: L10n
  tags: string[]
  stack: TechSlug[]
  color: AccentColor
}

export const services: Service[] = [
  {
    number: "01",
    title: { en: "Fullstack Development", id: "Pengembangan Fullstack" },
    description: {
      en: "End-to-end web applications — data model and REST APIs on the back, responsive React/Next interfaces on the front, wired together with clean, maintainable code.",
      id: "Aplikasi web end-to-end — model data dan REST API di belakang, antarmuka React/Next responsif di depan, diikat dengan kode yang bersih dan mudah dirawat.",
    },
    tags: ["END-TO-END", "MVC", "REST API", "AUTH"],
    stack: ["laravel", "react", "nextdotjs", "typescript"],
    color: "yellow",
  },
  {
    number: "02",
    title: { en: "Backend & APIs", id: "Backend & API" },
    description: {
      en: "Secure RESTful APIs, JWT and role-based authentication, and well-structured databases built with Laravel and Node/Express — designed to be fast, consistent, and easy to extend.",
      id: "RESTful API yang aman, autentikasi JWT dan RBAC, serta database berstruktur baik dengan Laravel dan Node/Express — dirancang cepat, konsisten, dan mudah dikembangkan.",
    },
    tags: ["LARAVEL", "NODE.JS", "JWT", "RBAC"],
    stack: ["laravel", "nodedotjs", "express", "postgresql"],
    color: "blue",
  },
  {
    number: "03",
    title: { en: "Frontend Engineering", id: "Rekayasa Frontend" },
    description: {
      en: "Responsive, accessible interfaces built with React, Next.js, and Tailwind CSS — integrated tightly with the backend and tuned for real-world performance.",
      id: "Antarmuka responsif dan aksesibel dengan React, Next.js, dan Tailwind CSS — terintegrasi erat dengan backend dan di-tune untuk performa nyata.",
    },
    tags: ["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND"],
    stack: ["react", "nextdotjs", "tailwindcss", "typescript"],
    color: "pink",
  },
]

export type TechCategory = "FRONTEND" | "BACKEND" | "DATABASE" | "TOOLS"

export const techCategories: TechCategory[] = [
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "TOOLS",
]

export const techCategoryColor: Record<TechCategory, AccentColor> = {
  FRONTEND: "blue",
  BACKEND: "mint",
  DATABASE: "yellow",
  TOOLS: "pink",
}

export type TechItem = {
  name: string
  slug: TechSlug
  category: TechCategory
}

export const techStack: TechItem[] = [
  { name: "JavaScript", slug: "javascript", category: "FRONTEND" },
  { name: "TypeScript", slug: "typescript", category: "FRONTEND" },
  { name: "React", slug: "react", category: "FRONTEND" },
  { name: "Next.js", slug: "nextdotjs", category: "FRONTEND" },
  { name: "Vue.js", slug: "vuejs", category: "FRONTEND" },
  { name: "Tailwind CSS", slug: "tailwindcss", category: "FRONTEND" },
  { name: "HTML5", slug: "html5", category: "FRONTEND" },
  { name: "CSS3", slug: "css3", category: "FRONTEND" },
  { name: "PHP", slug: "php", category: "BACKEND" },
  { name: "Laravel", slug: "laravel", category: "BACKEND" },
  { name: "Node.js", slug: "nodedotjs", category: "BACKEND" },
  { name: "Express", slug: "express", category: "BACKEND" },
  { name: "MySQL", slug: "mysql", category: "DATABASE" },
  { name: "PostgreSQL", slug: "postgresql", category: "DATABASE" },
  { name: "MongoDB", slug: "mongodb", category: "DATABASE" },
  { name: "Git", slug: "git", category: "TOOLS" },
  { name: "GitHub", slug: "github", category: "TOOLS" },
  { name: "Bitbucket", slug: "bitbucket", category: "TOOLS" },
  { name: "Postman", slug: "postman", category: "TOOLS" },
  { name: "Linux CLI", slug: "linux", category: "TOOLS" },
  { name: "Vercel", slug: "vercel", category: "TOOLS" },
  { name: "Railway", slug: "railway", category: "TOOLS" },
]

export type ProjectCategory = "FULLSTACK" | "FRONTEND"

export const projectCategories: ("ALL" | ProjectCategory)[] = [
  "ALL",
  "FULLSTACK",
  "FRONTEND",
]

export type ProjectStatus = "LIVE" | "PRELAUNCH"

export type ProjectVisual = "dashboard" | "listing" | "booking"

export type ProjectMetric = { value: string; label: L10n }

export type ProjectGalleryItem = {
  visual: ProjectVisual
  caption: L10n
}

export type Project = {
  number: string
  slug: string
  title: string
  subtitle: L10n
  summary: L10n
  year: string
  role: L10n
  timeline: string
  tags: string[]
  stack: TechSlug[]
  status: ProjectStatus
  color: AccentColor
  visual: ProjectVisual
  category: ProjectCategory
  liveUrl?: string
  repoUrl?: string
  challenge: L10n
  approach: L10n[]
  outcome: L10n
  metrics: ProjectMetric[]
  gallery: ProjectGalleryItem[]
}

export const projects: Project[] = [
  {
    number: "01",
    slug: "village-info-system",
    title: "Village Info System",
    subtitle: {
      en: "A village administration platform for population data and reporting.",
      id: "Platform administrasi desa untuk data kependudukan dan pelaporan.",
    },
    summary: {
      en: "An end-to-end Village Information System handling population administration and reporting, built with Laravel and a React/Next.js frontend on secure, integrated REST APIs.",
      id: "Sistem Informasi Desa end-to-end untuk administrasi kependudukan dan pelaporan, dibangun dengan Laravel dan frontend React/Next.js di atas REST API yang aman dan terintegrasi.",
    },
    year: "2025",
    role: { en: "Junior Fullstack Developer", id: "Pengembang Fullstack Junior" },
    timeline: "Jun 2025 – Jul 2026 · CV Summit Citra Teknologi",
    tags: ["LARAVEL", "NEXT.JS", "REST API", "RBAC"],
    stack: ["laravel", "nextdotjs", "typescript", "mysql"],
    status: "LIVE",
    color: "mint",
    visual: "dashboard",
    category: "FULLSTACK",
    challenge: {
      en: "Village offices tracked residents and reports across scattered spreadsheets and paper forms, so data was slow to update and hard to trust. The system needed one reliable source of truth, role-based access for staff, and reporting officials could actually use.",
      id: "Kantor desa mencatat penduduk dan laporan lintas spreadsheet dan formulir kertas yang berserakan, sehingga data lambat diperbarui dan sulit dipercaya. Sistem ini butuh satu sumber kebenaran yang andal, akses berbasis peran untuk staf, dan pelaporan yang benar-benar bisa dipakai petugas.",
    },
    approach: [
      {
        en: "Built the backend in Laravel with a clean MVC structure and a relational database for population records.",
        id: "Membangun backend Laravel berstruktur MVC bersih dengan database relasional untuk data kependudukan.",
      },
      {
        en: "Exposed secure, integrated RESTful APIs consumed by a responsive React/Next.js interface.",
        id: "Menyediakan RESTful API yang aman dan terintegrasi, dikonsumsi antarmuka responsif React/Next.js.",
      },
      {
        en: "Implemented RBAC authentication and authorization so each role only sees what it should.",
        id: "Menerapkan autentikasi dan otorisasi RBAC agar tiap peran hanya melihat yang seharusnya.",
      },
      {
        en: "Optimized database queries and application performance, then handled ongoing maintenance and bug fixes.",
        id: "Mengoptimalkan query database dan performa aplikasi, lalu menangani pemeliharaan serta perbaikan bug berjalan.",
      },
    ],
    outcome: {
      en: "The village now runs population administration and reporting on a single, secure system, with staff working from accurate data instead of spreadsheets.",
      id: "Kini desa menjalankan administrasi kependudukan dan pelaporan di satu sistem yang aman, dengan staf bekerja dari data akurat alih-alih spreadsheet.",
    },
    metrics: [
      { value: "RBAC", label: { en: "access control", id: "kontrol akses" } },
      { value: "REST", label: { en: "integrated APIs", id: "API terintegrasi" } },
      { value: "MySQL", label: { en: "relational data", id: "data relasional" } },
    ],
    gallery: [
      {
        visual: "dashboard",
        caption: {
          en: "Population admin dashboard",
          id: "Dashboard admin kependudukan",
        },
      },
      {
        visual: "listing",
        caption: {
          en: "Resident records & reports",
          id: "Data penduduk & laporan",
        },
      },
    ],
  },
  {
    number: "02",
    slug: "venue-rental",
    title: "Venue Rental",
    subtitle: {
      en: "A web app for browsing and booking venues online.",
      id: "Aplikasi web untuk menjelajah dan memesan venue secara online.",
    },
    summary: {
      en: "A fullstack venue rental application with JWT authentication, RESTful CRUD APIs, and a responsive listing catalog, deployed across Vercel and Railway.",
      id: "Aplikasi fullstack penyewaan venue dengan autentikasi JWT, RESTful CRUD API, dan katalog listing responsif, dideploy lintas Vercel dan Railway.",
    },
    year: "2025",
    role: { en: "Fullstack Developer", id: "Pengembang Fullstack" },
    timeline: "Dec 2024 – May 2025 · Personal project",
    tags: ["REACT", "NODE.JS", "MONGODB", "JWT"],
    stack: ["react", "nodedotjs", "express", "mongodb", "tailwindcss"],
    status: "LIVE",
    color: "blue",
    visual: "listing",
    category: "FULLSTACK",
    challenge: {
      en: "Booking a venue usually means phone calls and DMs. I wanted a self-serve experience where people can browse listings, see details, and book — with accounts secured properly and the app reliable once deployed.",
      id: "Memesan venue biasanya berarti telepon dan DM. Aku ingin pengalaman mandiri: orang bisa menjelajah listing, melihat detail, lalu booking — dengan akun yang diamankan dengan benar dan aplikasi yang stabil setelah deploy.",
    },
    approach: [
      {
        en: "Built the API in Node.js/Express with RESTful endpoints for CRUD operations.",
        id: "Membangun API di Node.js/Express dengan endpoint RESTful untuk operasi CRUD.",
      },
      {
        en: "Added JWT-based authentication and account handling.",
        id: "Menambahkan autentikasi berbasis JWT dan pengelolaan akun.",
      },
      {
        en: "Designed a responsive listing catalog with React and Tailwind CSS.",
        id: "Merancang katalog listing responsif dengan React dan Tailwind CSS.",
      },
      {
        en: "Integrated MongoDB, then deployed the frontend on Vercel and the backend on Railway.",
        id: "Mengintegrasikan MongoDB, lalu men-deploy frontend di Vercel dan backend di Railway.",
      },
    ],
    outcome: {
      en: "A working fullstack app that lists venues, handles authenticated bookings through a clean API, and stays stable across a split frontend/backend deployment.",
      id: "Aplikasi fullstack yang berfungsi: menampilkan venue, menangani booking terautentikasi lewat API yang bersih, dan tetap stabil lintas deployment frontend/backend yang terpisah.",
    },
    metrics: [
      { value: "JWT", label: { en: "authentication", id: "autentikasi" } },
      { value: "CRUD", label: { en: "REST endpoints", id: "endpoint REST" } },
      { value: "2", label: { en: "cloud platforms", id: "platform cloud" } },
    ],
    gallery: [
      {
        visual: "listing",
        caption: {
          en: "Responsive listing catalog",
          id: "Katalog listing responsif",
        },
      },
      {
        visual: "booking",
        caption: {
          en: "Authenticated booking flow",
          id: "Alur booking terautentikasi",
        },
      },
    ],
  },
  {
    number: "03",
    slug: "ticket-booking",
    title: "Ticket Booking",
    subtitle: {
      en: "A scheduled ticket booking system with WhatsApp confirmation.",
      id: "Sistem booking tiket terjadwal dengan konfirmasi WhatsApp.",
    },
    summary: {
      en: "A team-built ticket booking system with scheduled slots, WhatsApp-based confirmation, and RESTful CRUD APIs, shipped with a responsive JavaScript and Tailwind UI.",
      id: "Sistem booking tiket karya tim dengan slot terjadwal, konfirmasi berbasis WhatsApp, dan RESTful CRUD API, dirilis dengan UI JavaScript dan Tailwind yang responsif.",
    },
    year: "2024",
    role: { en: "Frontend Developer", id: "Pengembang Frontend" },
    timeline: "Jun 2024 · Team project",
    tags: ["JAVASCRIPT", "TAILWIND", "JWT", "REST API"],
    stack: ["javascript", "tailwindcss", "mongodb", "vercel"],
    status: "LIVE",
    color: "pink",
    visual: "booking",
    category: "FRONTEND",
    challenge: {
      en: "Bookings were being confirmed manually over chat, which was error-prone and hard to scale. The team needed a simple system to schedule tickets and confirm them automatically.",
      id: "Booking dikonfirmasi manual lewat chat, rawan salah dan sulit dikembangkan. Tim butuh sistem sederhana untuk menjadwalkan tiket dan mengonfirmasinya secara otomatis.",
    },
    approach: [
      {
        en: "Collaborated with the team to build a scheduled ticket booking flow.",
        id: "Berkolaborasi dengan tim membangun alur booking tiket terjadwal.",
      },
      {
        en: "Integrated WhatsApp-based confirmation workflows into the booking process.",
        id: "Mengintegrasikan alur konfirmasi berbasis WhatsApp ke dalam proses booking.",
      },
      {
        en: "Connected RESTful APIs for CRUD operations and JWT authentication with MongoDB.",
        id: "Menghubungkan RESTful API untuk operasi CRUD dan autentikasi JWT dengan MongoDB.",
      },
      {
        en: "Built the responsive interface in JavaScript and Tailwind CSS, deployed on Vercel.",
        id: "Membangun antarmuka responsif dengan JavaScript dan Tailwind CSS, di-deploy di Vercel.",
      },
    ],
    outcome: {
      en: "Bookings moved from manual chat confirmations to a scheduled, automated flow the team could run and maintain together.",
      id: "Booking berpindah dari konfirmasi chat manual ke alur terjadwal dan terotomatisasi yang bisa dijalankan dan dirawat tim bersama.",
    },
    metrics: [
      { value: "Team", label: { en: "collaboration", id: "kolaborasi" } },
      { value: "JWT", label: { en: "authentication", id: "autentikasi" } },
      { value: "WA", label: { en: "confirmation flow", id: "alur konfirmasi" } },
    ],
    gallery: [
      {
        visual: "booking",
        caption: {
          en: "Scheduled ticket flow",
          id: "Alur tiket terjadwal",
        },
      },
      {
        visual: "dashboard",
        caption: {
          en: "Booking overview",
          id: "Ringkasan booking",
        },
      },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export type Certification = {
  title: L10n
  issuer: string
  date: string
  color: AccentColor
}

export const certifications: Certification[] = [
  {
    title: { en: "Bachelor of Informatics", id: "Sarjana Informatika" },
    issuer: "Universitas Amikom Yogyakarta",
    date: "2022 – 2026",
    color: "blue",
  },
  {
    title: {
      en: "Industrial Automation Engineering",
      id: "Teknik Otomasi Industri",
    },
    issuer: "SMKN 3 Tanjung Pinang",
    date: "2017 – 2021",
    color: "mint",
  },
]

export type MarqueeItem = { label: string; slug?: TechSlug }

export const marqueeItems: MarqueeItem[] = [
  { label: "LARAVEL", slug: "laravel" },
  { label: "REACT", slug: "react" },
  { label: "NEXT.JS", slug: "nextdotjs" },
  { label: "NODE.JS", slug: "nodedotjs" },
  { label: "TYPESCRIPT", slug: "typescript" },
  { label: "POSTGRESQL", slug: "postgresql" },
  { label: "REST APIS" },
  { label: "MONGODB", slug: "mongodb" },
]
