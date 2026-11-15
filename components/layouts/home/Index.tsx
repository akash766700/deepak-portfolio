import React from "react";
import Box from "@mui/material/Box";
import Navbar from "@/components/widgets/Navbar";
import ConstellationField from "@/components/widgets/ConstellationField";
import HeroSection from "./HeroSection";
import AboutStatementSection from "./AboutStatementSection";
import WhyChooseSection from "./WhyChooseSection";
import CapabilitiesSection from "./CapabilitiesSection";
import ProcessStepperSection from "./ProcessStepperSection";
import CaseStudiesSection from "./CaseStudiesSection";
import TechnologyEcosystemSection from "./TechnologyEcosystemSection";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
import FAQSection from "./FAQSection";
import FooterSection from "./FooterSection";

export default function HomeLayout() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
        bgcolor: "#FAFBFD",
      }}
    >
      {/* Global Persistent Animated Constellation Texture (Fixed behind ALL sections) */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
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
      </Box>

      {/* Floating Island Navbar */}
      <Navbar />

      {/* Hero Section: Left Intro + Right Interactive 3D Ball */}
      <HeroSection />

      {/* Section 02: About Statement with Word-by-Word Scroll Reveal & Video Card */}
      <AboutStatementSection />

      {/* Section 03: Why Choose Me / Value Proposition Cards */}
      <WhyChooseSection />

      {/* Section 04: Capabilities & Services Bento Grid */}
      <CapabilitiesSection />

      {/* Section 05: How We Work Process Stepper Timeline */}
      <ProcessStepperSection />

      {/* Section 06: What We've Built Case Studies Slider */}
      <CaseStudiesSection />

      {/* Section 07: Technology Ecosystem Integrations Marquee */}
      <TechnologyEcosystemSection />

      {/* Section 08: What They’re Saying Testimonials Masonry */}
      <TestimonialsSection />

      {/* Section 09: Built for Growth at Every Stage Pricing */}
      <PricingSection />

      {/* Section 10: Common Questions FAQs */}
      <FAQSection />

      {/* Footer Section: Contact Form, Links & Brand Footer */}
      <FooterSection />
    </Box>
  );
}
