import type { Metadata } from "next";
import { GeistSans, OutfitFont, Caratere } from "@/utils/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deepak Gupta | Senior Accountant & Financial Specialist",
  description:
    "Portfolio of Deepak Gupta, Senior Accountant with 8+ years of experience in financial accounting, auditing, ERP systems, and IT automation.",
  icons: {
    icon: "/Favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${OutfitFont.variable} ${Caratere.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
