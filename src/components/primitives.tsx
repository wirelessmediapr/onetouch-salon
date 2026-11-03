import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Diamond, Plus } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

/* Equivalente en código de la propuesta v3 “Noir & Oro” del lienzo (design.md §10). */

type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
type Tone = "dark" | "light";

/* ============ Wordmark ============ */

export function Logo({ tone = "dark", compact = false, size = "md" }: { tone?: Tone; compact?: boolean; size?: "md" | "xl" }) {
  const main = tone === "dark" ? "text-gold" : "text-ink";
  const sub = tone === "dark" ? "text-gold-light" : "text-gold-deep";
  const by = tone === "dark" ? "text-gold" : "text-gold-deep";
  const grace = tone === "dark" ? "text-ivory" : "text-ink";
  /* Lockup “firma editorial”: wordmark · línea vertical · “by” caps + “Grace” Playfair itálica. */
  const s =
    size === "xl"
      ? {
          gap: "gap-5 md:gap-[34px]",
          main: "text-[clamp(28px,5.6vw,54px)] tracking-[0.1em]",
          sub: "text-[11px] md:text-[16px] tracking-[0.55em]",
          rule: "h-14 md:h-[76px]",
          by: "text-[10px] md:text-[17px]",
          grace: "text-[clamp(32px,5.4vw,57px)]",
        }
      : compact
        ? { gap: "gap-3", main: "text-[18px] tracking-[0.1em]", sub: "text-[8px] tracking-[0.5em]", rule: "h-7", by: "text-[7px]", grace: "text-[20px]" }
        : { gap: "gap-[18px]", main: "text-[26px] tracking-[0.1em]", sub: "text-[10px] tracking-[0.55em]", rule: "h-10", by: "text-[9px]", grace: "text-[30px]" };
  const content = (
    <>
      <span className="flex flex-col items-center gap-[2px] md:gap-1">
        <span className={`whitespace-nowrap font-caps leading-none ${s.main} ${main}`}>ONE TOUCH</span>
        <span className={`font-caps leading-none ${s.sub} ${sub}`}>SALON</span>
      </span>
      <span aria-hidden className={`w-px bg-gold-deep ${s.rule}`} />
      <span className="flex flex-col text-left leading-none">
        <span className={`font-caps tracking-[0.25em] ${s.by} ${by}`}>by</span>
        <span className={`font-display italic leading-none ${s.grace} ${grace}`}>Grace</span>
      </span>
    </>
  );
  if (size === "xl") return <span className={`inline-flex items-center ${s.gap}`}>{content}</span>;
  return (
    <Link href="/" aria-label="OneTouch Salon by Grace — inicio" className={`inline-flex items-center ${s.gap}`}>
      {content}
    </Link>
  );
}

/* ============ Botones (radio 2, mayúsculas Cinzel) ============ */

type ButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: IconType | null;
  size?: "sm" | "md" | "lg";
  full?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  form?: string;
};

