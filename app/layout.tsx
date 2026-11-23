import type { Metadata } from "next";
import { commissionerFont, OutfitFont, Caratere } from "@/utils/font";
import SmoothScrollProvider from "@/components/widgets/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deepak Gupta | Senior Accountant & Financial Specialist",
  description:
    "Portfolio of Deepak Gupta, Senior Accountant with 10+ years of experience across Summercool, Bajaj Electronics, and Paavan Chintan Dhara Ashram. Expertise in financial accounting, statutory audits, ERP, and IT automation.",
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
      className={`${commissionerFont.variable} ${OutfitFont.variable} ${Caratere.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Carattere&family=Commissioner:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
