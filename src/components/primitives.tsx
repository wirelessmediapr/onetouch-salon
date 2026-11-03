import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus, Star } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

/* Equivalente en código del frame "Onetouch v2 — Componentes" del lienzo (design.md §9). */

type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

/* ============ FB Logo ============ */

export function Logo({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <Link href="/" aria-label="Onetouch Salon — inicio" className="inline-flex items-center gap-2">
      <span aria-hidden className={`${compact ? "h-[10px] w-[10px]" : "h-[14px] w-[14px]"} rounded-full bg-flame`} />
      <span
        className={`font-display font-medium italic leading-none tracking-[-0.03em] ${compact ? "text-[24px]" : "text-[30px]"} ${dark ? "text-cream" : "text-ink"}`}
      >
        onetouch
      </span>
      {!compact && (
        <span className={`text-[11px] font-bold tracking-[0.18em] ${dark ? "text-palm-muted" : "text-muted"}`}>salón</span>
      )}
    </Link>
  );
}

/* ============ Botones ============ */

type ButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: IconType;
  size?: "sm" | "md" | "lg";
  full?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  form?: string;
};

const sizes = {
  sm: "px-5 py-3 text-[14px]",
  md: "px-[26px] py-4 text-[15px]",
  lg: "px-8 py-5 text-[16px]",
};

function ButtonBase({
  label,
  href,
  onClick,
  icon: Icon,
  size = "md",
  full,
  type = "button",
  disabled,
  form,
  className,
}: ButtonProps & { className: string }) {
  const cls = `inline-flex items-center justify-center gap-[10px] rounded-full font-bold transition-[opacity,background-color,color] ${sizes[size]} ${full ? "w-full" : ""} ${className}`;
  const content = (
    <>
      {label}
      {Icon && <Icon size={18} strokeWidth={2} />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} form={form} onClick={onClick} disabled={disabled} className={`${cls} disabled:cursor-not-allowed disabled:opacity-40`}>
      {content}
    </button>
  );
}

export function PrimaryButton({ icon = ArrowUpRight, ...props }: ButtonProps) {
  return <ButtonBase {...props} icon={icon} className="bg-flame text-white hover:bg-flame-deep" />;
}

export function OutlineButton({ dark = false, ...props }: ButtonProps & { dark?: boolean }) {
  return (
    <ButtonBase
      {...props}
      className={`border ${dark ? "border-palm-muted text-cream hover:bg-palm-2" : "border-ink text-ink hover:bg-ink hover:text-cream"}`}
    />
  );
}

export function LightButton(props: ButtonProps) {
  return <ButtonBase {...props} className="bg-cream text-palm hover:bg-sand" />;
}

/* ============ FB Arrow Link ============ */

export function ArrowLink({
  label,
  href,
  tone = "flame",
  icon: Icon = ArrowRight,
  external = false,
}: {
  label: string;
  href: string;
  tone?: "flame" | "gold";
  icon?: IconType;
  external?: boolean;
}) {
  const color = tone === "gold" ? "border-gold text-gold" : "border-flame text-flame";
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex items-center gap-2 border-b-[1.5px] pb-1 text-[14px] font-bold ${color}`}
    >
      {label}
      <Icon size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ============ FB Kicker ============ */

export function Kicker({ children, tone = "flame" }: { children: ReactNode; tone?: "flame" | "gold" | "deep" }) {
  const color = { flame: "text-flame bg-flame", gold: "text-gold bg-gold", deep: "text-flame-deep bg-flame-deep" }[tone];
  const [text, dot] = color.split(" ");
  return (
    <span className={`inline-flex items-center gap-[10px] text-[11px] font-bold uppercase tracking-[0.12em] md:text-[12px] ${text}`}>
      <span aria-hidden className={`h-[6px] w-[6px] rounded-full ${dot}`} />
      {children}
    </span>
  );
}

/* ============ Section title (2 líneas, 2ª en itálica) ============ */

export function SectionTitle({
  line1,
  line2,
  dark = false,
  accent = "flame",
  as: Tag = "h2",
  size = "section",
}: {
  line1: string;
  line2: string;
  dark?: boolean;
  accent?: "flame" | "gold" | "deep";
  as?: "h1" | "h2";
  size?: "section" | "step" | "cta";
}) {
  const accentCls = { flame: "text-flame", gold: "text-gold", deep: "text-flame-deep" }[accent];
  const sizeCls = {
    section: "text-[clamp(38px,5.6vw,72px)] tracking-[-0.035em]",
    step: "text-[clamp(36px,4vw,56px)] tracking-[-0.035em]",
    cta: "text-[clamp(44px,6.4vw,88px)] font-light tracking-[-0.035em]",
  }[size];
  return (
    <Tag className={`font-display leading-[1.02] ${sizeCls} ${dark ? "text-cream" : "text-ink"}`}>
      {line1}
      <br />
      <em className={`italic ${accentCls}`}>{line2}</em>
    </Tag>
  );
}

/* ============ FB Chip ============ */

export function Chip({
  label,
  count,
  active = false,
  onClick,
}: {
  label: string;
  count?: number | string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-[18px] py-[10px] text-[14px] font-semibold transition-colors ${
        active ? "border-palm bg-palm text-cream" : "border-line bg-cream text-ink-soft hover:border-ink"
      }`}
    >
      {label}
      {count !== undefined && <span className={`text-[12px] font-bold ${active ? "text-palm-muted" : "text-muted"}`}>{count}</span>}
    </button>
  );
}

