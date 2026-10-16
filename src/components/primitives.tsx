import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { ReactNode } from "react";

/* ============ Logo ============ */

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="#" className="flex items-end gap-[10px]">
      <span className={`font-display text-[34px] leading-none ${dark ? "text-bone" : "text-ink"}`}>
        Onetouch
      </span>
      <span className={`${dark ? "text-dark-muted" : "text-muted"} mb-[4px] text-[11px] font-semibold tracking-[0.14em]`}>
        SALON
      </span>
    </Link>
  );
}

/* ============ Botón primario ============ */

export function PrimaryButton({
  label,
  href,
  size = "lg",
}: {
  label: string;
  href: string;
  size?: "lg" | "compact";
}) {
  const pad =
    size === "compact"
      ? `px-[22px] py-3 text-[14px]`
      : `px-[28px] py-4 text-[16px]`;
  return (
    <Link href={href} className={`inline-flex items-center gap-2 rounded-full bg-accent font-semibold text-white transition-opacity hover:opacity-90 ${pad}`}>
      {label}
      <ArrowRight size={size === "compact" ? 16 : 18} strokeWidth={1.8} />
    </Link>
  );
}

/* ============ Enlaces ============ */

export function ArrowLink({ label, href, dark = false, accent = false }: { label: string; href: string; dark?: boolean; accent?: boolean }) {
  const color = accent ? "text-accent" : dark ? "text-bone" : "text-ink";
  return (
    <Link href={href} className={`inline-flex items-center gap-2 text-[15px] font-semibold ${color} hover:underline`}>
      {label}
      <ArrowRight size={16} strokeWidth={1.8} />
    </Link>
  );
}

/* ============ Eyebrow ============ */

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-[10px]">
      <span aria-hidden className={`h-px w-8 ${dark ? "bg-bone" : "bg-ink"}`} />
      <span className={`text-[12px] font-semibold uppercase tracking-[0.08em] ${dark ? "text-bone" : "text-ink"}`}>
        {children}
      </span>
    </span>
  );
}

/* ============ Fact ============ */

export function Fact({ value, label }: { value: string; label: string }) {
  return (
    <span className="flex flex-col gap-[2px]">
      <span className="font-display text-[36px] leading-[1.05] text-ink">{value}</span>
      <span className="text-[13px] text-muted">{label}</span>
    </span>
  );
}

/* ============ Section header ============ */

export function SectionHeader({
  index,
  title,
  intro,
  dark = false,
}: {
  index: string;
  title: string;
  intro: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-3">
        <p className={`text-[12px] font-semibold uppercase tracking-[0.08em] ${dark ? "text-accent-warm" : "text-accent"}`}>
          {index}
        </p>
        <h2 className={`max-w-[640px] font-display text-[clamp(40px,4.5vw,64px)] leading-[1.02] ${dark ? "text-bone" : "text-ink"}`}>
          {title}
        </h2>
      </div>
      <p className={`max-w-[400px] text-[16px] ${dark ? "text-dark-muted" : "text-ink-soft"}`}>{intro}</p>
    </div>
  );
}

/* ============ Next Slot Card ============ */

export function NextSlotCard({ slot, who }: { slot: string; who: string }) {
  return (
    <div className="flex w-[300px] flex-col gap-[10px] rounded-md bg-paper p-[18px_22px] shadow-md shadow-ink/10">
      <div className="flex items-center gap-[6px]">
        <span aria-hidden className="h-2 w-2 rounded-full bg-live" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Próximo horario libre</span>
      </div>
      <p className="font-display text-[32px] leading-tight text-ink">{slot}</p>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-ink-soft">{who}</span>
        <ArrowRight size={18} strokeWidth={1.8} className="text-accent" />
      </div>
    </div>
  );
}

/* ============ Consult note ============ */

export function ConsultNote() {
  return (
    <div className="flex flex-col items-start justify-between gap-6 rounded-md bg-bone px-[28px] py-6 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <Info20Icon />
        <p className="max-w-[340px] text-[16px] text-ink">
          ¿No sabes qué elegir? Reserva una consulta gratuita de 15 minutos.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ArrowLink label="Reservar consulta" href="#reservas" accent />
      </div>
    </div>
  );
}

function Info20Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-accent" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

/* ============ Quote block + Rating ============ */

export function QuoteBlock({
  index,
  quote,
  name,
  detail,
}: {
  index: string;
  quote: string;
  name: string;
  detail: string;
}) {
  return (
    <div className="flex max-w-[420px] flex-col">
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent">{index}</p>
      <p aria-hidden className="mt-4 font-display text-[120px] leading-[0.6] text-accent">&ldquo;</p>
      <blockquote className="mt-2 font-display text-[clamp(28px,3vw,40px)] leading-[1.15] text-ink">{quote}</blockquote>
      <div className="mt-6 flex flex-col gap-[2px]">
        <p className="text-[15px] font-semibold text-ink">{name}</p>
        <p className="text-[14px] text-muted">{detail}</p>
      </div>
    </div>
  );
}

export function Rating({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-3">
      <span className="flex gap-1" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={20} className="fill-accent text-accent" />
        ))}
      </span>
      <span className="text-[14px] text-ink-soft">{text}</span>
    </span>
  );
}

/* ============ Service menu ============ */

