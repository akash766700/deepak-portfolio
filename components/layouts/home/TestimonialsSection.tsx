"use client";

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TESTIMONIALS_DATA } from "@/assets/Generic-data";
import { attachCards3DTilt } from "@/utils/gsapCardTilt";
import { TestimonialItem, VideoCardItem } from "@/utils/type";
import InfiniteSpiral from "@/components/widgets/InfiniteSpiral";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = TESTIMONIALS_DATA.testimonials;
const VIDEO_CARDS = TESTIMONIALS_DATA.videoCards;

type CombinedTestimonial =
  | {
      id: string;
      kind: "review";
      name: string;
      role: string;
      avatar: string;
      quote: string;
      verified: string;
    }
  | {
      id: string;
      kind: "video";
      title: string;
      image: string;
      videoUrl: string;
      badge: string;
    };

const SPIRAL_ITEMS: CombinedTestimonial[] = [
  {
    id: "daniel-kim",
    kind: "review",
    name: TESTIMONIALS["daniel-kim"].name,
    role: TESTIMONIALS["daniel-kim"].role,
    avatar: TESTIMONIALS["daniel-kim"].avatar,
    quote: TESTIMONIALS["daniel-kim"].quote,
    verified: "Senior CA Endorsement",
  },
  {
    id: "scaling-saas",
    kind: "video",
    title: VIDEO_CARDS["scaling-saas"].title,
    image: VIDEO_CARDS["scaling-saas"].image,
    videoUrl: VIDEO_CARDS["scaling-saas"].videoUrl,
    badge: "Enterprise Audit Video",
  },
  {
    id: "alex-johnson",
    kind: "review",
    name: TESTIMONIALS["alex-johnson"].name,
    role: TESTIMONIALS["alex-johnson"].role,
    avatar: TESTIMONIALS["alex-johnson"].avatar,
    quote: TESTIMONIALS["alex-johnson"].quote,
    verified: "Financial Controller Verified",
  },
  {
    id: "david-lee",
    kind: "review",
    name: TESTIMONIALS["david-lee"].name,
    role: TESTIMONIALS["david-lee"].role,
    avatar: TESTIMONIALS["david-lee"].avatar,
    quote: TESTIMONIALS["david-lee"].quote,
    verified: "Retail Network Director",
  },
  {
    id: "sarah-mitchell",
    kind: "review",
    name: TESTIMONIALS["sarah-mitchell"].name,
    role: TESTIMONIALS["sarah-mitchell"].role,
    avatar: TESTIMONIALS["sarah-mitchell"].avatar,
    quote: TESTIMONIALS["sarah-mitchell"].quote,
    verified: "Managing Trustee Endorsement",
  },
  {
    id: "how-puno",
    kind: "video",
    title: VIDEO_CARDS["how-puno"].title,
    image: VIDEO_CARDS["how-puno"].image,
    videoUrl: VIDEO_CARDS["how-puno"].videoUrl,
    badge: "Automation Highlight Video",
  },
  {
    id: "jonathan-reed",
    kind: "review",
    name: TESTIMONIALS["jonathan-reed"].name,
    role: TESTIMONIALS["jonathan-reed"].role,
    avatar: TESTIMONIALS["jonathan-reed"].avatar,
    quote: TESTIMONIALS["jonathan-reed"].quote,
    verified: "Plant GM Recommendation",
  },
  {
    id: "michael-tran",
    kind: "review",
    name: TESTIMONIALS["michael-tran"].name,
    role: TESTIMONIALS["michael-tran"].role,
    avatar: TESTIMONIALS["michael-tran"].avatar,
    quote: TESTIMONIALS["michael-tran"].quote,
    verified: "Supply Chain Head Verified",
  },
  {
    id: "laura-martinez",
    kind: "review",
    name: TESTIMONIALS["laura-martinez"].name,
    role: TESTIMONIALS["laura-martinez"].role,
    avatar: TESTIMONIALS["laura-martinez"].avatar,
    quote: TESTIMONIALS["laura-martinez"].quote,
    verified: "ERP Lead Recommendation",
  },
];

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <Box
      className="masonry-card-item"
      sx={{
        width: "100%",
        bgcolor: "#F2F2F2",
        borderRadius: { xs: "32px", md: "48px" },
        p: { xs: "28px 24px", md: "40px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: { xs: 3, md: 4 },
        border: "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
        willChange: "transform",
        "&:hover": {
          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.09)",
        },
      }}
    >
      {/* Top Header: Avatar + Name/Role + Quote Mark */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          position: "relative",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Avatar */}
          <Box
            component="img"
            src={item.avatar}
            alt={item.name}
            sx={{
              width: { xs: 64, md: 80 },
              height: { xs: 64, md: 80 },
              borderRadius: "50%",
              objectFit: "cover",
              bgcolor: "#E2E8F0",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            }}
          />

          {/* Name & Title */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography
              sx={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: { xs: "1.05rem", md: "1.15rem" },
                fontWeight: 600,
                color: "#1A1A1A",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {item.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: { xs: "0.8rem", md: "0.85rem" },
                color: "#64748B",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              {item.role}
            </Typography>
          </Box>
        </Box>

        {/* Quote Mark Icon */}
        <Box
          component="img"
          src="/assets/testimonials/quote-mark.png"
          alt="Quote"
          sx={{
            width: { xs: 20, md: 25 },
            height: "auto",
            opacity: 0.8,
            flexShrink: 0,
          }}
        />
      </Box>

      {/* Review Text */}
      <Typography
        sx={{
          fontFamily: "var(--font-outfit), sans-serif",
          fontSize: { xs: "0.88rem", md: "0.94rem" },
          color: "#475569",
          lineHeight: 1.55,
          letterSpacing: "-0.01em",
        }}
      >
        {item.quote}
      </Typography>
    </Box>
  );
}

function VideoCard({
  item,
  onPlay,
}: {
  item: VideoCardItem;
  onPlay: (url: string) => void;
}) {
  return (
    <Box
      className="masonry-card-item"
      onClick={() => onPlay(item.videoUrl)}
      sx={{
        width: "100%",
        minHeight: { xs: 360, sm: 420, md: 490 },
        borderRadius: { xs: "36px", md: "56px" },
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: { xs: "28px 24px", md: "36px" },
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
        willChange: "transform",
        "&:hover": {
          boxShadow: "0 22px 50px rgba(0, 0, 0, 0.22)",
          "& .video-bg-img": {
            filter: "grayscale(0)",
            transform: "scale(1.04)",
          },
          "& .play-btn": {
            transform: "scale(1.12)",
            bgcolor: "rgba(255, 255, 255, 0.4)",
          },
        },
      }}
    >
      {/* Background Image with grayscale to color hover transition */}
      <Box
        component="img"
        className="video-bg-img"
        src={item.image}
        alt={item.title}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(1)",
          transition: "filter 0.5s ease, transform 0.5s ease",
          zIndex: 0,
        }}
      />

      {/* Dark Vignette Overlay for Crisp Contrast */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.85) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Top Glass Play Button */}
      <Box
        className="play-btn"
        sx={{
          position: "relative",
          zIndex: 2,
          width: { xs: 42, md: 48 },
          height: { xs: 42, md: 48 },
          borderRadius: "50%",
          bgcolor: "rgba(255, 255, 255, 0.28)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          transition: "transform 0.3s ease, background-color 0.3s ease",
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 24 24"
          sx={{ width: 18, height: 18, fill: "#FFFFFF", ml: 0.35 }}
        >
          <path d="M8 5v14l11-7z" />
        </Box>
      </Box>

      {/* Bottom Content: Logoipsum + Title */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {/* White Logoipsum Badge */}
        <Box
          component="img"
          src="/assets/testimonials/logoipsum-white.png"
          alt="Logoipsum"
          sx={{
            height: { xs: 20, md: 24 },
            width: "auto",
            maxWidth: 150,
            objectFit: "contain",
            objectPosition: "left",
            display: "block",
          }}
        />

        {/* Video Card Title */}
        <Typography
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1.22,
            letterSpacing: "-0.03em",
          }}
        >
          {item.title}
        </Typography>
      </Box>
    </Box>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<CombinedTestimonial | null>(null);
  const [viewMode, setViewMode] = useState<"spiral" | "grid">("spiral");

  // GSAP Scroll reveal for heading & masonry cards cascade
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanupTilt: (() => void) | null = null;
    const ctx = gsap.context(() => {
      // 1. Headline Fade & Rise
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 40, letterSpacing: "-0.01em" },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "-0.04em",
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Cascade for Masonry Testimonial Cards (when in grid mode)
      const cardElements = sectionRef.current?.querySelectorAll(".masonry-card-item");
      if (cardElements && cardElements.length > 0) {
        gsap.fromTo(
          cardElements,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.06,
            duration: 0.75,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "bottom 85%",
              toggleActions: "play none none none",
              once: true,
            },
            onComplete: () => {
              gsap.set(cardElements, { clearProps: "transform" });
            },
          }
        );

        cleanupTilt = attachCards3DTilt(cardElements, {
          maxTilt: 7,
          maxMove: 6,
          perspective: 1100,
          scaleOnHover: 1.015,
        });
      }
    }, sectionRef);

    return () => {
      cleanupTilt?.();
      ctx.revert();
    };
  }, [viewMode]);

  return (
    <Box
      component="section"
      id="testimonials"
      ref={sectionRef}
      sx={{
        position: "relative",
        zIndex: 1,
        py: { xs: 6, sm: 8, md: 10 },
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
        {/* Top Pill / Badge: 007 • TESTIMONIALS */}
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
            {TESTIMONIALS_DATA.badgeNumber}
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
            {TESTIMONIALS_DATA.badgeLabel}
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
            lineHeight: 1.15,
            mb: 2,
          }}
        >
          {TESTIMONIALS_DATA.title}
        </Typography>

        <Typography
          sx={{
            fontFamily: "var(--font-outfit), sans-serif",
            fontSize: { xs: "0.95rem", md: "1.08rem" },
            color: "#64748B",
            textAlign: "center",
            maxWidth: 620,
            lineHeight: 1.5,
            mb: { xs: 4, md: 5 },
          }}
        >
          Endorsements from Senior Chartered Accountants, Financial Controllers, and Trustees who count on Deepak&apos;s financial discipline.
        </Typography>

        {/* Interactive View Switcher Pill: 3D Spiral Helix vs Classic Grid */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            p: "4px",
            bgcolor: "#EBEBEB",
            borderRadius: "9999px",
            mb: { xs: 3, md: 4 },
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
        >
          <Button
            size="small"
            onClick={() => setViewMode("spiral")}
            sx={{
              borderRadius: "9999px",
              px: { xs: 2, sm: 2.5 },
              py: 0.6,
              fontSize: { xs: "0.75rem", sm: "0.82rem" },
              fontFamily: "var(--font-outfit), sans-serif",
              fontWeight: 600,
              textTransform: "none",
              color: viewMode === "spiral" ? "#0F172A" : "#64748B",
              bgcolor: viewMode === "spiral" ? "#FFFFFF" : "transparent",
              boxShadow:
                viewMode === "spiral" ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
              "&:hover": {
                bgcolor: viewMode === "spiral" ? "#FFFFFF" : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            🌀 3D Helix Spiral
          </Button>
          <Button
            size="small"
            onClick={() => setViewMode("grid")}
            sx={{
              borderRadius: "9999px",
              px: { xs: 2, sm: 2.5 },
              py: 0.6,
              fontSize: { xs: "0.75rem", sm: "0.82rem" },
              fontFamily: "var(--font-outfit), sans-serif",
              fontWeight: 600,
              textTransform: "none",
              color: viewMode === "grid" ? "#0F172A" : "#64748B",
              bgcolor: viewMode === "grid" ? "#FFFFFF" : "transparent",
              boxShadow:
                viewMode === "grid" ? "0 2px 8px rgba(0, 0, 0, 0.08)" : "none",
              "&:hover": {
                bgcolor: viewMode === "grid" ? "#FFFFFF" : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            📋 Grid View
          </Button>
        </Box>
      </Container>

      {/* VIEW MODE 1: 3D INFINITE SPIRAL */}
      {viewMode === "spiral" && (
        <Box
          sx={{
            width: "100%",
            maxWidth: "1400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <InfiniteSpiral<CombinedTestimonial>
            items={SPIRAL_ITEMS}
            speed={0.42}
            direction="up"
            animationMode="all"
            radius={320}
            cardWidth={370}
            cardHeight={260}
            verticalSpacing={76}
            perspective={1150}
            cardsPerTurn={5.5}
            centerScale={1.16}
            edgeFade={0.34}
            edgeBlur={4}
            pauseOnHover={true}
            onCardClick={(item) => {
              if (item.kind === "video") {
                setActiveVideoUrl(item.videoUrl);
              } else {
                setSelectedReview(item);
              }
            }}
            renderItem={(item) => {
              if (item.kind === "video") {
                return (
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      p: "22px 24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      overflow: "hidden",
                    }}
                  >
                    {/* Background image */}
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "grayscale(0.6)",
                        transition: "filter 0.4s ease, transform 0.4s ease",
                        "&:hover": {
                          filter: "grayscale(0)",
                          transform: "scale(1.04)",
                        },
                      }}
                    />

                    {/* Dark gradient vignette */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.88) 100%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Top Pill: Video badge + Play button */}
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.8,
                          px: 1.5,
                          py: 0.4,
                          borderRadius: "9999px",
                          bgcolor: "rgba(0, 0, 0, 0.55)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "var(--font-outfit), sans-serif",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            color: "#FFFFFF",
                            letterSpacing: "0.02em",
                          }}
                        >
                          ▶ {item.badge}
                        </Typography>
                      </Box>

                      {/* Play Circle */}
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          bgcolor: "rgba(255, 255, 255, 0.3)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.5)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFFFFF",
                          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        <Box
                          component="svg"
                          viewBox="0 0 24 24"
                          sx={{ width: 16, height: 16, fill: "#FFFFFF", ml: 0.2 }}
                        >
                          <path d="M8 5v14l11-7z" />
                        </Box>
                      </Box>
                    </Box>

                    {/* Bottom: Title */}
                    <Box sx={{ position: "relative", zIndex: 2 }}>
                      <Typography
                        sx={{
                          fontFamily: "var(--font-outfit), sans-serif",
                          fontSize: "1.08rem",
                          fontWeight: 600,
                          color: "#FFFFFF",
                          lineHeight: 1.25,
                          letterSpacing: "-0.02em",
                          textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </Box>
                );
              }

              // Standard Text Review Card (100% theme color #F2F2F2)
              return (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    p: { xs: "20px 22px", md: "24px 26px" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 1.5,
                  }}
                >
                  {/* Top: Avatar, Name, Role, Quote mark */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
                      <Box
                        component="img"
                        src={item.avatar}
                        alt={item.name}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          objectFit: "cover",
                          bgcolor: "#E2E8F0",
                          border: "1.5px solid rgba(0, 0, 0, 0.08)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontFamily: "var(--font-outfit), sans-serif",
                            fontSize: "1.02rem",
                            fontWeight: 600,
                            color: "#1A1A1A",
                            lineHeight: 1.2,
                            letterSpacing: "-0.015em",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "var(--font-outfit), sans-serif",
                            fontSize: "0.74rem",
                            color: "#64748B",
                            lineHeight: 1.3,
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.role}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Quote mark icon */}
                    <Box
                      component="img"
                      src="/assets/testimonials/quote-mark.png"
                      alt="Quote"
                      sx={{
                        width: 18,
                        height: "auto",
                        opacity: 0.75,
                        flexShrink: 0,
                      }}
                    />
                  </Box>

                  {/* 5 Golden Stars */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.4,
                      color: "#F59E0B",
                      fontSize: "0.85rem",
                    }}
                  >
                    {"★★★★★"}
                  </Box>

                  {/* Review Quote Snippet */}
                  <Typography
                    sx={{
                      fontFamily: "var(--font-outfit), sans-serif",
                      fontSize: "0.84rem",
                      color: "#475569",
                      lineHeight: 1.5,
                      letterSpacing: "-0.01em",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </Typography>

                  {/* Bottom: Verified badge & click trigger */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 1,
                      borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "var(--font-outfit), sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: "#0F766E",
                      }}
                    >
                      ✓ {item.verified}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "var(--font-outfit), sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "#2563EB",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.4,
                      }}
                    >
                      Read full ↗
                    </Typography>
                  </Box>
                </Box>
              );
            }}
          />

          {/* Interactive Hint Banner below 3D Spiral */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              mt: 3,
              px: 3,
              py: 0.9,
              borderRadius: "9999px",
              bgcolor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: { xs: "0.75rem", sm: "0.82rem" },
                fontWeight: 500,
                color: "#64748B",
              }}
            >
              👆 <b>Drag or swipe up/down</b> to spin the 3D helix • <b>Hover</b> to pause • <b>Click card</b> for full endorsement
            </Typography>
          </Box>
        </Box>
      )}

      {/* VIEW MODE 2: CLASSIC MASONRY BENTO GRID */}
      {viewMode === "grid" && (
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, mt: 2 }}>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 3, md: 2 },
              alignItems: "start",
            }}
          >
            {/* COLUMN 1 (Left): Video 1 + Daniel Kim + Alex Johnson */}
            <Box className="testi-col-1" sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 2 } }}>
              <VideoCard
                item={VIDEO_CARDS["scaling-saas"]}
                onPlay={(url) => setActiveVideoUrl(url)}
              />
              <TestimonialCard item={TESTIMONIALS["daniel-kim"]} />
              <TestimonialCard item={TESTIMONIALS["alex-johnson"]} />
            </Box>

            {/* COLUMN 2 (Center): David Lee + Sarah Mitchell + Jonathan Reed */}
            <Box className="testi-col-2" sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 2 } }}>
              <TestimonialCard item={TESTIMONIALS["david-lee"]} />
              <TestimonialCard item={TESTIMONIALS["sarah-mitchell"]} />
              <TestimonialCard item={TESTIMONIALS["jonathan-reed"]} />
            </Box>

            {/* COLUMN 3 (Right): Michael Tran + Video 2 + Laura Martinez */}
            <Box className="testi-col-3" sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 2 } }}>
              <TestimonialCard item={TESTIMONIALS["michael-tran"]} />
              <VideoCard
                item={VIDEO_CARDS["how-puno"]}
                onPlay={(url) => setActiveVideoUrl(url)}
              />
              <TestimonialCard item={TESTIMONIALS["laura-martinez"]} />
            </Box>
          </Box>
        </Container>
      )}

      {/* Detail Dialog Modal for Testimonial Review */}
      <Dialog
        open={Boolean(selectedReview && selectedReview.kind === "review")}
        onClose={() => setSelectedReview(null)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#FFFFFF",
              borderRadius: "32px",
              p: { xs: 3, sm: 4 },
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.15)",
              position: "relative",
            },
          },
        }}
      >
        <IconButton
          onClick={() => setSelectedReview(null)}
          aria-label="Close dialog"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#64748B",
            bgcolor: "#F1F5F9",
            "&:hover": { bgcolor: "#E2E8F0" },
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 24 24"
            sx={{ width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </Box>
        </IconButton>

        {selectedReview && selectedReview.kind === "review" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {/* Header: Avatar + Name + Role */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, pr: 5 }}>
              <Box
                component="img"
                src={selectedReview.avatar}
                alt={selectedReview.name}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {selectedReview.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "0.85rem",
                    color: "#64748B",
                  }}
                >
                  {selectedReview.role}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#0F766E",
                    mt: 0.3,
                  }}
                >
                  ✓ {selectedReview.verified}
                </Typography>
              </Box>
            </Box>

            {/* 5 Stars */}
            <Box sx={{ display: "flex", gap: 0.5, color: "#F59E0B", fontSize: "1.1rem" }}>
              {"★★★★★"}
            </Box>

            {/* Full Quote */}
            <Typography
              sx={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: { xs: "0.95rem", sm: "1.05rem" },
                color: "#334155",
                lineHeight: 1.65,
                bgcolor: "#F8FAFC",
                p: { xs: 2.5, sm: 3 },
                borderRadius: "20px",
                border: "1px solid rgba(0, 0, 0, 0.04)",
                fontStyle: "italic",
              }}
            >
              &ldquo;{selectedReview.quote}&rdquo;
            </Typography>

            <Button
              variant="contained"
              onClick={() => setSelectedReview(null)}
              sx={{
                alignSelf: "flex-end",
                borderRadius: "9999px",
                textTransform: "none",
                fontWeight: 600,
                fontFamily: "var(--font-outfit), sans-serif",
                bgcolor: "#1A1A1A",
                color: "#FFFFFF",
                px: 3,
                "&:hover": { bgcolor: "#000000" },
              }}
            >
              Close
            </Button>
          </Box>
        )}
      </Dialog>

      {/* Video Lightbox Player Modal */}
      <Dialog
        open={Boolean(activeVideoUrl)}
        onClose={() => setActiveVideoUrl(null)}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#000000",
              borderRadius: "24px",
              overflow: "hidden",
              position: "relative",
            },
          },
        }}
      >
        <IconButton
          onClick={() => setActiveVideoUrl(null)}
          aria-label="Close video"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 10,
            color: "#FFFFFF",
            bgcolor: "rgba(0, 0, 0, 0.6)",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.9)" },
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 24 24"
            sx={{ width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </Box>
        </IconButton>
        {activeVideoUrl && (
          <Box sx={{ position: "relative", pt: "56.25%", width: "100%" }}>
            <Box
              component="iframe"
              src={activeVideoUrl}
              title="Testimonial Video"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