const sizes = {
  sm: "px-5 py-3 text-[12px]",
  md: "px-[26px] py-4 text-[13px]",
  lg: "px-8 py-[18px] text-[14px]",
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
  const cls = `inline-flex items-center justify-center gap-3 rounded-[2px] font-caps font-bold tracking-[0.12em] uppercase transition-colors ${sizes[size]} ${full ? "w-full" : ""} ${className}`;
  const content = (
    <>
      {label}
      {Icon && <Icon size={16} strokeWidth={2} />}
    </>
  );
  if (href) {
    const external = href.startsWith("tel:") || href.startsWith("mailto:");
    return external ? (
      <a href={href} className={cls}>
        {content}
      </a>
    ) : (
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

export function PrimaryButton({ icon = ArrowRight, ...props }: ButtonProps) {
  return <ButtonBase {...props} icon={icon} className="bg-gold text-noir hover:bg-gold-light" />;
}

export function OutlineButton({ tone = "dark", icon = null, ...props }: ButtonProps & { tone?: Tone }) {
  return (
    <ButtonBase
      {...props}
      icon={icon}
      className={`border ${tone === "dark" ? "border-gold text-gold hover:bg-gold hover:text-noir" : "border-ink text-ink hover:bg-ink hover:text-ivory"}`}
    />
  );
}

export function LightButton({ icon = null, ...props }: ButtonProps) {
  return <ButtonBase {...props} icon={icon} className="bg-ivory text-ink hover:bg-cream" />;
}

/* ============ Kicker: regla + mayúsculas ============ */

export function Kicker({ children, tone = "dark", center = false }: { children: ReactNode; tone?: Tone; center?: boolean }) {
  const color = tone === "dark" ? "text-gold" : "text-gold-deep";
  const rule = tone === "dark" ? "bg-gold" : "bg-gold-deep";
  return (
    <span className={`inline-flex items-center gap-3 font-caps text-[11px] tracking-[0.25em] md:text-[12px] ${color}`}>
      <span aria-hidden className={`h-px w-8 md:w-10 ${rule}`} />
      {children}
      {center && <span aria-hidden className={`h-px w-8 md:w-10 ${rule}`} />}
    </span>
  );
}

/* ============ Ornament title: regla · rombo · texto · rombo · regla ============ */

export function OrnamentTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-3 md:gap-[14px]">
        <span aria-hidden className="h-px w-8 bg-gold-deep md:w-[120px]" />
        <Diamond aria-hidden size={10} className="shrink-0 text-gold" />
        <h2 className="font-caps text-[13px] tracking-[0.2em] text-gold md:text-[15px]">{children}</h2>
        <Diamond aria-hidden size={10} className="shrink-0 text-gold" />
        <span aria-hidden className="h-px w-8 bg-gold-deep md:w-[120px]" />
      </div>
      {sub && <p className="font-caps text-[10px] tracking-[0.15em] text-on-dark-muted md:text-[12px]">{sub}</p>}
    </div>
  );
}

/* ============ Section title: Playfair, 2ª línea itálica ============ */

export function SectionTitle({
  line1,
  line2,
  tone = "dark",
  as: Tag = "h2",
  center = false,
}: {
  line1: string;
  line2?: string;
  tone?: Tone;
  as?: "h1" | "h2";
  center?: boolean;
}) {
  return (
    <Tag
      className={`font-display text-[clamp(38px,4.6vw,64px)] leading-[1.05] tracking-[-0.01em] ${tone === "dark" ? "text-on-dark" : "text-ink"} ${center ? "text-center" : ""}`}
    >
      {line1}
      {line2 && (
        <>
          <br />
          <em className={`italic ${tone === "dark" ? "text-gold" : "text-gold-deep"}`}>{line2}</em>
        </>
      )}
    </Tag>
  );
}

/* ============ Arch photo con contorno dorado ============ */

export function ArchPhoto({
  src,
  alt,
  sizes,
  priority,
  inset = 24,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  inset?: number;
  className?: string;
}) {
  return (
    <div className={`arch relative border border-gold-deep ${className}`} style={{ padding: inset, paddingBottom: 0 }}>
      <div className="arch relative h-full w-full overflow-hidden bg-noir-card">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}

/* ============ Chip (filtro de categoría) ============ */

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
      className={`inline-flex shrink-0 items-center gap-2 rounded-[2px] border px-[18px] py-[10px] font-caps text-[12px] tracking-[0.12em] uppercase transition-colors ${
        active ? "border-noir bg-noir text-gold" : "border-taupe bg-ivory text-ink-soft hover:border-ink"
      }`}
    >
      {label}
      {count !== undefined && <span className={`font-sans text-[12px] font-bold ${active ? "text-gold-light" : "text-muted"}`}>{count}</span>}
    </button>
  );
}

export function Tag({ label }: { label: string }) {
  return <span className="rounded-[2px] bg-noir px-[10px] py-[5px] font-caps text-[10px] tracking-[0.12em] text-gold uppercase">{label}</span>;
}

/* ============ Service Item (fila de menú, fondo claro) ============ */

