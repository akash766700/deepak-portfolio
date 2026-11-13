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

const SECTION_TITLE = "Our Financial & Automation Services";
const WORDS = SECTION_TITLE.split(" ");

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const charElements = headlineRef.current?.querySelectorAll(".scrub-char-cap");
    const cards = gridRef.current?.querySelectorAll(".bento-card-shell");

    const ctx = gsap.context(() => {
      // 1. Heading letter-by-letter scrub reveal from grey to solid black
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
            stagger: 0.025,
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

      // 2. Bento cards subtle entrance stagger
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            y: 40,
            opacity: 0,
            scale: 0.97,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="capabilities"
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
        {/* Top Pill / Badge: 003 • CAPABILITIES */}
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
            003
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
            CAPABILITIES
          </Typography>
        </Box>

        {/* Heading: Scroll-driven Letter-by-Letter Reveal from Grey to Solid Black */}
        <Typography
          ref={headlineRef}
          component="h2"
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "2.3rem", sm: "3.2rem", md: "4.2rem" },
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.035em",
            margin: "0 auto",
            userSelect: "none",
            mb: { xs: 5, sm: 7, md: 9 },
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
                  className="scrub-char-cap"
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

        {/* ============================================================== */}
        {/* EXACT FRAMER BENTO GRID (1.36fr 1fr 1fr • MATHEMATICAL ALIGNMENT)*/}
        {/* ============================================================== */}
        <Box
          ref={gridRef}
          sx={{
            width: "100%",
            maxWidth: "1160px",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.36fr 1fr 1fr" },
            gridTemplateRows: {
              xs: "auto",
              md: "1fr 1fr auto",
            },
            gap: { xs: "10px", md: "12px" },
            textAlign: "left",
          }}
        >
          {/* ============================================================== */}
          {/* CARD 1: TOP-LEFT TALL CARD (Spans Row 1 & Row 2 on desktop)      */}
          {/* ============================================================== */}
          <Box
            className="bento-card-shell"
            sx={{
              gridColumn: { xs: "1", md: "1" },
              gridRow: { xs: "auto", md: "1 / span 2" },
              bgcolor: "#F2F2F2",
              border: "1.5px solid rgba(0, 0, 0, 0.05)",
              borderRadius: { xs: "28px", sm: "34px", md: "38px" },
              p: { xs: 2.5, sm: 3, md: 3.2 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 6px 24px -4px rgba(15, 23, 42, 0.04)",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 40px -10px rgba(15, 23, 42, 0.08)",
              },
            }}
          >
            {/* Top Text & Checklist */}
            <Box>
              <Typography
                sx={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.48,
                  color: "#4B5563",
                  mb: 1.8,
                }}
              >
                <strong style={{ color: "#0F172A", fontWeight: 700 }}>
                  Automated Financial & ERP Workflows.{" "}
                </strong>
                Streamline multi-tier financial operations across manufacturing, retail, and institutions using intelligent Tally Prime & ERP logic.
              </Typography>

              {/* Checklist */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, mb: 3 }}>
                {[
                  "End-to-end ledger mapping & auto-vouchering",
                  "Real-time Tally Prime & ERP 9 integration",
                  "100% audit-validated statutory reporting",
                ].map((item, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
                    <Box
                      component="span"
                      sx={{ color: "#64748B", fontSize: "0.86rem", fontWeight: 700 }}
                    >
                      ✓
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "var(--font-outfit), sans-serif",
                        fontSize: "0.86rem",
                        color: "#4B5563",
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Workflow Diagram (Directly on card background, exactly per blueprint) */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                pt: 1,
                pb: 0.5,
              }}
            >
              {/* Glowing Top Central Hub */}
              <Box
                sx={{
                  width: 66,
                  height: 66,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "radial-gradient(circle, #FFFFFF 0%, #EEF2F6 70%, #D8E0EB 100%)",
                  border: "2px solid #FFFFFF",
                  boxShadow:
                    "0 6px 20px -2px rgba(99, 102, 241, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.9)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {/* Subtle outer glow ring */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: -4,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(165, 180, 252, 0.45)",
                    pointerEvents: "none",
                  }}
                />
                {/* Network / Snowflake Hub Icon */}
                <Box
                  component="svg"
                  viewBox="0 0 24 24"
                  sx={{ width: 26, height: 26, stroke: "#64748B", strokeWidth: 1.8, fill: "none" }}
                >
                  <circle cx="12" cy="12" r="3" fill="#64748B" />
                  <line x1="12" y1="2" x2="12" y2="7" />
                  <line x1="12" y1="17" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="7" y2="12" />
                  <line x1="17" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="4.93" x2="8.46" y2="8.46" />
                  <line x1="15.54" y1="15.54" x2="19.07" y2="19.07" />
                  <line x1="4.93" y1="19.07" x2="8.46" y2="15.54" />
                  <line x1="15.54" y1="8.46" x2="19.07" y2="4.93" />
                </Box>
              </Box>

              {/* Connector flow lines */}
              <Box
                component="svg"
                viewBox="0 0 260 44"
                sx={{ width: "100%", height: 44, my: -0.5, overflow: "visible" }}
              >
                <line x1="130" y1="0" x2="130" y2="22" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="44" y1="22" x2="216" y2="22" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="44" y1="22" x2="44" y2="44" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="130" y1="22" x2="130" y2="44" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="216" y1="22" x2="216" y2="44" stroke="#CBD5E1" strokeWidth="1.5" />
              </Box>

              {/* 3 Dark Squircle Nodes */}
              <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
                {[
                  {
                    icon: (
                      <Box component="svg" viewBox="0 0 24 24" sx={{ width: 20, height: 20, fill: "#FFF" }}>
                        <path d="M12 3C7.58 3 4 4.34 4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6c0-1.66-3.58-3-8-3zm0 2c3.87 0 6 1.08 6 1s-2.13 1-6 1-6-1-6-1 2.13-1 6-1zm6 13c0 .08-2.13 1-6 1s-6-.92-6-1v-2.22c1.61.78 3.73 1.22 6 1.22s4.39-.44 6-1.22V18zm0-3.5c0 .08-2.13 1-6 1s-6-.92-6-1v-2.22c1.61.78 3.73 1.22 6 1.22s4.39-.44 6-1.22V14.5z" />
                      </Box>
                    ),
                  },
                  {
                    icon: (
                      <Box component="svg" viewBox="0 0 24 24" sx={{ width: 20, height: 20, fill: "#FFF" }}>
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </Box>
                    ),
                  },
                  {
                    icon: (
                      <Box component="svg" viewBox="0 0 24 24" sx={{ width: 20, height: 20, fill: "#FFF" }}>
                        <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                      </Box>
                    ),
                  },
                ].map((node, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "15px",
                      background: "linear-gradient(180deg, #323640 0%, #1E2127 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      boxShadow:
                        "0 6px 16px rgba(0, 0, 0, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {node.icon}
                  </Box>
                ))}
              </Box>

              {/* Dotted Lines */}
              <Box
                component="svg"
                viewBox="0 0 260 26"
                sx={{ width: "100%", height: 26, my: 0.5, overflow: "visible" }}
              >
                <line x1="44" y1="0" x2="44" y2="26" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="130" y1="0" x2="130" y2="26" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="216" y1="0" x2="216" y2="26" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
              </Box>

              {/* 3 Bottom Chips */}
              <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
                {[
                  <Box key="send" component="svg" viewBox="0 0 24 24" sx={{ width: 17, height: 17, fill: "#64748B" }}>
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </Box>,
                  <Box key="check" component="svg" viewBox="0 0 24 24" sx={{ width: 17, height: 17, fill: "#64748B" }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </Box>,
                  <Box key="sync" component="svg" viewBox="0 0 24 24" sx={{ width: 17, height: 17, fill: "#64748B" }}>
                    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                  </Box>,
                ].map((icon, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 50,
                      height: 36,
                      borderRadius: "12px",
                      bgcolor: "#FFFFFF",
                      border: "1px solid rgba(0, 0, 0, 0.06)",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* ============================================================== */}
          {/* CARD 3: TOP-MIDDLE (Chat Widget)                                */}
          {/* ============================================================== */}
          <Box
            className="bento-card-shell"
            sx={{
              gridColumn: { xs: "1", md: "2" },
              gridRow: { xs: "auto", md: "1" },
              bgcolor: "#F2F2F2",
              border: "1.5px solid rgba(0, 0, 0, 0.05)",
              borderRadius: { xs: "28px", sm: "34px", md: "38px" },
              p: { xs: 3, sm: 3.2 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 6px 24px -4px rgba(15, 23, 42, 0.04)",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 40px -10px rgba(15, 23, 42, 0.08)",
              },
            }}
          >
            {/* Header */}
            <Typography
              sx={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "0.94rem",
                lineHeight: 1.45,
                color: "#4B5563",
                mb: 2,
              }}
            >
              <strong style={{ color: "#0F172A", fontWeight: 700 }}>
                Real-Time Advisory & Support.{" "}
              </strong>
              24/7 financial compliance triggers, GST deadline guidance, and instant statutory query resolution.
            </Typography>

            {/* Chat Floating Bubbles directly on card */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.4,
                width: "100%",
                mt: "auto",
              }}
            >
              {/* Typing Dot Bubble */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)",
                    color: "#4F46E5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  ⚡
                </Box>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.6,
                    borderRadius: "9999px",
                    bgcolor: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
                    display: "flex",
                    gap: 0.4,
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "#94A3B8" }} />
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "#94A3B8" }} />
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "#94A3B8" }} />
                </Box>
              </Box>

              {/* User Question Bubble (Dark Pill) */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 0.8 }}>
                <Box
                  sx={{
                    px: 1.8,
                    py: 0.8,
                    borderRadius: "9999px",
                    bgcolor: "#22252B",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "0.76rem",
                    fontWeight: 500,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  What is our ITC reconciliation status for Q3?
                </Box>
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    overflow: "hidden",
                    bgcolor: "#CBD5E1",
                    flexShrink: 0,
                    border: "1px solid #FFFFFF",
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Client"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              </Box>

              {/* Bot Answer Bubble (White Pill) */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)",
                    color: "#4F46E5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.68rem",
                    flexShrink: 0,
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  ✨
                </Box>
                <Box
                  sx={{
                    px: 1.8,
                    py: 0.8,
                    borderRadius: "9999px",
                    bgcolor: "#FFFFFF",
                    color: "#1E293B",
                    border: "1px solid rgba(0, 0, 0, 0.07)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "0.76rem",
                    fontWeight: 500,
                  }}
                >
                  All 1,420 vendor ledgers matched. GSTR-2B &amp; ITC 100% reconciled.
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ============================================================== */}
          {/* CARD 5: TOP-RIGHT (Vendor & Stakeholder Stack)                   */}
          {/* ============================================================== */}
          <Box
            className="bento-card-shell"
            sx={{
              gridColumn: { xs: "1", md: "3" },
              gridRow: { xs: "auto", md: "1" },
              bgcolor: "#F2F2F2",
              border: "1.5px solid rgba(0, 0, 0, 0.05)",
              borderRadius: { xs: "28px", sm: "34px", md: "38px" },
              p: { xs: 3, sm: 3.2 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 6px 24px -4px rgba(15, 23, 42, 0.04)",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 40px -10px rgba(15, 23, 42, 0.08)",
              },
            }}
          >
            {/* Header */}
            <Typography
              sx={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "0.94rem",
                lineHeight: 1.45,
                color: "#4B5563",
                mb: 2,
              }}
            >
              <strong style={{ color: "#0F172A", fontWeight: 700 }}>
                Multi-Enterprise Ledger &amp; AP/AR.{" "}
              </strong>
              Proven financial leadership across manufacturing, retail enterprise, and institutional non-profit organizations.
            </Typography>

            {/* Profile Stack Visual */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 125,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "auto",
              }}
            >
              {/* Left Faded Card */}
              <Box
                sx={{
                  position: "absolute",
                  left: "8%",
                  width: 95,
                  height: 90,
                  bgcolor: "rgba(255, 255, 255, 0.85)",
                  borderRadius: "16px",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: "rotate(-6deg) scale(0.92)",
                  opacity: 0.65,
                }}
              >
                <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: "#CBD5E1", mb: 0.5 }} />
                <Typography sx={{ fontSize: "0.62rem", color: "#64748B", fontWeight: 600 }}>
                  Summercool
                </Typography>
              </Box>

              {/* Right Faded Card */}
              <Box
                sx={{
                  position: "absolute",
                  right: "8%",
                  width: 95,
                  height: 90,
                  bgcolor: "rgba(255, 255, 255, 0.85)",
                  borderRadius: "16px",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: "rotate(6deg) scale(0.92)",
                  opacity: 0.65,
                }}
              >
                <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: "#CBD5E1", mb: 0.5 }} />
                <Typography sx={{ fontSize: "0.62rem", color: "#64748B", fontWeight: 600 }}>
                  Bajaj Elect.
                </Typography>
              </Box>

              {/* Center Elevated Card (Paavan Chintan Dhara) */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: 146,
                  bgcolor: "#FFFFFF",
                  borderRadius: "20px",
                  border: "1.5px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 14px 30px -6px rgba(0, 0, 0, 0.14)",
                  py: 1.6,
                  px: 1.4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    overflow: "hidden",
                    mb: 0.6,
                    border: "1.5px solid #FFFFFF",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                    bgcolor: "#1E293B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Deepak Gupta"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    lineHeight: 1.2,
                    mb: 0.5,
                    textAlign: "center",
                  }}
                >
                  Paavan Chintan
                </Typography>
                {/* Rating Pill: • Senior Accountant */}
                <Box
                  sx={{
                    px: 1.1,
                    py: 0.28,
                    borderRadius: "9999px",
                    bgcolor: "#DCFCE7",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.4,
                  }}
                >
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "#16A34A" }} />
                  <Typography
                    sx={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      color: "#15803D",
                    }}
                  >
                    Sr. Accountant
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ============================================================== */}
          {/* CARD 4: MIDDLE-CENTER (Area Wave Chart)                         */}
          {/* ============================================================== */}
          <Box
            className="bento-card-shell"
            sx={{
              gridColumn: { xs: "1", md: "2" },
              gridRow: { xs: "auto", md: "2" },
              bgcolor: "#F2F2F2",
              border: "1.5px solid rgba(0, 0, 0, 0.05)",
              borderRadius: { xs: "28px", sm: "34px", md: "38px" },
              p: { xs: 3, sm: 3.2 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 6px 24px -4px rgba(15, 23, 42, 0.04)",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 40px -10px rgba(15, 23, 42, 0.08)",
              },
            }}
          >
            {/* Header */}
            <Typography
              sx={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "0.94rem",
                lineHeight: 1.45,
                color: "#4B5563",
                mb: 1.5,
              }}
            >
              <strong style={{ color: "#0F172A", fontWeight: 700 }}>
                Automated MIS & Financial Dashboards.{" "}
              </strong>
              Automated dashboards, business intelligence, and performance forecasting.
            </Typography>

            {/* Mountain Area Chart Visual Panel */}
            <Box
              sx={{
                bgcolor: "#E9EAEF",
                border: "1px solid rgba(0, 0, 0, 0.04)",
                borderRadius: "22px",
                p: 2,
                position: "relative",
                width: "100%",
                height: 110,
                mt: "auto",
              }}
            >
              {/* Highlight Pin Tooltip */}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: "22%",
                  bgcolor: "#FFFFFF",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "8px",
                  px: 1.2,
                  py: 0.3,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  zIndex: 3,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--font-outfit), monospace",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "#0F172A",
                  }}
                >
                  Reconciled: 100%
                </Typography>
              </Box>

              {/* SVG Mountain Wave */}
              <Box
                component="svg"
                viewBox="0 0 300 100"
                preserveAspectRatio="none"
                sx={{ width: "100%", height: "100%", overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="chartGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#374151" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#4B5563" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                <path
                  d="M0,85 Q40,65 70,72 T140,55 T190,68 T220,25 T260,50 T300,60 L300,100 L0,100 Z"
                  fill="url(#chartGradient2)"
                />
                <path
                  d="M0,85 Q40,65 70,72 T140,55 T190,68 T220,25 T260,50 T300,60"
                  fill="none"
                  stroke="#1F2937"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <line
                  x1="220"
                  y1="25"
                  x2="220"
                  y2="100"
                  stroke="#94A3B8"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <circle cx="220" cy="25" r="3.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
              </Box>
            </Box>
          </Box>

          {/* ============================================================== */}
          {/* CARD 6: MIDDLE-RIGHT (Radar Wave Arcs)                         */}
          {/* ============================================================== */}
          <Box
            className="bento-card-shell"
            sx={{
              gridColumn: { xs: "1", md: "3" },
              gridRow: { xs: "auto", md: "2" },
              bgcolor: "#F2F2F2",
              border: "1.5px solid rgba(0, 0, 0, 0.05)",
              borderRadius: { xs: "28px", sm: "34px", md: "38px" },
              p: { xs: 3, sm: 3.2 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 6px 24px -4px rgba(15, 23, 42, 0.04)",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 40px -10px rgba(15, 23, 42, 0.08)",
              },
            }}
          >
            {/* Header */}
            <Typography
              sx={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "0.94rem",
                lineHeight: 1.45,
                color: "#4B5563",
                mb: 1.5,
              }}
            >
              <strong style={{ color: "#0F172A", fontWeight: 700 }}>
                Automated Statutory Alerts.{" "}
              </strong>
              24/7 financial compliance triggers, GST deadline alerts, and reconciliation logs.
            </Typography>

            {/* Radar Wave Graphic Panel */}
            <Box
              sx={{
                bgcolor: "#E9EAEF",
                border: "1px solid rgba(0, 0, 0, 0.04)",
                borderRadius: "22px",
                position: "relative",
                width: "100%",
                height: 110,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                overflow: "hidden",
                mt: "auto",
              }}
            >
              {/* Concentric Semicircle Arcs */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -32,
                  width: 195,
                  height: 195,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(148, 163, 184, 0.35)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -16,
                  width: 145,
                  height: 145,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(148, 163, 184, 0.45)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(148, 163, 184, 0.55)",
                  background:
                    "radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.28) 0%, rgba(192, 132, 252, 0.16) 50%, transparent 100%)",
                }}
              />

              {/* 3 Floating Badges */}
              <Box
                sx={{
                  position: "absolute",
                  left: "14%",
                  bottom: 38,
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: "#24272E",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box component="svg" viewBox="0 0 24 24" sx={{ width: 15, height: 15, fill: "#FFF" }}>
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </Box>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  left: "58%",
                  bottom: 58,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  bgcolor: "#24272E",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box component="svg" viewBox="0 0 24 24" sx={{ width: 13, height: 13, fill: "#FFF" }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z" />
                </Box>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  right: "14%",
                  bottom: 28,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  bgcolor: "#24272E",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box component="svg" viewBox="0 0 24 24" sx={{ width: 14, height: 14, fill: "#FFF" }}>
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* ============================================================== */}
          {/* CARD 2: BOTTOM-LEFT (Rainbow Mesh Gradient Consultation Card)    */}
          {/* ============================================================== */}
          <Box
            className="bento-card-shell"
            sx={{
              gridColumn: { xs: "1", md: "1" },
              gridRow: { xs: "auto", md: "3" },
              borderRadius: { xs: "28px", sm: "34px", md: "38px" },
              p: { xs: 2.5, sm: 3, md: 3.2 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative",
              overflow: "hidden",
              border: "1.5px solid rgba(255, 255, 255, 0.95)",
              // Exact Framer vibrant pastel rainbow mesh gradient
              background:
                "radial-gradient(circle at 10% 12%, rgba(254, 240, 138, 0.95) 0%, transparent 45%), radial-gradient(circle at 90% 15%, rgba(244, 114, 182, 0.85) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(192, 132, 252, 0.75) 0%, transparent 55%), radial-gradient(circle at 88% 85%, rgba(96, 165, 250, 0.9) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(129, 140, 248, 0.85) 0%, transparent 50%), #EEF2FF",
              boxShadow: "0 14px 40px -10px rgba(99, 102, 241, 0.22)",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 22px 50px -10px rgba(99, 102, 241, 0.3)",
              },
            }}
          >
            {/* Top Avatar & Call Button enclosed in white capsule */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                p: "4px 8px 4px 4px",
                borderRadius: "9999px",
                bgcolor: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.06)",
                mb: 2,
                alignSelf: "flex-start",
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1.5px solid #FFFFFF",
                  bgcolor: "#1E293B",
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                  alt="Deepak Gupta"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: "#0F172A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.25)",
                }}
              >
                <Box component="svg" viewBox="0 0 24 24" sx={{ width: 15, height: 15, fill: "#FFFFFF" }}>
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.43-3.9-6.79-6.73L9.1 8.7a.99.99 0 00.25-1.02c-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.16 3 3.43 3 4.19 3 13.54 10.46 21 19.81 21c.76 0 1.19-.64 1.19-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                </Box>
              </Box>
            </Box>

            {/* Title & Description */}
            <Box>
              <Typography
                sx={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: { xs: "1.15rem", sm: "1.25rem" },
                  fontWeight: 700,
                  color: "#0F172A",
                  letterSpacing: "-0.025em",
                  mb: 0.8,
                }}
              >
                Need strategic financial leadership?
              </Typography>
              <Typography
                sx={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: "0.85rem",
                  color: "#334155",
                  lineHeight: 1.48,
                  mb: 2.4,
                }}
              >
                Connect directly with Deepak Gupta. 10+ years optimizing multi-crore balance sheets, statutory tax compliance, and automated accounting workflows.
              </Typography>
            </Box>

            {/* Dark Pill Button */}
            <Box
              component="a"
              href="#contact"
              sx={{
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                gap: 1.1,
                px: 2.6,
                py: 1.1,
                borderRadius: "9999px",
                bgcolor: "#0F172A",
                color: "#FFFFFF",
                textDecoration: "none",
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "0.84rem",
                fontWeight: 600,
                boxShadow: "0 6px 18px rgba(15, 23, 42, 0.25)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "&:hover": {
                  bgcolor: "#1E293B",
                  transform: "translateX(3px)",
                },
              }}
            >
              Schedule a Consultation
              <Box
                component="span"
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  bgcolor: "rgba(255, 255, 255, 0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                }}
              >
                →
              </Box>
            </Box>
          </Box>

          {/* ============================================================== */}
          {/* CARD 7: BOTTOM-RIGHT (Spans Col 2 & Col 3 • 4 Metallic Badges)  */}
          {/* ============================================================== */}
          <Box
            className="bento-card-shell"
            sx={{
              gridColumn: { xs: "1", md: "2 / span 2" },
              gridRow: { xs: "auto", md: "3" },
              bgcolor: "#F2F2F2",
              border: "1.5px solid rgba(0, 0, 0, 0.05)",
              borderRadius: { xs: "28px", sm: "34px", md: "38px" },
              p: { xs: 2.5, sm: 3, md: 3.2 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 6px 24px -4px rgba(15, 23, 42, 0.04)",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 40px -10px rgba(15, 23, 42, 0.08)",
              },
            }}
          >
            {/* Header */}
            <Typography
              sx={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: { xs: "1.15rem", sm: "1.25rem" },
                fontWeight: 700,
                color: "#0F172A",
                letterSpacing: "-0.025em",
                mb: { xs: 2.2, md: 2.8 },
              }}
            >
              Institutional Financial Rigor &amp; Compliance.
            </Typography>

            {/* 4 Metallic Badge Squircles in exact gradient & 3D button plates */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
                gap: { xs: "12px", sm: "16px" },
              }}
            >
              {[
                {
                  title: "Statutory Audit Readiness",
                  icon: (
                    <Box component="svg" viewBox="0 0 24 24" sx={{ width: 24, height: 24, fill: "#FFFFFF" }}>
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                    </Box>
                  ),
                },
                {
                  title: "Tally Prime & ERP 9",
                  icon: (
                    <Box component="svg" viewBox="0 0 24 24" sx={{ width: 24, height: 24, fill: "#FFFFFF" }}>
                      <path d="M14 12l-2-2-2 2 2 2 2-2zm-2-6l2 2 2-2-2-2-2 2zm0 12l-2-2-2 2 2 2 2-2zm6-6l-2-2-2 2 2 2 2-2zm-12 0l-2-2-2 2 2 2 2-2z" />
                      <circle cx="12" cy="12" r="9" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
                    </Box>
                  ),
                },
                {
                  title: "GST & TDS Precision",
                  icon: (
                    <Box component="svg" viewBox="0 0 24 24" sx={{ width: 24, height: 24, fill: "#FFFFFF" }}>
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.5 1.1 2.5 2.5S13.4 12 12 12s-2.5-1.1-2.5-2.5S10.6 7 12 7zm0 11.2c-2.3 0-4.3-1.2-5.4-3 .1-1.8 3.6-2.7 5.4-2.7s5.3.9 5.4 2.7c-1.1 1.8-3.1 3-5.4 3z" />
                    </Box>
                  ),
                },
                {
                  title: "High-Volume AP/AR Control",
                  icon: (
                    <Box component="svg" viewBox="0 0 24 24" sx={{ width: 24, height: 24, fill: "#FFFFFF" }}>
                      <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
                    </Box>
                  ),
                },
              ].map((badge, idx) => (
                <Box
                  key={idx}
                  sx={{
                    height: { xs: 140, sm: 154 },
                    borderRadius: "22px",
                    // Exact metallic shading from image: lighter silver top fading to dark slate base
                    background:
                      "linear-gradient(180deg, #646A77 0%, #3B404B 42%, #1C1E23 100%)",
                    border: "1.5px solid rgba(255, 255, 255, 0.22)",
                    boxShadow:
                      "inset 0 1px 3px rgba(255, 255, 255, 0.35), 0 8px 20px rgba(0, 0, 0, 0.16)",
                    p: { xs: 1.5, sm: 1.8 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "center",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      border: "1.5px solid rgba(255, 255, 255, 0.4)",
                      boxShadow:
                        "inset 0 1px 4px rgba(255, 255, 255, 0.5), 0 12px 28px rgba(0, 0, 0, 0.28)",
                    },
                  }}
                >
                  {/* Inner Raised 3D Button Plate */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "16px",
                      background:
                        "linear-gradient(180deg, #7D8491 0%, #4D535E 55%, #2B2E35 100%)",
                      border: "1.5px solid rgba(255, 255, 255, 0.45)",
                      boxShadow:
                        "inset 0 2px 4px rgba(255, 255, 255, 0.75), inset 0 -2px 4px rgba(0, 0, 0, 0.5), 0 6px 14px rgba(0, 0, 0, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mt: 0.4,
                    }}
                  >
                    {badge.icon}
                  </Box>

                  {/* Text Title */}
                  <Typography
                    sx={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: { xs: "0.72rem", sm: "0.76rem" },
                      fontWeight: 600,
                      color: "#FFFFFF",
                      lineHeight: 1.3,
                      mb: 0.4,
                    }}
                  >
                    {badge.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
