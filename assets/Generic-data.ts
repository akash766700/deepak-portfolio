import { NavItem, ProfileData, WorkExperience, EducationItem } from "@/utils/type";

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

export const WORK_HISTORY: WorkExperience[] = [
  {
    company: "Paavan Chintan Dhara Ashram",
    role: "Senior Accountant",
    period: "Recent - Present",
    description:
      "Leading comprehensive financial accounting, institutional audits, trust compliances, and end-to-end ledger management with automated ERP workflows.",
    highlights: [
      "Head of financial reporting, statutory audits, and multi-tier bank reconciliations",
      "Streamlined budgeting, cash flow tracking, and automated MIS reporting",
      "Ensure 100% statutory compliance across GST, TDS, and institutional tax filings",
    ],
  },
  {
    company: "Bajaj Electronics",
    role: "Senior Accountant",
    period: "Past Experience",
    description:
      "Managed retail enterprise accounting, inventory financial valuation, vendor reconciliations, and sales tax/GST audit pipelines.",
    highlights: [
      "High-volume daily sales reconciliation, payment gateway audits, and vendor ledger management",
      "Implemented automated Excel MIS pipelines reducing report generation time by 40%",
      "Handled quarterly GST returns, input tax credit (ITC) claims, and statutory audit readiness",
    ],
  },
  {
    company: "Summercool",
    role: "Senior Accountant",
    period: "Past Experience",
    description:
      "Spearheaded manufacturing accounts, cost analysis, raw material ledger auditing, and supply chain accounts payable/receivable.",
    highlights: [
      "Handled factory accounts, production inventory reconciliation, and plant expenditure ledgers",
      "Managed end-to-end accounts payable/receivable cycles with zero reconciliation delay",
      "Collaborated with external chartered accountants for annual statutory audits",
    ],
  },
];

export const EDUCATION_DETAILED: EducationItem[] = [
  {
    degree: "Master of Commerce (M.Com)",
    field: "Advanced Financial Accounting & Corporate Taxation",
    level: "Postgraduate Degree",
  },
  {
    degree: "Master of Computer Applications (MCA)",
    field: "Computer Science, Database Management & Software Systems",
    level: "Postgraduate Degree",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    field: "Computer Applications, Programming & Data Structures",
    level: "Undergraduate Degree",
  },
  {
    degree: "Senior Secondary (12th)",
    field: "Commerce Stream with Mathematics & Accountancy",
    level: "Intermediate School",
  },
  {
    degree: "Secondary School (10th)",
    field: "General Academics & Foundation Studies",
    level: "High School",
  },
];

export const PROFILE_DATA: ProfileData & { ctaText: string } = {
  name: "Deepak Gupta",
  role: "Senior Accountant",
  age: 28,
  company: "Paavan Chintan Dhara Ashram",
  experienceYears: 10,
  companies: ["Paavan Chintan Dhara Ashram", "Bajaj Electronics", "Summercool"],
  workHistory: WORK_HISTORY,
  education: [
    "Master of Commerce (M.Com)",
    "Master of Computer Applications (MCA)",
    "Bachelor of Computer Applications (BCA)",
    "Senior Secondary (12th)",
    "Secondary School (10th)",
  ],
  educationDetailed: EDUCATION_DETAILED,
  skills: [
    "Financial Accounting & Reporting",
    "Tally Prime & ERP 9",
    "Statutory Audits & GST Compliance",
    "Advanced Excel, VLOOKUP & Pivot MIS",
    "Accounts Payable / Receivable (AP/AR)",
    "TDS, TCS & Income Tax Filings",
    "Budgeting & Cash Flow Forecasting",
    "IT Automation & Financial Workflows",
  ],
  headline: "10+ Years in Intelligent Financial Systems & Strategic Accounting",
  tagline:
    "Senior Accountant with 10+ years of high-volume financial accounting, auditing, and modern IT automation expertise across Summercool, Bajaj Electronics, and Paavan Chintan Dhara Ashram.",
  bio: "Senior Accountant with 10 years of extensive experience leading financial accounting and audits across Summercool, Bajaj Electronics, and Paavan Chintan Dhara Ashram. Possessing a unique hybrid background in Commerce and Computer Applications (M.Com, MCA, BCA), bridging the gap between rigorous financial compliance and automated IT workflows.",
  ctaText: "Get in Touch",
};
