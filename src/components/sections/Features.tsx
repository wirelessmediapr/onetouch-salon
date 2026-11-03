import Image from "next/image";
import { FeatureRow, Kicker, OutlineButton } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { features } from "@/lib/data";

export function Features() {
  return (
    <>
      {features.map((f, i) => {
        const reverse = i % 2 === 1;
        return (
          <section
            key={f.id}
            aria-labelledby={`feat-${f.id}`}
            className={`flex flex-col lg:min-h-[760px] ${reverse ? "bg-noir-2 lg:flex-row-reverse" : "bg-noir lg:flex-row"}`}
          >
            <Reveal className="flex flex-1 flex-col justify-center gap-7 px-5 py-14 md:px-20 md:py-20">
              <Kicker>{f.kicker}</Kicker>
              <h2 id={`feat-${f.id}`} className="font-display text-[clamp(38px,4.2vw,60px)] leading-[1.05] tracking-[-0.01em] text-on-dark">
                {f.line1}
                <br />
                <em className="italic text-gold">{f.line2}</em>
              </h2>
              <p className="max-w-[460px] text-[16px] leading-[1.6] text-on-dark-muted md:text-[17px]">{f.body}</p>
              <div className="flex flex-col">
                {f.items.map((s) => (
                  <FeatureRow key={s.name} name={s.name} duration={s.duration} price={s.price} />
                ))}
              </div>
              <div>
                <OutlineButton label="Reserva tu cita" href="/reservar" />
              </div>
            </Reveal>
            <div className="relative aspect-[4/3] w-full bg-noir-card lg:aspect-auto lg:w-[50%] lg:max-w-[720px]">
              <Image src={f.image} alt={f.alt} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
            </div>
          </section>
        );
      })}
    </>
  );
}
