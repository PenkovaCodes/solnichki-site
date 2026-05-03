import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Pacifico } from "next/font/google";
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

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin", "cyrillic"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Солнички | Ръчно изработени персонализирани солници",
  description: "Премиум солници с лика на хората, които обичаш. Ръчно изработени в България. Изработка до 6 работни дни.",
  openGraph: {
    title: "Солнички | Ръчно изработени персонализирани солници",
    description: "Премиум солници с лика на хората, които обичаш. Ръчно изработени в България.",
    images: ["/images/product-7.png"],
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
    <html
      lang="bg"
      className={`${cormorant.variable} ${manrope.variable} ${pacifico.variable} antialiased`}
    >
      <body className="min-h-screen bg-cream text-astronaut-blue font-sans">
        {children}
      </body>
    </html>
  );
}
