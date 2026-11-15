"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";

interface FAQItemData {
  number: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItemData[] = [
  {
    number: "1",
    question: "What industries do you work with?",
    answer:
      "We work with businesses across a wide range of industries including real estate, healthcare, e-commerce, finance, education, legal, SaaS, marketing agencies, and local service businesses. Our AI automation systems are customized to fit your workflows, whether you need lead generation, customer support, appointment booking, CRM automation, or internal operations optimization.",
  },
  {
    number: "2",
    question: "How long does implementation take?",
    answer:
      "Project timelines typically range from 2 to 6 weeks, depending on complexity. Smaller automation systems — such as AI chatbots with CRM integration — can often be deployed within 2–3 weeks. More advanced projects involving multi-platform integrations, custom AI logic, internal workflow automation, and reporting dashboards may take 4–6 weeks or longer.",
  },
  {
    number: "3",
    question: "Do we need technical knowledge to work with you?",
    answer:
      "No technical background is required. We handle the entire process — from strategy and setup to integrations, testing, and deployment. Our goal is to make AI automation simple and accessible while ensuring your team can easily manage and use the system after launch.",
  },
  {
    number: "4",
    question: "Is AI automation secure?",
    answer:
      "Yes. Security and data privacy are a top priority in every system we build. We use secure APIs, encrypted connections, role-based access controls, and trusted platforms to ensure your business data remains protected. We also follow best practices for compliance and system reliability.",
  },
  {
    number: "5",
    question: "What kind of ROI can we expect?",
    answer:
      "Most businesses see ROI through reduced manual work, faster response times, increased lead conversion, and improved operational efficiency. Depending on the automation scope, clients often save dozens of hours per week while improving customer experience and scaling operations without increasing overhead.",
  },
];

export default function FAQSection() {
  // First item open by default as shown in the design reference
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box
      component="section"
      id="faqs"
      sx={{
        position: "relative",
        zIndex: 1,
        pt: { xs: 8, md: 10 },
        pb: { xs: 6, md: 8 },
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
        {/* Top Pill / Badge: 010 • FAQS */}
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
            010
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
            FAQS
          </Typography>
        </Box>

        {/* Section Heading */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontFamily: "var(--font-commissioner), Inter, sans-serif",
            fontSize: { xs: "32px", sm: "42px", md: "52px" },
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#1A1A1A",
            textAlign: "center",
            lineHeight: 1.15,
            mb: { xs: 4, md: 6 },
          }}
        >
          Common Questions
        </Typography>

        {/* Accordion List Container */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1040px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Box
                key={item.number}
                onClick={() => toggleItem(index)}
                sx={{
                  width: "100%",
                  cursor: "pointer",
                  position: "relative",
                  borderRadius: isOpen
                    ? { xs: "32px", sm: "40px", md: "50px" }
                    : { xs: "28px", sm: "34px", md: "38px" },
                  // Iridescent Rainbow Gradient Stroke on Open
                  background: isOpen
                    ? "linear-gradient(90deg, #c9aaff 0%, rgb(253, 255, 188) 25%, rgb(255, 204, 253) 50%, rgb(179, 225, 255) 75%, rgb(131, 153, 255) 100%)"
                    : "transparent",
                  p: isOpen ? "2px" : "0px",
                  transition:
                    "border-radius 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.35s ease",
                }}
              >
                {/* Inner Card Container */}
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: isOpen ? "#FFFFFF" : "#F2F2F2",
                    borderRadius: isOpen
                      ? { xs: "30px", sm: "38px", md: "48px" }
                      : { xs: "28px", sm: "34px", md: "38px" },
                    p: {
                      xs: "20px 20px",
                      sm: "22px 28px",
                      md: "24px 32px",
                    },
                    boxSizing: "border-box",
                    boxShadow: isOpen
                      ? "0 10px 30px rgba(0, 0, 0, 0.04)"
                      : "none",
                    transition:
                      "background-color 0.3s ease, border-radius 0.35s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      bgcolor: isOpen ? "#FFFFFF" : "#EBEBEB",
                    },
                  }}
                >
                  {/* Top Question Row */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    {/* Left: Number + Question */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1.5, sm: 2 },
                        flex: 1,
                      }}
                    >
                      {/* Number Badge */}
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          minWidth: 32,
                          borderRadius: "12px",
                          bgcolor: "#F2F2F2",
                          border: "0.5px solid #E6E6E6",
                          boxShadow:
                            "inset 0px 0px 1px 2px #ffffff, inset 0px -2px 1px 0px rgba(0, 0, 0, 0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#1A1A1A",
                          }}
                        >
                          {item.number}
                        </Typography>
                      </Box>

                      {/* Question Text */}
                      <Typography
                        sx={{
                          fontFamily:
                            "var(--font-commissioner), Inter, sans-serif",
                          fontSize: { xs: "15px", sm: "16px", md: "17px" },
                          fontWeight: 600,
                          color: "#1A1A1A",
                          lineHeight: 1.35,
                        }}
                      >
                        {item.question}
                      </Typography>
                    </Box>

                    {/* Right: Plus / Close Action Button */}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        minWidth: 48,
                        borderRadius: "999px",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // Gradient outer ring when open
                        background: isOpen
                          ? "linear-gradient(90deg, #c9aaff 0%, rgb(253, 255, 188) 25%, rgb(255, 204, 253) 50%, rgb(179, 225, 255) 75%, rgb(131, 153, 255) 100%)"
                          : "none",
                        p: isOpen ? "1.5px" : 0,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "999px",
                          bgcolor: isOpen ? "#FFFFFF" : "#1A1A1A",
                          boxShadow: isOpen
                            ? "none"
                            : "inset 0px 0px 8px 0px #ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background-color 0.3s ease",
                        }}
                      >
                        {/* Plus / Cross SVG */}
                        <Box
                          component="svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={isOpen ? "#1A1A1A" : "#FFFFFF"}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          sx={{
                            width: 18,
                            height: 18,
                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                            transition:
                              "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.3s ease",
                          }}
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Expandable Answer Section */}
                  <Collapse in={isOpen} timeout={350} unmountOnExit>
                    <Box
                      sx={{
                        pt: { xs: 2, sm: 2.5 },
                        pl: { xs: 0, sm: "48px" },
                        maxWidth: "880px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: { xs: "14px", sm: "14.5px", md: "15px" },
                          color: "#525252",
                          lineHeight: 1.65,
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </Box>
                  </Collapse>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Bottom Section: Have any other questions? Contact Us */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            mt: { xs: 5, md: 7 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: { xs: "14px", sm: "15px" },
              color: "#525252",
              textAlign: "center",
            }}
          >
            Have any other questions?
          </Typography>

          {/* Contact Us Pill Button */}
          <Box
            component="a"
            href="#contact"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2.5,
              py: 0.9,
              borderRadius: "999px",
              bgcolor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              color: "#1A1A1A",
              textDecoration: "none",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              transition: "all 0.25s ease",
              "&:hover": {
                bgcolor: "#FFFFFF",
                transform: "scale(1.04)",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            <span>Contact Us</span>
            <Box
              sx={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                bgcolor: "#E6E6E6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "#1A1A1A",
                fontWeight: 700,
              }}
            >
              →
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

