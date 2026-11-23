"use client";

import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOOTER_DATA } from "@/assets/Generic-data";
import { attachCard3DTilt } from "@/utils/gsapCardTilt";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const contactCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanupTilt: (() => void) | null = null;
    const ctx = gsap.context(() => {
      // 1. Floating Glassmorphic Contact Card Scale-In
      if (contactCardRef.current) {
        gsap.fromTo(
          contactCardRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: contactCardRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
            onComplete: () => {
              gsap.set(contactCardRef.current, { clearProps: "transform" });
            },
          }
        );

        // 3D Tilt on Footer Glassmorphic Contact Card
        cleanupTilt = attachCard3DTilt(contactCardRef.current, {
          maxTilt: 6,
          maxMove: 8,
          perspective: 1200,
          scaleOnHover: 1.01,
        });
      }

      // 2. Staggered Form Field Rise
      const formFields = contactCardRef.current?.querySelectorAll(".footer-form-field");
      if (formFields && formFields.length > 0) {
        gsap.fromTo(
          formFields,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactCardRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, footerRef);

    return () => {
      cleanupTilt?.();
      ctx.revert();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", company: "", email: "", details: "" });
    }, 4000);
  };

  return (
    <Box
      component="footer"
      id="contact"
      ref={footerRef}
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        bgcolor: "transparent",
        py: { xs: 6, sm: 8, md: 10 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Background Looping Undulating Video with Smooth Alpha Fade Mask */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.04) 40px, rgba(0, 0, 0, 0.2) 100px, rgba(0, 0, 0, 0.6) 180px, rgba(0, 0, 0, 0.9) 260px, #000000 340px)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.04) 40px, rgba(0, 0, 0, 0.2) 100px, rgba(0, 0, 0, 0.6) 180px, rgba(0, 0, 0, 0.9) 260px, #000000 340px)",
        }}
      >
        {/* Base Grey Fill */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgb(183, 183, 183)",
            zIndex: 0,
          }}
        />

        {/* Video Element */}
        <Box
          component="video"
          src="/assets/footer/footer-bg-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
            filter: "contrast(1.05) brightness(0.95)",
          }}
        />

        {/* Softening Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            background:
              "linear-gradient(180deg, rgb(183, 183, 183) 0%, rgba(183, 183, 183, 0.7) 30%, rgba(183, 183, 183, 0) 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Vignette Contrast Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.45) 100%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* Main Container */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 2, sm: 3, md: 5 },
        }}
      >
        {/* Floating Glassmorphic Contact Card */}
        <Box
          ref={contactCardRef}
          sx={{
            width: "100%",
            maxWidth: "680px",
            borderRadius: { xs: "40px", sm: "60px", md: "120px" },
            p: { xs: "36px 20px", sm: "44px 36px", md: "48px 60px 64px" },
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(255, 255, 255, 0.2) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow:
              "0 0 60px rgba(255, 255, 255, 0.12), inset 0px 0px 4px 0px rgba(255, 255, 255, 0.8), inset 0px 0px 40px 0px rgba(255, 255, 255, 0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
            transition: "box-shadow 0.4s ease, border-color 0.4s ease",
            willChange: "transform",
          }}
        >
          {/* Title */}
          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: { xs: "24px", sm: "30px", md: "38px" },
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.25,
              mt: { xs: 1, sm: 2 },
              mb: { xs: 3.5, sm: 4, md: 5 },
            }}
          >
            {FOOTER_DATA.titleLine1}
            <br />
            {FOOTER_DATA.titleLine2}
          </Typography>

          {/* Contact Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {/* Input: Your name* */}
            <Box
              className="footer-form-field"
              component="input"
              type="text"
              required
              placeholder={FOOTER_DATA.form.namePlaceholder}
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
              sx={{
                width: "100%",
                height: 48,
                borderRadius: "16px",
                bgcolor: "rgba(0, 0, 0, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#FFFFFF",
                px: 2,
                fontFamily: "Inter, sans-serif",
                fontSize: "14.5px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.6)",
                },
                "&:focus": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
                },
              }}
            />

            {/* Input: Your company name* */}
            <Box
              className="footer-form-field"
              component="input"
              type="text"
              required
              placeholder={FOOTER_DATA.form.companyPlaceholder}
              value={formData.company}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, company: e.target.value })
              }
              sx={{
                width: "100%",
                height: 48,
                borderRadius: "16px",
                bgcolor: "rgba(0, 0, 0, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#FFFFFF",
                px: 2,
                fontFamily: "Inter, sans-serif",
                fontSize: "14.5px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.6)",
                },
                "&:focus": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
                },
              }}
            />

            {/* Input: Your business email* */}
            <Box
              className="footer-form-field"
              component="input"
              type="email"
              required
              placeholder={FOOTER_DATA.form.emailPlaceholder}
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
              sx={{
                width: "100%",
                height: 48,
                borderRadius: "16px",
                bgcolor: "rgba(0, 0, 0, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#FFFFFF",
                px: 2,
                fontFamily: "Inter, sans-serif",
                fontSize: "14.5px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.6)",
                },
                "&:focus": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
                },
              }}
            />

            {/* Textarea: Share project details* */}
            <Box
              className="footer-form-field"
              component="textarea"
              required
              rows={4}
              placeholder={FOOTER_DATA.form.detailsPlaceholder}
              value={formData.details}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, details: e.target.value })
              }
              sx={{
                width: "100%",
                minHeight: 110,
                borderRadius: "16px",
                bgcolor: "rgba(0, 0, 0, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#FFFFFF",
                p: 2,
                fontFamily: "Inter, sans-serif",
                fontSize: "14.5px",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.6)",
                },
                "&:focus": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  boxShadow: "0 0 12px rgba(255, 255, 255, 0.15)",
                },
              }}
            />

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                className="footer-form-field"
                type="submit"
                sx={{
                  minWidth: 190,
                  height: 52,
                  borderRadius: "999px",
                  bgcolor: "#000000",
                  color: "#FFFFFF",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14.5px",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 4,
                  boxShadow:
                    "0 4px 16px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                  transition: "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  "&:hover": {
                    bgcolor: "#111111",
                    transform: "translateY(-2px)",
                    boxShadow:
                      "0 8px 24px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                  },
                }}
              >
                {submitted
                  ? FOOTER_DATA.form.submittedButtonText
                  : FOOTER_DATA.form.submitButtonText}
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Social Links Row */}
        <Box
          sx={{
            width: "100%",
            mt: { xs: 8, md: 10 },
            pb: { xs: 3, md: 4 },
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: "center", sm: "space-between" },
            alignItems: "center",
            gap: { xs: 2.5, sm: 3 },
          }}
        >
          {[
            {
              name: "LinkedIn",
              url: "https://linkedin.com",
              Icon: LinkedInIcon,
            },
            {
              name: "Instagram",
              url: "https://instagram.com",
              Icon: InstagramIcon,
            },
            {
              name: "Facebook",
              url: "https://facebook.com",
              Icon: FacebookIcon,
            },
            {
              name: "Twitter X",
              url: "https://x.com",
              Icon: XIcon,
            },
          ].map((social) => (
            <Box
              key={social.name}
              component="a"
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.25,
                textDecoration: "none",
                cursor: "pointer",
                transition: "transform 0.25s ease, opacity 0.25s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  "& .social-icon-bubble": {
                    boxShadow: "inset 0px 0px 16px rgba(255, 255, 255, 0.9)",
                    transform: "scale(1.08)",
                  },
                  "& .social-arrow": {
                    transform: "translate(2px, -2px)",
                  },
                },
              }}
            >
              {/* Frosted Icon Bubble with MUI Icon */}
              <Box
                className="social-icon-bubble"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: "rgba(255, 255, 255, 0.25)",
                  boxShadow: "inset 0px 0px 10px 0px rgba(255, 255, 255, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s ease",
                  color: "#FFFFFF",
                }}
              >
                <social.Icon sx={{ fontSize: 17, color: "#FFFFFF" }} />
              </Box>

              {/* Label */}
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                }}
              >
                {social.name}
              </Typography>

              {/* Diagonal Arrow Icon */}
              <Box
                component="img"
                className="social-arrow"
                src="/assets/footer/icon-arrow.png"
                alt="Arrow"
                sx={{
                  width: 12,
                  height: 12,
                  objectFit: "contain",
                  transition: "transform 0.25s ease",
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Prominent Logo Row */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: { xs: 3, sm: 4, md: 5 },
            pb: { xs: 3, sm: 4, md: 4 },
          }}
        >
          <Box
            component="img"
            src="/LogoFooterRainbowDG.png"
            alt="Deepak Gupta Logo"
            sx={{
              display: "block",
              margin: "0 auto",
              height: "auto",
              width: "100%",
              maxWidth: { xs: "280px", sm: "360px", md: "430px", lg: "490px" },
              objectFit: "contain",
              imageRendering: "-webkit-optimize-contrast",
              filter:
                "drop-shadow(0 2px 10px rgba(255, 255, 255, 0.22)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.45))",
              transition:
                "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.3s ease",
              "&:hover": {
                transform: "scale(1.025)",
                filter:
                  "drop-shadow(0 4px 18px rgba(255, 255, 255, 0.38)) drop-shadow(0 2px 10px rgba(181, 140, 255, 0.3))",
              },
            }}
          />
        </Box>

        {/* Bottom Row: Copyright + Creator Credit */}
        <Box
          sx={{
            width: "100%",
            pt: { xs: 3, md: 4 },
            pb: 2,
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 1.5, sm: 0 },
          }}
        >
          {/* Copyright */}
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "rgba(255, 255, 255, 0.6)",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {FOOTER_DATA.copyright}
          </Typography>

          {/* Creator Credit */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              Created by
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.95)",
              }}
            >
              Deepak Gupta
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
