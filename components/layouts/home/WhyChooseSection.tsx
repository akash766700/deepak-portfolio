"use client";

import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTION_TITLE = "Why Choose Me?";
const WORDS = SECTION_TITLE.split(" ");

const CARDS_DATA = [
  {
    step: "01",
    title: "Audit-Ready Financial Rigor",
    description: "100% statutory compliance, flawless GST & TDS filings, and zero-error ledger reconciliation.",
    icon: "star",
  },
  {
    step: "02",
    title: "Finance + IT Automation",
    description: "Rare dual M.Com & MCA edge delivering automated MIS pipelines, 5x faster reporting, and ERP workflows.",
    icon: "rocket",
  },
  {
    step: "03",
    title: "10+ Years Proven Leadership",
    description: "Battle-tested accounting across manufacturing (Summercool), retail (Bajaj), and trusts (Paavan Ashram).",
    icon: "modular",
  },
];

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const charElements = headlineRef.current?.querySelectorAll(".scrub-char-why");
    const cardElements = cardsContainerRef.current?.querySelectorAll(".exact-card-shell");

    const ctx = gsap.context(() => {
      // 1. Heading Letter-by-Letter Scroll Color Reveal from Grey to Black
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

      // 2. Subtle stagger entrance on the 3 cards
      if (cardElements && cardElements.length > 0) {
        gsap.fromTo(
          cardElements,
          {
            y: 45,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
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
      id="value"
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        py: { xs: 10, sm: 12, md: 16 },
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
          px: { xs: 2.5, sm: 4, md: 6 },
        }}
      >
        {/* Top Pill / Badge: 002 • VALUE */}
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
            002
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
            VALUE
          </Typography>
        </Box>

        {/* Heading: Scroll-driven Letter-by-Letter Reveal from Grey to Solid Black */}
        <Typography
          ref={headlineRef}
          component="h2"
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "2.5rem", sm: "3.4rem", md: "4.4rem" },
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.035em",
            margin: "0 auto",
            userSelect: "none",
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
                  className="scrub-char-why"
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

        {/* Subtitle matching the profile */}
        <Typography
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.12rem" },
            color: "#64748B",
            maxWidth: "680px",
            lineHeight: 1.55,
            mt: 2,
            mb: { xs: 5, sm: 7, md: 8 },
          }}
        >
          Bridging 10+ years of financial leadership with modern IT automation — delivering
          zero-error accounting, 100% audit readiness, and streamlined enterprise growth.
        </Typography>

        {/* 3 Cards Container */}
        <Box
          ref={cardsContainerRef}
          sx={{
            width: "100%",
            maxWidth: "1120px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 3.5, sm: 4, md: "28px" },
            margin: "0 auto",
          }}
        >
          {CARDS_DATA.map((card, idx) => (
            <Box
              key={idx}
              className="exact-card-shell"
              sx={{
                position: "relative",
                width: { xs: "100%", sm: "341px" },
                maxWidth: "341px",
                minHeight: { xs: "auto", sm: "468px" },
                // Exact Framer Conicorn Asymmetric Arch: Top curve 100px, Bottom curve 60px
                bgcolor: "#F4F5F7",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                borderRadius: {
                  xs: "72px 72px 48px 48px",
                  sm: "86px 86px 54px 54px",
                  md: "100px 100px 60px 60px",
                },
                // Reduced inner padding: slim, balanced 12px frame around the dark capsule
                p: { xs: "10px 10px 20px 10px", sm: "12px 12px 24px 12px" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow:
                  "0 12px 36px -8px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow:
                    "0 22px 50px -10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)",
                  "& .glossy-3d-sphere": {
                    transform: "scale(1.05)",
                  },
                },
              }}
            >
              {/* Inner Capsule Screen: Concentric Arch Curvature (Top 88px, Bottom 48px) */}
              <Box
                className="inner-dark-screen"
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: "275px", sm: "300px" },
                  borderRadius: {
                    xs: "62px 62px 38px 38px",
                    sm: "74px 74px 42px 42px",
                    md: "88px 88px 48px 48px",
                  },
                  // Lighter, luminous slate-graphite spotlight matching screenshot brightness
                  background:
                    "radial-gradient(ellipse at 50% 41%, #6B7079 0%, #52565F 38%, #41444C 72%, #383A41 100%)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1.5px solid rgba(255, 255, 255, 0.32)",
                  // Luminous perimeter inner glow matching the screenshot rim
                  boxShadow:
                    "inset 0 0 30px 4px rgba(255, 255, 255, 0.20), inset 0 2px 4px rgba(255, 255, 255, 0.45), 0 10px 30px rgba(0, 0, 0, 0.12)",
                }}
              >
                {/* Dotted Matrix Texture Pattern across screen */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.30) 1.2px, transparent 1.2px)",
                    backgroundSize: "12px 12px",
                    backgroundPosition: "center center",
                    opacity: 0.8,
                    pointerEvents: "none",
                    maskImage:
                      "radial-gradient(ellipse at 50% 41%, black 48%, rgba(0,0,0,0.55) 78%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at 50% 41%, black 48%, rgba(0,0,0,0.55) 78%, transparent 100%)",
                  }}
                />

                {/* Ring 3 (Outer-most Translucent Ring - 176px) */}
                <Box
                  className="ring-3-outer"
                  sx={{
                    position: "relative",
                    width: { xs: 150, sm: 164, md: 176 },
                    height: { xs: 150, sm: 164, md: 176 },
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.04) 70%, transparent 100%)",
                    border: "1.5px solid rgba(255, 255, 255, 0.28)",
                    boxShadow: "0 0 25px rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {/* Ring 2 (Middle Concentric Ring - 144px) */}
                  <Box
                    className="ring-2-middle"
                    sx={{
                      width: { xs: 122, sm: 134, md: 144 },
                      height: { xs: 122, sm: 134, md: 144 },
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 70%, transparent 100%)",
                      border: "1.5px solid rgba(255, 255, 255, 0.38)",
                      boxShadow:
                        "0 0 18px rgba(255, 255, 255, 0.12), inset 0 1px 3px rgba(255, 255, 255, 0.4)",
                    }}
                  >
                    {/* Ring 1 (Inner Metallic Silver Disc - 116px) */}
                    <Box
                      className="glossy-3d-sphere ring-1-inner"
                      sx={{
                        width: { xs: 98, sm: 108, md: 116 },
                        height: { xs: 98, sm: 108, md: 116 },
                        borderRadius: "50%",
                        // Exact Vertical Metallic Gradient: Bright silver top to soft slate bottom
                        background:
                          "linear-gradient(180deg, #FFFFFF 0%, #EFF1F5 18%, #D6DBE5 46%, #ADB4C4 78%, #8D93A1 100%)",
                        border: "1.5px solid rgba(255, 255, 255, 0.95)",
                        boxShadow:
                          "inset 0 2.5px 4px rgba(255, 255, 255, 0.95), inset 0 -2px 4px rgba(0, 0, 0, 0.22), 0 12px 30px rgba(0, 0, 0, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {/* Inner Rim Specular Highlight */}
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 1.5,
                          borderRadius: "50%",
                          border: "1px solid rgba(255, 255, 255, 0.75)",
                          pointerEvents: "none",
                        }}
                      />

                      {/* Exact Icon Rendering */}
                      {card.icon === "star" && (
                        <Box
                          component="svg"
                          viewBox="0 0 40 40"
                          sx={{
                            width: { xs: 42, sm: 46 },
                            height: { xs: 42, sm: 46 },
                            fill: "#FFFFFF",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                          }}
                        >
                          {/* Chubby 5-point Star */}
                          <path d="M20 7 C20.5 7 21 7.5 21.4 8.3 L23.2 12.4 C23.5 13 24.1 13.4 24.8 13.5 L29.3 14 C30.3 14.1 30.8 15 30.4 15.8 L26.9 18.9 C26.4 19.4 26.2 20 26.3 20.7 L27.3 25.1 C27.5 26.1 26.6 26.8 25.8 26.3 L22 24.1 C21.4 23.7 20.6 23.7 20 24.1 L16.2 26.3 C15.4 26.8 14.5 26.1 14.7 25.1 L15.7 20.7 C15.8 20 15.6 19.4 15.1 18.9 L11.6 15.8 C11.2 15 11.7 14.1 12.7 14 L17.2 13.5 C17.9 13.4 18.5 13 18.8 12.4 L20.6 8.3 C21 7.5 20.5 7 20 7 Z" />
                          {/* Left crescent swoosh trail */}
                          <path d="M10 16.5 C7.8 19.5 7.5 23.5 10 26.5 C12 29 15.2 29.5 17.5 28 C14 28 11.2 26 10.2 22.5 C9.7 20.5 9.8 18.5 10 16.5 Z" />
                          {/* Lower 4-point sparkle */}
                          <path d="M17 29 C17 30.5 17.8 31.5 19.3 31.5 C17.8 31.5 17 32.5 17 34 C17 32.5 16.2 31.5 14.7 31.5 C16.2 31.5 17 30.5 17 29 Z" />
                          {/* Right small 4-point sparkle */}
                          <path d="M29 24.5 C29 25.6 29.6 26.3 30.8 26.3 C29.6 26.3 29 27 29 28.1 C29 27 28.4 26.3 27.2 26.3 C28.4 26.3 29 25.6 29 24.5 Z" />
                        </Box>
                      )}

                      {card.icon === "rocket" && (
                        <Box
                          component="svg"
                          viewBox="0 0 40 40"
                          sx={{
                            width: { xs: 40, sm: 44 },
                            height: { xs: 40, sm: 44 },
                            fill: "#FFFFFF",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                          }}
                        >
                          {/* Rocket fuselage angled at 45 deg */}
                          <path d="M29.5 8.5 C26.5 8.5 20 12 17 15 L14 16 C12.5 16.5 11.5 18 12 19.5 L14 21.5 L10.5 25 C10 25.5 10 26.5 10.5 27 C11 27.5 12 27.5 12.5 27 L16 23.5 L18 25.5 C19.5 26 21 25 21.5 23.5 L22.5 20.5 C25.5 17.5 29 11.5 30 9 C30 8.5 30 8.5 29.5 8.5 Z M23.5 13.5 C22.7 13.5 22 12.8 22 12 C22 11.2 22.7 10.5 23.5 10.5 C24.3 10.5 25 11.2 25 12 C25 12.8 24.3 13.5 23.5 13.5 Z" />
                          {/* Speed trails */}
                          <circle cx="8" cy="30" r="1.5" />
                          <circle cx="12" cy="32" r="1.8" />
                          <circle cx="16" cy="30" r="1.4" />
                        </Box>
                      )}

                      {card.icon === "modular" && (
                        <Box
                          component="svg"
                          viewBox="0 0 40 40"
                          sx={{
                            width: { xs: 38, sm: 42 },
                            height: { xs: 38, sm: 42 },
                            fill: "#FFFFFF",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                          }}
                        >
                          {/* 4 Rounded Modules */}
                          <rect x="8" y="8" width="10" height="10" rx="3.5" />
                          <rect x="8" y="22" width="10" height="10" rx="3.5" />
                          <rect x="22" y="22" width="10" height="10" rx="3.5" />
                          {/* Top-Right Module with Plus Indicator */}
                          <rect x="22" y="8" width="10" height="10" rx="3.5" />
                          <path
                            d="M27 11.5v3M25.5 13h3"
                            stroke="#1E2024"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>

                {/* Arched Step Tab Badge (01, 02, 03) flush at bottom edge */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "40px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    bgcolor: "rgba(255, 255, 255, 0.14)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    borderBottom: "none",
                    boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.12)",
                    zIndex: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "var(--font-outfit), monospace",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      letterSpacing: "0.04em",
                      transform: "translateY(-1px)",
                    }}
                  >
                    {card.step}
                  </Typography>
                </Box>
              </Box>

              {/* Text Below Inner Screen */}
              <Box sx={{ width: "100%", pt: 1.8, px: 1, pb: 0.2 }}>
                <Typography
                  component="h3"
                  sx={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: { xs: "1.15rem", sm: "1.24rem" },
                    fontWeight: 650,
                    color: "#111827",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                    mb: 0.6,
                  }}
                >
                  {card.title}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: { xs: "0.86rem", sm: "0.92rem" },
                    color: "#4B5563",
                    lineHeight: 1.5,
                    maxWidth: "275px",
                    margin: "0 auto",
                  }}
                >
                  {card.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
