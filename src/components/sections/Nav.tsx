"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo, PrimaryButton } from "@/components/primitives";
import { contact } from "@/lib/data";

const left = [
  { label: "Servicios", href: "#servicios" },
  { label: "Equipo", href: "#equipo" },
  { label: "Resultados", href: "#resultados" },
];

const all = [...left, { label: "Contacto", href: "#contacto" }];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-20 border-b border-noir-line px-5 py-4 md:px-20 md:py-6">
      <div className="ot-container grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {left.map((link) => (
            <a key={link.href} href={link.href} className="font-caps text-[13px] tracking-[0.15em] text-on-dark transition-colors hover:text-gold">
              {link.label}
            </a>
          ))}
        </nav>
        <span className="lg:hidden" />
        <span className="md:hidden">
          <Logo compact />
        </span>
        <span className="max-md:hidden">
          <Logo />
        </span>
        <div className="flex items-center justify-end gap-7">
          <a href={contact.phoneHref} className="text-[14px] text-on-dark-muted hover:text-on-dark max-lg:hidden">
            {contact.phone}
          </a>
          <span className="max-md:hidden">
            <PrimaryButton label="Reservar" href="/reservar" size="sm" icon={null} />
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-noir-line text-gold md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Móvil" className="absolute inset-x-0 top-full flex flex-col border-b border-noir-line bg-noir px-5 pb-6 pt-2 md:hidden">
          {all.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-noir-line py-4 font-caps text-[18px] tracking-[0.12em] text-on-dark"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-5">
            <PrimaryButton label="Reserva tu cita" href="/reservar" full />
          </div>
        </nav>
      )}
    </header>
  );
}
