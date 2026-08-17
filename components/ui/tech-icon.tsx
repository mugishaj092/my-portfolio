import type { IconType } from "react-icons"
import {
  SiAntdesign,
  SiAuth0,
  SiClerk,
  SiCloudinary,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGraphql,
  SiHeroui,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPassport,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiReactquery,
  SiRedis,
  SiRedux,
  SiShadcnui,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"

/** Maps a tech-stack label (as written in constant/resume.ts) to its brand
 * icon. Labels with no entry here just render without an icon — this is
 * cosmetic only, never a source of truth. */
const TECH_ICONS: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  "React.js": SiReact,
  "React Native": SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  FastAPI: SiFastapi,
  Prisma: SiPrisma,
  "Tailwind CSS": SiTailwindcss,
  HeroUI: SiHeroui,
  "Ant Design": SiAntdesign,
  "Shadcn UI": SiShadcnui,
  "Framer Motion": SiFramer,
  "Redux Toolkit": SiRedux,
  "TanStack Query": SiReactquery,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  GraphQL: SiGraphql,
  "Socket.IO": SiSocketdotio,
  Clerk: SiClerk,
  Auth0: SiAuth0,
  "Passport.js": SiPassport,
  Firebase: SiFirebase,
  Cloudinary: SiCloudinary,
  Figma: SiFigma,
}

export interface TechIconProps {
  name: string
  className?: string
}

export function TechIcon({ name, className }: TechIconProps) {
  const Icon = TECH_ICONS[name]
  if (!Icon) return null
  return <Icon aria-hidden className={className} />
}

export default TechIcon
