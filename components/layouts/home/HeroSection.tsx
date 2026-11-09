"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ThreeChallengeScene from "@/components/layouts/threejs-challenge/ThreeChallengeScene";
import ConstellationField from "@/components/widgets/ConstellationField";
import { Caratere } from "@/utils/font";

const GREETINGS = ["Hey", "Hola", "Halo", "नमस्ते", "Hello"];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  // Premium 3D Kinetic Greeting Rotation
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (index + 1) % GREETINGS.length;
      setNextIndex(next);

      setTimeout(() => {
        setIndex(next);
        setNextIndex(null);
      }, 500);
    }, 2700);

    return () => clearInterval(timer);
  }, [index]);

  return (
    <Box
      id="hero"
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        bgcolor: "#FAFBFD",
      }}
    >
      {/* Layer 0: Constellation Field Animated Background */}
      <ConstellationField
        mode="light"
        color="#1E293B"
        speed={1.2}
        size={0.8}
        strokeWidth={1.1}
        length={1.3}
        density={0.7}
        opacity={0.5}
      />

      {/* Layer 1: 3D WebGL Ball (Freely Floating on the Right Side, ZERO Card / Box) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <ThreeChallengeScene />
      </Box>

      {/* Layer 2: Foreground Content: Minimalist Executive Typography */}
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 2,
          px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
          pointerEvents: "none", // Allows drag-rotation on the 3D ball through empty areas
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", md: "560px", lg: "620px" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            pointerEvents: "auto", // Allows text selection
          }}
        >
          {/* Welcome Greeting: 3D Rolling Cursive Greeting + Bold "I'm Deepak Gupta." */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.2 },
              mb: 1.8,
              flexWrap: "wrap",
            }}
          >
            {/* 3D Rolling Calligraphic Greeting in Carattere */}
            <Box
              className={Caratere.className}
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                height: { xs: "38px", sm: "44px", md: "50px" },
                fontSize: { xs: "34px", sm: "40px", md: "46px" },
                color: "#0F172A",
                fontFamily: `${Caratere.style.fontFamily}, 'Kohinoor Devanagari', 'Noto Sans Devanagari', cursive, sans-serif`,
                lineHeight: 1,
                overflow: "hidden",
                perspective: "500px",
                verticalAlign: "middle",
              }}
            >
              {/* Outgoing Word */}
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  transition: "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s ease, filter 0.38s ease",
                  transform: nextIndex !== null ? "translateY(-120%) rotateX(55deg)" : "translateY(0%) rotateX(0deg)",
                  opacity: nextIndex !== null ? 0 : 1,
                  filter: nextIndex !== null ? "blur(3px)" : "blur(0px)",
                  transformOrigin: "bottom center",
                  whiteSpace: "nowrap",
                }}
              >
                {GREETINGS[index]},
              </Box>

              {/* Incoming Word (Smooth 3D perspective roll from below) */}
              {nextIndex !== null && (
                <Box
                  component="span"
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    transformOrigin: "top center",
                    animation: "greetingRollIn 0.48s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                    "@keyframes greetingRollIn": {
                      "0%": {
                        transform: "translateY(120%) rotateX(-55deg)",
                        opacity: 0,
                        filter: "blur(3px)",
                      },
                      "100%": {
                        transform: "translateY(0%) rotateX(0deg)",
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                    },
                  }}
                >
                  {GREETINGS[nextIndex]},
                </Box>
              )}
            </Box>

            {/* "I'm Deepak Gupta." - Bold Authoritative Executive Typography */}
            <Typography
              component="span"
              sx={{
                fontSize: { xs: "18px", sm: "21px", md: "24px" },
                fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
                letterSpacing: "-0.015em",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
              }}
            >
              <Box component="span" sx={{ fontWeight: 600, color: "#475569" }}>
                I&apos;m
              </Box>
              <Box
                component="span"
                sx={{
                  fontWeight: 800,
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                }}
              >
                Deepak Gupta.
              </Box>
            </Typography>
          </Box>

          {/* Main Headline (Scaled Down & Harmonious) */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.35rem", sm: "1.65rem", md: "1.9rem", lg: "2.2rem" },
              fontWeight: 800,
              lineHeight: 1.24,
              letterSpacing: "-0.025em",
              color: "#0F172A",
              fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
              mb: { xs: 2.0, md: 2.4 },
            }}
          >
            Making finance less complicated and technology more meaningful.
          </Typography>

          {/* Subheadline Tagline */}
          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "16px", md: "17px" },
              lineHeight: 1.65,
              color: "#475569",
              maxWidth: 540,
              fontFamily: "var(--font-geist-sans), sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            I bring numbers, strategy and automation together to turn everyday challenges into smarter possibilities.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
