import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/SocialIcons";
import { FooterColumn, Logo, PrimaryButton } from "@/components/primitives";
import { contact } from "@/lib/data";

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-gold-deep bg-noir-2 px-5 pb-8 pt-16 md:px-20 md:pb-10 md:pt-24">
      <div className="ot-container flex flex-col items-center gap-12 md:gap-14">
        <div className="flex flex-col items-center gap-6 text-center">
          <Logo size="xl" />
          <p className="font-script text-[28px] leading-[1.2] text-gold-light md:text-[34px]">Luce bien · Siéntete bien · Sé tú</p>
          <PrimaryButton label="Reserva tu cita" href="/reservar" size="lg" />
        </div>
        <div className="grid w-full gap-10 border-y border-noir-line py-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn
            heading="Visítanos"
            lines={[
              contact.street,
              contact.city,
              <a key="maps" href={contact.mapsHref} className="text-gold hover:underline">
                Cómo llegar ↗
              </a>,
            ]}
          />
          <FooterColumn heading="Horario" lines={[contact.hours, contact.closed]} />
          <FooterColumn
            heading="Contacto"
            lines={[
              <a key="p" href={contact.phoneHref} className="hover:text-on-dark">
                {contact.phone}
              </a>,
              <a key="e" href={`mailto:${contact.email}`} className="hover:text-on-dark">
                {contact.email}
              </a>,
            ]}
          />
          <FooterColumn
            heading="Síguenos"
            lines={[
              <a key="i" href="https://instagram.com/onetouchsalon" className="inline-flex items-center gap-2 hover:text-on-dark">
                <InstagramIcon size={16} /> Instagram
              </a>,
              <a key="f" href="#" className="inline-flex items-center gap-2 hover:text-on-dark">
                <FacebookIcon size={16} /> Facebook
              </a>,
              <a key="t" href="#" className="inline-flex items-center gap-2 hover:text-on-dark">
                <TikTokIcon size={16} /> TikTok
              </a>,
            ]}
          />
        </div>
        <div className="flex w-full flex-col gap-2 text-[13px] text-on-dark-muted sm:flex-row sm:justify-between">
          <p>© 2026 OneTouch Salon · Puerto Rico</p>
          <p>Privacidad · Términos</p>
        </div>
      </div>
    </footer>
  );
}
