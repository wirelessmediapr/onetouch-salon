import Link from "next/link";
import { Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/SocialIcons";
import { FooterColumn, LightButton, Logo, PrimaryButton, SectionTitle } from "@/components/primitives";
import { contact } from "@/lib/data";

export function Footer({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer id="contacto" className="overflow-hidden bg-palm px-5 pb-8 pt-16 md:px-20 md:pb-10 md:pt-[120px]">
      <div className="ot-container flex flex-col gap-12 md:gap-20">
        {showCta && (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle line1="¿Lista para tu" line2="próximo cambio?" dark accent="gold" size="cta" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton label="Reservar mi cita" href="/reservar" size="lg" />
              <LightButton label="Llamar al salón" href={contact.phoneHref} icon={Phone} size="lg" />
            </div>
          </div>
        )}
        <div className="grid gap-10 border-t border-palm-line pt-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Logo dark />
            <p className="max-w-[300px] text-[15px] leading-[1.55] text-palm-muted">Salón de belleza y estudio de color en Ciudad, Puerto Rico.</p>
          </div>
          <FooterColumn
            heading="Visítanos"
            lines={[
              contact.street,
              contact.city,
              <Link key="maps" href={contact.mapsHref} className="text-gold hover:underline">
                Cómo llegar ↗
              </Link>,
            ]}
          />
          <FooterColumn heading="Horario" lines={[contact.hoursShort, "Domingo · cerrado", <span key="h" className="text-palm-muted">Feriados: horario especial</span>]} />
          <FooterColumn
            heading="Contacto"
            lines={[
              <a key="p" href={contact.phoneHref} className="hover:underline">
                {contact.phone}
              </a>,
              <a key="e" href={`mailto:${contact.email}`} className="hover:underline">
                {contact.email}
              </a>,
              <span key="i" className="text-palm-muted">{contact.instagram}</span>,
            ]}
          />
        </div>
        <p aria-hidden className="select-none font-display text-[clamp(110px,20vw,280px)] font-light italic leading-[0.8] tracking-[-0.045em] text-palm-2">
          onetouch
        </p>
        <div className="flex items-center justify-between gap-4">
          <p className="text-[12px] text-palm-muted md:text-[13px]">© 2026 Onetouch Salon. Todos los derechos reservados.</p>
          <div className="flex gap-[18px] text-palm-muted">
            <a href="https://instagram.com/onetouchsalon" aria-label="Instagram" className="hover:text-cream">
              <InstagramIcon />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-cream">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-cream">
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
