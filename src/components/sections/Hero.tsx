import { ArchPhoto, Kicker, OutlineButton, PrimaryButton } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { since } from "@/lib/data";

export function Hero() {
  return (
    <section className="px-5 pb-14 pt-10 md:px-20 md:pb-20 md:pt-16">
      <div className="ot-container flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
        <Reveal className="flex min-w-0 flex-1 flex-col gap-6 md:gap-8">
          <div>
            <Kicker center>Salón de belleza · Puerto Rico</Kicker>
          </div>
          <h1 className="font-caps text-[clamp(44px,6.2vw,84px)] leading-[1.05] tracking-[0.01em] text-on-dark">
            Tu belleza,
            <br />
            <span className="text-gold">
              nuestra
              <br />
              pasión.
            </span>
          </h1>
          <p className="font-script text-[clamp(28px,2.8vw,38px)] leading-[1.15] text-gold-light">Un toque de cuidado, toda una vida de belleza</p>
          <p className="max-w-[520px] text-[16px] leading-[1.6] text-on-dark-muted md:text-[18px]">
            Cabello, uñas, piel y maquillaje en un solo lugar. Productos premium, manos expertas y una cita que es solo para ti.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
            <PrimaryButton label="Reserva tu cita" href="/reservar" size="lg" />
            <OutlineButton label="Ver servicios" href="#servicios" size="lg" />
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-[520px] shrink-0 lg:w-[480px] xl:w-[520px]">
          <ArchPhoto
            src="/images/v3/hero.jpg"
            alt="Clienta con peinado recogido y maquillaje de noche en OneTouch Salon"
            sizes="(min-width: 1024px) 520px, 100vw"
            priority
            inset={30}
            className="aspect-[520/720] w-full"
          />
          <div className="absolute -left-2 bottom-10 flex h-24 w-24 flex-col items-center justify-center gap-[2px] rounded-full border border-gold bg-noir md:-left-8 md:h-32 md:w-32">
            <span className="font-caps text-[9px] tracking-[0.3em] text-gold-light md:text-[10px]">DESDE</span>
            <span className="font-display text-[26px] leading-none text-gold md:text-[34px]">{since}</span>
            <span className="font-caps text-[8px] tracking-[0.2em] text-gold-light md:text-[9px]">PUERTO RICO</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
