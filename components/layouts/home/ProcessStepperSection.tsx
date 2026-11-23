"use client";

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS_DATA } from "@/assets/Generic-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepItem {
  number: string;
  title: string;
  description: string;
  side: "left" | "right";
  icon: React.ReactNode;
}

const STEP_ICONS: React.ReactNode[] = [
  (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{ width: 28, height: 28, fill: "currentColor" }}
    >
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </Box>
  ),
  (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{
        width: 28,
        height: 28,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 2,
      }}
    >
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="5" cy="5" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="5" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="19" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="19" r="2.2" fill="currentColor" stroke="none" />
    </Box>
  ),
  (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{ width: 28, height: 28, fill: "currentColor" }}
    >
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </Box>
  ),
  (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{ width: 28, height: 28, fill: "none", stroke: "currentColor" }}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeDasharray="38 18"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeDasharray="20 12"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </Box>
  ),
  (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{ width: 28, height: 28, fill: "currentColor" }}
    >
      <path d="M12 2.5s-4 4.5-4 9.5c0 2.5 1 4.5 2 5.5v2.5l2-1 2 1V17.5c1-1 2-3 2-5.5 0-5-4-9.5-4-9.5zm-1.5 8c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      <path d="M6 14.5c-1.5.5-3 2-3 4 1 0 2.5-.5 3.5-1.5l-.5-2.5zm12 0l-.5 2.5c1 1 2.5 1.5 3.5 1.5 0-2-1.5-3.5-3-4z" />
    </Box>
  ),
];

const STEPS: StepItem[] = PROCESS_STEPS_DATA.steps.map((step, idx) => ({
  ...step,
  icon: STEP_ICONS[idx],
}));

const WORDS = PROCESS_STEPS_DATA.title.split(" ");

