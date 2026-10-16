import Image from "next/image";
import { QuoteBlock, Rating } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

const collage = [
  { src: "/images/generated-6.png", alt: "Manicura en gel en tono terracota", big: true },
  { src: "/images/generated-7.png", alt: "Resultado de balayage con ondas suaves" },
  { src: "/images/generated-8.png", alt: "Interior del estudio de Onetouch Salon" },
];

export function Results() {
  const [big, ...stack] = collage;
  return (
    <section id="resultados" className="bg-paper px-6 py-20 md:px-20 md:py-[120px]">
      <div className="ot-container grid gap-16 lg:grid-cols-[440px_1fr] lg:gap-20">
        <Reveal className="lg:flex lg:flex-col lg:justify-between">
          <div className="lg:mt-2">
            <QuoteBlock
              index="04 — Resultados"
              quote="Salí de la silla sintiéndome yo misma, pero con esa luz que uno no sabe pedir. Me tiñeron exactamente el tono que soñé."
              name="Mariela Torres"
              detail="Balayage & corte · hace dos semanas"
            />
            <div className="mt-8">
              <Rating text="4.9 de 5 · 320 reseñas en Google" />
            </div>
          </div>
        </Reveal>
        <div className="flex flex-col gap-4 lg:h-[680px] lg:flex-row">
          <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-[4px] lg:min-h-0">
            <Image src={big.src} alt={big.alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
          <div className="flex w-full flex-col gap-4 lg:w-[340px]">
            {stack.map((img) => (
              <div key={img.src} className="relative min-h-[200px] flex-1 overflow-hidden rounded-[4px] lg:min-h-0">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 100vw, 340px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
