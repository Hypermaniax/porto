// Brand marks from react-devicons (Devicon, MIT).
import type { ComponentType } from "react"
import JavascriptOriginalIcon from "react-devicons/javascript/original"
import TypescriptOriginalIcon from "react-devicons/typescript/original"
import Html5OriginalIcon from "react-devicons/html5/original"
import Css3OriginalIcon from "react-devicons/css3/original"
import ReactOriginalIcon from "react-devicons/react/original"
import NextjsOriginalIcon from "react-devicons/nextjs/original"
import VuejsOriginalIcon from "react-devicons/vuejs/original"
import TailwindcssOriginalIcon from "react-devicons/tailwindcss/original"
import PhpOriginalIcon from "react-devicons/php/original"
import LaravelOriginalIcon from "react-devicons/laravel/original"
import NodejsOriginalIcon from "react-devicons/nodejs/original"
import ExpressOriginalIcon from "react-devicons/express/original"
import MysqlOriginalIcon from "react-devicons/mysql/original"
import PostgresqlOriginalIcon from "react-devicons/postgresql/original"
import MongodbOriginalIcon from "react-devicons/mongodb/original"
import PrismaOriginalIcon from "react-devicons/prisma/original"
import GitOriginalIcon from "react-devicons/git/original"
import GithubOriginalIcon from "react-devicons/github/original"
import BitbucketOriginalIcon from "react-devicons/bitbucket/original"
import PostmanOriginalIcon from "react-devicons/postman/original"
import LinuxPlainIcon from "react-devicons/linux/plain"
import VercelOriginalIcon from "react-devicons/vercel/original"
import RailwayOriginalIcon from "react-devicons/railway/original"

export type TechIconComponent = ComponentType<{
  size?: number | string
  color?: string
  className?: string
  "aria-hidden"?: boolean | "true" | "false"
}>

export type TechSlug =
  | "javascript"
  | "typescript"
  | "html5"
  | "css3"
  | "react"
  | "nextdotjs"
  | "vuejs"
  | "tailwindcss"
  | "php"
  | "laravel"
  | "nodedotjs"
  | "express"
  | "mysql"
  | "postgresql"
  | "mongodb"
  | "prisma"
  | "git"
  | "github"
  | "bitbucket"
  | "postman"
  | "linux"
  | "vercel"
  | "railway"

export type TechLogoData = { title: string; Icon: TechIconComponent; color?: string }

export const techLogos: Record<TechSlug, TechLogoData> = {
  javascript: { title: "JavaScript", Icon: JavascriptOriginalIcon },
  typescript: { title: "TypeScript", Icon: TypescriptOriginalIcon },
  html5: { title: "HTML5", Icon: Html5OriginalIcon },
  css3: { title: "CSS3", Icon: Css3OriginalIcon },
  react: { title: "React", Icon: ReactOriginalIcon },
  nextdotjs: { title: "Next.js", Icon: NextjsOriginalIcon },
  vuejs: { title: "Vue.js", Icon: VuejsOriginalIcon },
  tailwindcss: { title: "Tailwind CSS", Icon: TailwindcssOriginalIcon },
  php: { title: "PHP", Icon: PhpOriginalIcon },
  laravel: { title: "Laravel", Icon: LaravelOriginalIcon },
  nodedotjs: { title: "Node.js", Icon: NodejsOriginalIcon },
  express: { title: "Express", Icon: ExpressOriginalIcon },
  mysql: { title: "MySQL", Icon: MysqlOriginalIcon },
  postgresql: { title: "PostgreSQL", Icon: PostgresqlOriginalIcon },
  mongodb: { title: "MongoDB", Icon: MongodbOriginalIcon },
  prisma: { title: "Prisma", Icon: PrismaOriginalIcon },
  git: { title: "Git", Icon: GitOriginalIcon },
  github: { title: "GitHub", Icon: GithubOriginalIcon },
  bitbucket: { title: "Bitbucket", Icon: BitbucketOriginalIcon },
  postman: { title: "Postman", Icon: PostmanOriginalIcon },
  linux: { title: "Linux CLI", Icon: LinuxPlainIcon },
  vercel: { title: "Vercel", Icon: VercelOriginalIcon },
  railway: { title: "Railway", Icon: RailwayOriginalIcon, color: "#0b0d0e" },
}