export default function ProcessStepperSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const stepperContainerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Array of boolean flags indicating if step i has been reached/passed by the scroll line
  const [passedSteps, setPassedSteps] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const titleWords =
      headlineRef.current?.querySelectorAll<HTMLElement>(".process-title-word");
    const stepRows =
      sectionRef.current?.querySelectorAll<HTMLElement>(".process-step-row");

    const ctx = gsap.context(() => {
      // 1. Badge pop
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { scale: 0.8, opacity: 0, y: 15 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: badgeRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Heading: 3D perspective fold-up entrance (Hardware Accelerated)
      if (titleWords && titleWords.length > 0) {
        gsap.fromTo(
          titleWords,
          {
            y: "100%",
            rotateX: -30,
            opacity: 0,
          },
          {
            y: "0%",
            rotateX: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.06,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // 3. Subtitle fade up
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // 4. Stepper inner columns entry stagger (Zero row stacking context clash)
      const leftCols = sectionRef.current?.querySelectorAll<HTMLElement>(".step-col-left");
      const rightCols = sectionRef.current?.querySelectorAll<HTMLElement>(".step-col-right");
      if (leftCols && leftCols.length > 0) {
        gsap.fromTo(
          leftCols,
          { opacity: 0, x: -25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepperContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }
      if (rightCols && rightCols.length > 0) {
        gsap.fromTo(
          rightCols,
          { opacity: 0, x: 25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepperContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }

      // 5. Continuous Aurora Scroll Scrub Line + Step Milestone Activation
      if (
        stepperContainerRef.current &&
        trackRef.current &&
        progressBarRef.current &&
        stepRows &&
        stepRows.length > 0
      ) {
        // Pre-compute relative step thresholds & bind track strictly between Step 1 and Step 5 pins
        let stepThresholds = [0, 0.25, 0.5, 0.75, 0.95];

        const computeThresholds = () => {
          if (!trackRef.current || !stepperContainerRef.current) return;
          const firstRow = stepRows[0];
          const lastRow = stepRows[stepRows.length - 1];

          if (firstRow && lastRow) {
            const firstPinY = firstRow.offsetTop + firstRow.offsetHeight / 2;
            const lastPinY = lastRow.offsetTop + lastRow.offsetHeight / 2;
            const containerH = stepperContainerRef.current.offsetHeight;
            const bottomOffset = containerH - lastPinY;

            // Track begins at Step 1 pin center and ends EXACTLY at Step 5 pin center (never overflows card)
            trackRef.current.style.top = `${firstPinY}px`;
            trackRef.current.style.bottom = `${bottomOffset}px`;
          }

          const trackTop = trackRef.current.offsetTop;
          const trackHeight = trackRef.current.offsetHeight;
          if (trackHeight <= 0) return;

          stepThresholds = STEPS.map((_, i) => {
            if (i === 0) return 0;
            if (i === STEPS.length - 1) return 0.94; // Activates cleanly as line enters last pin
            const row = stepRows[i];
            if (!row) return 1;
            const rowCenterY = row.offsetTop + row.offsetHeight / 2;
            return Math.max(
              0,
              Math.min(1, (rowCenterY - 14 - trackTop) / trackHeight)
            );
          });
        };

        computeThresholds();

        // Native GSAP fromTo tween: Zero-reflow, GPU-optimized, buttery 2.0s scrub
        gsap.fromTo(
          progressBarRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: stepperContainerRef.current,
              start: "top 68%",
              end: "bottom 52%",
              scrub: 0.6, // Ultra-responsive instantaneous momentum
              onRefresh: computeThresholds,
              onUpdate: (self) => {
                const progress = self.progress;

                // Zero-reflow step calculation: pure numerical comparison!
                const newPassed = stepThresholds.map((threshold, i) =>
                  i === 0 ? true : progress >= threshold
                );

                // Memoized state update: ONLY trigger re-render if a step actually changed state
                setPassedSteps((prev) => {
                  let changed = false;
                  for (let i = 0; i < STEPS.length; i++) {
                    if (prev[i] !== newPassed[i]) {
                      changed = true;
                      break;
                    }
                  }
                  return changed ? newPassed : prev;
                });
              },
            },
          }
        );
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
        py: { xs: 6, sm: 8, md: 10 },
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
          ref={badgeRef}
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
            {PROCESS_STEPS_DATA.badgeNumber}
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
            {PROCESS_STEPS_DATA.badgeLabel}
          </Typography>
        </Box>

        {/* Heading: How We Work - 3D Perspective Fold-Up Entrance */}
        <Typography
          ref={headlineRef}
          component="h2"
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "2.6rem", sm: "3.6rem", md: "4.8rem" },
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.035em",
            color: "#0F172A",
            margin: "0 auto",
            userSelect: "none",
            perspective: "1000px",
            mb: 2,
          }}
        >
          {WORDS.map((word, wordIdx) => (
            <span
              key={wordIdx}
              style={{
                display: "inline-block",
                overflow: "hidden",
                marginRight: "0.26em",
                verticalAlign: "bottom",
              }}
            >
              <span
                className="process-title-word"
                style={{
                  display: "inline-block",
                  willChange: "transform, opacity",
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </Typography>

        {/* Subtitle matching Framer template */}
        <Typography
          ref={subtitleRef}
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "0.98rem", sm: "1.1rem" },
            color: "#64748B",
            maxWidth: "720px",
            lineHeight: 1.6,
            mb: { xs: 7, sm: 9, md: 12 },
          }}
        >
          A proven methodology designed to transform complex workflows into
          audit-ready, automated financial systems — efficiently and
          strategically.
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
            gap: { xs: "32px", md: "56px" },
          }}
        >
          {/* ============================================================ */}
          {/* CONTINUOUS CENTER TIMELINE TRACK & DYNAMIC COOL AURORA SCROLL LINE */}
          {/* ============================================================ */}
          <Box
            ref={trackRef}
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: { xs: "48px", md: "86px" },
              bottom: { xs: "48px", md: "86px" }, // Ends strictly at Step 05's pin center — never overflows card
              left: { xs: "32px", md: "50%" },
              transform: { xs: "none", md: "translateX(-50%)" },
              width: { xs: "2.5px", md: "3px" },
              bgcolor: "rgba(0, 0, 0, 0.08)",
              zIndex: 2, // Level 2: On top of card background (zIndex 1), behind pin button (zIndex 10)
              pointerEvents: "none",
            }}
          >
            {/* 5-Step Harmonious Cool Palette: Soft Pink ➔ Lilac ➔ Periwinkle ➔ Sky ➔ Mint */}
            <Box
              ref={progressBarRef}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "0%",
                background:
                  "linear-gradient(180deg, #F472B6 0%, #C084FC 25%, #818CF8 50%, #38BDF8 75%, #2DD4BF 100%)",
                boxShadow:
                  "0 0 10px rgba(192, 132, 252, 0.40), 0 0 18px rgba(45, 212, 191, 0.35)",
                borderRadius: "9999px",
                willChange: "height",
              }}
            >
              {/* Traveling Glowing Laser Node at the line tip */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -6,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  bgcolor: "#FFFFFF",
                  boxShadow:
                    "0 0 10px 3px #38BDF8, 0 0 20px 6px #C084FC, 0 0 35px 10px rgba(45, 212, 191, 0.8)",
                  pointerEvents: "none",
                  animation: "pulse 1.8s infinite ease-in-out",
                  "@keyframes pulse": {
                    "0%, 100%": { transform: "translateX(-50%) scale(1)", opacity: 1 },
                    "50%": { transform: "translateX(-50%) scale(1.35)", opacity: 0.85 },
                  },
                }}
              />
            </Box>
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
                  minHeight: { xs: "auto", md: "172px" },
                  borderRadius: { xs: "32px", md: "48px" },
                  p: { xs: 3, sm: 4, md: "40px 56px" },
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 90px 1fr",
                  },
                  alignItems: "center",
                }}
              >
                {/* 1. CARD BACKGROUND LAYER (GPU-accelerated silky fade-in & scale) */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: { xs: "32px", md: "48px" },
                    bgcolor: "#F2F2F2",
                    border: "1.5px solid rgba(0, 0, 0, 0.05)",
                    boxShadow: "0 10px 34px -8px rgba(15, 23, 42, 0.06)",
                    opacity: isPassed ? 1 : 0,
                    transform: isPassed ? "scale(1)" : "scale(0.985)",
                    transition:
                      "opacity 0.65s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    zIndex: 1, // LEVEL 1: Under the line (zIndex: 2)
                    pointerEvents: "none",
                  }}
                />

                {/* ========================================================== */}
                {/* LEFT COLUMN (Desktop: Icon or Text)                        */}
                {/* ========================================================== */}
                <Box
                  className="step-col-left"
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
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 2.2 }}
                    >
                      {/* Big Icon Squircle (Exact Framer Conicorn styling) */}
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: isPassed ? "rgb(82, 82, 82)" : "rgb(242, 242, 242)",
                          color: isPassed ? "#FFFFFF" : "rgb(26, 26, 26)",
                          border: isPassed
                            ? "1px solid rgba(255, 255, 255, 0.08)"
                            : "1px solid rgb(230, 230, 230)",
                          boxShadow: isPassed
                            ? "0 12px 32px -4px rgba(0, 0, 0, 0.5), 0 4px 14px rgba(0, 0, 0, 0.38), inset 0px 0px 14px 0px rgba(255, 255, 255, 0.32)"
                            : "inset 0px 0px 12px 0px rgba(0, 0, 0, 0.12)",
                          transform: isPassed ? "scale(1)" : "scale(0.97)",
                          transition: "all 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)",
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
                          bgcolor: isPassed
                            ? "rgba(255, 255, 255, 0.95)"
                            : "#F2F2F2",
                          border: "1px solid rgba(0, 0, 0, 0.06)",
                          fontFamily: "var(--font-outfit), sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "#1E293B",
                          boxShadow: isPassed
                            ? "0 2px 8px rgba(0, 0, 0, 0.04)"
                            : "none",
                          transition: "all 0.55s ease",
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
                          transition: "color 0.55s ease",
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
                          transition: "color 0.55s ease",
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* ========================================================== */}
                {/* CENTER PIN / INTERSECTION (Line passes STRICTLY BEHIND pin) */}
                {/* ========================================================== */}
                <Box
                  className="step-center-pin"
                  sx={{
                    position: "relative",
                    zIndex: 25, // Level 25: ON TOP of trackRef (zIndex: 2) -> Line passes BEHIND pin button!
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Solid White Squircle Backing: Blocks 3px track line completely under pin */}
                    <Box
                      sx={{
                        position: "absolute",
                        width: 26,
                        height: 26,
                        borderRadius: "9px",
                        bgcolor: "#FFFFFF",
                        zIndex: 0,
                      }}
                    />

                    {/* Inactive Pin (Smooth dissolve out) */}
                    <Box
                      sx={{
                        position: "absolute",
                        width: 22,
                        height: 22,
                        borderRadius: "8px",
                        bgcolor: "#FFFFFF",
                        border: "2.5px solid #E2E8F0",
                        opacity: isPassed ? 0 : 1,
                        transform: isPassed ? "scale(0.85)" : "scale(1)",
                        transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
                        zIndex: 1,
                      }}
                    />

                    {/* Active Rainbow Pin (Smooth luminous bloom in) */}
                    <Box
                      sx={{
                        position: "absolute",
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
                        opacity: isPassed ? 1 : 0,
                        transform: isPassed ? "scale(1)" : "scale(0.85)",
                        transition: "all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
                        zIndex: 2,
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
                  </Box>
                </Box>

                {/* ========================================================== */}
                {/* RIGHT COLUMN (Desktop: Opposite of Left Column)            */}
                {/* ========================================================== */}
                <Box
                  className="step-col-right"
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
                          transition: "color 0.55s ease",
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
                          transition: "color 0.55s ease",
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  ) : (
                    // Right side is Big Icon Squircle + Number Chip
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 2.2 }}
                    >
                      {/* Big Icon Squircle (Exact Framer Conicorn styling) */}
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "28px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: isPassed ? "rgb(82, 82, 82)" : "rgb(242, 242, 242)",
                          color: isPassed ? "#FFFFFF" : "rgb(26, 26, 26)",
                          border: isPassed
                            ? "1px solid rgba(255, 255, 255, 0.08)"
                            : "1px solid rgb(230, 230, 230)",
                          boxShadow: isPassed
                            ? "0 12px 32px -4px rgba(0, 0, 0, 0.5), 0 4px 14px rgba(0, 0, 0, 0.38), inset 0px 0px 14px 0px rgba(255, 255, 255, 0.32)"
                            : "inset 0px 0px 12px 0px rgba(0, 0, 0, 0.12)",
                          transform: isPassed ? "scale(1)" : "scale(0.97)",
                          transition: "all 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)",
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
                          bgcolor: isPassed
                            ? "rgba(255, 255, 255, 0.95)"
                            : "#F2F2F2",
                          border: "1px solid rgba(0, 0, 0, 0.06)",
                          fontFamily: "var(--font-outfit), sans-serif",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          color: "#1E293B",
                          boxShadow: isPassed
                            ? "0 2px 8px rgba(0, 0, 0, 0.04)"
                            : "none",
                          transition: "all 0.55s ease",
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
                        bgcolor: isPassed ? "rgb(82, 82, 82)" : "rgb(242, 242, 242)",
                        color: isPassed ? "#FFFFFF" : "rgb(26, 26, 26)",
                        border: isPassed
                          ? "1px solid rgba(255, 255, 255, 0.08)"
                          : "1px solid rgb(230, 230, 230)",
                        boxShadow: isPassed
                          ? "0 8px 24px -2px rgba(0, 0, 0, 0.45), inset 0px 0px 10px 0px rgba(255, 255, 255, 0.28)"
                          : "inset 0px 0px 10px 0px rgba(0, 0, 0, 0.12)",
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
