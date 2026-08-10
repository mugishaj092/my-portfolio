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
