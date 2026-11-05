import React from "react";
import Box from "@mui/material/Box";
import Navbar from "@/components/widgets/Navbar";
import HeroSection from "./HeroSection";

export default function HomeLayout() {
  return (
    <Box component="main" sx={{ minHeight: "100vh", position: "relative" }}>
      <Navbar />
      <HeroSection />
    </Box>
  );
}

