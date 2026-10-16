import Image from "next/image";
import { ConsultNote, SectionHeader, ServiceCategory } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { serviceCategories } from "@/lib/data";

export function Services() {
  return (
    <section id="servicios" className="bg-paper px-6 py-20 md:px-20 md:py-[120px]">
      <div className="ot-container flex flex-col gap-[72px]">
      <Reveal>
        <SectionHeader
          index="01 — Menú de servicios"
          title="Lo que hacemos, y cuánto cuesta."
          intro="Precios transparentes, sin sorpresas. Cada servicio incluye consulta previa y productos profesionales libres de sulfatos."
        />
      </Reveal>
      <div className="grid gap-[72px] lg:grid-cols-[380px_1fr]">
        <div className="relative min-h-[440px] overflow-hidden rounded-[4px] lg:min-h-0">
          <Image
            src="/images/generated-1.png"
            alt="Detalle de color aplicado en el estudio de color del salón"
            fill
            sizes="(max-width: 1024px) 100vw, 380px"
            className="object-cover"
          />
        </div>
        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          {serviceCategories.map((category) => (
            <ServiceCategory key={category.name} name={category.name} from={category.from} items={category.items} />
          ))}
          <div className="md:col-span-2">
            <ConsultNote />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
