const fs = require('fs');
const path = require('path');

const cardsDir = path.join(__dirname, '../public/assets/integrations/cards');
if (!fs.existsSync(cardsDir)) {
  fs.mkdirSync(cardsDir, { recursive: true });
}

const cardsData = [
  {
    id: 'tally-prime',
    brandColor: '#0E2F56',
    accentColor: '#F4B400',
    tag: 'PRIMARY ERP',
    title: 'Tally Prime Gold',
    subtitle: 'Statutory Auditing, GST E-Invoicing & Automated Bank Recon',
    chips: ['E-Way Bill & IRN', 'Multi-Currency', 'Digital Audit Trail'],
    status: 'Enterprise Governed • 100% Audit Ready',
    iconSvg: `
      <rect width="52" height="52" rx="14" fill="#0E2F56"/>
      <path d="M14 18h24v6h-9v18h-6V24h-9z" fill="#F4B400"/>
      <circle cx="37" cy="20.5" r="3.5" fill="#E24A4A"/>
    `
  },
  {
    id: 'excel',
    brandColor: '#107C41',
    accentColor: '#107C41',
    tag: 'ANALYTICAL ENGINE',
    title: 'Advanced Excel & VBA',
    subtitle: 'Financial Modeling, Dynamic Arrays, XLOOKUP & Power Query',
    chips: ['Dynamic Arrays', 'Power Query ETL', 'Macro Automation'],
    status: 'Executive Modeling • High Precision',
    iconSvg: `
      <rect width="52" height="52" rx="14" fill="#107C41"/>
      <path d="M19 16l5.2 9L19 36h5.2l3.4-6.5 3.4 6.5h5.2l-5.2-11 5.2-9h-5.2l-3.4 6.8-3.4-6.8z" fill="#FFFFFF"/>
    `
  },
  {
    id: 'gst',
    brandColor: '#1E3A8A',
    accentColor: '#F97316',
    tag: 'TAX GOVERNANCE',
    title: 'Indian GST Portal',
    subtitle: 'Monthly GSTR-1 & 3B Filing, 2B vs Purchase Auto-Reconciliation',
    chips: ['GSTR-1 & 3B', 'GSTR-2B Matching', 'ITC Maximization'],
    status: 'Statutory Portal • Zero-Default Track',
    iconSvg: `
      <rect width="52" height="52" rx="14" fill="#1E3A8A"/>
      <path d="M14 18h24v4H14z" fill="#FF9933"/>
      <path d="M14 24h24v4H14z" fill="#FFFFFF"/>
      <path d="M14 30h24v4H14z" fill="#138808"/>
      <circle cx="26" cy="26" r="2.8" fill="#000080"/>
    `
  },
  {
    id: 'income-tax',
    brandColor: '#0369A1',
    accentColor: '#0EA5E9',
    tag: 'DIRECT TAXATION',
    title: 'Income Tax & TRACES',
    subtitle: 'Quarterly TDS/TCS Returns, Form 26AS/AIS & Advance Tax Computation',
    chips: ['Form 26AS / AIS', 'Quarterly TDS', 'Advance Tax Model'],
    status: 'CBDT / TRACES • Full Compliance',
    iconSvg: `
      <rect width="52" height="52" rx="14" fill="#0369A1"/>
      <circle cx="26" cy="26" r="14" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
      <path d="M26 15v22M15 26h22" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="26" cy="26" r="4.5" fill="#38BDF8"/>
    `
  },
  {
    id: 'busy',
    brandColor: '#DC2626',
    accentColor: '#EF4444',
    tag: 'BILLING & INVENTORY',
    title: 'Busy Accounting',
    subtitle: 'Multi-Location Inventory Tracking, Barcode Billing & Stock Valuation',
    chips: ['Multi-Warehouse', 'Batch-wise Stock', 'Fast Retail Billing'],
    status: 'Real-time Stock • Batch Tracking',
    iconSvg: `
      <rect width="52" height="52" rx="14" fill="#DC2626"/>
      <path d="M18 15h9.5c3.5 0 6 2 6 5s-2 4.5-5 5.2c3.5.7 6 3 6 6.3 0 3.8-3 6.5-7.5 6.5H18zm5 9h4c1.8 0 3-1 3-2.5s-1.2-2.5-3-2.5h-4zm0 10h4.5c2 0 3.5-1.2 3.5-3s-1.5-3-3.5-3H23z" fill="#FFFFFF"/>
    `
  },
  {
    id: 'zoho-books',
    brandColor: '#0284C7',
    accentColor: '#2563EB',
    tag: 'CLOUD ERP',
    title: 'Zoho Books Cloud',
    subtitle: 'Automated Recurring Invoices, Client Portals & Multi-Bank Feeds',
    chips: ['Live Bank Feeds', 'Recurring Billing', 'Client Portal'],
    status: 'Cloud Architecture • 24/7 Sync',
    iconSvg: `
      <rect width="52" height="52" rx="14" fill="#0284C7"/>
      <rect x="14" y="14" width="10.5" height="10.5" rx="2.5" fill="#EF4444"/>
      <rect x="27.5" y="14" width="10.5" height="10.5" rx="2.5" fill="#10B981"/>
      <rect x="14" y="27.5" width="10.5" height="10.5" rx="2.5" fill="#F59E0B"/>
      <rect x="27.5" y="27.5" width="10.5" height="10.5" rx="2.5" fill="#3B82F6"/>
    `
  },
  {
    id: 'sap',
    brandColor: '#0070F2',
    accentColor: '#0050B3',
    tag: 'ENTERPRISE ERP',
    title: 'SAP ERP (FICO)',
    subtitle: 'Enterprise Financial Accounting, Cost Center Allocations & AP/AR',
    chips: ['FICO General Ledger', 'Cost Center AP/AR', 'Corporate Audit'],
    status: 'Fortune 500 Grade • Enterprise Core',
    iconSvg: `
      <rect width="52" height="52" rx="14" fill="#0070F2"/>
      <text x="26" y="32" font-family="'Outfit', -apple-system, sans-serif" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.5">SAP</text>
    `
  },
  {
    id: 'power-bi',
    brandColor: '#D97706',
    accentColor: '#F59E0B',
    tag: 'EXECUTIVE MIS',
    title: 'Microsoft Power BI',
    subtitle: 'Executive Financial Dashboards, DAX Modeling & Live KPI Analytics',
    chips: ['DAX Complex Measures', 'Interactive Visuals', 'Live KPI Alerts'],
    status: 'C-Suite Dashboards • Real-time Insights',
    iconSvg: `
      <rect width="52" height="52" rx="14" fill="#1E293B"/>
      <rect x="15" y="26" width="5.5" height="12" rx="2" fill="#F59E0B"/>
      <rect x="23.2" y="20" width="5.5" height="18" rx="2" fill="#F59E0B"/>
      <rect x="31.5" y="14" width="5.5" height="24" rx="2" fill="#F59E0B"/>
    `
  },
  {
    id: 'sql',
    brandColor: '#0891B2',
    accentColor: '#06B6D4',
    tag: 'DATA PIPELINES',
    title: 'SQL & IT Scripts',
    subtitle: 'Automated Data Extraction, Database Reconciliation & Scripted ETL',
    chips: ['Automated ETL', 'Cross-DB Recon', 'Data Pipelines'],
    status: 'High-throughput • Zero Data Loss',
    iconSvg: `
      <rect width="52" height="52" rx="14" fill="#0891B2"/>
      <ellipse cx="26" cy="18" rx="12" ry="4" fill="#FFFFFF"/>
      <path d="M14 18v8c0 2.2 5.4 4 12 4s12-1.8 12-4v-8" fill="none" stroke="#FFFFFF" stroke-width="2.2"/>
      <path d="M14 26v8c0 2.2 5.4 4 12 4s12-1.8 12-4v-8" fill="none" stroke="#FFFFFF" stroke-width="2.2"/>
    `
  },
  {
    id: 'tally-erp9',
    brandColor: '#334155',
    accentColor: '#64748B',
    tag: 'VOUCHER GOVERNANCE',
    title: 'Tally ERP 9',
    subtitle: 'Historical Ledger Governance, Legacy Data Migration & Voucher Entry',
    chips: ['Legacy Migration', 'Voucher Inspection', 'Historical Audits'],
    status: 'Archive Certified • Rapid Audit',
    iconSvg: `
      <rect width="52" height="52" rx="14" fill="#334155"/>
      <path d="M14 18h24v6h-9v18h-6V24h-9z" fill="#CBD5E1"/>
      <circle cx="37" cy="20.5" r="3" fill="#F59E0B"/>
    `
  }
];

