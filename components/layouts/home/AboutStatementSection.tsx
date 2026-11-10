"use client";

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Statement tailored for Deepak Gupta's Financial & IT Automation Expertise
const STATEMENT_TEXT =
  "Backed by 10+ years of financial leadership, I blend rigorous statutory accounting with intelligent IT automation — turning complex numbers into streamlined, audit-ready growth.";

// Words array for word-by-word scroll reveal
const WORDS = STATEMENT_TEXT.split(" ");

// Alternating metrics matching the exact Conicom Framer layout
const MARQUEE_METRICS = [
  { value: "10+", label: "YEARS EXPERIENCE" },
  { value: "100%", label: "AUDIT COMPLIANCE" },
  { value: "5X", label: "FASTER MIS REPORTING" },
  { value: "80%", label: "PRODUCTIVITY BOOST" },
  { value: "0%", label: "RECONCILIATION ERROR" },
];

export default function AboutStatementSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Character-by-character scrub color reveal from faint grey to dark black
    const charElements = headlineRef.current?.querySelectorAll(".scrub-char");
    let ctx = gsap.context(() => {
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
            stagger: 0.02,
            ease: "none",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 82%",
              end: "bottom 48%",
              scrub: 0.8,
            },
          },
        );
      }

      // Scroll-driven scale up effect: expands smoothly from small (0.68) to full size (1.0)
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            scale: 0.68,
            y: 40,
          },
          {
            scale: 1.0,
            y: 0,
            ease: "power1.out",
            transformOrigin: "center center",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 95%",
              end: "center 55%",
              scrub: 1.2,
            },
          },
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
      id="about"
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "transparent",
        py: { xs: 8, sm: 10, md: 14 },
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          px: { xs: 2.5, sm: 4, md: 6 },
        }}
      >
        {/* Top Pill / Badge: 001 • WHO WE ARE */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.2,
            px: 2,
            py: 0.65,
            mb: { xs: 3.5, md: 4.5 },
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
            001
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
            WHO I AM
          </Typography>
        </Box>

        {/* Main Headline: Refined, slightly smaller & editorial scale */}
        <Typography
          ref={headlineRef}
          component="h2"
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: {
              xs: "1.45rem",
              sm: "1.85rem",
              md: "2.35rem",
              lg: "2.65rem",
            },
            fontWeight: 450,
            lineHeight: { xs: 1.35, md: 1.3 },
            letterSpacing: "-0.025em",
            maxWidth: "860px",
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
                  className="scrub-char"
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
      </Container>

      {/* Bottom Area: Infinite Sliding Marquee (Right to Left) + Center Floating Rounded Card */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          mt: { xs: 6, sm: 8, md: 10 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Infinite Sliding Marquee Track: Right-to-Left Continuous Animation */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "max-content",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 1,
            userSelect: "none",
            animation: "slideMarquee 58s linear infinite",
            "@keyframes slideMarquee": {
              "0%": {
                transform: "translate3d(0, -50%, 0)",
              },
              "100%": {
                transform: "translate3d(-50%, -50%, 0)",
              },
            },
          }}
        >
          {/* Repeat list twice for seamless infinite looping */}
          {[
            ...MARQUEE_METRICS,
            ...MARQUEE_METRICS,
            ...MARQUEE_METRICS,
            ...MARQUEE_METRICS,
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: { xs: 2, sm: 3, md: 4 },
                mx: { xs: 3, sm: 5, md: 7 },
              }}
            >
              {/* Bold Solid Metric Number (10+, 100%, 5X, etc.) */}
              <Typography
                component="span"
                sx={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3.8rem",
                    md: "5.8rem",
                    lg: "7.2rem",
                  },
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "#0F172A",
                  lineHeight: 1,
                }}
              >
                {item.value}
              </Typography>

              {/* Faded Label (YEARS EXPERIENCE, AUDIT COMPLIANCE, etc.) */}
              <Typography
                component="span"
                sx={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3.8rem",
                    md: "5.8rem",
                    lg: "7.2rem",
                  },
                  fontWeight: 800,
                  letterSpacing: "-0.035em",
                  textTransform: "uppercase",
                  color: "#CBD1DC",
                  opacity: 0.95,
                  lineHeight: 1,
                }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Center Floating Card: Exact Deep Curved Radius Matching Screenshot */}
        <Box
          ref={cardRef}
          onClick={() => setVideoOpen(true)}
          sx={{
            position: "relative",
            zIndex: 3,
            width: { xs: "88vw", sm: "62vw", md: "520px", lg: "580px" },
            height: { xs: "230px", sm: "300px", md: "340px", lg: "370px" },
            // Deep squircle curvature matching the reference image
            borderRadius: { xs: "48px", sm: "72px", md: "96px", lg: "106px" },
            overflow: "hidden",
            cursor: "pointer",
            // Ambient soft shadow + light outer vignette aura that smoothly blends with the background
            boxShadow:
              "0 25px 70px -15px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.5) inset",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            "&:hover": {
              transform: "translateY(-6px) scale(1.02)",
              boxShadow:
                "0 32px 85px -15px rgba(15, 23, 42, 0.42), 0 0 0 1.5px rgba(255, 255, 255, 0.7) inset",
              "& .play-btn": {
                transform: "translate(-50%, -50%) scale(1.12)",
                bgcolor: "rgba(255, 255, 255, 0.75)",
              },
            },
          }}
        >
          {/* Card Image: Modern Financial Analytics Laptop & Workspace Setup (No Humans) */}
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=95"
            alt="Modern Financial Intelligence, Laptop & Analytics Setup"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              filter: "contrast(1.06) saturate(1.08)",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                transform: "scale(1.04)",
              },
            }}
          />

          {/* Crisp Glass Border */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              border: "1.5px solid rgba(255, 255, 255, 0.6)",
            }}
          />

          {/* Center Glassmorphism Play Button */}
          <Box
            className="play-btn"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: 58, sm: 68, md: 74 },
              height: { xs: 58, sm: 68, md: 74 },
              borderRadius: "50%",
              bgcolor: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1.5px solid rgba(255, 255, 255, 0.8)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Play Triangle Icon */}
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{
                width: { xs: 22, sm: 26, md: 28 },
                height: { xs: 22, sm: 26, md: 28 },
                fill: "#ffffff",
                transform: "translateX(2px)",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            >
              <path d="M8 5v14l11-7z" />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Video / Showcase Modal on Play Button Click */}
      <Dialog
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#0B0F17",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              position: "relative",
            },
          },
        }}
      >
        <Box sx={{ position: "relative", p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              px: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--font-outfit), sans-serif",
                color: "#FFFFFF",
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              Deepak Gupta — Financial Systems & IT Automation
            </Typography>
            <IconButton
              onClick={() => setVideoOpen(false)}
              sx={{
                color: "#94A3B8",
                "&:hover": {
                  color: "#FFFFFF",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              ✕
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: { xs: "240px", sm: "380px", md: "460px" },
              borderRadius: "18px",
              overflow: "hidden",
              bgcolor: "#000",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Overview Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 0 }}
            />
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