export function ServiceRow({ name, desc, duration, price }: { name: string; desc: string; duration: string; price: string }) {
  return (
    <div className="flex items-center gap-6 border-b border-line py-[18px]">
      <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="text-[16px] text-ink">{name}</span>
        <span className="text-[14px] text-muted">{desc}</span>
      </span>
      <span className="shrink-0 text-[13px] text-muted">{duration}</span>
      <span className="w-[64px] shrink-0 text-right font-display text-[28px] leading-none text-ink">{price}</span>
    </div>
  );
}

export function ServiceCategory({ name, from, items }: { name: string; from: string; items: { name: string; desc: string; duration: string; price: string }[] }) {
  return (
    <div>
      <div className="flex items-end justify-between border-b border-ink pb-[12px]">
        <h3 className="font-display text-[34px] leading-tight text-ink">{name}</h3>
        <span className="text-[13px] text-muted">{from}</span>
      </div>
      <div className="mt-2">
        {items.map((item) => (
          <ServiceRow key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
}

/* ============ Team card ============ */

export function TeamCard({ member }: { member: { name: string; role: string; specialties: string; image: string } }) {
  return (
    <article className="flex flex-col gap-[14px]">
      <div className="relative h-[340px] overflow-hidden rounded-[4px]">
        <Image src={member.image} alt={`${member.name}, ${member.role.toLowerCase()} de Onetouch Salon`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 300px" className="object-cover" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-[30px] leading-tight text-ink">{member.name}</h3>
        <p className="text-[13px] font-semibold text-accent">{member.role}</p>
        <p className="text-[14px] text-muted">{member.specialties}</p>
      </div>
      <div className="border-b border-line pb-1">
        <Link href="#reservas" className="inline-flex items-center gap-2 text-[14px] font-semibold text-ink hover:text-accent">
          Reservar con {member.name.split(" ")[0]}
          <ArrowRight size={16} strokeWidth={1.8} />
        </Link>
      </div>
    </article>
  );
}

/* ============ Footer columns ============ */

export function FooterColumn({ heading, lines }: { heading: string; lines: ReactNode[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-dark-muted">{heading}</h4>
      {lines.map((line, i) => (
        <p key={i} className="text-[15px] text-bone">{line}</p>
      ))}
    </div>
  );
}

/* ============ Booking pieces ============ */

export function StepBadge({ num, label, state }: { num: number; label: string; state: "done" | "current" | "pending" }) {
  return (
    <span className="flex items-center gap-[10px]">
      <span
        className={`flex h-[26px] w-[26px] items-center justify-center rounded-full text-[12px] ${
          state === "current"
            ? "border border-accent bg-accent font-semibold text-white"
            : "border border-dark-line font-normal text-dark-muted"
        }`}
      >
        {state === "done" ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-accent-warm" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          num
        )}
      </span>
      <span className={`text-[14px] ${state === "current" ? "font-semibold" : ""} text-bone`}>{label}</span>
    </span>
  );
}

export function StylistRow({
  name,
  role,
  image,
  selected,
  onSelect,
}: {
  name: string;
  role: string;
  image?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-md px-[12px] py-[10px] text-left transition-colors ${
        selected ? "bg-[#B9502C26]" : "hover:bg-white/5"
      }`}
    >
      <span className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-full ${image ? "" : "bg-dark-line"}`}>
        {image ? <Image src={image} alt="" fill sizes="40px" className="object-cover" /> : null}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="text-[14px] font-semibold text-bone">{name}</span>
        <span className="text-[12px] text-dark-muted">{role}</span>
      </span>
      <span
        aria-hidden
        className={`h-[18px] w-[18px] shrink-0 rounded-full ${selected ? "border-[5px]" : "border"} ${selected ? "border-accent" : "border-dark-line"}`}
      />
    </button>
  );
}

export function DayCell({
  day,
  selected,
  onSelect,
}: {
  day: { n: number; tone: "past" | "default" | "shaded" | "today" | "selected" | "closed" };
  selected: boolean;
  onSelect?: () => void;
}) {
  const shade = day.tone === "shaded" ? "bg-white/[0.04]" : "";
  const outline = day.tone === "today" ? "border border-dark-muted" : "";
  const active = selected;
  const noSlot = day.tone === "past" || day.tone === "closed";
  return (
    <div className={`relative flex h-[58px] flex-col items-center justify-center gap-[5px] rounded-md ${shade} ${outline} ${active ? "bg-accent" : ""}`}>
      <span className={`text-[16px] ${active ? "font-semibold text-white" : noSlot ? "text-day-idle" : "text-bone"}`}>
        {day.n}
      </span>
      <span
        aria-hidden
        className={`h-[4px] w-[4px] rounded-[2px] bg-accent-warm ${noSlot ? "opacity-0" : ""} ${active ? "bg-white" : ""}`}
      />
      <button type="button" onClick={onSelect} disabled={noSlot} aria-label={`Día ${day.n}`} className="absolute inset-0 rounded-md" />
    </div>
  );
}

export function TimeChip({ slot, onSelect }: { slot: { time: string; state: "free" | "busy" | "selected" }; onSelect?: () => void }) {
  const busy = slot.state === "busy";
  const selected = slot.state === "selected";
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={busy}
      className={`flex h-[40px] w-full items-center justify-center rounded-md text-[14px] transition-colors ${
        selected
          ? "bg-accent font-semibold text-white"
          : busy
            ? "text-chip-busy"
            : "border border-dark-line text-bone hover:border-bone"
      }`}
    >
      {slot.time}
    </button>
  );
}