/* ============ FB Live Badge / Tag ============ */

export function LiveBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-[14px] py-[7px] text-[12px] font-semibold md:text-[13px]">
      <span aria-hidden className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
      </span>
      {label}
    </span>
  );
}

export function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-flame-soft px-[10px] py-[5px] text-[11px] font-bold tracking-[0.03em] text-flame-deep">{label}</span>
  );
}

/* ============ FB Service Item ============ */

export function ServiceItem({
  name,
  desc,
  duration,
  price,
  tag,
  selected = false,
  onToggle,
  compact = false,
}: {
  name: string;
  desc: string;
  duration: string;
  price: string;
  tag?: string;
  selected?: boolean;
  onToggle?: () => void;
  compact?: boolean;
}) {
  const label = selected ? `Quitar ${name}` : `Agregar ${name}`;
  return (
    <div className={`flex items-center gap-4 border-b border-line md:gap-5 ${compact ? "py-[18px]" : "py-[22px]"}`}>
      <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
        <div className="flex flex-wrap items-center gap-x-[10px] gap-y-1">
          <p className={`font-display tracking-[-0.02em] ${compact ? "text-[20px]" : "text-[20px] md:text-[24px]"}`}>{name}</p>
          {tag && <Tag label={tag} />}
        </div>
        <p className="text-[13px] text-muted md:text-[14px]">
          {desc} · {duration}
        </p>
      </div>
      <p className="font-display text-[24px] md:text-[28px]">{price}</p>
      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          aria-label={label}
          aria-pressed={selected}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
            selected ? "border-flame bg-flame text-white" : "border-ink text-ink hover:bg-ink hover:text-cream"
          }`}
        >
          {selected ? <Check size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
        </button>
      ) : (
        <Link
          href="/reservar"
          aria-label={`Reservar ${name}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-cream"
        >
          <Plus size={18} strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}

/* ============ FB Stat ============ */

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display text-[40px] leading-none tracking-[-0.03em] md:text-[64px]">{value}</span>
      <span className="text-[13px] text-ink-soft md:text-[14px]">{label}</span>
    </div>
  );
}

/* ============ FB Stylist Card ============ */

export function StylistCard({
  member,
  showSpecialties = true,
}: {
  member: { name: string; role: string; specialties: string; image: string };
  showSpecialties?: boolean;
}) {
  const first = member.name.split(" ")[0];
  return (
    <article className="flex flex-col gap-[18px]">
      <div className="arch relative aspect-[300/390] w-full overflow-hidden bg-sand">
        <Image src={member.image} alt={`${member.name}, ${member.role}`} fill sizes="(min-width: 1024px) 300px, 240px" className="object-cover" />
      </div>
      <div className="flex flex-col gap-[6px]">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-flame">{member.role}</p>
        <h3 className="font-display text-[26px] tracking-[-0.02em] md:text-[32px]">{member.name}</h3>
        {showSpecialties && <p className="text-[14px] text-muted">{member.specialties}</p>}
      </div>
      <div>
        <ArrowLink label={`Reservar con ${first}`} href="/reservar" />
      </div>
    </article>
  );
}

/* ============ FB Testimonial ============ */

