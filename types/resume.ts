import type { StaticImageData } from "next/image";

export interface ContactInfo {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
}

export interface Experience {
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    location: string;
    highlights: string[];
    /** Optional — technologies used in this role. Leave unset until confirmed; the UI shows an "add tech stack" placeholder instead of guessing. */
    techStack?: string[];
    /** Optional — the company's real website. Leave unset until confirmed; no link renders without one. */
    url?: string;
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export interface Certification {
    title: string;
    issuer: string;
    date: string;
    location?: string;
}

export interface EducationEntry {
    institution: string;
    degree: string;
    date: string;
    location: string;
}

export interface Reference {
    name: string;
    role: string;
    company: string;
    contactAvailable: boolean;
}

export interface AboutContent {
    title: string;
    paragraphs: string[];
    currentFocus: string;
}

export interface ProjectEntry {
    name: string;
    description: string;
    /** Logo/screenshot shown on the card — a StaticImageData from a local import. */
    image: StaticImageData;
    /** How the image fills its frame: "contain" (default) pads a square/transparent logo so nothing is cropped; "cover" fills the frame edge-to-edge, cropping as needed — use for wide screenshots. */
    imageFit?: "contain" | "cover";
    /** Optional — technologies used in this project. Leave unset until confirmed; no chips render without it. */
    techStack?: string[];
    /** Optional — live/deployed URL. Leave unset until confirmed; no "Live" button renders without one. */
    liveUrl?: string;
    /** Optional — public repo URL. Leave unset until confirmed; no "GitHub" button renders without one. */
    githubUrl?: string;
}
