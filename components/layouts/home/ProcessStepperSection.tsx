"use client";

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepItem {
  number: string;
  title: string;
  description: string;
  side: "left" | "right"; // 'left' = Icon on left, Text on right | 'right' = Text on left, Icon on right
  icon: React.ReactNode;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Discovery & Financial Audit",
    description:
      "We analyze your multi-entity ledgers, voucher pipelines, and compliance bottlenecks to map an error-free financial structure.",
    side: "left", // Icon Left, Text Right
    icon: (
      <Box component="svg" viewBox="0 0 24 24" sx={{ width: 28, height: 28, fill: "currentColor" }}>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </Box>
    ),
  },
  {
    number: "02",
    title: "Financial & ERP Blueprint",
    description:
      "We design a structured chart of accounts, automated ERP rules, and statutory audit checklists tailored to your business.",
    side: "right", // Text Left, Icon Right
    icon: (
      <Box component="svg" viewBox="0 0 24 24" sx={{ width: 28, height: 28, fill: "none", stroke: "currentColor", strokeWidth: 2 }}>
        <rect x="5" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="5" cy="5" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="19" cy="5" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="5" cy="19" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="19" cy="19" r="2.2" fill="currentColor" stroke="none" />
      </Box>
    ),
  },
  {
    number: "03",
    title: "Tally & Systems Integration",
    description:
      "We implement automated ledger posting, multi-tier bank reconciliation, and real-time ERP data pipelines with zero lag.",
    side: "left", // Icon Left, Text Right
    icon: (
      <Box component="svg" viewBox="0 0 24 24" sx={{ width: 28, height: 28, fill: "currentColor" }}>
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
      </Box>
    ),
  },
  {
    number: "04",
    title: "Testing & ITC Optimization",
    description:
      "100% GSTR-2B validation, input tax credit optimization, iterative ledger reconciliation, and trial balance verification.",
    side: "right", // Text Left, Icon Right
    icon: (
      <Box component="svg" viewBox="0 0 24 24" sx={{ width: 28, height: 28, fill: "none", stroke: "currentColor" }}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" strokeDasharray="38 18" strokeLinecap="round" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2.2" strokeDasharray="20 12" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      </Box>
    ),
  },
  {
    number: "05",
    title: "Statutory Clearance & Scaling",
    description:
      "Annual audit clearance, zero-penalty statutory filing, automated MIS dashboards, and scalable accounting support.",
    side: "left", // Icon Left, Text Right
    icon: (
      <Box component="svg" viewBox="0 0 24 24" sx={{ width: 28, height: 28, fill: "currentColor" }}>
        <path d="M12 2.5s-4 4.5-4 9.5c0 2.5 1 4.5 2 5.5v2.5l2-1 2 1V17.5c1-1 2-3 2-5.5 0-5-4-9.5-4-9.5zm-1.5 8c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        <path d="M6 14.5c-1.5.5-3 2-3 4 1 0 2.5-.5 3.5-1.5l-.5-2.5zm12 0l-.5 2.5c1 1 2.5 1.5 3.5 1.5 0-2-1.5-3.5-3-4z" />
      </Box>
    ),
  },
];

const SECTION_TITLE = "How We Work";
const WORDS = SECTION_TITLE.split(" ");

