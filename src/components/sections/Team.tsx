import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { teamMembers } from "@/lib/data";

export function Team() {
  return (
    <section id="equipo" className="scroll-mt-4 border-t border-noir-line px-5 py-16 md:px-20 md:py-28">
      <div className="ot-container flex flex-col gap-12 md:gap-14">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <p className="flex items-center gap-[14px] font-caps text-[12px] tracking-[0.25em] text-gold">
            <span aria-hidden className="h-px w-[60px] bg-gold-deep" />
            03 · Nuestro equipo
            <span aria-hidden className="h-px w-[60px] bg-gold-deep" />
          </p>
          <h2 className="font-display text-[clamp(36px,4vw,56px)] leading-[1.05] text-on-dark">Las manos detrás de tu look</h2>
        </Reveal>
        <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 lg:grid-cols-4">
          {teamMembers.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08} className="w-[240px] shrink-0 snap-start md:w-auto">
              <Link href="/reservar" className="group flex flex-col items-center gap-[14px] text-center">
                <span className="arch block w-full border border-gold-deep p-[10px] pb-0 transition-colors group-hover:border-gold">
                  <span className="arch relative block aspect-[280/360] w-full overflow-hidden bg-noir-card">
                    <Image src={m.image} alt={`${m.name}, ${m.role}`} fill sizes="(min-width: 1024px) 300px, 240px" className="object-cover" />
                  </span>
                </span>
                <span className="pt-1 font-caps text-[16px] tracking-[0.12em] text-on-dark uppercase md:text-[17px]">{m.name}</span>
                <span className="font-script text-[24px] leading-none text-gold-light">{m.role}</span>
                <span className="text-[13px] text-on-dark-muted">{m.specialties}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
