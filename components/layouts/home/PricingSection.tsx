"use client";

import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRICING_DATA } from "@/assets/Generic-data";
import ReflectiveCard from "@/components/widgets/ReflectiveCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  // GSAP Scroll reveal for pricing header, toggle and plan cards
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. Heading Scale-Down & Focus Rise
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 35, scale: 1.05 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
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

      // 2. Billing Toggle Pop
      if (toggleRef.current) {
        gsap.fromTo(
          toggleRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: toggleRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Pricing Container & Plan Cards Elevation
      if (cardsContainerRef.current) {
        gsap.fromTo(
          cardsContainerRef.current,
          {
            opacity: 0,
            y: 65,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const plans = cardsContainerRef.current.querySelectorAll<HTMLElement>(".pricing-card-wrapper");
        if (plans && plans.length > 0) {
          gsap.fromTo(
            plans,
            {
              opacity: 0,
              y: 45,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.15,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsContainerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Price re-bound animation on cycle switch
  useEffect(() => {
    if (typeof window === "undefined" || !cardsContainerRef.current) return;
    const prices = cardsContainerRef.current.querySelectorAll(".plan-price-val");
    if (prices && prices.length > 0) {
      gsap.fromTo(
        prices,
        { opacity: 0, y: -16, scale: 0.85 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(2)" }
      );
    }
  }, [isAnnual]);

  return (
    <Box
      component="section"
      id="pricing"
      ref={sectionRef}
      sx={{
        position: "relative",
        zIndex: 1,
        pt: { xs: 8, sm: 10, md: 12 },
        pb: { xs: 8, sm: 10, md: 12 },
        scrollMarginTop: { xs: "90px", md: "110px" },
        width: "100%",
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
        {/* Top Pill / Badge: 008 • PRICING */}
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
            {PRICING_DATA.badgeNumber}
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
            {PRICING_DATA.badgeLabel}
          </Typography>
        </Box>

        {/* Section Heading */}
        <Typography
          ref={headlineRef}
          variant="h2"
          component="h2"
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "2rem", sm: "2.75rem", md: "3.25rem" },
            fontWeight: 600,
            letterSpacing: "-0.04em",
            color: "#1A1A1A",
            textAlign: "center",
            lineHeight: 1.15,
            mb: 1.5,
          }}
        >
          {PRICING_DATA.title}
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.12rem" },
            color: "#64748B",
            textAlign: "center",
            maxWidth: "680px",
            lineHeight: 1.55,
            mb: { xs: 4, md: 5 },
          }}
        >
          {PRICING_DATA.subtitle}
        </Typography>

        {/* Billing Switcher Toggle: MONTHLY vs ANNUALLY */}
        <Box
          ref={toggleRef}
          onClick={() => setIsAnnual(!isAnnual)}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            userSelect: "none",
            mb: { xs: 4, md: 5 },
            transition: "opacity 0.2s ease",
            "&:hover": { opacity: 0.9 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: { xs: "12px", sm: "13px" },
              fontWeight: !isAnnual ? 700 : 500,
              color: !isAnnual ? "#1A1A1A" : "#8A8A8A",
              letterSpacing: "0.04em",
              transition: "color 0.25s ease",
            }}
          >
            {PRICING_DATA.monthlyLabel}
          </Typography>

          {/* Pill Track & Knob */}
          <Box
            sx={{
              width: 44,
              height: 24,
              borderRadius: "999px",
              bgcolor: isAnnual ? "#000000" : "#B7B7B7",
              p: "2px",
              display: "flex",
              alignItems: "center",
              transition: "background-color 0.25s ease",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)",
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                bgcolor: "#FFFFFF",
                boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                transform: isAnnual ? "translateX(20px)" : "translateX(0px)",
                transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </Box>

          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: { xs: "12px", sm: "13px" },
              fontWeight: isAnnual ? 700 : 500,
              color: isAnnual ? "#1A1A1A" : "#8A8A8A",
              letterSpacing: "0.04em",
              transition: "color 0.25s ease",
            }}
          >
            {PRICING_DATA.annualLabel}
          </Typography>
        </Box>

        {/* Outer Pricing Cards Container */}
        <Box
          ref={cardsContainerRef}
          sx={{
            width: "100%",
            maxWidth: "1040px",
            bgcolor: "#F2F2F2",
            borderRadius: { xs: "36px", sm: "48px", md: "80px" },
            p: { xs: "16px", sm: "20px", md: "24px" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: "16px", md: "24px" },
            boxSizing: "border-box",
          }}
        >
          {/* Card 1: Starter Retainer */}
          <Box className="pricing-card-wrapper" sx={{ flex: 1, display: "flex", width: "100%" }}>
            <ReflectiveCard
              theme="light"
              tint="#F2F2F2"
              radius={56}
              contentPadding={0}
              metalness={0.15}
              roughness={0.5}
              shine={0.8}
              glare={0.65}
              bevel={2}
              tiltStrength={8}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: { xs: "28px", md: "56px" },
                  p: { xs: "32px 24px", sm: "40px 32px", md: "48px 44px" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  bgcolor: "transparent",
                  minHeight: { md: 620 },
                  boxSizing: "border-box",
                }}
              >
                {/* Top Details */}
                <Box>
                  {/* Metallic Squircle Icon */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "16px",
                      bgcolor: "#525252",
                      boxShadow:
                        "inset 0px 0px 7px 0px #ffffff, inset 0px -1.5px 1.2px 0px #000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
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
                          bgcolor: "#525252",
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Title & Description */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "var(--font-commissioner), Inter, sans-serif",
                      fontSize: { xs: "22px", md: "26px" },
                      fontWeight: 700,
                      color: "#1A1A1A",
                      mt: 3,
                      mb: 1,
                    }}
                  >
                    {PRICING_DATA.plan1.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14.5px",
                      color: "#525252",
                      lineHeight: 1.5,
                    }}
                  >
                    {PRICING_DATA.plan1.subtitle}
                  </Typography>

                  {/* Divider Line */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "1px",
                      bgcolor: "#E6E6E6",
                      my: 4,
                    }}
                  />

                  {/* Price */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      mb: 4,
                    }}
                  >
                    <Typography
                      component="span"
                      className="plan-price-val"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: { xs: "32px", md: "40px" },
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        color: "#1A1A1A",
                      }}
                    >
                      {isAnnual ? PRICING_DATA.plan1.priceAnnual : PRICING_DATA.plan1.priceMonthly}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#525252",
                        ml: 1,
                      }}
                    >
                      {isAnnual ? PRICING_DATA.plan1.periodAnnual : PRICING_DATA.plan1.periodMonthly}
                    </Typography>
                  </Box>
                </Box>

                {/* Bottom Details */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#1A1A1A",
                      mb: 2,
                    }}
                  >
                    {PRICING_DATA.plan1.featuresLabel}
                  </Typography>

                  {/* Feature Items List */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
                    {PRICING_DATA.plan1.features.map((feature, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <Box
                          component="img"
                          src="/assets/pricing/check-icon.png"
                          alt="Included"
                          sx={{
                            width: 16,
                            height: 16,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            color: "#525252",
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* CTA Button */}
                  <Button
                    component="a"
                    href="#contact"
                    fullWidth
                    sx={{
                      mt: 4,
                      height: 52,
                      borderRadius: "999px",
                      bgcolor: "#1A1A1A",
                      color: "#FFFFFF",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                      transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                      "&:hover": {
                        bgcolor: "#000000",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
                      },
                    }}
                  >
                    {PRICING_DATA.plan1.ctaText}
                  </Button>
                </Box>
              </Box>
            </ReflectiveCard>
          </Box>

          {/* Card 2: Growth Automation (Most Popular) */}
          <Box className="pricing-card-wrapper" sx={{ flex: 1, display: "flex", width: "100%" }}>
            <ReflectiveCard
              theme="light"
              tint="#FFFFFF"
              radius={56}
              contentPadding={0}
              metalness={0.2}
              roughness={0.4}
              shine={0.9}
              glare={0.75}
              bevel={2}
              tiltStrength={8}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: { xs: "28px", md: "56px" },
                  p: { xs: "32px 24px", sm: "40px 32px", md: "48px 44px" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  bgcolor: "transparent",
                  position: "relative",
                  minHeight: { md: 620 },
                  boxSizing: "border-box",
                }}
              >
                {/* Top-Right "✦ Most Popular" Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 24, md: 36 },
                    right: { xs: 24, md: 36 },
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "999px",
                    bgcolor: "#F2F2F2",
                    color: "#1A1A1A",
                  }}
                >
                  <Box
                    component="svg"
                    viewBox="0 0 16 16"
                    sx={{ width: 12, height: 12, fill: "#1A1A1A" }}
                  >
                    <path d="M8 0L9.79611 6.20389L16 8L9.79611 9.79611L8 16L6.20389 9.79611L0 8L6.20389 6.20389L8 0Z" />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#1A1A1A",
                    }}
                  >
                    Most Popular
                  </Typography>
                </Box>

                {/* Top Details */}
                <Box>
                  {/* Iridescent Squircle Icon */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "16px",
                      background:
                        "linear-gradient(135deg, rgba(205, 175, 255, 0.45) 0%, rgba(255, 235, 140, 0.45) 25%, rgba(255, 180, 235, 0.45) 50%, rgba(135, 225, 255, 0.45) 75%, rgba(160, 185, 255, 0.45) 100%)",
                      boxShadow:
                        "inset 0px -1.5px 1.2px 0px rgb(215, 215, 215), 0 4px 12px rgba(205, 175, 255, 0.2)",
                    }}
                  />

                  {/* Title & Description */}
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "var(--font-commissioner), Inter, sans-serif",
                      fontSize: { xs: "22px", md: "26px" },
                      fontWeight: 700,
                      color: "#1A1A1A",
                      mt: 3,
                      mb: 1,
                    }}
                  >
                    {PRICING_DATA.plan2.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14.5px",
                      color: "#525252",
                      lineHeight: 1.5,
                    }}
                  >
                    {PRICING_DATA.plan2.subtitle}
                  </Typography>

                  {/* Divider Line */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "1px",
                      bgcolor: "#E6E6E6",
                      my: 4,
                    }}
                  />

                  {/* Price */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      mb: 4,
                    }}
                  >
                    <Typography
                      component="span"
                      className="plan-price-val"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: { xs: "32px", md: "40px" },
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        color: "#1A1A1A",
                      }}
                    >
                      {isAnnual ? PRICING_DATA.plan2.priceAnnual : PRICING_DATA.plan2.priceMonthly}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#525252",
                        ml: 1,
                      }}
                    >
                      {isAnnual ? PRICING_DATA.plan2.periodAnnual : PRICING_DATA.plan2.periodMonthly}
                    </Typography>
                  </Box>
                </Box>

                {/* Bottom Details */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#1A1A1A",
                      mb: 2,
                    }}
                  >
                    {PRICING_DATA.plan2.featuresLabel}
                  </Typography>

                  {/* Feature Items List */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
                    {PRICING_DATA.plan2.features.map((feature, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <Box
                          component="img"
                          src="/assets/pricing/check-icon.png"
                          alt="Included"
                          sx={{
                            width: 16,
                            height: 16,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            color: "#525252",
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* CTA Button with Iridescent Glow */}
                  <Button
                    component="a"
                    href="#contact"
                    fullWidth
                    sx={{
                      mt: 4,
                      height: 52,
                      borderRadius: "999px",
                      bgcolor: "#1A1A1A",
                      color: "#FFFFFF",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow:
                        "0 4px 20px rgba(0,0,0,0.18), 0 0 30px rgba(205, 175, 255, 0.4)",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                      "&:hover": {
                        bgcolor: "#000000",
                        transform: "translateY(-2px)",
                        boxShadow:
                          "0 8px 28px rgba(0,0,0,0.28), 0 0 40px rgba(205, 175, 255, 0.6)",
                      },
                    }}
                  >
                    {PRICING_DATA.plan2.ctaText}
                  </Button>
                </Box>
              </Box>
            </ReflectiveCard>
          </Box>
        </Box>

        {/* Bottom Consultation Banner (CTA Modal) */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1040px",
            mt: { xs: 4, md: 5 },
            borderRadius: { xs: "36px", sm: "48px", md: "80px" },
            // Soft light pastel rainbow gradient matching navbar signature palette
            background:
              "radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.85) 0%, transparent 60%), linear-gradient(135deg, rgba(205, 175, 255, 0.35) 0%, rgba(255, 235, 140, 0.30) 25%, rgba(255, 180, 235, 0.30) 50%, rgba(135, 225, 255, 0.32) 75%, rgba(160, 185, 255, 0.35) 100%), #FFFFFF",
            border: "1.5px solid rgba(255, 255, 255, 0.95)",
            boxShadow:
              "0 14px 40px -10px rgba(15, 23, 42, 0.08), 0 0 24px rgba(205, 175, 255, 0.16), inset 0px 0px 1px 2px #ffffff",
            p: { xs: "36px 20px", sm: "44px 32px", md: "52px 40px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: { xs: 2.5, md: 3 },
            boxSizing: "border-box",
          }}
        >
          {/* Overlapping Avatar & Phone Calling Icon */}
          <Box
            sx={{
              position: "relative",
              width: 140,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Advisor Avatar */}
            <Box
              component="img"
              src="/assets/pricing/advisor-avatar.png"
              alt="AI Strategy Advisor"
              sx={{
                position: "absolute",
                left: 10,
                top: 0,
                width: 80,
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                zIndex: 2,
              }}
            />

            {/* Phone Calling Glass Badge */}
            <Box
              sx={{
                position: "absolute",
                right: 10,
                top: 0,
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "rgba(255, 255, 255, 0.2)",
                border: "1px solid #FFFFFF",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "inset 0px 0px 40px 0px #ffffff, 0 4px 16px rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Box
                component="svg"
                viewBox="0 0 32 32"
                sx={{ width: 30, height: 30 }}
              >
                <path
                  d="M 19.741 20.73 L 19.134 21.369 C 19.134 21.369 17.691 22.889 13.751 18.741 C 9.811 14.593 11.254 13.073 11.254 13.073 L 11.637 12.671 C 12.579 11.679 12.668 10.086 11.846 8.924 L 10.164 6.546 C 9.147 5.107 7.181 4.917 6.015 6.145 L 3.922 8.348 C 3.344 8.957 2.957 9.746 3.004 10.621 C 3.124 12.86 4.081 17.678 9.42 23.3 C 15.083 29.261 20.396 29.498 22.568 29.284 C 23.256 29.216 23.853 28.845 24.335 28.338 L 26.229 26.344 C 27.507 24.998 27.147 22.691 25.511 21.749 L 22.964 20.283 C 21.89 19.665 20.581 19.846 19.741 20.73 Z"
                  fill="rgb(26,26,26)"
                />
                <path
                  d="M 16.679 3.84 C 16.768 3.295 17.283 2.925 17.828 3.013 C 17.862 3.019 17.971 3.04 18.027 3.052 C 18.141 3.078 18.3 3.117 18.498 3.174 C 18.893 3.29 19.446 3.48 20.11 3.784 C 21.438 4.393 23.206 5.458 25.04 7.292 C 26.875 9.127 27.94 10.895 28.549 12.223 C 28.853 12.886 29.043 13.439 29.158 13.835 C 29.216 14.033 29.255 14.192 29.28 14.305 C 29.293 14.362 29.302 14.408 29.309 14.442 L 29.316 14.483 C 29.405 15.029 29.038 15.565 28.493 15.653 C 27.949 15.741 27.437 15.373 27.347 14.831 C 27.344 14.816 27.336 14.777 27.328 14.74 C 27.312 14.666 27.283 14.549 27.238 14.394 C 27.148 14.084 26.991 13.624 26.731 13.056 C 26.211 11.923 25.276 10.357 23.626 8.707 C 21.976 7.056 20.41 6.122 19.276 5.602 C 18.709 5.342 18.248 5.185 17.938 5.095 C 17.784 5.05 17.589 5.005 17.515 4.988 C 16.972 4.898 16.591 4.383 16.679 3.84 Z"
                  fill="rgb(26,26,26)"
                />
                <path
                  d="M 16.981 8.439 C 17.133 7.908 17.686 7.601 18.217 7.752 L 17.942 8.714 C 18.217 7.752 18.217 7.752 18.217 7.752 L 18.219 7.753 L 18.221 7.753 L 18.226 7.755 L 18.236 7.758 L 18.262 7.766 C 18.282 7.772 18.308 7.781 18.337 7.791 C 18.397 7.813 18.477 7.843 18.574 7.885 C 18.768 7.968 19.033 8.096 19.359 8.289 C 20.012 8.675 20.903 9.317 21.949 10.364 C 22.996 11.41 23.638 12.301 24.024 12.954 C 24.217 13.28 24.345 13.545 24.429 13.739 C 24.47 13.837 24.5 13.916 24.522 13.976 C 24.532 14.006 24.541 14.031 24.547 14.051 L 24.555 14.077 L 24.558 14.088 L 24.56 14.092 L 24.56 14.094 C 24.56 14.094 24.561 14.096 23.599 14.371 L 24.561 14.096 C 24.713 14.627 24.405 15.18 23.874 15.332 C 23.348 15.483 22.799 15.182 22.642 14.659 L 22.637 14.645 C 22.63 14.624 22.615 14.585 22.59 14.527 C 22.541 14.412 22.452 14.224 22.303 13.973 C 22.005 13.47 21.468 12.711 20.535 11.778 C 19.602 10.845 18.843 10.308 18.341 10.01 C 18.089 9.862 17.901 9.772 17.786 9.723 C 17.728 9.698 17.689 9.683 17.669 9.676 L 17.654 9.671 C 17.132 9.514 16.831 8.966 16.981 8.439 Z"
                  fill="rgb(26,26,26)"
                />
              </Box>
            </Box>
          </Box>

          {/* Heading */}
          <Typography
            variant="h3"
            sx={{
              fontFamily: "var(--font-commissioner), Inter, sans-serif",
              fontSize: { xs: "22px", sm: "26px", md: "30px" },
              fontWeight: 700,
              color: "#1A1A1A",
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
            }}
          >
            {PRICING_DATA.consultation.title}
          </Typography>

          {/* Subtext */}
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              color: "#525252",
              maxWidth: "540px",
              lineHeight: 1.5,
            }}
          >
            {PRICING_DATA.consultation.subtitle}
          </Typography>

          {/* CTA Pill Button */}
          <Button
            component="a"
            href="#contact"
            sx={{
              height: 52,
              borderRadius: "999px",
              bgcolor: "#1A1A1A",
              color: "#FFFFFF",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "none",
              px: { xs: 3.5, md: 4 },
              boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
              display: "inline-flex",
              alignItems: "center",
              gap: 1.2,
              transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
              "&:hover": {
                bgcolor: "#000000",
                transform: "scale(1.03)",
                boxShadow: "0 8px 28px rgba(0,0,0,0.28)",
              },
            }}
          >
            {PRICING_DATA.consultation.buttonText} →
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
