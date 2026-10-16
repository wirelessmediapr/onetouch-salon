import { FooterColumn, PrimaryButton } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";

// Datos placeholder del salón — reemplazar cuando el negocio pase los reales.
// (`Cómo llegar ↗` = link_outplace del lienzo; lleva a Google Maps cuando exista dirección real.)
const columns: { heading: string; lines: React.ReactNode[] }[] = [
  {
    heading: "Visítanos",
    lines: [
      "Calle Ejemplo 123",
      "Ciudad, PR 00000",
      <a key="mapa" href="#" className="transition-opacity hover:opacity-80">
        <span className="text-accent-warm">Cómo llegar ↗</span>
      </a>,
    ],
  },
  {
    heading: "Horario",
    lines: ["Lun – Sáb  9:00 AM – 7:00 PM", "Domingo  cerrado"],
  },
  {
    heading: "Contacto",
    lines: ["(000) 000-0000", "hola@onetouchsalon.com", "@onetouchsalon"],
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/onetouchsalon",
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/onetouchsalon",
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
];

export function Footer() {
  return (
    <footer id="contacto" className="bg-ink px-6 pb-10 pt-20 md:px-20 md:pt-[120px]">
      <div className="ot-container">
      <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:gap-20">
        <Reveal>
          <h2 className="max-w-[640px] font-display text-[clamp(44px,5.5vw,72px)] leading-[1.02] text-bone">
            ¿Lista para tu próximo cambio?
          </h2>
          <div className="mt-8">
            <PrimaryButton label="Reservar mi cita" href="#reservas" />
          </div>
        </Reveal>
        <div className="flex flex-wrap gap-x-16 gap-y-10 lg:flex-nowrap lg:justify-end">
          {columns.map((column) => (
            <FooterColumn key={column.heading} heading={column.heading} lines={column.lines} />
          ))}
        </div>
      </div>

      <p
        aria-hidden
        className="mt-16 overflow-x-clip select-none text-center font-display text-[clamp(96px,20vw,300px)] leading-[0.9] text-dark-card"
      >
        Onetouch
      </p>

      <div className="mt-10 flex flex-col items-start gap-6 border-t border-dark-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-dark-muted">© 2026 Onetouch Salon. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="text-dark-muted transition-colors hover:text-bone"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {social.path}
              </svg>
            </a>
          ))}
        </div>
      </div>
      </div>
    </footer>
  );
}
