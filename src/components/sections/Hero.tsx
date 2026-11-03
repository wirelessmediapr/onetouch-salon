import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { LiveBadge, OutlineButton, PrimaryButton } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section className="px-5 pb-10 pt-3 md:px-20 md:pb-24 md:pt-10">
      <div className="ot-container flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-16">
        <Reveal className="flex min-w-0 flex-1 flex-col gap-6 md:gap-9">
          <div>
            <LiveBadge label="Abierto hoy hasta las 7 PM" />
          </div>
          <h1 className="font-display text-[clamp(44px,6.4vw,92px)] font-light leading-[1.02] tracking-[-0.04em]">
            Tu mejor versión,
            <br />
            <span className="inline-flex items-center gap-[0.2em]">
              a un
              <span aria-hidden className="arch relative inline-block h-[0.86em] w-[1.4em] overflow-hidden">
                <Image src="/images/generated-7.png" alt="" fill sizes="130px" className="object-cover" />
              </span>
              <em className="italic text-flame">toque.</em>
            </span>
          </h1>
          <p className="max-w-[560px] text-[16px] leading-[1.55] text-ink-soft md:text-[19px]">
            Corte, color, uñas y cejas en un mismo lugar. Escoge tus servicios, tu estilista y tu hora en menos de un minuto — sin
            llamadas, sin depósito.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <PrimaryButton label="Reservar mi cita" href="/reservar" size="lg" />
            <OutlineButton label="Ver servicios y precios" href="#servicios" size="lg" />
          </div>
          <div className="flex items-center gap-4 pt-2 md:gap-7 md:pt-4">
            <div className="flex -space-x-3">
              {[2, 3, 4, 5].map((i) => (
                <Image
                  key={i}
                  src={`/images/generated-${i}.png`}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-cream object-cover"
                />
              ))}
            </div>
            <div className="flex flex-col gap-[2px]">
              <span className="flex items-center gap-[6px] text-[14px] font-bold">
                <Star size={16} className="text-flame" fill="currentColor" strokeWidth={1.8} />
                4.9 en Google
              </span>
              <span className="text-[13px] text-muted">320 reseñas · 9 años en Ciudad, PR</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-[500px] shrink-0 lg:w-[440px] xl:w-[500px]">
          <div className="arch relative aspect-[500/660] w-full overflow-hidden bg-sand">
            <Image
              src="/images/generated.png"
              alt="Clienta con balayage recién hecho en Onetouch Salon"
              fill
              priority
              sizes="(min-width: 1024px) 500px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-2 top-6 flex h-24 w-24 rotate-[-10deg] flex-col items-center justify-center rounded-full bg-gold text-palm md:-right-5 md:h-[116px] md:w-[116px]">
            <span className="font-display text-[34px] italic leading-none md:text-[40px]">9</span>
            <span className="text-[9px] font-extrabold tracking-[0.15em] md:text-[10px]">AÑOS EN PR</span>
          </div>
          <a
            href="/reservar"
            className="card-tail absolute bottom-6 left-4 flex w-[240px] flex-col gap-[6px] bg-palm px-[18px] py-4 transition-colors hover:bg-palm-2 md:bottom-16 md:-left-[72px] md:w-[280px] md:gap-[10px] md:px-[22px] md:py-5"
          >
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] text-palm-muted md:text-[11px]">
              <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-leaf" />
              PRÓXIMO HORARIO LIBRE
            </span>
            <span className="font-display text-[24px] text-cream md:text-[32px]">Hoy, 3:00 PM</span>
            <span className="flex items-center justify-between text-[13px] text-palm-muted">
              con Valeria · Color
              <ArrowUpRight size={18} className="text-gold" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
