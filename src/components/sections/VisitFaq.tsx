"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Clock3, MapPin, Minus, Phone, Plus } from "lucide-react";
import { ArrowLink, Kicker, SectionTitle } from "@/components/primitives";
import { contact, faqs } from "@/lib/data";

const info = [
  { icon: MapPin, main: `${contact.street}, ${contact.city}`, sub: contact.parking },
  { icon: Clock3, main: contact.hours, sub: contact.closed },
  { icon: Phone, main: contact.phone, sub: contact.email },
];

export function VisitFaq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-sand px-5 py-16 md:px-20 md:py-[120px]">
      <div className="ot-container flex flex-col gap-16 lg:flex-row lg:gap-24">
        <div id="visitanos" className="flex scroll-mt-8 flex-col gap-8 lg:w-[480px] lg:shrink-0">
          <Kicker>05 · Visítanos</Kicker>
          <h2 className="font-display text-[clamp(38px,4.6vw,60px)] leading-[1.02] tracking-[-0.035em]">
            Te esperamos
            <br />
            <em className="italic text-flame">con café.</em>
          </h2>
          <div className="relative aspect-[480/300] w-full overflow-hidden rounded-t-[240px] rounded-b-lg max-md:hidden">
            <Image src="/images/generated-8.png" alt="Sillas de estilismo de Onetouch Salon" fill sizes="480px" className="object-cover" />
          </div>
          <ul className="flex flex-col">
            {info.map(({ icon: Icon, main, sub }) => (
              <li key={main} className="flex items-center gap-4 border-b border-line py-4 md:py-[18px]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-flame">
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span className="flex flex-col gap-[2px]">
                  <span className="text-[15px] font-bold">{main}</span>
                  <span className="text-[13px] text-muted">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
          <div>
            <ArrowLink label="Cómo llegar en Google Maps" href={contact.mapsHref} icon={ArrowUpRight} />
          </div>
        </div>

        <div id="preguntas" className="flex min-w-0 flex-1 scroll-mt-8 flex-col gap-6">
          <Kicker>06 · Preguntas frecuentes</Kicker>
          <SectionTitle line1="Lo que siempre" line2="nos preguntan." size="step" />
          <div className="mt-2 border-t border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left md:py-6"
                  >
                    <span className="font-display text-[19px] tracking-[-0.01em] md:text-[22px]">{f.q}</span>
                    {isOpen ? <Minus size={20} className="shrink-0 text-flame" /> : <Plus size={20} className="shrink-0" />}
                  </button>
                  {isOpen && <p className="max-w-[640px] pb-6 text-[15px] leading-[1.55] text-ink-soft">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
