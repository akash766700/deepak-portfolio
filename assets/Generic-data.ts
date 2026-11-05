import { NavItem, ProfileData } from "@/utils/type";

export const NAV_LINKS_COL1: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
];

export const NAV_LINKS_COL2: NavItem[] = [
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#experience" },
  { label: "IT & Tech", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const NAV_ITEMS: NavItem[] = [...NAV_LINKS_COL1, ...NAV_LINKS_COL2];

export const PROFILE_DATA: ProfileData & { ctaText: string } = {
  name: "Deepak Gupta",
  role: "Senior Accountant",
  age: 28,
  company: "Pawan Chintan Dhara Ashram",
  experienceYears: 8,
  headline: "Intelligent Financial Systems & Strategic Accounting",
  tagline: "Senior Accountant with 8+ years of high-volume financial accounting, auditing, and modern IT automation expertise.",
  bio: "Senior Accountant with 8 years of dedicated experience leading financial accounting and audits at Pawan Chintan Dhara Ashram. Possessing a unique hybrid background in Commerce and Computer Applications (M.Com, MCA, BCA), bridging the gap between rigorous financial compliance and automated IT workflows.",
  education: [
    "Master of Commerce (M.Com)",
    "Master of Computer Applications (MCA)",
    "Bachelor of Computer Applications (BCA)",
  ],
  skills: [
    "Financial Accounting",
    "Tally Prime & ERP9",
    "Statutory Audits & GST",
    "Advanced Excel & MIS",
    "Budgeting & Cash Flow",
    "IT Automation & Workflows",
  ],
  ctaText: "Get in Touch",
};
