import { Logo, PrimaryButton } from "@/components/primitives";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Reservas", href: "#reservas" },
  { label: "Equipo", href: "#equipo" },
  { label: "Galería", href: "#resultados" },
  { label: "Contacto", href: "#contacto" },
];

export function Nav() {
  return (
    <header className="flex items-center justify-between px-6 py-7 md:px-20">
      <Logo />
      <nav aria-label="Principal" className="hidden items-center gap-10 md:flex">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="text-[15px] text-ink-soft transition-colors hover:text-ink">
            {link.label}
          </a>
        ))}
      </nav>
      <PrimaryButton label="Reservar cita" href="#reservas" size="compact" />
    </header>
  );
}
