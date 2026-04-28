import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Солнички — Ръчно изработени персонализирани солници",
  description: "Премиум солници с лика на хората, които обичаш. Ръчно изработени в България. Изработка до 6 работни дни.",
  openGraph: {
    title: "Солнички — Ръчно изработени персонализирани солници",
    description: "Премиум солници с лика на хората, които обичаш. Ръчно изработени в България.",
    images: ["/images/снимки_снилчки_image1.png"], // Will be replaced with actual hero image
    type: "website",
    locale: "bg_BG",
  },
  metadataBase: new URL("https://solnichki.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${cormorant.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-screen bg-white text-astronaut-blue font-sans">
        {children}
      </body>
    </html>
  );
}
