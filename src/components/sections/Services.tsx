"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLink, Chip, Kicker, SectionTitle, ServiceItem } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { serviceCategories } from "@/lib/data";

export function Services() {
  const [filter, setFilter] = useState<string>("Todo");
  const total = serviceCategories.reduce((n, c) => n + c.items.length, 0);
  const visible = filter === "Todo" ? serviceCategories : serviceCategories.filter((c) => c.name === filter);

  return (
    <section id="servicios" className="scroll-mt-4 bg-sand px-5 py-16 md:px-20 md:py-[120px]">
      <div className="ot-container flex flex-col gap-8 md:gap-14">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <Kicker>01 · Menú de servicios</Kicker>
            <SectionTitle line1="Precios claros," line2="sin sorpresas." />
          </div>
          <p className="max-w-[400px] text-[16px] leading-[1.6] text-ink-soft">
            Lo que ves es lo que pagas. Cada servicio muestra su duración real para que planifiques tu día — y puedes combinar varios en
            una sola cita.
          </p>
        </Reveal>

        <div className="-mx-5 flex gap-[10px] overflow-x-auto px-5 pb-1 md:mx-0 md:px-0" role="group" aria-label="Filtrar por categoría">
          <Chip label="Todo" count={total} active={filter === "Todo"} onClick={() => setFilter("Todo")} />
          {serviceCategories.map((c) => (
            <Chip key={c.name} label={c.name} count={c.items.length} active={filter === c.name} onClick={() => setFilter(c.name)} />
          ))}
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[72px]">
          <Reveal className="flex w-full flex-col gap-5 max-lg:order-2 lg:sticky lg:top-8 lg:w-[400px] lg:shrink-0">
            <div className="arch relative aspect-[400/520] w-full overflow-hidden max-lg:hidden">
              <Image src="/images/generated-1.png" alt="Estilista aplicando color en Onetouch Salon" fill sizes="400px" className="object-cover" />
            </div>
            <div className="card-tail flex flex-col gap-3 bg-cream p-6">
              <p className="font-display text-[24px] tracking-[-0.01em]">¿No sabes qué pedir?</p>
              <p className="text-[14px] leading-[1.55] text-ink-soft">
                Reserva una consulta gratis de 15 minutos y te recomendamos el servicio ideal para tu cabello.
              </p>
              <div>
                <ArrowLink label="Reservar consulta gratis" href="/reservar" />
              </div>
            </div>
          </Reveal>

          <div className="flex min-w-0 flex-1 flex-col gap-12">
            {visible.map((cat) => (
              <div key={cat.name} className="flex flex-col">
                <div className="flex items-end justify-between border-b border-ink pb-[14px]">
                  <h3 className="font-display text-[32px] italic tracking-[-0.03em] md:text-[40px]">{cat.name}</h3>
                  <p className="text-[14px] font-semibold text-muted">{cat.from}</p>
                </div>
                {cat.items.map((item) => (
                  <ServiceItem key={item.name} {...item} />
                ))}
              </div>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-[15px] font-semibold text-ink-soft">Combina servicios y reserva todo en una sola cita.</p>
              <ArrowLink label="Empezar mi reserva" href="/reservar" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
