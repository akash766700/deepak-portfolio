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
import Footer from "@/components/widgets/Footer";

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
      <Navbar />
      <HeroSection />
      <AboutStatementSection />
      <WhyChooseSection />
      <CapabilitiesSection />
      <ProcessStepperSection />
      <CaseStudiesSection />
      <TechnologyEcosystemSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </Box>
  );
}
