import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onetouch Salon — Tu mejor versión, a un toque",
  description:
    "Corte, color, uñas y cejas en un mismo lugar. Escoge tus servicios, tu estilista y tu hora en menos de un minuto — sin llamadas, sin depósito.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`h-full scroll-smooth ${fraunces.variable} ${manrope.variable}`}>
      <body className="min-h-full bg-cream font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
