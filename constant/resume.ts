/**
 * Resume / portfolio data.
 * Source of truth for the About, Experience, and Skills sections.
 */

import { AboutContent, Certification, ContactInfo, EducationEntry, Experience, Reference, SkillCategory } from "@/types/resume";

export const CONTACT_INFO: ContactInfo = {
  name: "Joseph Mugisha",
  title: "Full-Stack & Mobile Developer",
  location: "Kigali, Rwanda",
  phone: "+250 792 418 795",
  email: "mugishajoseph092@gmail.com",
};

export const TAGLINE: string =
  "2+ years shipping production apps across hospitality, nonprofit, and education. Currently building Paibill — a hospitality inventory platform — with React, Next.js, and FastAPI.";

export const SUMMARY: string =
  "Full-Stack and Mobile App Developer with 2+ years of experience building and shipping production applications across hospitality, nonprofit, education, and mobile sectors. Solid expertise in JavaScript/TypeScript, React, Next.js, Node.js/Express.js, and FastAPI within modern full-stack stacks. Currently building Paibill, a hospitality inventory management platform, after delivering websites and internal systems for Children Might Foundation, cross-platform mobile apps at Igacode, and real-time learner dashboards at Posinnove, committed to aligning technology with real-world impact and continuous learning.";

export const ABOUT: AboutContent = {
  title: "About Me",
  paragraphs: [
    "I'm Joseph Mugisha, a full-stack developer based in Kigali. Over the past two years I've shipped production software across hospitality, education, and nonprofit work — internal management systems, cross-platform mobile apps, and real-time dashboards, built with React, Next.js, Node.js, and FastAPI.",
    "What keeps me interested isn't the stack — it's understanding the problem underneath a product, designing something people actually want to use, and building systems I'm not afraid to maintain a year from now.",
    "I'm not chasing technology for its own sake. I want to build things that solve real problems, create real value, and are genuinely enjoyable to use — and I'm still finding better ways to get there.",
  ],
  currentFocus: "Currently building Paibill — a hospitality inventory platform.",
};

export const EXPERIENCE: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Children Might Foundation",
    startDate: "Feb 2024",
    endDate: "May 2026",
    location: "Hybrid, Rwanda",
    highlights: [
      "Developed and maintained the organization's website and internal management systems, improving operational efficiency and digital service delivery.",
      "Designed and implemented scalable frontend and backend features, integrating secure APIs, databases, and authentication systems.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Posinnove",
    startDate: "Sept 2024",
    endDate: "Sept 2025",
    location: "Remote, Rwanda",
    highlights: [
      "Built and optimized reusable frontend components while collaborating with backend teams to integrate APIs and application features.",
      "Developed real-time dashboards and interactive experiences to improve learner and trainer engagement.",
    ],
  },
  {
    role: "Full-Stack Apprentice",
    company: "Andela",
    startDate: "Feb 2024",
    endDate: "Nov 2024",
    location: "Remote, Rwanda",
    highlights: [
      "Developed and tested full-stack applications, writing unit and integration tests to ensure reliability and maintainability.",
      "Built a full-stack blog application, implementing features across both frontend and backend components.",
    ],
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS"],
  },
  {
    category: "Libraries & Frameworks",
    items: [
      "React.js",
      "React Native",
      "Next.js",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Prisma",
      "Tailwind CSS",
      "NextUI",
      "Ant Design",
      "Shadcn UI",
      "Framer Motion",
      "Redux Toolkit",
      "TanStack Query",
    ],
  },
  {
    category: "Databases & APIs",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "Socket.IO",
    ],
  },
  {
    category: "Authentication & Services",
    items: ["Clerk", "Auth0", "Passport.js", "Firebase", "Cloudinary"],
  },
  {
    category: "Design Tools",
    items: ["Figma", "Photoshop"],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Andela Technical Leadership",
    issuer: "Andela",
    date: "Sept 2024",
    location: "Kigali, Rwanda",
  },
  {
    title: "Legacy JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "Sept 2023",
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    institution: "University of Rwanda",
    degree: "Bachelor's in Computer Engineering",
    date: "Jan 2023 — Present",
    location: "Kigali, Rwanda",
  },
];

export const REFERENCES: Reference[] = [
  {
    name: "Didas Mbalanya",
    role: "Technical Skills Engineering Manager",
    company: "Andela",
    contactAvailable: true,
  },
  {
    name: "Kakooza Douglas",
    role: "Founder",
    company: "Children Might Foundation",
    contactAvailable: true,
  },
];
