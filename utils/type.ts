export interface NavItem {
  label: string;
  href: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period?: string;
  location?: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution?: string;
  field: string;
  year?: string;
  level: string;
}

export interface ProfileData {
  name: string;
  role: string;
  age: number;
  company: string;
  experienceYears: number;
  companies: string[];
  workHistory: WorkExperience[];
  education: string[];
  educationDetailed: EducationItem[];
  skills: string[];
  bio: string;
  headline: string;
  tagline: string;
  contactEmail?: string;
  phone?: string;
  location?: string;
}

export interface CaseStudySlide {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  stats: {
    value: string;
    label: string;
  }[];
}

export interface IntegrationItem {
  id: string;
  name: string;
  category?: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export interface VideoCardItem {
  id: string;
  title: string;
  image: string;
  videoUrl: string;
}

export interface FAQItemData {
  number: string;
  question: string;
  answer: string;
}

export interface StepItemData {
  number: string;
  title: string;
  description: string;
  side: "left" | "right";
}
