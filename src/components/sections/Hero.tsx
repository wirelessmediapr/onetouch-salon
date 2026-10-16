import Image from "next/image";
import { Eyebrow, Fact, PrimaryButton, ArrowLink, NextSlotCard } from "@/components/primitives";

const facts = [
  { value: "4.9", label: "320 reseñas en Google" },
  { value: "9 años", label: "cuidando tu cabello" },
  { value: "Hoy", label: "abierto hasta las 7 PM" },
];

export function Hero() {
  return (
    <section className="px-6 pb-[88px] pt-8 md:px-20">
      <div className="grid gap-[72px] lg:grid-cols-[1fr_600px]">
        <div className="flex flex-col gap-20">
          <div className="flex flex-col">
            <Eyebrow>Salón de belleza · Estudio de color</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(56px,7.6vw,110px)] leading-[0.98]">
              <span className="block text-ink">Un solo toque</span>
              <span className="block text-accent">lo cambia todo.</span>
            </h1>
            <p className="mt-8 max-w-[500px] text-[18px] font-medium text-ink-soft">
              Corte, color, uñas y cuidado de la piel bajo un mismo techo. Elige tu servicio, tu estilista y tu
              hora — reserva en menos de un minuto, sin llamadas.
            </p>
            <div className="mt-10 flex items-center gap-10">
              <PrimaryButton label="Reservar mi cita" href="#reservas" />
              <ArrowLink label="Ver servicios y precios" href="#servicios" />
            </div>
          </div>
          <div className="mt-auto flex flex-wrap justify-between gap-8">
            {facts.map((fact) => (
              <Fact key={fact.value} value={fact.value} label={fact.label} />
            ))}
          </div>
        </div>
        <div className="relative min-h-[460px] md:min-h-[800px]">
          <div className="absolute inset-0 overflow-hidden rounded-[4px] md:inset-0">
            <Image
              src="/images/generated.png"
              alt="Estilista de Onetouch Salon desenredando cabello con ondas rubias"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute bottom-[110px] left-[-56px]">
            <NextSlotCard slot="Hoy · 3:30 PM" who="Blowout con Andrea · 45 min" />
          </div>
        </div>
      </div>
    </section>
  );
}
