import type { Metadata } from "next";
import { Cinzel, Manrope, Pinyon_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  style: ["normal", "italic"],
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const pinyon = Pinyon_Script({
  weight: "400",
  variable: "--font-pinyon",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OneTouch Salon by Grace — Tu belleza, nuestra pasión",
  description:
    "Cabello, uñas, piel y maquillaje en un solo lugar en Puerto Rico. Productos premium, manos expertas y reserva en línea en un minuto.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`h-full scroll-smooth ${cinzel.variable} ${playfair.variable} ${pinyon.variable} ${manrope.variable}`}>
      <body className="min-h-full bg-noir font-sans text-on-dark antialiased">{children}</body>
    </html>
  );
}
