import { Award, BadgeCheck, CalendarHeart, HeartHandshake, ShieldCheck, ShieldPlus, Star, Users } from "lucide-react";
import { ArchPhoto, Kicker, PrimaryButton, SectionTitle } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { commitments, testimonials } from "@/lib/data";

const commitIcons = [Users, BadgeCheck, HeartHandshake, ShieldPlus, Award];

export function Trust() {
  return (
    <section id="resultados" className="scroll-mt-4 bg-cream px-5 py-16 text-ink md:px-20 md:py-28">
      <div className="ot-container flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-[72px]">
          <Reveal className="flex min-w-0 flex-1 flex-col gap-7">
            <Kicker tone="light">Lo que dicen de nosotras</Kicker>
            <SectionTitle line1="TU CONFIANZA," line2="nuestro mayor logro." tone="light" />
            <p className="max-w-[560px] text-[16px] leading-[1.6] text-ink-soft md:text-[18px]">
              Cada sonrisa y cada palabra bonita nos inspiran a subir la vara. Esto es lo que nuestras clientas cuentan después de su cita.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="flex flex-col gap-[14px] rounded-[2px] border border-taupe bg-ivory px-[22px] py-6">
                  <div className="flex gap-[3px] text-gold-deep" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} strokeWidth={1.6} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="font-display text-[16px] italic leading-[1.5]">{t.quote}</blockquote>
                  <figcaption className="mt-auto font-caps text-[11px] tracking-[0.15em] text-muted">— {t.name}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-[500px] shrink-0 lg:w-[460px] xl:w-[500px]">
            <ArchPhoto
              src="/images/v3/salon.jpg"
              alt="Interior de OneTouch Salon con espejos en arco iluminados"
              sizes="(min-width: 1024px) 500px, 100vw"
              className="aspect-[500/660] w-full"
            />
            <div className="absolute right-0 top-8 flex w-[150px] flex-col items-center gap-[6px] bg-noir px-[14px] py-4 text-center">
              <ShieldCheck size={26} strokeWidth={1.6} className="text-gold" />
              <p className="font-caps text-[10px] leading-[1.4] tracking-[0.1em] text-on-dark">HIGIENE · CALIDAD · EXPERIENCIA</p>
              <p className="font-caps text-[9px] tracking-[0.15em] text-gold">DE CONFIANZA</p>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col items-center gap-8">
          <h2 className="flex items-center gap-[14px] font-caps text-[12px] tracking-[0.25em] text-gold-deep md:text-[13px]">
            <span aria-hidden className="h-px w-10 bg-gold-deep md:w-20" />
            Nuestro compromiso contigo
            <span aria-hidden className="h-px w-10 bg-gold-deep md:w-20" />
          </h2>
          <ul className="grid w-full grid-cols-2 rounded-[2px] border border-taupe sm:grid-cols-3 lg:grid-cols-5">
            {commitments.map((c, i) => {
              const Icon = commitIcons[i];
              return (
                <li key={c} className="flex flex-col items-center gap-[14px] border-taupe px-3 py-7 text-center max-lg:border-b lg:[&:not(:last-child)]:border-r">
                  <Icon size={30} strokeWidth={1.4} className="text-gold-deep" />
                  <span className="font-caps text-[11px] tracking-[0.1em] uppercase md:text-[12px]">{c}</span>
                </li>
              );
            })}
          </ul>
          <div className="flex w-full flex-col gap-6 rounded-[2px] bg-noir px-6 py-7 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="flex items-center gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold text-noir">
                <CalendarHeart size={24} strokeWidth={1.8} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-caps text-[18px] tracking-[0.1em] text-on-dark md:text-[22px]">¿Lista para tu momento?</p>
                <p className="text-[15px] text-on-dark-muted">Reserva hoy en un minuto. Porque te lo mereces.</p>
              </div>
            </div>
            <PrimaryButton label="Reserva tu cita" href="/reservar" />
          </div>
        </div>
      </div>
    </section>
  );
}
