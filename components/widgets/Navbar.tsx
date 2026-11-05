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
          {/* Logo Capsule (56px x 56px exact Conicorn size) */}
          <Box
            component="a"
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#hero");
            }}
            sx={{
              width: { xs: 48, md: 56 },
              height: { xs: 48, md: 56 },
              borderRadius: "999px",
              bgcolor: "rgba(26, 26, 26, 0.75)",
              border: `1px solid ${Colors.BORDER}`,
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.25s ease-in-out",
              boxShadow: "0 10px 35px rgba(0, 0, 0, 0.4)",
              "&:hover": {
                transform: "scale(1.04)",
                borderColor: Colors.TEXT_SECONDARY,
                bgcolor: Colors.SURFACE_CARD,
              },
            }}
            aria-label="Home"
          >
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "18px" },
                fontWeight: 700,
                color: Colors.WHITE,
                fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
                letterSpacing: "0.5px",
                userSelect: "none",
              }}
            >
              DG
            </Typography>
          </Box>

          {/* Nav Actions Capsule (56px height, exact Conicorn dimensions) */}
          <Box
            sx={{
              height: { xs: 48, md: 56 },
              borderRadius: "999px",
              bgcolor: "rgba(26, 26, 26, 0.75)",
              border: `1px solid ${Colors.BORDER}`,
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              display: "flex",
              alignItems: "center",
              pl: { xs: 1.5, md: 2.5 },
              pr: { xs: 0.5, md: "4px" },
              gap: { xs: 1.5, md: 3 }, // 24px gap between menu & CTA
              boxShadow: "0 10px 35px rgba(0, 0, 0, 0.4)",
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
                  ? "1px solid rgba(255, 255, 255, 0.35)"
                  : "1px solid transparent",
                borderRadius: "999px",
                outline: "none",
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                cursor: "pointer",
                px: { xs: 1.2, md: 1.6 },
                py: { xs: 0.6, md: 0.8 },
                color: Colors.TEXT_PRIMARY,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.06)",
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
                    color: Colors.WHITE,
                    width: 20,
                    textAlign: "center",
                  }}
                >
                  ✕
                </Typography>
              ) : (
                /* Conicorn '=' 2-line Hamburger Icon (18px x 2px) */
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
                      bgcolor: Colors.WHITE,
                      borderRadius: "99px",
                    }}
                  />
                  <Box
                    sx={{
                      width: 18,
                      height: 2,
                      bgcolor: Colors.WHITE,
                      borderRadius: "99px",
                    }}
                  />
                </Box>
              )}

              <Typography
                sx={{
                  fontSize: { xs: "15px", md: "16px" },
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: Colors.TEXT_PRIMARY,
                  fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
                  userSelect: "none",
                }}
              >
                Menu
              </Typography>
            </Box>

            {/* CTA Pill Button (Exact 48px height, generous padding) */}
            <Button
              onClick={() => handleScrollTo("#contact")}
              sx={{
                height: { xs: 40, md: 48 },
                bgcolor: Colors.WHITE,
                color: Colors.SURFACE_CARD,
                borderRadius: "999px",
                px: { xs: 2.2, md: 2.8 },
                py: 0,
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 600,
                letterSpacing: "-0.02em",
                textTransform: "none",
                fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
                lineHeight: 1,
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  bgcolor: "#f0f0f0",
                  transform: "scale(1.02)",
                },
              }}
            >
              {PROFILE_DATA.ctaText}
            </Button>
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
                bgcolor: "rgba(26, 26, 26, 0.88)",
                border: `1px solid ${Colors.BORDER}`,
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                boxShadow: "0 28px 70px rgba(0, 0, 0, 0.8)",
                p: { xs: 3.5, sm: 4.5 },
                zIndex: 1250,
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
                        color: Colors.TEXT_SECONDARY,
                        cursor: "pointer",
                        fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
                        transition: "color 0.2s ease, transform 0.2s ease",
                        "&:hover": {
                          color: Colors.WHITE,
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
                        color: Colors.TEXT_SECONDARY,
                        cursor: "pointer",
                        fontFamily: "var(--font-outfit), var(--font-geist-sans), sans-serif",
                        transition: "color 0.2s ease, transform 0.2s ease",
                        "&:hover": {
                          color: Colors.WHITE,
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
          </Fade>
        </Box>
      </Box>
    </>
  );
}
