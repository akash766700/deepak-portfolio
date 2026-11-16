import {
  NavItem,
  ProfileData,
  WorkExperience,
  EducationItem,
  CaseStudySlide,
  IntegrationItem,
  TestimonialItem,
  VideoCardItem,
  FAQItemData,
  StepItemData,
} from "@/utils/type";

// ============================================================================
// 1. NAVIGATION DATA
// ============================================================================
export const NAV_LINKS_COL1: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
];

export const NAV_LINKS_COL2: NavItem[] = [
  { label: "Case Studies", href: "#case-studies" },
  { label: "Ecosystem", href: "#integrations" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export const NAV_ITEMS: NavItem[] = [...NAV_LINKS_COL1, ...NAV_LINKS_COL2];

// ============================================================================
// 2. WORK EXPERIENCE & EDUCATION
// ============================================================================
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

// ============================================================================
// 3. HERO SECTION CONTENT
// ============================================================================
export const HERO_DATA = {
  greetings: ["Hey,", "Hola,", "Halo,", "नमस्ते,", "Hello,"],
  namePrefix: "I'm",
  name: "Deepak Gupta.",
  headlinePrefix: "Making finance less complicated and technology",
  headlineHighlight: "more meaningful.",
  descriptionLine1:
    "Senior Accountant with 10+ years of financial leadership and statutory audit expertise.",
  descriptionLine2:
    "Bridging Commerce & Computer Applications (M.Com, MCA, BCA) for modern automated reporting.",
};

// ============================================================================
// 4. ABOUT STATEMENT SECTION CONTENT
// ============================================================================
export const ABOUT_STATEMENT_DATA = {
  badgeNumber: "001",
  badgeLabel: "ABOUT STATEMENT",
  statement:
    "Backed by 10+ years of financial leadership, I blend rigorous statutory accounting with intelligent IT automation — turning complex numbers into streamlined, audit-ready growth.",
  videoCard: {
    title: "10+ Years Financial Leadership",
    subtitle: "Watch Executive Overview",
    videoUrl: "https://www.youtube.com/embed/8AHPXm9Y6mI?autoplay=1",
    poster: "/assets/about/video-preview-poster.png",
  },
  marqueeMetrics: [
    { value: "10+", label: "YEARS EXPERIENCE" },
    { value: "100%", label: "AUDIT COMPLIANCE" },
    { value: "5X", label: "FASTER MIS REPORTING" },
    { value: "80%", label: "PRODUCTIVITY BOOST" },
    { value: "0%", label: "RECONCILIATION ERROR" },
  ],
};

// ============================================================================
// 5. WHY CHOOSE SECTION CONTENT
// ============================================================================
export const WHY_CHOOSE_DATA = {
  badgeNumber: "002",
  badgeLabel: "WHY CHOOSE ME?",
  title: "Why Choose Me?",
  cards: [
    {
      step: "01",
      title: "Audit-Ready Financial Rigor",
      description:
        "100% statutory compliance, flawless GST & TDS filings, and zero-error ledger reconciliation.",
      icon: "star" as const,
    },
    {
      step: "02",
      title: "Finance + IT Automation",
      description:
        "Rare dual M.Com & MCA edge delivering automated MIS pipelines, 5x faster reporting, and ERP workflows.",
      icon: "rocket" as const,
    },
    {
      step: "03",
      title: "10+ Years Proven Leadership",
      description:
        "Battle-tested accounting across manufacturing (Summercool), retail (Bajaj), and trusts (Paavan Ashram).",
      icon: "modular" as const,
    },
  ],
};

// ============================================================================
// 6. CAPABILITIES SECTION CONTENT
// ============================================================================
export const CAPABILITIES_DATA = {
  badgeNumber: "003",
  badgeLabel: "CAPABILITIES",
  title: "Our Financial & Automation Services",
  card1: {
    title: "Automated Financial & ERP Workflows.",
    description:
      "Streamline multi-tier financial operations across manufacturing, retail, and institutions using intelligent Tally Prime & ERP logic.",
    checklist: [
      "End-to-end ledger mapping & auto-vouchering",
      "Real-time Tally Prime & ERP 9 integration",
      "100% audit-validated statutory reporting",
    ],
  },
  card2: {
    title: "Real-Time Advisory & Support.",
    description:
      "Direct access to experienced senior accountant for GST notices, banking compliance, and financial strategy.",
  },
  card3: {
    title: "Multi-Enterprise Ledger & AP/AR.",
    description:
      "Comprehensive vendor aging analysis, debtor management, and cash flow control across retail and plants.",
  },
  card4: {
    title: "Automated MIS & Financial Dashboards.",
    description:
      "Tailored monthly P&L, balance sheets, and key financial ratios delivered with zero delay.",
  },
  card5: {
    title: "Automated Statutory Alerts.",
    description:
      "Proactive tracking for GST, TDS, advance tax, and annual filing deadlines with zero penalty.",
  },
  card6: {
    title: "Direct Leadership Consultation.",
    description:
      "Connect directly with Deepak Gupta. 10+ years optimizing multi-crore balance sheets, statutory tax compliance, and automated accounting workflows.",
    ctaText: "Schedule a Consultation",
  },
  card7: {
    title: "Statutory Rigor Across 3 Key Sectors",
    sectors: [
      { name: "Manufacturing", desc: "Raw material costing & plant AP/AR" },
      { name: "Retail Networks", desc: "Multi-store reconciliations & GST" },
      { name: "Institutional Trusts", desc: "Statutory audits & donor ledgers" },
      { name: "Corporate Finance", desc: "ERP automation & MIS analytics" },
    ],
  },
};

// ============================================================================
// 7. PROCESS STEPPER SECTION CONTENT
// ============================================================================
export const PROCESS_STEPS_DATA = {
  badgeNumber: "004",
  badgeLabel: "HOW WE WORK",
  title: "How We Work",
  steps: [
    {
      number: "01",
      title: "Discovery & Financial Audit",
      description:
        "We analyze your multi-entity ledgers, voucher pipelines, and compliance bottlenecks to map an error-free financial structure.",
      side: "left" as const,
      iconType: "search" as const,
    },
    {
      number: "02",
      title: "Financial & ERP Blueprint",
      description:
        "We design a structured chart of accounts, automated ERP rules, and statutory audit checklists tailored to your business.",
      side: "right" as const,
      iconType: "blueprint" as const,
    },
    {
      number: "03",
      title: "Tally & Systems Integration",
      description:
        "We implement automated ledger posting, multi-tier bank reconciliation, and real-time ERP data pipelines with zero lag.",
      side: "left" as const,
      iconType: "gear" as const,
    },
    {
      number: "04",
      title: "Testing & ITC Optimization",
      description:
        "100% GSTR-2B validation, input tax credit optimization, iterative ledger reconciliation, and trial balance verification.",
      side: "right" as const,
      iconType: "target" as const,
    },
    {
      number: "05",
      title: "Statutory Clearance & Scaling",
      description:
        "Annual audit clearance, zero-penalty statutory filing, automated MIS dashboards, and scalable accounting support.",
      side: "left" as const,
      iconType: "rocket" as const,
    },
  ],
};

// ============================================================================
// 8. CASE STUDIES SECTION CONTENT
// ============================================================================
export const CASE_STUDIES_DATA = {
  badgeNumber: "005",
  badgeLabel: "CASE STUDIES",
  title: "Selected Financial & Audit Case Studies",
  studies: [
    {
      id: "paavan-ashram",
      title:
        "Paavan Chintan Dhara Ashram — Trust Accounting & Institutional Audit Compliance",
      description:
        "Spearheaded comprehensive financial accounting, multi-tier bank reconciliations, 100% statutory trust compliances, and automated ERP MIS reporting.",
      image: "/assets/case-studies/case-1-real-estate.png",
      imageAlt: "Paavan Chintan Dhara Ashram Financial & Audit Operations",
      stats: [
        { value: "100%", label: "Statutory Compliance" },
        { value: "5x", label: "Faster MIS Delivery" },
        { value: "0%", label: "Audit Discrepancies" },
      ],
    },
    {
      id: "bajaj-electronics",
      title:
        "Bajaj Electronics — Multi-Channel Retail Accounting & Inventory Valuation",
      description:
        "Managed high-volume retail financial accounts, inventory valuation, payment gateway audits, and vendor ledger pipelines with automated Excel MIS.",
      image: "/assets/case-studies/case-2-creative-teams.png",
      imageAlt: "Bajaj Electronics Retail Accounting & Inventory Management",
      stats: [
        { value: "40%", label: "MIS Time Saved" },
        { value: "100%", label: "GST ITC Reconciled" },
        { value: "Daily", label: "Store Reconciliations" },
      ],
    },
    {
      id: "summercool",
      title:
        "Summercool Home Appliances — Manufacturing Plant & Cost Accounting",
      description:
        "Directed factory accounts, raw material cost tracking, supply chain accounts payable/receivable cycles, and annual statutory audit readiness.",
      image: "/assets/case-studies/case-3-finance-saas.png",
      imageAlt: "Summercool Manufacturing Accounts & Supply Chain AP/AR",
      stats: [
        { value: "100%", label: "On-Time AP/AR Cycles" },
        { value: "Zero", label: "Reconciliation Delay" },
        { value: "10+", label: "Ledger Categories Streamlined" },
      ],
    },
  ] as CaseStudySlide[],
};

// ============================================================================
// 9. TECHNOLOGY ECOSYSTEM / INTEGRATIONS CONTENT
// ============================================================================
export const INTEGRATIONS_DATA = {
  badgeNumber: "006",
  badgeLabel: "INTEGRATIONS",
  title: "Financial & Accounting Ecosystem",
  subtitle:
    "Seamlessly connecting standard Indian accounting software, statutory tax portals, and enterprise ERP architectures.",
  items: [
    {
      id: "tally-prime",
      name: "Tally Prime",
      category: "ERP Accounting",
      icon: "/assets/integrations/custom-apis.png",
    },
    {
      id: "tally-erp9",
      name: "Tally ERP 9",
      category: "Ledgers & Vouchers",
      icon: "/assets/integrations/cloud-ai.png",
    },
    {
      id: "excel-macros",
      name: "Advanced Excel",
      category: "VLOOKUP & Macros",
      icon: "/assets/integrations/make.png",
    },
    {
      id: "gst-portal",
      name: "GST Portal",
      category: "GSTR-1, 3B & 2B",
      icon: "/assets/integrations/openai.png",
    },
    {
      id: "income-tax",
      name: "Income Tax & TRACES",
      category: "TDS / TCS / E-Filing",
      icon: "/assets/integrations/salesforce.png",
    },
    {
      id: "busy-acc",
      name: "Busy Accounting",
      category: "Billing & Stock",
      icon: "/assets/integrations/hubspot.png",
    },
    {
      id: "zoho-books",
      name: "Zoho Books",
      category: "Cloud Invoicing",
      icon: "/assets/integrations/zoho.png",
    },
    {
      id: "sap-erp",
      name: "SAP ERP",
      category: "Cost Centers & AP/AR",
      icon: "/assets/integrations/activecampaign.png",
    },
    {
      id: "power-bi",
      name: "Power BI & MIS",
      category: "Financial Dashboards",
      icon: "/assets/integrations/mailchimp.png",
    },
    {
      id: "sql-automation",
      name: "SQL & IT Scripts",
      category: "Automated Pipelines",
      icon: "/assets/integrations/zapier.png",
    },
  ] as IntegrationItem[],
};

// ============================================================================
// 10. TESTIMONIALS & VIDEO HIGHLIGHTS CONTENT
// ============================================================================
export const TESTIMONIALS_DATA = {
  badgeNumber: "007",
  badgeLabel: "TESTIMONIALS",
  title: "What Industry Leaders & Trustees Say",
  testimonials: {
    "daniel-kim": {
      id: "daniel-kim",
      name: "CA S. K. Jain",
      role: "Senior Partner, Chartered Accountancy Firm",
      avatar: "/assets/testimonials/avatar-daniel-kim.png",
      quote:
        "Deepak is that rare senior accountant who understands both the complex fine print of Indian taxation (GST, TDS, Corporate Tax) and modern IT database structures. Working with him during annual statutory audit season is effortless.",
    },
    "alex-johnson": {
      id: "alex-johnson",
      name: "Rajesh Sharma",
      role: "Senior Financial Controller & Audit Advisor",
      avatar: "/assets/testimonials/avatar-alex-johnson.png",
      quote:
        "Deepak's mastery over statutory compliance and ledger reconciliations is exceptional. During our annual institutional audits, his books were 100% clean with zero discrepancies. His IT edge makes his reporting 5x faster.",
    },
    "david-lee": {
      id: "david-lee",
      name: "Anil Aggarwal",
      role: "Retail Finance Director, Bajaj Electronics Network",
      avatar: "/assets/testimonials/avatar-david-lee.png",
      quote:
        "Deepak managed our multi-store daily sales reconciliations, payment gateway audits, and quarterly GST returns flawlessly. His custom Excel MIS models reduced our month-end closing cycle by over 40%.",
    },
    "sarah-mitchell": {
      id: "sarah-mitchell",
      name: "Dr. M. K. Verma",
      role: "Managing Trustee, Paavan Chintan Dhara Ashram",
      avatar: "/assets/testimonials/avatar-sarah-mitchell.png",
      quote:
        "Managing institutional trusts requires absolute precision and unwavering statutory compliance. Deepak brought transparent ledger governance, multi-bank reconciliations, and automated ERP workflows that gave our board complete confidence.",
    },
    "jonathan-reed": {
      id: "jonathan-reed",
      name: "Vikram Singhal",
      role: "General Manager, Summercool Home Appliances",
      avatar: "/assets/testimonials/avatar-jonathan-reed.png",
      quote:
        "Handling factory accounts and multi-tier raw material cost ledgers in a high-capacity manufacturing plant is demanding. Deepak streamlined our vendor reconciliations and automated our MIS pipelines, eliminating ledger delay completely.",
    },
    "michael-tran": {
      id: "michael-tran",
      name: "Neeraj Bansal",
      role: "Head of Supply Chain & Vendor Relations",
      avatar: "/assets/testimonials/avatar-michael-tran.png",
      quote:
        "His accounts payable and receivable discipline is outstanding. Vendor ledgers were balanced in real-time, Input Tax Credits were 100% reconciled against GSTR-2B, and cash flows were always clear and predictable.",
    },
    "laura-martinez": {
      id: "laura-martinez",
      name: "Pooja Malhotra",
      role: "Senior Accounts & ERP Specialist",
      avatar: "/assets/testimonials/avatar-laura-martinez.png",
      quote:
        "He bridges the gap between accounting ledgers and IT systems like no one else. His automated Tally and Excel macros turned tedious days of manual calculations into single-click, audit-ready MIS reports.",
    },
  } as Record<string, TestimonialItem>,
  videoCards: {
    "scaling-saas": {
      id: "scaling-saas",
      title: "Financial Auditing & Statutory Rigor across Enterprises",
      image: "/assets/testimonials/video-1-scaling-saas.png",
      videoUrl: "https://www.youtube.com/embed/8AHPXm9Y6mI?autoplay=1",
    },
    "how-puno": {
      id: "how-puno",
      title: "Automating Multi-Tier Tally & MIS Accounting Workflows",
      image: "/assets/testimonials/video-2-how-puno.png",
      videoUrl: "https://www.youtube.com/embed/8AHPXm9Y6mI?autoplay=1",
    },
  } as Record<string, VideoCardItem>,
};

// ============================================================================
// 11. PRICING SECTION CONTENT
// ============================================================================
export const PRICING_DATA = {
  badgeNumber: "008",
  badgeLabel: "PRICING",
  title: "Strategic Engagement Models",
  subtitle:
    "Comprehensive Financial Accounting, Statutory Compliance & Enterprise ERP Workflows tailored for your organization.",
  monthlyLabel: "MONTHLY RETAINER",
  annualLabel: "ANNUAL ENGAGEMENT (SAVE 15%)",
  plan1: {
    title: "Accounting & Statutory Retainer",
    subtitle:
      "Complete end-to-end bookkeeping, ledger governance & monthly statutory compliance",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    periodMonthly: "/ Monthly Retainer",
    periodAnnual: "/ Annual Engagement",
    featuresLabel: "What’s included:",
    features: [
      "End-to-end Tally Prime & ERP 9 ledger entries",
      "Multi-tier bank & vendor reconciliations",
      "Monthly GST filing (GSTR-1, 3B & 2B matching)",
      "TDS / TCS calculations & quarterly e-TDS returns",
      "Monthly P&L, Balance Sheet & Cash Flow MIS",
    ],
    ctaText: "Enquire for Retainer",
  },
  plan2: {
    popularBadge: "Most Popular",
    title: "Audit & ERP Automation Suite",
    subtitle:
      "For manufacturing plants, retail chains & institutional trusts requiring total compliance",
    priceMonthly: "Enterprise",
    priceAnnual: "Enterprise",
    periodMonthly: "/ Dedicated Leadership",
    periodAnnual: "/ Annual Contract",
    featuresLabel: "Everything in Retainer, plus:",
    features: [
      "Direct supervision of full statutory audits with CAs",
      "Automated Excel / SQL MIS reporting pipelines",
      "Comprehensive inventory & factory cost accounting",
      "Vendor aging analysis & AP/AR risk mitigation",
      "Strategic cash flow forecasting & tax planning",
    ],
    ctaText: "Schedule Leadership Call",
  },
  consultation: {
    avatar: "/assets/pricing/advisor-avatar.png",
    title: "Have specific accounting or audit requirements?",
    subtitle:
      "Let's discuss tailored financial oversight, ERP automation, or dedicated full-time accounting leadership for your business.",
    buttonText: "Schedule Financial Consultation",
  },
};

// ============================================================================
// 12. FAQS SECTION CONTENT
// ============================================================================
export const FAQS_DATA = {
  badgeNumber: "010",
  badgeLabel: "FAQS",
  title: "Frequently Asked Questions",
  items: [
    {
      number: "1",
      question: "What software and financial tools do you specialize in?",
      answer:
        "I have deep hands-on expertise in Tally Prime, Tally ERP 9, Busy Accounting, Zoho Books, SAP ERP financial modules, and Advanced Microsoft Excel (Macros, VLOOKUP, Pivot Tables, Power Query). I also operate extensively across the Govt. GST Portal, Income Tax e-Filing, and TRACES for statutory TDS/TCS filings.",
    },
    {
      number: "2",
      question:
        "What industries and organization types have you managed accounts for?",
      answer:
        "Over 10+ years, I have led finance and accounts across three distinct sectors: manufacturing (Summercool Home Appliances — factory ledgers, raw material costing, supply chain AP/AR), high-volume retail (Bajaj Electronics — store sales reconciliations, inventory valuation, GST input tax credits), and non-profit institutional trusts (Paavan Chintan Dhara Ashram — trust compliances, multi-bank reconciliations, and statutory audits).",
    },
    {
      number: "3",
      question:
        "How does your dual qualification (M.Com + MCA/BCA) benefit an organization?",
      answer:
        "Traditional accountants often rely on repetitive manual data entry. With my dual background in Commerce (M.Com) and Computer Applications (MCA & BCA), I combine statutory accounting precision with modern IT automation — building automated Excel MIS pipelines, ERP database scripts, and streamlined reconciliation workflows that cut reporting turnaround time by over 50%.",
    },
    {
      number: "4",
      question:
        "How do you handle GST reconciliations and statutory tax audits?",
      answer:
        "I ensure 100% audit-readiness by conducting regular monthly GSTR-2B vs. purchase book reconciliations to maximize Input Tax Credit (ITC) without interest liabilities. I prepare comprehensive audit schedules, ledger summaries, and statutory files so your annual audit with external Chartered Accountants passes with zero discrepancies.",
    },
    {
      number: "5",
      question: "What engagement models are you open to?",
      answer:
        "I am available for senior accounting leadership roles, ongoing monthly financial retainers, corporate accounting consulting, and end-to-end financial ERP setup for manufacturing, retail, and institutional organizations.",
    },
  ] as FAQItemData[],
};

// ============================================================================
// 13. FOOTER SECTION CONTENT
// ============================================================================
export const FOOTER_DATA = {
  emblemImage: "/assets/footer/card-emblem.png",
  titleLine1: "Ready for Flawless Accounting",
  titleLine2: "& Audit Compliance?",
  subtitle:
    "Partner with a Senior Accountant with 10+ years of institutional financial rigor, statutory mastery, and modern IT automation.",
  form: {
    namePlaceholder: "Your name*",
    companyPlaceholder: "Company name*",
    emailPlaceholder: "Your work email*",
    detailsPlaceholder:
      "Tell me about your financial systems or compliance requirements*",
    submitButtonText: "Submit Inquiry",
    submittedButtonText: "Inquiry Sent!",
  },
  copyright: "© 2025 Deepak Gupta. All rights reserved.",
  designedBy: "Senior Accounting & Financial Systems Leadership",
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#capabilities" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Integrations", href: "#integrations" },
    { label: "Contact", href: "#contact" },
  ],
};
