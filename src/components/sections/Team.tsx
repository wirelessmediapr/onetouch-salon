import { Kicker, SectionTitle, StylistCard } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { teamMembers } from "@/lib/data";

export function Team() {
  return (
    <section id="equipo" className="scroll-mt-4 py-16 pl-5 md:px-20 md:py-[120px]">
      <div className="ot-container flex flex-col gap-10 md:gap-16">
        <Reveal className="flex flex-col gap-6 pr-5 md:pr-0 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <Kicker>03 · El equipo</Kicker>
            <SectionTitle line1="Manos que conocen" line2="tu cabello." />
          </div>
          <p className="max-w-[400px] text-[16px] leading-[1.6] text-ink-soft">
            Cuatro especialistas, cada una con su arte. Reserva directo con tu favorita o deja que el sistema te asigne la primera
            disponible.
          </p>
        </Reveal>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-5 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pr-0 lg:grid-cols-4">
          {teamMembers.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08} className={`w-[240px] shrink-0 snap-start md:w-auto ${i % 2 === 1 ? "lg:pt-16" : ""}`}>
              <StylistCard member={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
