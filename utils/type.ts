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
