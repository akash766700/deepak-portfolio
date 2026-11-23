"use client";

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { keyframes } from "@emotion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTEGRATIONS_DATA } from "@/assets/Generic-data";
import { IntegrationItem } from "@/utils/type";
import FlexCarousel, { FlexCarouselItem } from "@/components/widgets/FlexCarousel";

const marqueeL2R = keyframes`
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0%, 0, 0);
  }
`;

const marqueeR2L = keyframes`
  0% {
    transform: translate3d(0%, 0, 0);
  }
  100% {
    transform: translate3d(0%, 0, 0);
  }
`;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INTEGRATIONS = INTEGRATIONS_DATA.items;

const ROW_1_ITEMS = [...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS];
const ROW_2_ITEMS = [
  ...INTEGRATIONS.slice(4),
  ...INTEGRATIONS.slice(0, 4),
  ...INTEGRATIONS.slice(4),
  ...INTEGRATIONS.slice(0, 4),
  ...INTEGRATIONS.slice(4),
  ...INTEGRATIONS.slice(0, 4),
];
const ROW_3_ITEMS = [
  ...INTEGRATIONS.slice(2),
  ...INTEGRATIONS.slice(0, 2),
  ...INTEGRATIONS.slice(2),
  ...INTEGRATIONS.slice(0, 2),
  ...INTEGRATIONS.slice(2),
  ...INTEGRATIONS.slice(0, 2),
];

const ECOSYSTEM_SHOWCASE_ITEMS: FlexCarouselItem[] = [
  {
    src: "/assets/case-studies/case-1-ashram.jpg",
    title: "Tally Prime & Institutional ERP",
    subtitle: "Complete ledger governance, audit trails, and multi-bank reconciliations",
  },
  {
    src: "/assets/case-studies/case-2-bajaj.jpg",
    title: "Advanced Excel MIS & Retail Portals",
    subtitle: "High-volume retail sales, payment gateways, and vendor aging models",
  },
  {
    src: "/assets/case-studies/case-3-summercool.jpg",
    title: "SAP ERP & Factory Cost Centers",
    subtitle: "Industrial manufacturing inventory valuation, BOMs, and AP/AR cycles",
  },
  {
    src: "/assets/case-studies/case-3-summercool-showroom.jpg",
    title: "GST Portal & Statutory Returns",
    subtitle: "Zero-error GSTR-1, 3B filings with 100% Input Tax Credit matching",
  },
  {
    src: "/assets/case-studies/pawanchintandhara.webp",
    title: "Zoho Books Cloud & Multi-Tier Approvals",
    subtitle: "Automated banking feeds, vendor invoicing, and real-time cash flow",
  },
  {
    src: "/assets/case-studies/case-1-ashram-aarti.jpg",
    title: "Institutional Trust & Compliance Books",
    subtitle: "Section 12A/80G transparent donor tracking and annual auditor sign-offs",
  },
];

function PillCard({ item }: { item: IntegrationItem }) {
  return (
    <Box
      sx={{
        width: { xs: 170, sm: 200, md: 240 },
        height: { xs: 68, sm: 78, md: 88 },
        flexShrink: 0,
        bgcolor: "#F2F2F2",
        border: "1px solid #E6E6E6",
        borderRadius: { xs: "20px", sm: "26px", md: "32px" },
        boxShadow:
          "inset 0px 0px 1px 2px #FFFFFF, inset 0px -2px 2px 0px rgba(0, 0, 0, 0.12)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2.5, md: 3 },
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        userSelect: "none",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "inset 0px 0px 1px 2px #FFFFFF, 0 6px 18px rgba(0, 0, 0, 0.06)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
        <Typography
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "0.85rem", md: "0.95rem" },
            fontWeight: 600,
            color: "#1E293B",
            letterSpacing: "-0.015em",
            whiteSpace: "nowrap",
          }}
        >
          {item.name}
        </Typography>
        {item.category && (
          <Typography
            sx={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: { xs: "0.68rem", md: "0.74rem" },
              fontWeight: 500,
              color: "#64748B",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {item.category}
          </Typography>
        )}
      </Box>

      <Box
        component="img"
        src={item.icon}
        alt={item.name}
        sx={{
          width: { xs: 28, md: 38 },
          height: { xs: 28, md: 38 },
          objectFit: "contain",
          flexShrink: 0,
          display: "block",
        }}
      />
    </Box>
  );
}

