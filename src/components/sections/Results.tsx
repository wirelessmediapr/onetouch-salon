import Image from "next/image";
import { InstagramIcon } from "@/components/SocialIcons";
import { ArrowLink, Kicker, SectionTitle, Stat, Testimonial } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { stats, testimonials } from "@/lib/data";

export function Results() {
  return (
    <section id="resultados" className="scroll-mt-4 bg-blush px-5 py-16 md:px-20 md:py-[120px]">
      <div className="ot-container flex flex-col gap-10 md:gap-16">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <Kicker tone="deep">04 · Resultados</Kicker>
            <SectionTitle line1="Ellas lo dicen" line2="mejor que nosotras." accent="deep" />
          </div>
          <div className="flex justify-between gap-6 md:gap-14">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:h-[560px] md:grid-cols-3 md:gap-5">
          <div className="arch relative aspect-[3/4] overflow-hidden md:aspect-auto">
            <Image src="/images/generated-6.png" alt="Manicura en tonos neutros" fill sizes="(min-width: 768px) 420px, 50vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-5 max-md:hidden">
            <div className="relative flex-1 overflow-hidden rounded-lg">
              <Image src="/images/generated-7.png" alt="Balayage con ondas suaves" fill sizes="420px" className="object-cover" />
            </div>
            <div className="flex flex-col gap-[10px] rounded-lg bg-palm p-7">
              <p className="font-display text-[26px] tracking-[-0.01em] text-cream">Antes y después, sin filtros.</p>
              <div>
                <ArrowLink label="Más en @onetouchsalon" href="https://instagram.com/onetouchsalon" tone="gold" icon={InstagramIcon} external />
              </div>
            </div>
          </div>
          <div className="arch-down relative aspect-[3/4] overflow-hidden md:aspect-auto">
            <Image src="/images/generated-8.png" alt="Interior de Onetouch Salon" fill sizes="(min-width: 768px) 420px, 50vw" className="object-cover" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className={i > 0 ? "max-md:hidden" : ""}>
              <Testimonial {...t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
