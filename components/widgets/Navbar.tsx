"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { Colors } from "@/utils/enum";
import { NAV_LINKS_COL1, NAV_LINKS_COL2, PROFILE_DATA } from "@/assets/Generic-data";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleScrollTo = (href: string) => {
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Background Dim & Blur Overlay */}
      <Fade in={menuOpen} timeout={250}>
        <Box
          onClick={() => setMenuOpen(false)}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            zIndex: 1150,
            cursor: "pointer",
          }}
        />
      </Fade>

      {/* Floating Island Navbar Header */}
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: { xs: 18, md: 28 },
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1200,
          px: 2,
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: 1, // 8px gap between logo and action capsule
            pointerEvents: "auto",
          }}
        >
          {/* Left Circle Button with Luminous Soft Rainbow Outline Ring */}
          <Box
            component="a"
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#hero");
            }}
            sx={{
              position: "relative",
              width: { xs: 52, md: 64 },
              height: { xs: 52, md: 64 },
              borderRadius: "50%",
              p: "1.3px", // Balanced 1.3px delicate rainbow outline
              background:
                "linear-gradient(135deg, rgba(205, 175, 255, 0.45) 0%, rgba(255, 235, 140, 0.45) 25%, rgba(255, 180, 235, 0.45) 50%, rgba(135, 225, 255, 0.45) 75%, rgba(160, 185, 255, 0.45) 100%)",
              boxShadow:
                "0 8px 28px -4px rgba(15, 23, 42, 0.08), 0 0 10px rgba(201, 170, 255, 0.20), 0 0 6px rgba(179, 225, 255, 0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              textDecoration: "none",
              transition: "transform 0.25s ease-in-out, box-shadow 0.25s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow:
                  "0 12px 34px -4px rgba(15, 23, 42, 0.12), 0 0 15px rgba(201, 170, 255, 0.30), 0 0 10px rgba(179, 225, 255, 0.25)",
              },
            }}
            aria-label="Deepak Gupta"
          >
            {/* Inner Liquid Glass Disc with Specular Glint */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0.28) 100%)",
                backdropFilter: "blur(32px) saturate(190%)",
                WebkitBackdropFilter: "blur(32px) saturate(190%)",
                boxShadow:
                  "inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(201, 170, 255, 0.20)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src="/LogoNav.png"
                alt="Deepak Gupta"
                sx={{
                  width: { xs: 46, md: 56 },
                  height: "auto",
                  maxHeight: { xs: 36, md: 44 },
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                  display: "block",
                  filter:
                    "contrast(1.25) brightness(0.25) drop-shadow(0 1px 1px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 5px rgba(201, 170, 255, 0.28)) drop-shadow(0 2px 5px rgba(15, 23, 42, 0.25))",
                  transition: "all 0.25s ease",
                }}
              />
            </Box>
          </Box>

          {/* Action Capsule with Luminous Soft Rainbow Outline Ring */}
          <Box
            sx={{
              position: "relative",
              height: { xs: 52, md: 64 },
              borderRadius: "999px",
              p: "1.3px", // Balanced 1.3px delicate rainbow outline
              background:
                "linear-gradient(90deg, rgba(205, 175, 255, 0.45) 0%, rgba(255, 235, 140, 0.45) 25%, rgba(255, 180, 235, 0.45) 50%, rgba(135, 225, 255, 0.45) 75%, rgba(160, 185, 255, 0.45) 100%)",
              boxShadow:
                "0 8px 28px -4px rgba(15, 23, 42, 0.08), 0 0 10px rgba(201, 170, 255, 0.20), 0 0 6px rgba(179, 225, 255, 0.18)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Inner Liquid Glass Actions Capsule */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "999px",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.25) 100%)",
                backdropFilter: "blur(32px) saturate(190%)",
                WebkitBackdropFilter: "blur(32px) saturate(190%)",
                boxShadow:
                  "inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 2px 0 rgba(201, 170, 255, 0.16)",
                display: "flex",
                alignItems: "center",
                pl: { xs: 1.8, md: 2.8 },
                pr: { xs: 0.6, md: "5px" },
                gap: { xs: 1.5, md: 3 }, // 24px gap between menu & CTA
              }}
            >
              {/* Menu Toggle Button */}
              <Box
                component="button"
                type="button"
                onClick={toggleMenu}
                sx={{
                  background: "transparent",
                  border: menuOpen
                    ? "1px solid rgba(15, 23, 42, 0.2)"
                    : "1px solid transparent",
                  borderRadius: "999px",
                  outline: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  cursor: "pointer",
                  px: { xs: 1.2, md: 1.6 },
                  py: { xs: 0.6, md: 0.8 },
                  color: "#0F172A",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(15, 23, 42, 0.06)",
                  },
                }}
                aria-expanded={menuOpen}
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? (
                  /* Close '✕' Icon */
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: 1,
                      color: "#0F172A",
                      width: 20,
                      textAlign: "center",
                    }}
                  >
                    ✕
                  </Typography>
                ) : (
                  /* 2-line Hamburger Icon (18px x 2px) */
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 2,
                        bgcolor: "#0F172A",
                        borderRadius: "99px",
                      }}
                    />
                    <Box
                      sx={{
                        width: 18,
                        height: 2,
                        bgcolor: "#0F172A",
                        borderRadius: "99px",
                      }}
                    />
                  </Box>
                )}

                <Typography
                  sx={{
                    fontSize: { xs: "15px", md: "16px" },
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "#0F172A",
                    fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
                    userSelect: "none",
                  }}
                >
                  Menu
                </Typography>
              </Box>

              {/* CTA Pill Button (White with subtle depth so it floats on transparent glass) */}
              <Button
                onClick={() => handleScrollTo("#contact")}
                sx={{
                  height: { xs: 42, md: 54 },
                  bgcolor: "#FFFFFF",
                  color: "#0F172A",
                  borderRadius: "999px",
                  px: { xs: 2.2, md: 3 },
                  py: 0,
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  textTransform: "none",
                  fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
                  lineHeight: 1,
                  border: "1px solid rgba(15, 23, 42, 0.08)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    bgcolor: "#F8FAFC",
                    transform: "scale(1.02)",
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
                  },
                }}
              >
                {PROFILE_DATA.ctaText}
              </Button>
            </Box>
          </Box>

          {/* Floating Dropdown Card Directly Below Navbar */}
          <Fade in={menuOpen} timeout={200}>
            <Box
              sx={{
                display: menuOpen ? "block" : "none",
                position: "absolute",
                top: "calc(100% + 14px)",
                left: { xs: "50%", sm: "auto" },
                right: { xs: "auto", sm: 0 },
                transform: { xs: "translateX(-50%)", sm: "none" },
                width: { xs: 310, sm: 360 },
                borderRadius: "32px",
                p: "1.2px", // Delicate 1.2px soft pastel rainbow outline
                background:
                  "linear-gradient(135deg, rgba(201, 170, 255, 0.45) 0%, rgba(253, 255, 188, 0.45) 25%, rgba(255, 204, 253, 0.45) 50%, rgba(179, 225, 255, 0.45) 75%, rgba(131, 153, 255, 0.45) 100%)",
                boxShadow:
                  "0 24px 60px rgba(15, 23, 42, 0.08), 0 4px 20px rgba(201, 170, 255, 0.12), 0 2px 10px rgba(179, 225, 255, 0.12)",
                zIndex: 1250,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "30.8px",
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.38) 0%, rgba(245, 248, 255, 0.18) 100%)",
                  backdropFilter: "blur(36px) saturate(200%)",
                  WebkitBackdropFilter: "blur(36px) saturate(200%)",
                  boxShadow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.7)",
                  p: { xs: 3.5, sm: 4.5 },
                  boxSizing: "border-box",
                }}
              >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: 5,
                  rowGap: 2.8,
                }}
              >
                {/* Column 1 */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.8 }}>
                  {NAV_LINKS_COL1.map((item) => (
                    <Typography
                      key={item.label}
                      onClick={() => handleScrollTo(item.href)}
                      sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "#475569",
                        cursor: "pointer",
                        fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
                        transition: "color 0.2s ease, transform 0.2s ease",
                        "&:hover": {
                          color: "#0F172A",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                  ))}
                </Box>

                {/* Column 2 */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.8 }}>
                  {NAV_LINKS_COL2.map((item) => (
                    <Typography
                      key={item.label}
                      onClick={() => handleScrollTo(item.href)}
                      sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "#475569",
                        cursor: "pointer",
                        fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
                        transition: "color 0.2s ease, transform 0.2s ease",
                        "&:hover": {
                          color: "#0F172A",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
        </Box>
      </Box>
    </>
  );
}
