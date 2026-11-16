"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ThreeChallengeScene from "@/components/layouts/threejs-challenge/ThreeChallengeScene";
import DrawAttentionText from "@/components/widgets/DrawAttentionText";
import { Caratere } from "@/utils/font";
import { Colors } from "@/utils/enum";
import { HERO_DATA } from "@/assets/Generic-data";

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [greetingSize, setGreetingSize] = useState(52);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 600) {
          setGreetingSize(42);
        } else if (window.innerWidth < 960) {
          setGreetingSize(48);
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
        setIndex((prev) => (prev + 1) % HERO_DATA.greetings.length);
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
        minHeight: { xs: "100svh", sm: "100vh" },
        width: "100%",
        height: { xs: "auto", sm: "100vh" },
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: { xs: "space-between", sm: "center" },
        pt: { xs: "160px", sm: 0 },
        pb: { xs: 3, sm: 0 },
        overflow: "visible",
        bgcolor: "transparent",
      }}
    >
      {/* 1. Foreground Content: Minimalist Executive Typography (Top on Mobile, Left on Tablet & Desktop) */}
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          top: { xs: 0, sm: "-5px" },
          zIndex: 2,
          order: { xs: 1, sm: 2 },
          px: { xs: 2.5, sm: 4, md: 5, lg: 8 },
          pointerEvents: "none", // Allows drag-rotation on the 3D ball through empty areas
        }}
      >
        <Box
          sx={{
            maxWidth: {
              xs: "100%",
              sm: "360px",
              md: "460px",
              lg: "700px",
              xl: "860px",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
            textAlign: { xs: "center", sm: "left" },
            pointerEvents: "auto", // Allows text selection
          }}
        >
          {/* Row 1: DrawAttention Animated Greeting (Fixed height slot: ZERO vertical shift for content below) */}
          <Box
            sx={{
              height: { xs: "50px", sm: "54px", md: "58px", lg: "62px" },
              minHeight: { xs: "50px", sm: "54px", md: "58px", lg: "62px" },
              display: "flex",
              alignItems: "flex-end",
              justifyContent: { xs: "center", sm: "flex-start" },
              width: "100%",
              mb: { xs: 0.6, sm: 0.8, md: 1.0 },
              opacity: isExiting ? 0 : 1,
              transform: isExiting ? "translateY(-4px)" : "translateY(0)",
              filter: isExiting ? "blur(2px)" : "none",
              transition:
                "opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease",
            }}
          >
            <DrawAttentionText
              key={index}
              text={HERO_DATA.greetings[index]}
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
              fontSize: { xs: "32px", sm: "36px", md: "42px", lg: "58px" },
              fontFamily: "var(--font-outfit), sans-serif",
              letterSpacing: "-0.03em",
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", sm: "flex-start" },
              flexWrap: "wrap",
              gap: { xs: "6px", sm: "8px", md: "10px" },
              lineHeight: 1.1,
              mb: { xs: 1.6, sm: 1.8, md: 2.3 },
            }}
          >
            <Box
              component="span"
              sx={{
                fontWeight: { xs: 600, sm: 500 },
                background: Colors.RAINBOW_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {HERO_DATA.namePrefix}
            </Box>
            <Box
              component="span"
              sx={{
                fontWeight: { xs: 600, sm: 500 },
                color: "#0F172A",
                letterSpacing: "-0.025em",
              }}
            >
              {HERO_DATA.name}
            </Box>
          </Typography>

          {/* Row 2: Main Headline: Two-Tone (Deep Slate + Rainbow Gradient Punchline) */}
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "1.15rem",
                sm: "1.16rem",
                md: "1.28rem",
                lg: "1.52rem",
              },
              fontWeight: 700,
              lineHeight: 1.34,
              letterSpacing: "-0.022em",
              color: Colors.TEXT_DARK,
              fontFamily:
                "var(--font-outfit), var(--font-geist-sans), sans-serif",
            }}
          >
            {HERO_DATA.headlinePrefix}{" "}
            <Box
              component="span"
              sx={{
                display: "block",
                whiteSpace: { xs: "normal", sm: "nowrap" },
                background: Colors.RAINBOW_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              {HERO_DATA.headlineHighlight}
            </Box>
          </Typography>

          {/* Row 3: Strategic Value Description - Exactly 2 Lines (Font: Commissioner) */}
          <Box
            sx={{
              mt: { xs: 1.8, sm: 2.0, md: 2.4 },
              maxWidth: {
                xs: "100%",
                sm: "360px",
                md: "450px",
                lg: "780px",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "14.5px", sm: "13.6px", md: "14.5px", lg: "15px" },
                lineHeight: 1.6,
                color: { xs: "#0F172A", sm: "#475569" },
                fontFamily: "var(--font-commissioner), sans-serif",
                letterSpacing: "-0.01em",
                fontWeight: { xs: 500, sm: 400 },
                whiteSpace: { xs: "normal", lg: "nowrap" },
              }}
            >
              {HERO_DATA.descriptionLine1}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "14.5px", sm: "13.6px", md: "14.5px", lg: "15px" },
                lineHeight: 1.6,
                color: { xs: "#0F172A", sm: "#475569" },
                fontFamily: "var(--font-commissioner), sans-serif",
                letterSpacing: "-0.01em",
                fontWeight: { xs: 500, sm: 400 },
                mt: 0.4,
                whiteSpace: { xs: "normal", lg: "nowrap" },
              }}
            >
              {HERO_DATA.descriptionLine2}
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* 2. 3D WebGL Ball (Below text on mobile, Right-side background on tablet & desktop) */}
      <Box
        sx={{
          position: { xs: "relative", sm: "absolute" },
          inset: { sm: 0 },
          width: "100%",
          maxWidth: { xs: "100%", sm: "none" },
          height: { xs: "435px", sm: "100%" },
          zIndex: 1,
          order: { xs: 2, sm: 1 },
          mt: { xs: 2.5, sm: 0 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
      >
        <ThreeChallengeScene />
      </Box>
    </Box>
  );
}