export function Testimonial({ quote, name, detail, image }: { quote: string; name: string; detail: string; image: string }) {
  return (
    <figure className="card-tail flex flex-col gap-6 bg-cream p-6 md:p-9">
      <div className="flex gap-1 text-flame" aria-label="5 de 5 estrellas">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={18} strokeWidth={1.8} fill="currentColor" />
        ))}
      </div>
      <blockquote className="font-display text-[21px] leading-[1.25] tracking-[-0.01em] md:text-[22px]">{quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        <Image src={image} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
        <span className="flex flex-col gap-[2px]">
          <span className="text-[14px] font-bold">{name}</span>
          <span className="text-[13px] text-ink-soft">{detail}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/* ============ FB Step ============ */

export function Step({ num, label, state }: { num: number; label: string; state: "done" | "current" | "pending" }) {
  const badge = {
    done: "border-flame-soft bg-flame-soft text-flame-deep",
    current: "border-palm bg-palm text-cream",
    pending: "border-line text-muted",
  }[state];
  const text = { done: "text-ink-soft", current: "text-ink", pending: "text-muted" }[state];
  return (
    <span className="inline-flex items-center gap-[10px]" aria-current={state === "current" ? "step" : undefined}>
      <span className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border text-[13px] font-bold ${badge}`}>
        {state === "done" ? <Check size={14} strokeWidth={2.4} /> : num}
      </span>
      <span className={`text-[14px] font-semibold ${text} max-sm:sr-only`}>{label}</span>
    </span>
  );
}

/* ============ FB Day ============ */

export function DayCell({
  n,
  state,
  onSelect,
  size = 52,
}: {
  n: number;
  state: "free" | "today" | "selected" | "soldout" | "closed";
  onSelect?: () => void;
  size?: number;
}) {
  const disabled = state === "soldout" || state === "closed";
  const cls = {
    free: "text-ink hover:bg-sand",
    today: "border border-ink text-ink hover:bg-sand",
    selected: "bg-flame text-white font-bold",
    soldout: "text-disabled line-through",
    closed: "text-disabled",
  }[state];
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      aria-pressed={state === "selected"}
      aria-label={`${n}${disabled ? " (sin horarios)" : ""}`}
      style={{ width: size, height: size }}
      className={`flex flex-col items-center justify-center gap-[3px] rounded-full text-[14px] font-semibold transition-colors md:text-[15px] ${cls} disabled:cursor-not-allowed`}
    >
      {n}
      <span aria-hidden className={`h-1 w-1 rounded-full ${disabled ? "opacity-0" : state === "selected" ? "bg-white" : "bg-leaf"}`} />
    </button>
  );
}

/* ============ FB Time Slot ============ */

export function TimeSlot({ time, busy, selected, onSelect }: { time: string; busy?: boolean; selected?: boolean; onSelect?: () => void }) {
  const cls = busy
    ? "border-sand bg-sand text-muted line-through"
    : selected
      ? "border-palm bg-palm text-cream"
      : "border-line bg-white text-ink hover:border-ink";
  return (
    <button
      type="button"
      disabled={busy}
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full rounded-xl border py-3 text-[14px] font-semibold transition-colors disabled:cursor-not-allowed ${cls}`}
    >
      {time}
    </button>
  );
}

/* ============ FB Stylist Option ============ */

export function StylistOption({
  name,
  sub,
  image,
  selected,
  onSelect,
}: {
  name: string;
  sub: string;
  image?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex w-full items-center gap-[14px] rounded-full py-3 pl-3 pr-4 text-left transition-colors ${
        selected ? "border-[1.5px] border-flame bg-flame-soft" : "border border-line bg-white hover:border-ink"
      }`}
    >
      {image ? (
        <Image src={image} alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full object-cover" />
      ) : (
        <span aria-hidden className="h-11 w-11 shrink-0 rounded-full bg-sand" />
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="text-[15px] font-bold">{name}</span>
        <span className="truncate text-[12px] text-muted">{sub}</span>
      </span>
      <span aria-hidden className={`h-5 w-5 shrink-0 rounded-full ${selected ? "border-[6px] border-flame bg-white" : "border-[1.5px] border-line"}`} />
    </button>
  );
}

/* ============ FB Input ============ */

export function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  multiline,
  autoComplete,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const cls =
    "w-full rounded-[14px] border border-line bg-white px-[18px] py-[15px] text-[15px] text-ink placeholder:text-muted outline-none transition-colors focus:border-ink focus:ring-1 focus:ring-ink";
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-[13px] font-bold text-ink-soft">{label}</span>
      {multiline ? (
        <textarea name={name} rows={3} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={`${cls} resize-none`} />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  );
}

/* ============ FB Footer Column ============ */

export function FooterColumn({ heading, lines }: { heading: string; lines: ReactNode[] }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold">{heading}</p>
      {lines.map((line, i) => (
        <div key={i} className="text-[15px] text-cream">
          {line}
        </div>
      ))}
    </div>
  );
}
