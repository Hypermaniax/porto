import type { TechSlug } from "@/data/tech-logos"

export const profile = {
  name: "Niko Agustio",
  firstName: "Niko",
  wordmark: "niko",
  initials: "N.",
  email: "nikoagustio22@gmail.com",
  phone: "+62 851-5603-0835",
  role: "Fullstack Developer",
  location: "Indonesia / GMT+7",
  tagline: "I build web apps end to end — database, API, and interface.",
  photo: "/portrait.svg",
  photoCredit: "PLACEHOLDER — SWAP IN YOUR OWN PORTRAIT",
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

export const navItems = ["SERVICES", "ABOUT", "STACK", "WORK", "CONTACT"]

export const stats = [
  { value: "03", label: "WEB APPS SHIPPED" },
  { value: "01+", label: "YEAR PRO EXPERIENCE" },
  { value: "S1", label: "INFORMATICS DEGREE" },
]

export const aboutInfo = [
  { term: "ROLE", detail: "Fullstack Developer" },
  { term: "FOCUS", detail: "Laravel · Node · React/Next" },
  { term: "BASED IN", detail: profile.location },
  { term: "EMAIL", detail: profile.email },
]

export const aboutParagraphs = [
  "I build modern, responsive, well-structured web applications — RESTful APIs and interactive interfaces using the JavaScript and PHP ecosystems.",
  "Strong on database management, MVC architecture, and frontend–backend integration, with a practical focus on clean, maintainable code.",
]

export type Service = {
  number: string
  title: string
  description: string
  tags: string[]
  stack: TechSlug[]
  color: AccentColor
}

export const services: Service[] = [
  {
    number: "01",
    title: "Fullstack Development",
    description:
      "End-to-end web applications — data model and REST APIs on the back, responsive React/Next interfaces on the front, wired together with clean, maintainable code.",
    tags: ["END-TO-END", "MVC", "REST API", "AUTH"],
    stack: ["laravel", "react", "nextdotjs", "typescript"],
    color: "yellow",
  },
  {
    number: "02",
    title: "Backend & APIs",
    description:
      "Secure RESTful APIs, JWT and role-based authentication, and well-structured databases built with Laravel and Node/Express — designed to be fast, consistent, and easy to extend.",
    tags: ["LARAVEL", "NODE.JS", "JWT", "RBAC"],
    stack: ["laravel", "nodedotjs", "express", "postgresql"],
    color: "blue",
  },
  {
    number: "03",
    title: "Frontend Engineering",
    description:
      "Responsive, accessible interfaces built with React, Next.js, and Tailwind CSS — integrated tightly with the backend and tuned for real-world performance.",
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

export type ProjectMetric = { value: string; label: string }

export type ProjectGalleryItem = {
  visual: ProjectVisual
  caption: string
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
  stack: TechSlug[]
  status: ProjectStatus
  color: AccentColor
  visual: ProjectVisual
  category: ProjectCategory
  liveUrl?: string
  repoUrl?: string
  challenge: string
  approach: string[]
  outcome: string
  metrics: ProjectMetric[]
  gallery: ProjectGalleryItem[]
}

export const projects: Project[] = [
  {
    number: "01",
    slug: "village-info-system",
    title: "Village Info System",
    subtitle: "A village administration platform for population data and reporting.",
    summary:
      "An end-to-end Village Information System handling population administration and reporting, built with Laravel and a React/Next.js frontend on secure, integrated REST APIs.",
    year: "2025",
    role: "Junior Fullstack Developer",
    timeline: "Jun 2025 – Jul 2026 · CV Summit Citra Teknologi",
    tags: ["LARAVEL", "NEXT.JS", "REST API", "RBAC"],
    stack: ["laravel", "nextdotjs", "typescript", "mysql"],
    status: "LIVE",
    color: "mint",
    visual: "dashboard",
    category: "FULLSTACK",
    challenge:
      "Village offices tracked residents and reports across scattered spreadsheets and paper forms, so data was slow to update and hard to trust. The system needed one reliable source of truth, role-based access for staff, and reporting officials could actually use.",
    approach: [
      "Built the backend in Laravel with a clean MVC structure and a relational database for population records.",
      "Exposed secure, integrated RESTful APIs consumed by a responsive React/Next.js interface.",
      "Implemented RBAC authentication and authorization so each role only sees what it should.",
      "Optimized database queries and application performance, then handled ongoing maintenance and bug fixes.",
    ],
    outcome:
      "The village now runs population administration and reporting on a single, secure system, with staff working from accurate data instead of spreadsheets.",
    metrics: [
      { value: "RBAC", label: "access control" },
      { value: "REST", label: "integrated APIs" },
      { value: "MySQL", label: "relational data" },
    ],
    gallery: [
      { visual: "dashboard", caption: "Population admin dashboard" },
      { visual: "listing", caption: "Resident records & reports" },
    ],
  },
  {
    number: "02",
    slug: "venue-rental",
    title: "Venue Rental",
    subtitle: "A web app for browsing and booking venues online.",
    summary:
      "A fullstack venue rental application with JWT authentication, RESTful CRUD APIs, and a responsive listing catalog, deployed across Vercel and Railway.",
    year: "2025",
    role: "Fullstack Developer",
    timeline: "Dec 2024 – May 2025 · Personal project",
    tags: ["REACT", "NODE.JS", "MONGODB", "JWT"],
    stack: ["react", "nodedotjs", "express", "mongodb", "tailwindcss"],
    status: "LIVE",
    color: "blue",
    visual: "listing",
    category: "FULLSTACK",
    challenge:
      "Booking a venue usually means phone calls and DMs. I wanted a self-serve experience where people can browse listings, see details, and book — with accounts secured properly and the app reliable once deployed.",
    approach: [
      "Built the API in Node.js/Express with RESTful endpoints for CRUD operations.",
      "Added JWT-based authentication and account handling.",
      "Designed a responsive listing catalog with React and Tailwind CSS.",
      "Integrated MongoDB, then deployed the frontend on Vercel and the backend on Railway.",
    ],
    outcome:
      "A working fullstack app that lists venues, handles authenticated bookings through a clean API, and stays stable across a split frontend/backend deployment.",
    metrics: [
      { value: "JWT", label: "authentication" },
      { value: "CRUD", label: "REST endpoints" },
      { value: "2", label: "cloud platforms" },
    ],
    gallery: [
      { visual: "listing", caption: "Responsive listing catalog" },
      { visual: "booking", caption: "Authenticated booking flow" },
    ],
  },
  {
    number: "03",
    slug: "ticket-booking",
    title: "Ticket Booking",
    subtitle: "A scheduled ticket booking system with WhatsApp confirmation.",
    summary:
      "A team-built ticket booking system with scheduled slots, WhatsApp-based confirmation, and RESTful CRUD APIs, shipped with a responsive JavaScript and Tailwind UI.",
    year: "2024",
    role: "Frontend Developer",
    timeline: "Jun 2024 · Team project",
    tags: ["JAVASCRIPT", "TAILWIND", "JWT", "REST API"],
    stack: ["javascript", "tailwindcss", "mongodb", "vercel"],
    status: "LIVE",
    color: "pink",
    visual: "booking",
    category: "FRONTEND",
    challenge:
      "Bookings were being confirmed manually over chat, which was error-prone and hard to scale. The team needed a simple system to schedule tickets and confirm them automatically.",
    approach: [
      "Collaborated with the team to build a scheduled ticket booking flow.",
      "Integrated WhatsApp-based confirmation workflows into the booking process.",
      "Connected RESTful APIs for CRUD operations and JWT authentication with MongoDB.",
      "Built the responsive interface in JavaScript and Tailwind CSS, deployed on Vercel.",
    ],
    outcome:
      "Bookings moved from manual chat confirmations to a scheduled, automated flow the team could run and maintain together.",
    metrics: [
      { value: "Team", label: "collaboration" },
      { value: "JWT", label: "authentication" },
      { value: "WA", label: "confirmation flow" },
    ],
    gallery: [
      { visual: "booking", caption: "Scheduled ticket flow" },
      { visual: "dashboard", caption: "Booking overview" },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export type Certification = {
  title: string
  issuer: string
  date: string
  color: AccentColor
}

export const certifications: Certification[] = [
  {
    title: "Bachelor of Informatics",
    issuer: "Universitas Amikom Yogyakarta",
    date: "2022 – 2026",
    color: "blue",
  },
  {
    title: "Industrial Automation Engineering",
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
