"use client";

import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASE_STUDIES_DATA } from "@/assets/Generic-data";
import { attachCard3DTilt } from "@/utils/gsapCardTilt";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CASE_STUDIES = CASE_STUDIES_DATA.studies;

export default function CaseStudiesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentSlideRef = useRef(0);
  currentSlideRef.current = currentSlide;

  const isAnimatingRef = useRef(false);
  isAnimatingRef.current = isAnimating;

  const isHoveredRef = useRef(false);
  isHoveredRef.current = isHovered;

  const slideContentRef = useRef<HTMLDivElement | null>(null);
  const slideImageRef = useRef<HTMLDivElement | null>(null);
  const cardShellRef = useRef<HTMLDivElement | null>(null);
  const navButtonsRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  // Auto-play interval: smooth progression every 4.5s, pauses while hovered
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredRef.current && !isAnimatingRef.current) {
        const nextIdx = (currentSlideRef.current + 1) % CASE_STUDIES.length;
        goToSlide(nextIdx, 1);
      }
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // GSAP Scroll reveal for heading & cinematic card entrance
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanupTilt: (() => void) | null = null;
    const ctx = gsap.context(() => {
      // 1. Headline Tracking Compression & Rise
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 45, letterSpacing: "0.05em" },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "-0.035em",
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Cinematic 3D Card Perspective Rise & Image Focus Zoom
      if (cardShellRef.current) {
        gsap.fromTo(
          cardShellRef.current,
          {
            opacity: 0,
            y: 90,
            scale: 0.90,
            rotateX: 12,
            transformPerspective: 1200,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.05,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: cardShellRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Ken Burns image scale-in focus
        if (slideImageRef.current) {
          gsap.fromTo(
            slideImageRef.current,
            { scale: 1.14, opacity: 0.8 },
            {
              scale: 1.0,
              opacity: 1,
              duration: 1.2,
              ease: "power2.out",
              force3D: true,
              scrollTrigger: {
                trigger: cardShellRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // 3. Navigation Arrows Elastic Pop
      const navButtons = sectionRef.current?.querySelectorAll(".case-nav-btn");
      if (navButtons && navButtons.length > 0) {
        gsap.fromTo(
          navButtons,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: "back.out(2.2)",
            scrollTrigger: {
              trigger: cardShellRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 4. Butter-Smooth 120 FPS 3D Cursor Parallax Tilt on Card
      cleanupTilt = attachCard3DTilt(cardShellRef.current, {
        maxTilt: 6,
        maxMove: 10,
        perspective: 1200,
        scaleOnHover: 1.01,
      });
    }, sectionRef);

    return () => {
      cleanupTilt?.();
      ctx.revert();
    };
  }, []);

  const goToSlide = (newIndex: number, forcedDir?: 1 | -1) => {
    if (isAnimatingRef.current) return;
    if (newIndex === currentSlideRef.current) return;
    setIsAnimating(true);
    isAnimatingRef.current = true;

    const fromIdx = currentSlideRef.current;
    const dir = forcedDir !== undefined ? forcedDir : (newIndex > fromIdx ? 1 : -1);

    const contentEl = slideContentRef.current;
    const imageEl = slideImageRef.current;

    // Smooth directional slide transition
    gsap.to(contentEl, {
      opacity: 0,
      x: -30 * dir,
      duration: 0.22,
      ease: "power2.in",
    });

    gsap.to(imageEl, {
      opacity: 0,
      scale: 0.94,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setCurrentSlide(newIndex);
        currentSlideRef.current = newIndex;
        gsap.fromTo(
          contentEl,
          { opacity: 0, x: 30 * dir },
          { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
        );
        gsap.fromTo(
          imageEl,
          { opacity: 0, scale: 1.06 },
          {
            opacity: 1,
            scale: 1.0,
            duration: 0.45,
            ease: "power3.out",
            onComplete: () => {
              setIsAnimating(false);
              isAnimatingRef.current = false;
            },
          }
        );
      },
    });
  };

  const handlePrev = () => {
    const nextIdx = (currentSlide - 1 + CASE_STUDIES.length) % CASE_STUDIES.length;
    goToSlide(nextIdx, -1);
  };

  const handleNext = () => {
    const nextIdx = (currentSlide + 1) % CASE_STUDIES.length;
    goToSlide(nextIdx, 1);
  };

  const slide = CASE_STUDIES[currentSlide];

  return (
    <Box
      component="section"
      id="case-studies"
      ref={sectionRef}
      sx={{
        position: "relative",
        zIndex: 1,
        py: { xs: 6, sm: 8, md: 10 },
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
        }}
      >
        {/* Top Pill / Badge: 005 • CASE STUDIES */}
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
            {CASE_STUDIES_DATA.badgeNumber}
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
            {CASE_STUDIES_DATA.badgeLabel}
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
            mb: { xs: 5, md: 8 },
            lineHeight: 1.15,
          }}
        >
          {CASE_STUDIES_DATA.title}
        </Typography>

        {/* Outer Slider Container with Floating Navigation Arrows */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "1061px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Desktop Left Nav Button */}
          <IconButton
            className="case-nav-btn"
            onClick={handlePrev}
            aria-label="Previous Slide"
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              left: -64,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 48,
              height: 48,
              bgcolor: "#1A1A1A",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
              transition: "all 0.25s ease",
              "&:hover": {
                bgcolor: "#262626",
                transform: "translateY(-50%) scale(1.08)",
                borderColor: "rgba(255, 255, 255, 0.25)",
              },
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{ width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </Box>
          </IconButton>

          {/* Desktop Right Nav Button */}
          <IconButton
            className="case-nav-btn"
            onClick={handleNext}
            aria-label="Next Slide"
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              right: -64,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: 48,
              height: 48,
              bgcolor: "#1A1A1A",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
              transition: "all 0.25s ease",
              "&:hover": {
                bgcolor: "#262626",
                transform: "translateY(-50%) scale(1.08)",
                borderColor: "rgba(255, 255, 255, 0.25)",
              },
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{ width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </Box>
          </IconButton>

          {/* EXACT CARD WRAPPER */}
          {/* Framer exact spec: Desktop 128px radius, Tablet 140px, Mobile 80px */}
          <Box
            ref={cardShellRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              width: "100%",
              minHeight: 500,
              bgcolor: "#F2F2F2",
              borderRadius: {
                xs: "40px",
                sm: "64px",
                md: "128px",
              },
              p: "8px",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "stretch",
              gap: { xs: "16px", md: "8px" },
              overflow: "hidden",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow:
                "0 24px 60px -12px rgba(15, 23, 42, 0.12), 0 8px 24px -6px rgba(15, 23, 42, 0.06), inset 0 1px 2px rgba(255, 255, 255, 0.95)",
              transition: "box-shadow 0.35s ease, border-color 0.35s ease",
              willChange: "transform",
              "&:hover": {
                boxShadow:
                  "0 32px 75px -12px rgba(15, 23, 42, 0.16), 0 12px 30px -6px rgba(15, 23, 42, 0.08), inset 0 1px 2px #FFFFFF",
              },
            }}
          >
            {/* LEFT VISUAL BOX (Image Wrap) */}
            {/* Framer exact spec: Desktop 120px radius, Tablet 132px, Mobile 80px */}
            <Box
              ref={slideImageRef}
              sx={{
                width: { xs: "100%", md: 484 },
                height: { xs: 240, sm: 340, md: 484 },
                flexShrink: 0,
                bgcolor: "#000000",
                borderRadius: {
                  xs: "32px",
                  sm: "56px",
                  md: "120px",
                },
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow:
                  "0 12px 32px -4px rgba(0, 0, 0, 0.35), inset 0px 1px 13px 0px rgba(255, 255, 255, 0.85), inset 0px 0px 40px 0px rgba(255, 255, 255, 0.35)",
              }}
            >
              {/* Actual Image Visual */}
              <Box
                component="img"
                src={slide.image}
                alt={slide.imageAlt}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.5s ease",
                }}
              />

              {/* Inner ambient glow overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  borderRadius: {
                    xs: "32px",
                    sm: "56px",
                    md: "120px",
                  },
                  boxShadow:
                    "inset 0px 0px 40px 0px rgba(255, 255, 255, 0.35), inset 0px 0px 12px 0px rgba(255, 255, 255, 0.8)",
                }}
              />
            </Box>

            {/* RIGHT CONTENT COLUMN */}
            <Box
              ref={slideContentRef}
              sx={{
                flex: 1,
                minHeight: { md: 484 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: { xs: "28px 24px 32px 24px", sm: "36px 40px", md: "44px 44px" },
              }}
            >
              {/* Top Group: Title & Description */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, sm: 2 } }}>
                <Typography
                  component="h3"
                  sx={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: { xs: "1.35rem", sm: "1.55rem", md: "1.75rem" },
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.25,
                    color: "#0F172A",
                    maxWidth: 480,
                  }}
                >
                  {slide.title}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: { xs: "0.92rem", sm: "0.96rem", md: "1.02rem" },
                    color: "#475569",
                    lineHeight: 1.55,
                    letterSpacing: "-0.015em",
                    maxWidth: 460,
                  }}
                >
                  {slide.description}
                </Typography>
              </Box>

              {/* Bottom Metrics Grid */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  gap: { xs: 1.5, sm: 3, md: 4 },
                  pt: { xs: 3, sm: 4, md: 0 },
                  borderTop: { xs: "1px solid rgba(0, 0, 0, 0.06)", md: "none" },
                }}
              >
                {slide.stats.map((stat, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "var(--font-outfit), sans-serif",
                        fontSize: { xs: "1.3rem", sm: "1.75rem", md: "2rem" },
                        fontWeight: 600,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        color: "#1A1A1A",
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "var(--font-outfit), sans-serif",
                        fontSize: { xs: "0.74rem", sm: "0.85rem", md: "0.9rem" },
                        color: "#64748B",
                        lineHeight: 1.3,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Universal Navigation Indicator & Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mt: { xs: 3, md: 3.5 },
          }}
        >
          {/* Mobile Prev Button */}
          <IconButton
            onClick={handlePrev}
            aria-label="Previous Slide"
            sx={{
              display: { xs: "flex", md: "none" },
              width: 42,
              height: 42,
              bgcolor: "#1A1A1A",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
              "&:hover": { bgcolor: "#262626" },
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{ width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </Box>
          </IconButton>

          {/* Clickable Dots Indicator for ALL devices */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              px: 2,
              py: 0.9,
              bgcolor: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: "9999px",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
            }}
          >
            {CASE_STUDIES.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                role="button"
                sx={{
                  width: idx === currentSlide ? 28 : 8,
                  height: 8,
                  borderRadius: "9999px",
                  bgcolor: idx === currentSlide ? "#0F172A" : "#CBD5E1",
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  "&:hover": {
                    bgcolor: idx === currentSlide ? "#0F172A" : "#94A3B8",
                    transform: "scale(1.15)",
                  },
                }}
              />
            ))}
          </Box>

          {/* Mobile Next Button */}
          <IconButton
            onClick={handleNext}
            aria-label="Next Slide"
            sx={{
              display: { xs: "flex", md: "none" },
              width: 42,
              height: 42,
              bgcolor: "#1A1A1A",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
              "&:hover": { bgcolor: "#262626" },
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{ width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </Box>
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

