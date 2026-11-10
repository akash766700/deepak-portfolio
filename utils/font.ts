import { Outfit, Carattere, Commissioner } from "next/font/google";

export const commissionerFont = Commissioner({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-commissioner",
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