export function ServiceItem({
  name,
  desc,
  duration,
  price,
  tag,
  selected = false,
  onToggle,
}: {
  name: string;
  desc: string;
  duration: string;
  price: string;
  tag?: string;
  selected?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-taupe py-5 md:gap-5">
      <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
        <div className="flex flex-wrap items-center gap-x-[10px] gap-y-1">
          <p className="font-display text-[20px] md:text-[24px]">{name}</p>
          {tag && <Tag label={tag} />}
        </div>
        <p className="text-[13px] text-muted md:text-[14px]">
          {desc} · {duration}
        </p>
      </div>
      <p className="font-display text-[24px] text-gold-deep md:text-[28px]">{price}</p>
      <button
        type="button"
        onClick={onToggle}
        aria-label={selected ? `Quitar ${name}` : `Agregar ${name}`}
        aria-pressed={selected}
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${
          selected ? "border-noir bg-noir text-gold" : "border-gold-deep text-gold-deep hover:bg-noir hover:text-gold"
        }`}
      >
        {selected ? <Check size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
      </button>
    </div>
  );
}

/* ============ Fila de servicio destacada (fondo oscuro) ============ */

export function FeatureRow({ name, duration, price }: { name: string; duration: string; price: string }) {
  return (
    <Link href="/reservar" className="group flex items-center gap-4 border-b border-noir-line py-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-deep text-gold transition-colors group-hover:bg-gold group-hover:text-noir">
        <Plus size={14} strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 font-caps text-[13px] tracking-[0.1em] text-on-dark uppercase md:text-[14px]">{name}</span>
      <span className="text-[13px] text-on-dark-muted max-sm:hidden">{duration}</span>
      <span className="font-display text-[22px] text-gold">{price}</span>
    </Link>
  );
}

/* ============ Step (indicador del flujo de reserva) ============ */

export function Step({ num, label, state }: { num: number; label: string; state: "done" | "current" | "pending" }) {
  const badge = {
    done: "border-gold-deep bg-cream text-gold-deep",
    current: "border-noir bg-noir text-gold",
    pending: "border-taupe text-muted",
  }[state];
  const text = { done: "text-ink-soft", current: "text-ink", pending: "text-muted" }[state];
  return (
    <span className="inline-flex items-center gap-[10px]" aria-current={state === "current" ? "step" : undefined}>
      <span className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border font-caps text-[13px] ${badge}`}>
        {state === "done" ? <Check size={14} strokeWidth={2.4} /> : num}
      </span>
      <span className={`text-[14px] font-semibold ${text} max-sm:sr-only`}>{label}</span>
    </span>
  );
}

/* ============ Day ============ */

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
    free: "text-ink hover:bg-cream",
    today: "border border-ink text-ink hover:bg-cream",
    selected: "bg-noir text-gold font-bold",
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
      <span aria-hidden className={`h-1 w-1 rounded-full ${disabled ? "opacity-0" : state === "selected" ? "bg-gold" : "bg-gold-deep"}`} />
    </button>
  );
}

/* ============ Time Slot ============ */

export function TimeSlot({ time, busy, selected, onSelect }: { time: string; busy?: boolean; selected?: boolean; onSelect?: () => void }) {
  const cls = busy
    ? "border-cream bg-cream text-muted line-through"
    : selected
      ? "border-noir bg-noir text-gold"
      : "border-taupe bg-ivory text-ink hover:border-ink";
  return (
    <button
      type="button"
      disabled={busy}
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full rounded-[2px] border py-3 text-[14px] font-semibold transition-colors disabled:cursor-not-allowed ${cls}`}
    >
      {time}
    </button>
  );
}

/* ============ Stylist Option ============ */

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
      className={`flex w-full items-center gap-[14px] rounded-[2px] py-3 pl-3 pr-4 text-left transition-colors ${
        selected ? "border-[1.5px] border-gold-deep bg-cream" : "border border-taupe bg-ivory hover:border-ink"
      }`}
    >
      {image ? (
        <Image src={image} alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full object-cover" />
      ) : (
        <span aria-hidden className="h-11 w-11 shrink-0 rounded-full bg-taupe" />
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="text-[15px] font-bold">{name}</span>
        <span className="truncate text-[12px] text-muted">{sub}</span>
      </span>
      <span aria-hidden className={`h-5 w-5 shrink-0 rounded-full ${selected ? "border-[6px] border-noir bg-gold" : "border-[1.5px] border-taupe"}`} />
    </button>
  );
}

/* ============ Input ============ */

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
    "w-full rounded-[2px] border border-taupe bg-ivory px-[18px] py-[15px] text-[16px] text-ink placeholder:text-muted outline-none transition-colors focus:border-ink focus:ring-1 focus:ring-ink";
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="font-caps text-[11px] tracking-[0.15em] text-ink-soft uppercase">{label}</span>
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

/* ============ Footer Column ============ */

export function FooterColumn({ heading, lines }: { heading: string; lines: ReactNode[] }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-caps text-[12px] tracking-[0.25em] text-gold uppercase">{heading}</p>
      {lines.map((line, i) => (
        <div key={i} className="text-[15px] text-on-dark-muted">
          {line}
        </div>
      ))}
    </div>
  );
}
