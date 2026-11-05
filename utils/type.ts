export interface NavItem {
  label: string;
  href: string;
}

export interface ProfileData {
  name: string;
  role: string;
  age: number;
  company: string;
  experienceYears: number;
  education: string[];
  skills: string[];
  bio: string;
  headline: string;
  tagline: string;
  contactEmail?: string;
  phone?: string;
  location?: string;
}