export default function ProcessStepperSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const stepperContainerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Array of boolean flags indicating if step i has been reached/passed by the scroll line
  const [passedSteps, setPassedSteps] = useState<boolean[]>([true, false, false, false, false]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const charElements = headlineRef.current?.querySelectorAll(".scrub-char-process");
    const stepRows = sectionRef.current?.querySelectorAll<HTMLElement>(".process-step-row");

    const ctx = gsap.context(() => {
      // 1. Heading letter scrub reveal
      if (charElements && charElements.length > 0) {
        gsap.fromTo(
          charElements,
          {
            color: "rgba(15, 23, 42, 0.16)",
            opacity: 0.35,
          },
          {
            color: "#0F172A",
            opacity: 1,
            stagger: 0.03,
            ease: "none",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 82%",
              end: "bottom 52%",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. Continuous Blue Line Scroll Scrub + Step Card Transformation
      if (
        stepperContainerRef.current &&
        trackRef.current &&
        progressBarRef.current &&
        stepRows &&
        stepRows.length > 0
      ) {
        // Trigger scrub linked to the stepper container scrolling through viewport (Slow, luxurious, smooth)
        ScrollTrigger.create({
          trigger: stepperContainerRef.current,
          start: "top 65%",
          end: "bottom 15%",
          scrub: 2.0, // Silky smooth 2-second momentum smoothing (slow & steady)
          onUpdate: (self) => {
            const progress = self.progress; // 0 to 1
            // Update blue progress line height
            if (progressBarRef.current) {
              progressBarRef.current.style.height = `${progress * 100}%`;
            }

            if (!trackRef.current) return;
            const trackRect = trackRef.current.getBoundingClientRect();
            // Current tip of the blue line in viewport coordinates
            const currentLineTipY = trackRect.top + progress * trackRect.height;

            // Check each step: if line tip has reached or passed the step center pin, it transforms into card!
            const newPassed = STEPS.map((_, i) => {
              if (i === 0) return true; // Step 01 is always active
              const row = stepRows[i];
              if (!row) return false;
              const rowRect = row.getBoundingClientRect();
              const rowCenterY = rowRect.top + rowRect.height / 2;
              return currentLineTipY >= rowCenterY;
            });

            setPassedSteps(newPassed);
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="process"
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        py: { xs: 10, sm: 14, md: 20 },
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Top Pill / Badge: 004 • PROCESS */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.2,
            px: 2,
            py: 0.65,
            mb: { xs: 2.5, md: 3 },
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
            004
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
              color: "#0F172A",
              textTransform: "uppercase",
            }}
          >
            PROCESS
          </Typography>
        </Box>

        {/* Heading: How We Work */}
        <Typography
          ref={headlineRef}
          component="h2"
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "2.6rem", sm: "3.6rem", md: "4.8rem" },
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.035em",
            margin: "0 auto",
            userSelect: "none",
            mb: 2,
          }}
        >
          {WORDS.map((word, wordIdx) => (
            <span
              key={wordIdx}
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
                marginRight: "0.26em",
              }}
            >
              {word.split("").map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="scrub-char-process"
                  style={{
                    display: "inline-block",
                    color: "rgba(15, 23, 42, 0.16)",
                    willChange: "color, opacity",
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </Typography>

        {/* Subtitle matching Framer template */}
        <Typography
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "0.98rem", sm: "1.1rem" },
            color: "#64748B",
            maxWidth: "720px",
            lineHeight: 1.6,
            mb: { xs: 7, sm: 9, md: 12 },
          }}
        >
          A proven methodology designed to transform complex workflows into audit-ready,
          automated financial systems — efficiently and strategically.
        </Typography>

        {/* ============================================================== */}
        {/* BIG STEPPER CONTAINER (Wider, Taller, 48px Squircle Pills)      */}
        {/* ============================================================== */}
        <Box
          ref={stepperContainerRef}
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "1080px",
            display: "flex",
            flexDirection: "column",
            gap: { xs: "28px", md: "46px" },
          }}
        >
          {/* ============================================================ */}
          {/* CONTINUOUS CENTER TIMELINE TRACK & DYNAMIC BLUE SCROLL LINE  */}
          {/* ============================================================ */}
          <Box
            ref={trackRef}
            sx={{
              position: "absolute",
              top: { xs: "36px", md: "84px" },
              bottom: { xs: "36px", md: "24px" },
              left: { xs: "32px", md: "50%" },
              transform: { xs: "none", md: "translateX(-50%)" },
              width: "2.5px",
              bgcolor: "rgba(0, 0, 0, 0.08)",
              zIndex: 2, // Level 2: On top of card background (zIndex 1), behind pin button (zIndex 10)
              pointerEvents: "none",
            }}
          >
            {/* The Vibrant Blue Growing Progress Line */}
            <Box
              ref={progressBarRef}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "0%",
                background:
                  "linear-gradient(180deg, #818CF8 0%, #6366F1 50%, #A855F7 100%)",
                boxShadow: "0 0 10px rgba(129, 140, 248, 0.7)",
                borderRadius: "9999px",
                transition: "height 0.1s linear",
              }}
            />
          </Box>

          {STEPS.map((step, idx) => {
            const isPassed = passedSteps[idx];
            const isTextOnRight = step.side === "left"; // Text is on right, Icon is on left

            return (
              <Box
                key={idx}
                className="process-step-row"
                sx={{
                  position: "relative",
                  // No numeric zIndex: allows children to participate in parent stacking context!
                  width: "100%",
                  minHeight: { xs: "auto", md: "168px" },
                  borderRadius: { xs: "32px", md: "48px" },
                  p: { xs: 3, sm: 3.5, md: "38px 52px" },
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 90px 1fr",
                  },
                  alignItems: "center",
                }}
              >
                {/* 1. CARD BACKGROUND LAYER (zIndex: 1 - Behind trackRef which is zIndex: 2) */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: { xs: "32px", md: "48px" },
                    bgcolor: isPassed ? "#F2F2F2" : "transparent",
                    border: isPassed
                      ? "1.5px solid rgba(0, 0, 0, 0.05)"
                      : "1.5px solid transparent",
                    boxShadow: isPassed
                      ? "0 10px 34px -8px rgba(15, 23, 42, 0.06)"
                      : "none",
                    transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                    zIndex: 1, // LEVEL 1: Under the line (zIndex: 2)
                    pointerEvents: "none",
                  }}
                />

                {/* ========================================================== */}
                {/* LEFT COLUMN (Desktop: Icon or Text)                        */}
                {/* ========================================================== */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 10,
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: isTextOnRight ? "flex-start" : "flex-end",
                    textAlign: isTextOnRight ? "left" : "right",
                    width: "100%",
                  }}
                >
                  {isTextOnRight ? (
                    // Left side is Big Icon Squircle + Number Chip
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2.2 }}>
                      {/* Big Icon Squircle */}
                      <Box
                        sx={{
                          width: 76,
                          height: 76,
                          borderRadius: "26px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: isPassed ? "#1A1A1A" : "#F2F2F2",
                          color: isPassed ? "#FFFFFF" : "#4B5563",
                          border: isPassed
                            ? "1px solid rgba(255, 255, 255, 0.16)"
                            : "1px solid rgba(0, 0, 0, 0.06)",
                          boxShadow: isPassed
                            ? "inset 0 0 16px rgba(255, 255, 255, 0.22), 0 8px 24px rgba(0, 0, 0, 0.22)"
                            : "inset 0 0 10px rgba(0, 0, 0, 0.04)",
                          transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        {step.icon}
                      </Box>
                      {/* Step Number Chip */}
                      <Box
                        sx={{
                          px: 1.6,
                          py: 0.6,
                          borderRadius: "12px",
                          bgcolor: isPassed ? "rgba(255, 255, 255, 0.95)" : "#F2F2F2",
                          border: "1px solid rgba(0, 0, 0, 0.06)",
                          fontFamily: "var(--font-outfit), sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "#1E293B",
                          boxShadow: isPassed ? "0 2px 8px rgba(0, 0, 0, 0.04)" : "none",
                          transition: "all 0.35s ease",
                        }}
                      >
                        {step.number}
                      </Box>
                    </Box>
                  ) : (
                    // Left side is Title + Description
                    <Box sx={{ pr: 3.5 }}>
                      <Typography
                        sx={{
                          fontFamily: "var(--font-outfit), sans-serif",
                          fontSize: "1.38rem",
                          fontWeight: 700,
                          color: isPassed ? "#0F172A" : "#64748B",
                          letterSpacing: "-0.025em",
                          mb: 0.8,
                          transition: "color 0.35s ease",
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "var(--font-outfit), sans-serif",
                          fontSize: "0.98rem",
                          color: isPassed ? "#4B5563" : "#94A3B8",
                          lineHeight: 1.55,
                          transition: "color 0.35s ease",
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* ========================================================== */}
                {/* CENTER PIN / INTERSECTION (Desktop Timeline)                */}
                {/* ========================================================== */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 10, // Level 10: ON TOP of trackRef (zIndex: 2) -> Line passes BEHIND pin button!
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {isPassed ? (
                    // Activated Rainbow Pin with Black Center Dot
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 10,
                        width: 32,
                        height: 32,
                        borderRadius: "11px",
                        background:
                          "linear-gradient(270deg, #C9AAFF 0%, #FDFFBC 25%, #FFCCFD 50%, #B3E1FF 75%, #8399FF 100%)",
                        p: "3.5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 18px rgba(192, 132, 252, 0.45)",
                        transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                          bgcolor: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: "#1A1A1A",
                          }}
                        />
                      </Box>
                    </Box>
                  ) : (
                    // Inactive Default Hollow Ring
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 10,
                        width: 22,
                        height: 22,
                        borderRadius: "8px",
                        bgcolor: "#FFFFFF",
                        border: "3px solid #E5E7EB",
                        transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  )}
                </Box>

                {/* ========================================================== */}
                {/* RIGHT COLUMN (Desktop: Opposite of Left Column)            */}
                {/* ========================================================== */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 10,
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: isTextOnRight ? "flex-start" : "flex-start",
                    textAlign: isTextOnRight ? "left" : "left",
                    width: "100%",
                  }}
                >
                  {isTextOnRight ? (
                    // Right side is Title + Description
                    <Box sx={{ pl: 3.5 }}>
                      <Typography
                        sx={{
                          fontFamily: "var(--font-outfit), sans-serif",
                          fontSize: "1.38rem",
                          fontWeight: 700,
                          color: isPassed ? "#0F172A" : "#64748B",
                          letterSpacing: "-0.025em",
                          mb: 0.8,
                          transition: "color 0.35s ease",
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "var(--font-outfit), sans-serif",
                          fontSize: "0.98rem",
                          color: isPassed ? "#4B5563" : "#94A3B8",
                          lineHeight: 1.55,
                          transition: "color 0.35s ease",
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  ) : (
                    // Right side is Big Icon Squircle + Number Chip
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2.2 }}>
                      {/* Big Icon Squircle */}
                      <Box
                        sx={{
                          width: 76,
                          height: 76,
                          borderRadius: "26px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: isPassed ? "#1A1A1A" : "#F2F2F2",
                          color: isPassed ? "#FFFFFF" : "#4B5563",
                          border: isPassed
                            ? "1px solid rgba(255, 255, 255, 0.16)"
                            : "1px solid rgba(0, 0, 0, 0.06)",
                          boxShadow: isPassed
                            ? "inset 0 0 16px rgba(255, 255, 255, 0.22), 0 8px 24px rgba(0, 0, 0, 0.22)"
                            : "inset 0 0 10px rgba(0, 0, 0, 0.04)",
                          transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        {step.icon}
                      </Box>
                      {/* Step Number Chip */}
                      <Box
                        sx={{
                          px: 1.6,
                          py: 0.6,
                          borderRadius: "12px",
                          bgcolor: isPassed ? "rgba(255, 255, 255, 0.95)" : "#F2F2F2",
                          border: "1px solid rgba(0, 0, 0, 0.06)",
                          fontFamily: "var(--font-outfit), sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "#1E293B",
                          boxShadow: isPassed ? "0 2px 8px rgba(0, 0, 0, 0.04)" : "none",
                          transition: "all 0.35s ease",
                        }}
                      >
                        {step.number}
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* ========================================================== */}
                {/* MOBILE / TABLET VIEW (Single Column Stack)                 */}
                {/* ========================================================== */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 10,
                    display: { xs: "flex", md: "none" },
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 1.8,
                    textAlign: "left",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
                    <Box
                      sx={{
                        width: 58,
                        height: 58,
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: isPassed ? "#1A1A1A" : "#F2F2F2",
                        color: isPassed ? "#FFFFFF" : "#4B5563",
                        boxShadow: isPassed ? "0 6px 16px rgba(0, 0, 0, 0.2)" : "none",
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Box
                      sx={{
                        px: 1.4,
                        py: 0.45,
                        borderRadius: "10px",
                        bgcolor: isPassed ? "#FFFFFF" : "#E2E8F0",
                        fontFamily: "var(--font-outfit), sans-serif",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "#1E293B",
                      }}
                    >
                      {step.number}
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: isPassed ? "#0F172A" : "#475569",
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: "0.92rem",
                      color: isPassed ? "#4B5563" : "#94A3B8",
                      lineHeight: 1.55,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
