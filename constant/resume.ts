/**
 * Resume / portfolio data.
 * Source of truth for the About, Experience, and Skills sections.
 */

import { Certification, ContactInfo, EducationEntry, Experience, SkillCategory } from "@/types/resume";
import { Reference } from "react";

export const CONTACT_INFO: ContactInfo = {
  name: "Joseph Mugisha",
  phone: "+250 792 418 795",
  email: "mugishajoseph092@gmail.com",
};

export const SUMMARY: string =
  "Full-Stack and Mobile App Developer with 2+ years of experience building and shipping production applications across hospitality, nonprofit, education, and mobile sectors. Solid expertise in JavaScript/TypeScript, React, Next.js, Node.js/Express.js, and FastAPI within modern full-stack stacks. Currently building Paibill, a hospitality inventory management platform, after delivering websites and internal systems for Children Might Foundation, cross-platform mobile apps at Igacode, and real-time learner dashboards at Posinnove, committed to aligning technology with real-world impact and continuous learning.";

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
