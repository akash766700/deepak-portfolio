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

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

interface VideoCardItem {
  id: string;
  title: string;
  image: string;
  videoUrl: string;
}

// 7 Text Testimonials
const TESTIMONIALS: Record<string, TestimonialItem> = {
  "daniel-kim": {
    id: "daniel-kim",
    name: "Daniel Kim",
    role: "Founder, ScaleLabs Education",
    avatar: "/assets/testimonials/avatar-daniel-kim.png",
    quote:
      "Our enrollment process used to require manual follow-ups and spreadsheet tracking. Now, AI handles lead qualification, scheduling, reminders, and CRM updates automatically. We’ve increased enrollment conversion by 35% in just one quarter.",
  },
  "alex-johnson": {
    id: "alex-johnson",
    name: "Alex Johnson",
    role: "Head of Operations, Finovate Consulting",
    avatar: "/assets/testimonials/avatar-alex-johnson.png",
    quote:
      "Security and compliance were major concerns for us. They designed an automation architecture that was not only highly efficient but enterprise-grade secure.",
  },
  "david-lee": {
    id: "david-lee",
    name: "David Lee",
    role: "Founder, Atodio Studio",
    avatar: "/assets/testimonials/avatar-david-lee.png",
    quote:
      "We were spending hours on repetitive tasks. Their automation system saved us 30+ hours per week and dramatically improved our sales performance. Really impressive!",
  },
  "sarah-mitchell": {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "COO, BrightPath SaaS",
    avatar: "/assets/testimonials/avatar-sarah-mitchell.png",
    quote:
      "We struggled with inconsistent lead follow-ups and slow response times. Their AI automation blueprint gave us clarity first, then execution. Now, our CRM runs intelligently, leads are scored automatically, and follow-ups happen without manual effort. We’ve increased demo bookings by 40% while reducing operational friction.",
  },
  "jonathan-reed": {
    id: "jonathan-reed",
    name: "Jonathan Reed",
    role: "Managing Director, Nexora Digital Agency",
    avatar: "/assets/testimonials/avatar-jonathan-reed.png",
    quote:
      "We were scaling fast but drowning in manual workflows. Their automation system connected our CRM, email marketing, and reporting into one intelligent flow. The result? 30+ hours saved per week and complete visibility across our pipeline.",
  },
  "michael-tran": {
    id: "michael-tran",
    name: "Michael Tran",
    role: "Founder & CEO, Skyline Realty Group",
    avatar: "/assets/testimonials/avatar-michael-tran.png",
    quote:
      "We reduced admin work by nearly 50% and doubled our qualified appointment bookings. The ROI was faster than we expected — and the system continues to scale with us.",
  },
  "laura-martinez": {
    id: "laura-martinez",
    name: "Laura Martinez",
    role: "CMO, Elevate Commerce Co.",
    avatar: "/assets/testimonials/avatar-laura-martinez.png",
    quote:
      "Marketing automation always felt fragmented — too many tools, not enough cohesion. They unified everything into one intelligent ecosystem. Campaign triggers, abandoned cart flows, segmentation — all automated with precision.",
  },
};

// 2 Video Highlight Cards
const VIDEO_CARDS: Record<string, VideoCardItem> = {
  "scaling-saas": {
    id: "scaling-saas",
    title: "Scaling SaaS Operations with AI Automation",
    image: "/assets/testimonials/video-1-scaling-saas.png",
    videoUrl: "https://www.youtube.com/embed/8AHPXm9Y6mI?autoplay=1",
  },
  "how-puno": {
    id: "how-puno",
    title: "How Puno Automated 80% of Lead Handling",
    image: "/assets/testimonials/video-2-how-puno.png",
    videoUrl: "https://www.youtube.com/embed/8AHPXm9Y6mI?autoplay=1",
  },
};

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <Box
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
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 14px 34px rgba(0, 0, 0, 0.08)",
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
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.2)",
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

  return (
    <Box
      component="section"
      id="testimonials"
      ref={sectionRef}
      sx={{
        position: "relative",
        zIndex: 1,
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 16 },
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
        {/* Top Pill / Badge: 007 • TESTIMONIAL */}
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
            007
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
            Testimonial
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
            mb: { xs: 6, md: 9 },
          }}
        >
          What They’re Saying
        </Typography>

        {/* 3-COLUMN MASONRY BENTO GRID */}
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 2 } }}>
            <VideoCard
              item={VIDEO_CARDS["scaling-saas"]}
              onPlay={(url) => setActiveVideoUrl(url)}
            />
            <TestimonialCard item={TESTIMONIALS["daniel-kim"]} />
            <TestimonialCard item={TESTIMONIALS["alex-johnson"]} />
          </Box>

          {/* COLUMN 2 (Center): David Lee + Sarah Mitchell + Jonathan Reed */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 2 } }}>
            <TestimonialCard item={TESTIMONIALS["david-lee"]} />
            <TestimonialCard item={TESTIMONIALS["sarah-mitchell"]} />
            <TestimonialCard item={TESTIMONIALS["jonathan-reed"]} />
          </Box>

          {/* COLUMN 3 (Right): Michael Tran + Video 2 + Laura Martinez */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 3, md: 2 } }}>
            <TestimonialCard item={TESTIMONIALS["michael-tran"]} />
            <VideoCard
              item={VIDEO_CARDS["how-puno"]}
              onPlay={(url) => setActiveVideoUrl(url)}
            />
            <TestimonialCard item={TESTIMONIALS["laura-martinez"]} />
          </Box>
        </Box>
      </Container>

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