function generateCardSvg(card) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="560" height="350" viewBox="0 0 560 350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Card Surface Gradient -->
    <linearGradient id="cardBg" x1="0" y1="0" x2="560" y2="350" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="60%" stop-color="#FBFBFC" />
      <stop offset="100%" stop-color="#F4F5F7" />
    </linearGradient>

    <!-- Ambient Brand Glow in Corner -->
    <radialGradient id="brandGlow" cx="500" cy="50" r="280" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${card.accentColor}" stop-opacity="0.14" />
      <stop offset="50%" stop-color="${card.brandColor}" stop-opacity="0.04" />
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
    </radialGradient>

    <!-- Tag Background Pill -->
    <linearGradient id="tagBg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${card.brandColor}" stop-opacity="0.08" />
      <stop offset="100%" stop-color="${card.accentColor}" stop-opacity="0.12" />
    </linearGradient>

    <!-- Card Soft Inner Stroke -->
    <linearGradient id="cardBorder" x1="0" y1="0" x2="560" y2="350" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.9)" />
      <stop offset="50%" stop-color="rgba(0, 0, 0, 0.06)" />
      <stop offset="100%" stop-color="rgba(0, 0, 0, 0.09)" />
    </linearGradient>
  </defs>

  <!-- Card Background -->
  <rect x="2" y="2" width="556" height="346" rx="26" fill="url(#cardBg)" />
  <rect x="2" y="2" width="556" height="346" rx="26" fill="url(#brandGlow)" />
  <rect x="2" y="2" width="556" height="346" rx="26" stroke="url(#cardBorder)" stroke-width="2" />

  <!-- Top Decorative Top Light Bar -->
  <path d="M 28 4 L 532 4" stroke="rgba(255, 255, 255, 0.8)" stroke-width="2" stroke-linecap="round" />

  <!-- TOP HEADER -->
  <g transform="translate(36, 34)">
    <!-- Icon Container -->
    <g>
      ${card.iconSvg}
    </g>

    <!-- Category Tag Pill (Top Right) -->
    <g transform="translate(488, 10)">
      <!-- Right aligned: transform anchor -->
      <rect x="-170" y="0" width="170" height="30" rx="15" fill="url(#tagBg)" stroke="${card.brandColor}" stroke-opacity="0.18" stroke-width="1"/>
      <circle cx="-154" cy="15" r="3.5" fill="${card.accentColor}"/>
      <text x="-142" y="19.5" font-family="'Outfit', -apple-system, sans-serif" font-size="11" font-weight="700" fill="${card.brandColor}" letter-spacing="0.8">${card.tag}</text>
    </g>
  </g>

  <!-- TITLE & SUBTITLE -->
  <g transform="translate(36, 126)">
    <!-- Software Title -->
    <text x="0" y="22" font-family="'Outfit', -apple-system, sans-serif" font-size="25" font-weight="700" fill="#0F172A" letter-spacing="-0.5">${card.title}</text>
    
    <!-- Subtitle / Capability -->
    <text x="0" y="52" font-family="'Outfit', -apple-system, sans-serif" font-size="14.5" font-weight="500" fill="#64748B" letter-spacing="-0.1">
      ${card.subtitle}
    </text>
  </g>

  <!-- DIVIDER LINE -->
  <line x1="36" y1="210" x2="524" y2="210" stroke="#E2E8F0" stroke-width="1.2" stroke-dasharray="2 3" />

  <!-- CHIP PILLS (Capabilities) -->
  <g transform="translate(36, 230)">
    <!-- Chip 1 -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="${card.chips[0].length * 8.2 + 28}" height="32" rx="16" fill="#F1F5F9" stroke="rgba(0,0,0,0.06)" stroke-width="1"/>
      <text x="${(card.chips[0].length * 8.2 + 28) / 2}" y="20.5" font-family="'Outfit', -apple-system, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">${card.chips[0]}</text>
    </g>

    <!-- Chip 2 -->
    <g transform="translate(${card.chips[0].length * 8.2 + 38}, 0)">
      <rect x="0" y="0" width="${card.chips[1].length * 8.2 + 28}" height="32" rx="16" fill="#F1F5F9" stroke="rgba(0,0,0,0.06)" stroke-width="1"/>
      <text x="${(card.chips[1].length * 8.2 + 28) / 2}" y="20.5" font-family="'Outfit', -apple-system, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">${card.chips[1]}</text>
    </g>

    <!-- Chip 3 -->
    <g transform="translate(${card.chips[0].length * 8.2 + 38 + card.chips[1].length * 8.2 + 38}, 0)">
      <rect x="0" y="0" width="${card.chips[2].length * 8.2 + 28}" height="32" rx="16" fill="#F1F5F9" stroke="rgba(0,0,0,0.06)" stroke-width="1"/>
      <text x="${(card.chips[2].length * 8.2 + 28) / 2}" y="20.5" font-family="'Outfit', -apple-system, sans-serif" font-size="12" font-weight="600" fill="#334155" text-anchor="middle">${card.chips[2]}</text>
    </g>
  </g>

  <!-- FOOTER STATUS -->
  <g transform="translate(36, 298)">
    <!-- Active Green Status Dot -->
    <circle cx="5" cy="5" r="4.5" fill="#10B981" />
    <circle cx="5" cy="5" r="7.5" fill="#10B981" fill-opacity="0.25" />
    <text x="22" y="9" font-family="'Outfit', -apple-system, sans-serif" font-size="12.5" font-weight="600" fill="#64748B">${card.status}</text>

    <!-- Right DG Monogram Badge -->
    <g transform="translate(488, 2)">
      <text x="0" y="8" font-family="'Outfit', -apple-system, sans-serif" font-size="11.5" font-weight="700" fill="#94A3B8" letter-spacing="1.2" text-anchor="end">DG STACK</text>
    </g>
  </g>
</svg>
`;
}

cardsData.forEach(card => {
  const filePath = path.join(cardsDir, `card-${card.id}.svg`);
  fs.writeFileSync(filePath, generateCardSvg(card), 'utf8');
  console.log(`Generated: ${filePath}`);
});

console.log('Successfully generated all 10 software card SVGs!');