export default function TechnologyEcosystemSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const marqueeWrapperRef = useRef<HTMLDivElement | null>(null);
  const centerBadgeRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<"liquid" | "grid">("liquid");

  // GSAP scroll trigger for header and interactive ecosystem entrance
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. Headline Elastic Bounce-In with Zoom
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 40, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Center Glowing Orbit Badge (when in grid view)
      if (centerBadgeRef.current) {
        const badge = centerBadgeRef.current;
        gsap.fromTo(
          badge,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: marqueeWrapperRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
              once: true,
            },
            onComplete: () => {
              gsap.to(badge, {
                y: -8,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              });
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <Box
      component="section"
      id="integrations"
      ref={sectionRef}
      sx={{
        position: "relative",
        zIndex: 1,
        py: { xs: 6, sm: 8, md: 10 },
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
          mb: { xs: 4, md: 5 },
        }}
      >
        {/* Top Pill / Badge: 006 • INTEGRATIONS */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.2,
            px: 2,
            py: 0.65,
            mb: { xs: 2, md: 2.5 },
            bgcolor: "rgba(255, 255, 255, 0.72)",
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
            maxWidth: 640,
            lineHeight: 1.55,
            mb: { xs: 3, md: 4 },
          }}
        >
          Seamlessly connecting standard Indian accounting software, statutory tax portals, and enterprise ERP architectures.
        </Typography>

        {/* Interactive View Switcher Pill: Liquid Glass Carousel vs Marquee Stream */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            p: "4px",
            bgcolor: "#EBEBEB",
            borderRadius: "9999px",
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <Button
            size="small"
            onClick={() => setActiveTab("liquid")}
            sx={{
              borderRadius: "9999px",
              px: { xs: 2, sm: 2.5 },
              py: 0.6,
              fontSize: { xs: "0.75rem", sm: "0.82rem" },
              fontFamily: "var(--font-outfit), sans-serif",
              fontWeight: 600,
              textTransform: "none",
              color: activeTab === "liquid" ? "#0F172A" : "#64748B",
              bgcolor: activeTab === "liquid" ? "#FFFFFF" : "transparent",
              boxShadow:
                activeTab === "liquid" ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
              "&:hover": {
                bgcolor: activeTab === "liquid" ? "#FFFFFF" : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            ✨ Liquid Glass Flow
          </Button>
          <Button
            size="small"
            onClick={() => setActiveTab("grid")}
            sx={{
              borderRadius: "9999px",
              px: { xs: 2, sm: 2.5 },
              py: 0.6,
              fontSize: { xs: "0.75rem", sm: "0.82rem" },
              fontFamily: "var(--font-outfit), sans-serif",
              fontWeight: 600,
              textTransform: "none",
              color: activeTab === "grid" ? "#0F172A" : "#64748B",
              bgcolor: activeTab === "grid" ? "#FFFFFF" : "transparent",
              boxShadow:
                activeTab === "grid" ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
              "&:hover": {
                bgcolor: activeTab === "grid" ? "#FFFFFF" : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            ⚡ Software Stream
          </Button>
        </Box>
      </Container>

      {/* VIEW 1: FLEX CAROUSEL WITH LIQUID GLASS REFRACTION SHADER */}
      {activeTab === "liquid" && (
        <Box
          sx={{
            width: "100%",
            maxWidth: "1350px",
            height: { xs: "420px", sm: "480px", md: "540px" },
            position: "relative",
            my: { xs: 2, md: 3 },
            px: { xs: 1, md: 2 },
          }}
        >
          <FlexCarousel
            items={ECOSYSTEM_SHOWCASE_ITEMS}
            preset="liquid"
            cardHeight={0.62}
            gap={18}
            radius={28}
            fit="natural"
            autoplay={true}
            interval={3.8}
            captions={true}
            captureWheel={false}
            focusOnClick={true}
            style={{ width: "100%", height: "100%" }}
          />

          {/* Interactive Hint */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: { xs: "0.74rem", sm: "0.8rem" },
                color: "#64748B",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              👈 Drag horizontally to glide through financial tools • Liquid glass refraction at edges 👉
            </Typography>
          </Box>
        </Box>
      )}

      {/* VIEW 2: MARQUEE PILLS WITH CENTER METALLIC EMBLEM */}
      {activeTab === "grid" && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 2,
          }}
        >
          <Box
            ref={marqueeWrapperRef}
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              overflow: "hidden",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          >
            {/* STRIP 1 */}
            <Box
              sx={{
                display: "flex",
                width: "max-content",
                gap: "6px",
                animation: `${marqueeL2R} 45s linear infinite`,
                willChange: "transform",
              }}
            >
              {ROW_1_ITEMS.map((item, idx) => (
                <PillCard key={`r1-${idx}`} item={item} />
              ))}
            </Box>

            {/* STRIP 2 */}
            <Box
              sx={{
                display: "flex",
                width: "max-content",
                gap: "6px",
                animation: `${marqueeR2L} 48s linear infinite`,
                willChange: "transform",
              }}
            >
              {ROW_2_ITEMS.map((item, idx) => (
                <PillCard key={`r2-${idx}`} item={item} />
              ))}
            </Box>

            {/* STRIP 3 */}
            <Box
              sx={{
                display: "flex",
                width: "max-content",
                gap: "6px",
                animation: `${marqueeL2R} 52s linear infinite`,
                willChange: "transform",
              }}
            >
              {ROW_3_ITEMS.map((item, idx) => (
                <PillCard key={`r3-${idx}`} item={item} />
              ))}
            </Box>
          </Box>

          {/* CENTER FLOATING BADGE (Circle Wrap + Gradient Aura) */}
          <Box
            ref={centerBadgeRef}
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "auto",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: { xs: 190, sm: 220, md: 240 },
                height: { xs: 190, sm: 220, md: 240 },
                borderRadius: "50%",
                background:
                  "radial-gradient(50% 50% at 50% 50%, #8399ff 0%, rgb(179, 225, 255) 25%, rgb(255, 204, 253) 70%, rgb(253, 255, 188) 100%)",
                filter: "blur(22px)",
                WebkitFilter: "blur(22px)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            <Box
              component="a"
              href="#contact"
              sx={{
                position: "relative",
                zIndex: 1,
                width: { xs: 140, sm: 160, md: 180 },
                height: { xs: 140, sm: 160, md: 180 },
                borderRadius: "50%",
                background:
                  "linear-gradient(180deg, #1A1A1A 0%, rgb(82, 82, 82) 100%)",
                boxShadow:
                  "inset 0px 0px 40px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 8px 1px rgb(255, 255, 255), 0 12px 30px rgba(0, 0, 0, 0.28)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.2,
                p: 2,
                textDecoration: "none",
                cursor: "pointer",
                transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.06)",
                  boxShadow:
                    "inset 0px 0px 40px 1px rgba(255, 255, 255, 0.65), inset 0px 0px 10px 1px rgb(255, 255, 255), 0 18px 40px rgba(0, 0, 0, 0.35)",
                },
              }}
            >
              <Box
                component="img"
                src="/LogoNav.png"
                alt="Deepak Gupta"
                sx={{
                  width: { xs: 34, md: 44 },
                  height: { xs: 34, md: 44 },
                  objectFit: "contain",
                  display: "block",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.95,
                }}
              />
              <Typography
                sx={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: { xs: "0.82rem", md: "0.95rem" },
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: "-0.015em",
                  textAlign: "center",
                  lineHeight: 1.2,
                  userSelect: "none",
                }}
              >
                Connect with Deepak
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Bottom Description */}
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: { xs: 4, md: 5 },
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.12rem" },
            lineHeight: 1.55,
            color: "#64748B",
            textAlign: "center",
            maxWidth: 620,
            letterSpacing: "-0.01em",
          }}
        >
          Our automation architecture connects data, workflows, and platforms into a
          secure, high-performance system that grows with you.
        </Typography>
      </Container>
    </Box>
  );
}
