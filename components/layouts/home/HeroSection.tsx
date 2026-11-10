"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ThreeChallengeScene from "@/components/layouts/threejs-challenge/ThreeChallengeScene";
import DrawAttentionText from "@/components/widgets/DrawAttentionText";
import { Caratere } from "@/utils/font";
import { Colors } from "@/utils/enum";

const GREETINGS = ["Hey,", "Hola,", "Halo,", "नमस्ते,", "Hello,"];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [greetingSize, setGreetingSize] = useState(52);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 600) {
          setGreetingSize(38);
        } else if (window.innerWidth < 960) {
          setGreetingSize(46);
        } else {
          setGreetingSize(52);
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // After drawing & wipe finishes, pause for 2.2s then smoothly cycle to next greeting
  const handleDrawComplete = () => {
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % GREETINGS.length);
        setIsExiting(false);
      }, 380);
    }, 2200);
  };

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
        overflow: "visible",
        bgcolor: "transparent",
      }}
    >
      {/* Layer 1: 3D WebGL Ball (Exact original position & scale) */}
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
          top: "-5px",
          zIndex: 2,
          px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
          pointerEvents: "none", // Allows drag-rotation on the 3D ball through empty areas
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", md: "720px", lg: "860px" },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            pointerEvents: "auto", // Allows text selection
          }}
        >
          {/* Row 1: DrawAttention Animated Greeting (Fixed height slot: ZERO vertical shift for content below) */}
          <Box
            sx={{
              height: { xs: "46px", sm: "54px", md: "62px" },
              minHeight: { xs: "46px", sm: "54px", md: "62px" },
              display: "flex",
              alignItems: "flex-end",
              mb: { xs: 0.6, sm: 0.8, md: 1.0 },
              opacity: isExiting ? 0 : 1,
              transform: isExiting ? "translateY(-4px)" : "translateY(0)",
              filter: isExiting ? "blur(2px)" : "blur(0)",
              transition: "opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease",
            }}
          >
            <DrawAttentionText
              key={index}
              text={GREETINGS[index]}
              fontFamily={`var(--font-carattere), ${Caratere.style.fontFamily}, 'Kohinoor Devanagari', 'Noto Sans Devanagari', cursive, sans-serif`}
              fontSize={greetingSize}
              fontWeight={400}
              strokeWidth={1.4}
              drawDuration={1.3}
              fillDelay={0.3}
              onComplete={handleDrawComplete}
            />
          </Box>

          {/* Row 2: "I'm Deepak Gupta." - Directly below greeting */}
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "28px", sm: "38px", md: "48px", lg: "58px" },
              fontFamily: "var(--font-outfit), sans-serif",
              letterSpacing: "-0.03em",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: { xs: "6px", sm: "8px", md: "10px" },
              lineHeight: 1.1,
              mb: { xs: 1.6, sm: 1.9, md: 2.3 },
            }}
          >
            <Box
              component="span"
              sx={{
                fontWeight: 500,
                background: Colors.GOLD_METALLIC,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              I&apos;m
            </Box>
            <Box
              component="span"
              sx={{
                fontWeight: 500,
                color: "#0F172A",
                letterSpacing: "-0.025em",
              }}
            >
              Deepak Gupta.
            </Box>
          </Typography>

          {/* Row 2: Main Headline: Two-Tone (Deep Slate + 24K Gold Punchline from DG Logo) */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.05rem", sm: "1.2rem", md: "1.35rem", lg: "1.52rem" },
              fontWeight: 700,
              lineHeight: 1.34,
              letterSpacing: "-0.022em",
              color: Colors.TEXT_DARK,
              fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
            }}
          >
            Making finance less complicated and technology
            <Box
              component="span"
              sx={{
                display: "block",
                whiteSpace: { xs: "normal", sm: "nowrap" },
                background: Colors.GOLD_METALLIC,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              more meaningful.
            </Box>
          </Typography>

          {/* Row 3: Strategic Value Description - Exactly 2 Lines (Font: Commissioner) */}
          <Box
            sx={{
              mt: { xs: 1.8, sm: 2.0, md: 2.4 },
              maxWidth: { xs: "100%", md: "720px", lg: "780px" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "13.5px", sm: "14.5px", md: "15px" },
                lineHeight: 1.6,
                color: "#475569",
                fontFamily: "var(--font-commissioner), sans-serif",
                letterSpacing: "-0.01em",
                fontWeight: 400,
                whiteSpace: { xs: "normal", md: "nowrap" },
              }}
            >
              We bring clarity to complex financial experiences through thoughtful design and intelligent technology.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "13.5px", sm: "14.5px", md: "15px" },
                lineHeight: 1.6,
                color: "#475569",
                fontFamily: "var(--font-commissioner), sans-serif",
                letterSpacing: "-0.01em",
                fontWeight: 400,
                mt: 0.4,
                whiteSpace: { xs: "normal", md: "nowrap" },
              }}
            >
              Building smarter experiences that empower people to make better financial decisions.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
