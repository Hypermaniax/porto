// Gapungan logo INTI (tech-logos.ts) + logo TAMBAHAN (tech-logos-extra.ts)
// yang dikelompokkan untuk picker di form admin.
//
// Alur pembacaan: Admin memilih chip di sini → slug tersimpan di DB project
// → kartu/studi kasus merender logo mengikuti TechLogo yang juga mencari
// dari allTechs (jadi slug mana pun selalu punya gambar, tidak "?"-box).

import { techLogos } from "@/data/tech-logos"
import type { TechLogoData, TechSlug } from "@/data/tech-logos"

export type AnyTechSlug = TechSlug | (string & {})

// Lookup ikon dari inti (chunk publik). Slug tambahan dijawab oleh
// loader di bawah (techExtras), jadi bundle situs tidak menanggung
// 100+ logo tambahan.
export function techData(slug: string): TechLogoData | undefined {
  return techLogos[slug as TechSlug]
}

// Muat logo tambahan (chunk terpisah) dengan cache modul —
// sekali fetch untuk seluruh pemakai (form admin + TechLogo).
let extraCache: Promise<Record<string, TechLogoData>> | null = null
export function loadExtraTechs(): Promise<Record<string, TechLogoData>> {
  extraCache ??= import("@/data/tech-logos-extra").then(
    (mod) => mod.techExtras as unknown as Record<string, TechLogoData>,
  )
  return extraCache
}

// Pengelompokan picker — kategori sama dengan TechStack (FRONTEND/
// BACKEND/DATABASE/TOOLS).
export const techGroups: { label: string; slugs: string[] }[] = [
  {
    label: "FRONTEND",
    slugs: [
      // inti
      "html5", "css3", "javascript", "typescript", "react", "nextdotjs",
      "vuejs", "svelte", "vitejs", "tailwindcss",
      // tambahan: framework & UI
      "angular", "angularjs", "angularmaterial", "astro", "alpinejs",
      "backbonejs", "blazor", "bootstrap", "bulma", "ember", "elm",
      "framework7", "gatsby", "materializecss", "materialui", "mithril",
      "mobx", "ngrx", "nuxtjs", "p5js", "quasar", "qwik", "reactbootstrap",
      "reactrouter", "reactnavigation", "redux", "solidjs", "swiper",
      "threejs", "vuestorefront", "vuetify", "jquery", "handlebars",
      // tambahan: styling & tooling FE
      "babel", "d3js", "electron", "eslint", "foundation", "framermotion",
      "less", "plotly", "postcss", "rxjs", "sass", "storybook", "stylus",
      "webpack", "corejs",
      // tambahan: testing FE
      "cypressio", "jasmine", "jest", "karma", "mocha", "playwright", "vitest",
    ],
  },
  {
    label: "BACKEND",
    slugs: [
      // inti
      "php", "laravel", "nodedotjs", "express", "python", "go", "django",
      "firebase",
      // tambahan: framework Node/PHP
      "adonisjs", "cakephp", "codeigniter", "composer", "nestjs", "lumen",
      "phalcon", "yii", "zend", "krakenjs", "moleculer", "denojs",
      // tambahan: bahasa & framework lain
      "java", "kotlin", "ruby", "rails", "rust", "scala", "crystal", "elixir",
      "erlang", "perl", "lua", "dropwizard", "ecto", "hibernate", "ktor",
      "phoenix", "quarkus", "spring", "symfony", "vertx", "dot-net",
      "dotnetcore", "akka",
      // tambahan: API, infra & data pipeline
      "appwrite", "supabase", "cloudflareworkers", "fastapi", "fastify",
      "feathersjs", "flask", "graphql", "grpc", "socketio", "solidity",
      "swagger", "apacheairflow", "apachekafka", "rabbitmq", "sequelize",
    ],
  },
  {
    label: "DATABASE",
    slugs: [
      // inti
      "mysql", "postgresql", "mongodb", "prisma", "redis",
      // tambahan
      "cassandra", "couchbase", "couchdb", "dynamodb", "mariadb",
      "microsoftsqlserver", "neo4j", "oracle", "influxdb", "rocksdb",
      "sqlite", "yugabytedb", "azuresqldatabase", "faunadb", "realm",
    ],
  },
  {
    label: "TOOLS",
    slugs: [
      "git", "github", "bitbucket", "postman", "linux", "docker", "nginx",
      "vercel", "railway",
    ],
  },
]

// Slug → kategori (dipakai TechStack + pemeriksaan konsistensi).
export const categoryBySlug: Record<string, string> = Object.fromEntries(
  techGroups.flatMap((group) => group.slugs.map((slug) => [slug, group.label])),
)
