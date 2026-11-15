"use client";

import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CaseStudySlide {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  stats: {
    value: string;
    label: string;
  }[];
}

const CASE_STUDIES: CaseStudySlide[] = [
  {
    id: "real-estate",
    title: "AI Property Inquiry Chatbot for Real Estate Firms",
    description:
      "An intelligent chatbot that qualifies property inquiries, answers buyer questions, and schedules viewings.",
    image: "/assets/case-studies/case-1-real-estate.png",
    imageAlt: "AI Property Inquiry Chatbot Visual",
    stats: [
      { value: "3x", label: "Lead Response" },
      { value: "+40%", label: "View Bookings" },
      { value: "24/7", label: "Engagement" },
    ],
  },
  {
    id: "creative-teams",
    title: "AI Project Management Automation for Creative Teams",
    description:
      "Streamlining project coordination and task assignments for faster delivery and smoother collaboration.",
    image: "/assets/case-studies/case-2-creative-teams.png",
    imageAlt: "AI Project Management Visual",
    stats: [
      { value: "+38%", label: "Faster Delivery" },
      { value: "-62%", label: "Admin Work" },
      { value: "4x", label: "Productivity" },
    ],
  },
  {
    id: "finance-saas",
    title: "AI Workflow Automation for Finance SaaS Company",
    description:
      "We analyze real estate workflows, identify operational bottlenecks, and uncover revenue opportunities.",
    image: "/assets/case-studies/case-3-finance-saas.png",
    imageAlt: "AI Workflow Automation Visual",
    stats: [
      { value: "+40%", label: "Demo Booking" },
      { value: "+25%", label: "Closing Rate" },
      { value: "3x", label: "Engagement" },
    ],
  },
];

export default function CaseStudiesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideContentRef = useRef<HTMLDivElement | null>(null);
  const slideImageRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  // GSAP Scroll reveal for heading
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

  const goToSlide = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const contentEl = slideContentRef.current;
    const imageEl = slideImageRef.current;

    // Smooth transition
    gsap.to([contentEl, imageEl], {
      opacity: 0,
      scale: 0.96,
      duration: 0.22,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSlide(newIndex);
        gsap.fromTo(
          [contentEl, imageEl],
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  const handlePrev = () => {
    const nextIdx = (currentSlide - 1 + CASE_STUDIES.length) % CASE_STUDIES.length;
    goToSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentSlide + 1) % CASE_STUDIES.length;
    goToSlide(nextIdx);
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
        pt: { xs: 4, sm: 6, md: 8 },
        pb: { xs: 8, md: 14 },
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
            005
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
            Case Studies
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
          What We’ve Built
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
            sx={{
              width: "100%",
              minHeight: 500,
              bgcolor: "#F2F2F2",
              borderRadius: {
                xs: "80px",
                sm: "140px",
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
              transition: "box-shadow 0.3s ease, transform 0.3s ease",
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
                height: { xs: 320, sm: 400, md: 484 },
                flexShrink: 0,
                bgcolor: "#000000",
                borderRadius: {
                  xs: "72px",
                  sm: "132px",
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
                    xs: "72px",
                    sm: "132px",
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
                p: { xs: "28px 24px 32px 24px", sm: "36px 40px", md: "40px" },
              }}
            >
              {/* Top Group: Logo, Title, Description, Read More */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2.5, md: 4 } }}>
                {/* Logoipsum Brand Badge */}
                <Box
                  component="img"
                  src="/assets/case-studies/logoipsum.png"
                  alt="Logoipsum"
                  sx={{
                    height: 28,
                    width: "auto",
                    maxWidth: 190,
                    objectFit: "contain",
                    objectPosition: "left",
                    display: "block",
                  }}
                />

                {/* Title & Description */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Typography
                    component="h3"
                    sx={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: { xs: "1.35rem", sm: "1.5rem", md: "1.65rem" },
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.25,
                      color: "#1A1A1A",
                      maxWidth: 460,
                    }}
                  >
                    {slide.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: { xs: "0.92rem", md: "0.98rem" },
                      color: "#525252",
                      lineHeight: 1.45,
                      letterSpacing: "-0.015em",
                      maxWidth: 440,
                    }}
                  >
                    {slide.description}
                  </Typography>
                </Box>

                {/* Read More Pill Button */}
                <Box
                  component="button"
                  sx={{
                    all: "unset",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1.25,
                    width: "fit-content",
                    color: "#1A1A1A",
                    fontWeight: 500,
                    fontSize: "0.92rem",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                    "&:hover": {
                      opacity: 0.8,
                      transform: "translateX(3px)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      color: "#1A1A1A",
                    }}
                  >
                    Read More
                  </Typography>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      bgcolor: "#9E9E9E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    <Box
                      component="svg"
                      viewBox="0 0 24 24"
                      sx={{ width: 14, height: 14, fill: "none", stroke: "currentColor", strokeWidth: 2.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Bottom Metrics Grid */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  gap: { xs: 2, sm: 3, md: 4 },
                  pt: { xs: 4, md: 0 },
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
                        fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2rem" },
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
                        fontSize: { xs: "0.78rem", sm: "0.85rem", md: "0.9rem" },
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

        {/* Mobile/Tablet Navigation Controls below card */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mt: 3,
          }}
        >
          <IconButton
            onClick={handlePrev}
            aria-label="Previous Slide"
            sx={{
              width: 44,
              height: 44,
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

          {/* Dots Indicator */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {CASE_STUDIES.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => goToSlide(idx)}
                sx={{
                  width: idx === currentSlide ? 24 : 8,
                  height: 8,
                  borderRadius: "9999px",
                  bgcolor: idx === currentSlide ? "#1A1A1A" : "#CBD5E1",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>

          <IconButton
            onClick={handleNext}
            aria-label="Next Slide"
            sx={{
              width: 44,
              height: 44,
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

