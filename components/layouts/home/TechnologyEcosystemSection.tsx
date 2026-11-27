"use client";

import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { keyframes } from "@emotion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechStackConvergence, { TechStackIcon } from "@/components/lightswind-pro/tech-stack-convergence";
import { INTEGRATIONS_DATA } from "@/assets/Generic-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Deepak Gupta's Top 7 Essential Accounting, Tax & ERP Skills (All in one unified place, no tabs!)
const MAIN_7_SKILLS: TechStackIcon[] = [
  {
    src: "/assets/integrations/outline/tally-prime.svg",
    alt: "Tally Prime Gold",
    name: "Tally Prime Gold",
    category: "Ledger Governance, Voucher Entry & Statutory Audit",
    color: "#F59E0B",
  },
  {
    src: "/assets/integrations/outline/excel.svg",
    alt: "Advanced Excel",
    name: "Advanced Excel",
    category: "Financial Modeling, VLOOKUP & Power Query Automation",
    color: "#10B981",
  },
  {
    src: "/assets/integrations/outline/gst.svg",
    alt: "GST Portal",
    name: "Indian GST Portal",
    category: "GSTR-1, 3B & GSTR-2B ITC 100% Auto-Reconciliation",
    color: "#3B82F6",
  },
  {
    src: "/assets/integrations/outline/income-tax.svg",
    alt: "Income Tax & TRACES",
    name: "Income Tax & TRACES",
    category: "TDS / TCS E-Filing, Form 26AS & Tax Verification",
    color: "#06B6D4",
  },
  {
    src: "/assets/integrations/outline/sap.svg",
    alt: "SAP ERP",
    name: "SAP ERP (FICO)",
    category: "Enterprise Cost Centers, Ledger Migration & AP/AR Cycles",
    color: "#0070F2",
  },
  {
    src: "/assets/integrations/outline/power-bi.svg",
    alt: "Power BI",
    name: "Microsoft Power BI",
    category: "Executive MIS Dashboards & Real-Time Financial Analytics",
    color: "#F59E0B",
  },
  {
    src: "/assets/integrations/outline/busy.svg",
    alt: "Busy Accounting",
    name: "Busy Accounting",
    category: "Multi-Firm Billing, Inventory Valuation & GST E-Way Bills",
    color: "#EF4444",
  },
];

export default function TechnologyEcosystemSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      component="section"
      id="integrations"
      ref={sectionRef}
      sx={{
        position: "relative",
        zIndex: 1,
        py: { xs: 7, sm: 9, md: 12 },
        width: "100%",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 3, md: 4.5 },
        }}
      >
        {/* Top Pill / Badge: 006 • TECH STACK CONVERGENCE */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.2,
            px: 2,
            py: 0.65,
            mb: { xs: 2, md: 2.5 },
            bgcolor: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "9999px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: { xs: "0.72rem", sm: "0.78rem" },
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#64748B",
            }}
          >
            {INTEGRATIONS_DATA.badgeNumber}
          </Typography>
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              bgcolor: "#0F172A",
            }}
          />
          <Typography
            sx={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: { xs: "0.72rem", sm: "0.78rem" },
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#64748B",
              textTransform: "uppercase",
            }}
          >
            {INTEGRATIONS_DATA.badgeLabel}
          </Typography>
        </Box>

        {/* Section Heading */}
        <Typography
          ref={headlineRef}
          component="h2"
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "2rem", sm: "2.75rem", md: "3.25rem" },
            fontWeight: 600,
            letterSpacing: "-0.04em",
            color: "#1A1A1A",
            textAlign: "center",
            lineHeight: 1.15,
            mb: 2,
          }}
        >
          {INTEGRATIONS_DATA.title}
        </Typography>

        <Typography
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "0.95rem", md: "1.08rem" },
            color: "#64748B",
            textAlign: "center",
            maxWidth: 680,
            lineHeight: 1.55,
          }}
        >
          {INTEGRATIONS_DATA.subtitle}
        </Typography>
      </Container>

      {/* TECH STACK CONVERGENCE BOARD (All 7 tools in ONE unified view) */}
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <TechStackConvergence
          icons={MAIN_7_SKILLS}
          centralIcon="/LogoNav.png"
          height={560}
        />
      </Container>
    </Box>
  );
}
