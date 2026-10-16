import { SectionHeader, TeamCard } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { teamMembers } from "@/lib/data";

export function Team() {
  return (
    <section id="equipo" className="px-6 py-20 md:px-20 md:py-[120px]">
      <div className="ot-container flex flex-col gap-16">
      <Reveal>
        <SectionHeader
          index="03 — El equipo"
          title="Manos que conocen tu cabello."
          intro="Cuatro estilistas certificadas, una bienvenida cálida. Elige tu favorita o deja que la agenda decida por ti."
        />
      </Reveal>
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {teamMembers.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.08}>
            <TeamCard member={member} />
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
