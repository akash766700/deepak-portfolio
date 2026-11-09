import { Geist, Outfit, Carattere } from "next/font/google";

export const GeistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

export const OutfitFont = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const Caratere = Carattere({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-carattere",
});
