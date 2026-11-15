"use client";

import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { keyframes } from "@emotion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    transform: translate3d(-50%, 0, 0);
  }
`;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface IntegrationItem {
  id: string;
  name: string;
  icon: string;
}

const INTEGRATIONS: IntegrationItem[] = [
  { id: "openai", name: "OpenAI", icon: "/assets/integrations/openai.png" },
  { id: "cloud-ai", name: "Cloud AI", icon: "/assets/integrations/cloud-ai.png" },
  { id: "make", name: "Make", icon: "/assets/integrations/make.png" },
  { id: "custom-apis", name: "Custom APIs", icon: "/assets/integrations/custom-apis.png" },
  { id: "hubspot", name: "HubSpot", icon: "/assets/integrations/hubspot.png" },
  { id: "salesforce", name: "Salesforce", icon: "/assets/integrations/salesforce.png" },
  { id: "zoho", name: "Zoho", icon: "/assets/integrations/zoho.png" },
  { id: "mailchimp", name: "Mailchimp", icon: "/assets/integrations/mailchimp.png" },
  { id: "activecampaign", name: "ActiveCampaign", icon: "/assets/integrations/activecampaign.png" },
  { id: "zapier", name: "Zapier", icon: "/assets/integrations/zapier.png" },
];

// Row offsets to create visual diversity across rows
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

function PillCard({ item }: { item: IntegrationItem }) {
  return (
    <Box
      sx={{
        width: { xs: 170, md: 240 },
        height: { xs: 68, md: 88 },
        flexShrink: 0,
        bgcolor: "#F2F2F2",
        border: "1px solid #E6E6E6",
        borderRadius: { xs: "20px", md: "32px" },
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
      {/* Tool / Integration Name */}
      <Typography
        sx={{
          fontFamily: "var(--font-outfit), sans-serif",
          fontSize: { xs: "0.85rem", md: "0.98rem" },
          fontWeight: 500,
          color: "#525252",
          letterSpacing: "-0.015em",
          whiteSpace: "nowrap",
        }}
      >
        {item.name}
      </Typography>

      {/* Tool Logo */}
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

  // GSAP scroll trigger for header
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
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
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 16 },
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
          mb: { xs: 5, md: 7 },
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
            006
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
            Integrations
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
          }}
        >
          Technology Ecosystem
        </Typography>
      </Container>

      {/* MARQUEE CONTAINER WRAPPER WITH FADE MASKS AND CENTER CIRCLE */}
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
        {/* 3 Infinite Moving Strips Container with edge mask fading */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            overflow: "hidden",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          {/* STRIP 1: Continuous Smooth Auto-Glide Left to Right */}
          <Box
            sx={{
              display: "flex",
              width: "max-content",
              gap: "4px",
              animation: `${marqueeL2R} 45s linear infinite`,
              willChange: "transform",
            }}
          >
            {ROW_1_ITEMS.map((item, idx) => (
              <PillCard key={`r1-${idx}`} item={item} />
            ))}
          </Box>

          {/* STRIP 2: Continuous Smooth Auto-Glide Right to Left */}
          <Box
            sx={{
              display: "flex",
              width: "max-content",
              gap: "4px",
              animation: `${marqueeR2L} 48s linear infinite`,
              willChange: "transform",
            }}
          >
            {ROW_2_ITEMS.map((item, idx) => (
              <PillCard key={`r2-${idx}`} item={item} />
            ))}
          </Box>

          {/* STRIP 3: Continuous Smooth Auto-Glide Left to Right */}
          <Box
            sx={{
              display: "flex",
              width: "max-content",
              gap: "4px",
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
          {/* Multi-color Aura Glow (.framer-5r1p78) */}
          <Box
            sx={{
              position: "absolute",
              width: { xs: 190, md: 240 },
              height: { xs: 190, md: 240 },
              borderRadius: "50%",
              background:
                "radial-gradient(50% 50% at 50% 50%, #8399ff 0%, rgb(179, 225, 255) 25%, rgb(255, 204, 253) 70%, rgb(253, 255, 188) 100%)",
              filter: "blur(22px)",
              WebkitFilter: "blur(22px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* Inner Dark Metallic Circle Button */}
          <Box
            component="a"
            href="#contact"
            sx={{
              position: "relative",
              zIndex: 1,
              width: { xs: 140, md: 180 },
              height: { xs: 140, md: 180 },
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
            {/* Deepak Gupta Official Brand Logo */}
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

            {/* Connect with Deepak label */}
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

      {/* Bottom Description */}
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: { xs: 5, md: 6 },
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "0.92rem", sm: "1rem", md: "1.05rem" },
            lineHeight: 1.5,
            color: "#525252",
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

