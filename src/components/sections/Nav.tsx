"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo, PrimaryButton } from "@/components/primitives";
import { contact } from "@/lib/data";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Equipo", href: "#equipo" },
  { label: "Resultados", href: "#resultados" },
  { label: "Visítanos", href: "#visitanos" },
  { label: "Preguntas", href: "#preguntas" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-20 px-5 py-4 md:px-20 md:py-6">
      <div className="ot-container flex items-center justify-between">
        <span className="md:hidden">
          <Logo compact />
        </span>
        <span className="max-md:hidden">
          <Logo />
        </span>
        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-[15px] font-medium text-ink-soft transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <a href={contact.phoneHref} className="text-[14px] font-semibold text-ink-soft hover:text-ink">
            {contact.phone}
          </a>
          <PrimaryButton label="Reservar" href="/reservar" size="sm" />
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav aria-label="Móvil" className="absolute inset-x-0 top-full flex flex-col gap-1 border-y border-line bg-cream px-5 pb-6 pt-2 md:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-line py-4 font-display text-[24px]">
              {link.label}
            </a>
          ))}
          <div className="pt-4">
            <PrimaryButton label="Reservar mi cita" href="/reservar" full />
          </div>
        </nav>
      )}
    </header>
  );
}
