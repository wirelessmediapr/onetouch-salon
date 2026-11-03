import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Eye, Flower2, Hand, MapPin, Palette, Phone, Scissors, Sparkles } from "lucide-react";
import { OrnamentTitle } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { contact, highlights, type Highlight } from "@/lib/data";

const icons: Record<Highlight["icon"], typeof Scissors> = {
  scissors: Scissors,
  palette: Palette,
  sparkles: Sparkles,
  hand: Hand,
  eye: Eye,
  flower: Flower2,
};

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-4 px-5 pb-16 pt-6 md:px-20 md:pb-24 md:pt-10">
      <div className="ot-container flex flex-col gap-10">
        <OrnamentTitle sub="Cuidado experto  ·  Productos premium  ·  Precios claros">Todo para tu belleza, en un solo lugar</OrnamentTitle>
        <Reveal className="relative rounded-[4px] border border-gold-deep px-4 pb-6 pt-12 md:px-8 md:pb-8">
          <p className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[2px] border border-gold-deep bg-noir px-6 py-[10px] font-caps text-[13px] tracking-[0.2em] text-gold md:px-7 md:text-[16px]">
            Nuestros servicios
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {highlights.map((h) => {
              const Icon = icons[h.icon];
              return (
                <li key={h.name}>
                  <Link
                    href="/reservar"
                    className="arch-card group flex h-full flex-col items-center overflow-hidden border border-noir-line bg-noir-2 transition-colors hover:border-gold-deep"
                  >
                    <span className="relative block aspect-[200/240] w-full overflow-hidden bg-noir-card">
                      <Image
                        src={h.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 200px, 45vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="relative z-10 -mt-7 flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-noir text-gold">
                      <Icon size={22} strokeWidth={1.6} />
                    </span>
                    <span className="flex flex-col items-center gap-[6px] px-3 pb-5 pt-2 text-center">
                      <span className="font-caps text-[12px] tracking-[0.1em] text-on-dark uppercase md:text-[13px]">{h.name}</span>
                      <span className="text-[13px] text-gold-light">{h.from}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function InfoBar() {
  const items = [
    { icon: MapPin, label: "Visítanos", value: `${contact.street}, ${contact.city}`, href: contact.mapsHref },
    { icon: Phone, label: "Llámanos", value: contact.phone, href: contact.phoneHref },
    { icon: CalendarCheck, label: "Reserva en línea", value: "onetouch.salon/reservar", href: "/reservar" },
  ];
  return (
    <section id="contacto-rapido" aria-label="Contacto" className="border-y border-gold-deep px-5 py-8 md:px-20">
      <div className="ot-container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {items.map(({ icon: Icon, label, value, href }) => (
          <a key={label} href={href} className="group flex items-center gap-4 lg:border-r lg:border-gold-deep lg:pr-10">
            <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-gold text-gold transition-colors group-hover:bg-gold group-hover:text-noir">
              <Icon size={22} strokeWidth={1.6} />
            </span>
            <span className="flex flex-col gap-1">
              <span className="font-caps text-[11px] tracking-[0.25em] text-gold uppercase">{label}</span>
              <span className={`text-[16px] text-on-dark md:text-[17px] ${label === "Llámanos" ? "whitespace-nowrap" : ""}`}>{value}</span>
            </span>
          </a>
        ))}
        <p className="font-script text-[26px] leading-[1.2] text-gold-light lg:max-w-[300px]">Un toque de cuidado, toda una vida de belleza</p>
      </div>
    </section>
  );
}
