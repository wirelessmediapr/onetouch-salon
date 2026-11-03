"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarPlus,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Scissors,
  ShieldCheck,
  Timer,
  User,
  X,
} from "lucide-react";
import {
  Chip,
  DayCell,
  Field,
  LightButton,
  Logo,
  OutlineButton,
  PrimaryButton,
  ServiceItem,
  Step,
  StylistOption,
  TimeSlot,
} from "@/components/primitives";
import { allServices, contact, minutesOf, priceOf, serviceCategories, slotGroups, soldOutDays, stylists } from "@/lib/data";

/**
 * Reservas en línea: demo de interfaz hasta conectar Supabase (docs/backend-plan.md).
 * Mientras BOOKING_LIVE sea false, el paso 3 NO confirma nada: muestra el aviso y el teléfono.
 * La pantalla de confirmación se puede previsualizar con `/reservar?demo=1`.
 */
const BOOKING_LIVE = false;

const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const WEEKDAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const WD_SHORT = ["L", "M", "M", "J", "V", "S", "D"];

const fmtDuration = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h} h${m ? ` ${m} min` : ""}` : `${m} min`;
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type View = 1 | 2 | 3 | "done";

const noopSubscribe = () => () => {};

export function BookingFlow() {
  const [view, setView] = useState<View>(1);
  const [category, setCategory] = useState(serviceCategories[0].name);
  const [selected, setSelected] = useState<string[]>([]);
  const [stylist, setStylist] = useState(stylists[0].name);
  const [pickedMonth, setMonth] = useState<{ y: number; m: number } | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [sms, setSms] = useState(true);

  // Fecha y query solo en el cliente (evita desajuste de hidratación con la build estática).
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const today = useMemo(() => (mounted ? new Date() : null), [mounted]);
  const demo = useMemo(() => mounted && new URLSearchParams(window.location.search).has("demo"), [mounted]);
  const month = pickedMonth ?? (today ? { y: today.getFullYear(), m: today.getMonth() } : null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  const chosen = useMemo(() => allServices.filter((s) => selected.includes(s.name)), [selected]);
  const totalMin = chosen.reduce((n, s) => n + minutesOf(s.duration), 0);
  const totalPrice = chosen.reduce((n, s) => n + priceOf(s.price), 0);
  const stylistObj = stylists.find((s) => s.name === stylist)!;

  const toggle = (name: string) => setSelected((cur) => (cur.includes(name) ? cur.filter((n) => n !== name) : [...cur, name]));

  const dateLabel =
    month && day ? `${WEEKDAYS[new Date(month.y, month.m, day).getDay()]} ${day} de ${MONTHS[month.m]}` : null;

  const canNext = view === 1 ? chosen.length > 0 : view === 2 ? Boolean(day && time) : form.name.trim() && form.phone.trim();
  const live = BOOKING_LIVE || demo;

  const next = () => {
    if (view === 1) setView(2);
    else if (view === 2) setView(3);
    else if (view === 3 && live) setView("done");
  };

  if (view === "done") {
    return (
      <Confirmation
        name={form.name.split(" ")[0] || "linda"}
        dateLabel={dateLabel ?? ""}
        time={time ?? ""}
        totalMin={totalMin}
        stylist={stylistObj}
        services={chosen.map((s) => s.name)}
        totalPrice={totalPrice}
        phone={form.phone}
      />
    );
  }

  const stepState = (n: number) => (view === n ? "current" : (view as number) > n ? "done" : "pending");

  return (
    <div className="flex min-h-full flex-col bg-cream">
      <header className="sticky top-0 z-20 border-b border-line bg-cream/95 px-5 py-4 backdrop-blur-none md:px-12 md:py-5">
        <div className="flex items-center justify-between gap-4">
          <span className="md:hidden">
            <Logo compact />
          </span>
          <span className="max-md:hidden">
            <Logo />
          </span>
          <nav aria-label="Pasos" className="flex items-center gap-3 md:gap-4">
            <Step num={1} label="Servicios" state={stepState(1)} />
            <span aria-hidden className="h-px w-4 bg-line md:w-8" />
            <Step num={2} label="Estilista y hora" state={stepState(2)} />
            <span aria-hidden className="h-px w-4 bg-line md:w-8" />
            <Step num={3} label="Tus datos" state={stepState(3)} />
          </nav>
          <Link href="/" className="flex items-center gap-2 text-[14px] font-semibold text-ink-soft hover:text-ink" aria-label="Volver al sitio">
            <span className="max-md:hidden">Volver al sitio</span>
            <X size={18} />
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-10 px-5 pb-40 pt-8 md:px-20 md:pt-12 lg:flex-row lg:gap-16 lg:pb-20">
        <main className="flex min-w-0 flex-1 flex-col gap-7">
          {view === 1 && (
            <>
              <StepHead n={1} title="¿Qué te hacemos hoy?" sub="Puedes escoger más de un servicio. Calculamos la duración total por ti." />
              <div className="-mx-5 flex gap-[10px] overflow-x-auto px-5 md:mx-0 md:px-0" role="group" aria-label="Categorías">
                {serviceCategories.map((c) => {
                  const n = c.items.filter((i) => selected.includes(i.name)).length;
                  return <Chip key={c.name} label={c.name} count={n ? `${n} ✓` : c.items.length} active={category === c.name} onClick={() => setCategory(c.name)} />;
                })}
              </div>
              <div className="border-t border-line">
                {serviceCategories
                  .find((c) => c.name === category)!
                  .items.map((item) => (
                    <ServiceItem key={item.name} {...item} selected={selected.includes(item.name)} onToggle={() => toggle(item.name)} />
                  ))}
              </div>
            </>
          )}

          {view === 2 && (
            <>
              <StepHead n={2} title="¿Con quién y cuándo?" />
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-[10px]">
                  <Label>Estilista</Label>
                  <div className="grid gap-[10px] sm:grid-cols-2" role="radiogroup" aria-label="Estilista">
                  {stylists.map((s) => (
                    <StylistOption
                      key={s.name}
                      name={s.name}
                      sub={s.image ? `${s.role} · ${s.next}` : s.next}
                      image={s.image}
                      selected={stylist === s.name}
                      onSelect={() => setStylist(s.name)}
                    />
                  ))}
                  </div>
                </div>
                <div className="flex flex-col gap-8 md:flex-row md:gap-10">
                  <MonthCalendar
                    today={today}
                    month={month}
                    setMonth={(m) => {
                      setMonth(m);
                      setDay(null);
                      setTime(null);
                    }}
                    day={day}
                    setDay={(d) => {
                      setDay(d);
                      setTime(null);
                    }}
                  />
                  <div className="flex flex-col gap-[10px] md:w-[180px] md:shrink-0">
                    <Label>{dateLabel ? dateLabel.split(" de ")[0] : "Escoge un día"}</Label>
                    {day ? (
                      slotGroups.map((g) => (
                        <div key={g.label} className="flex flex-col gap-[10px]">
                          <p className="text-[13px] font-semibold text-ink-soft">{g.label}</p>
                          <div className="grid grid-cols-3 gap-[10px] md:grid-cols-1">
                            {g.slots.map((s) => (
                              <TimeSlot key={s.time} {...s} selected={time === s.time} onSelect={() => setTime(s.time)} />
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[14px] text-muted">Los horarios libres aparecen aquí.</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {view === 3 && (
            <>
              <StepHead n={3} title="Casi lista. ¿A quién esperamos?" sub="Solo lo necesario para confirmarte y recordarte tu cita." />
              <form
                className="flex max-w-[620px] flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  next();
                }}
                id="datos"
              >
                <Field label="Nombre completo" name="name" placeholder="Ej. Natalia Rivera" required autoComplete="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <div className="flex flex-col gap-5 sm:flex-row sm:gap-4">
                  <Field label="Celular" name="phone" type="tel" placeholder="(787) 555-0142" required autoComplete="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  <Field label="Email (opcional)" name="email" type="email" placeholder="tu@correo.com" autoComplete="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                </div>
                <Field
                  label="¿Algo que debamos saber? (opcional)"
                  name="notes"
                  multiline
                  placeholder="Ej. Quiero mantener el largo, tengo el cabello teñido…"
                  value={form.notes}
                  onChange={(v) => setForm({ ...form, notes: v })}
                />
                <button
                  type="button"
                  role="switch"
                  aria-checked={sms}
                  onClick={() => setSms(!sms)}
                  className="flex items-center gap-[14px] rounded-[14px] bg-sand px-[18px] py-4 text-left text-[14px] font-semibold"
                >
                  <span className={`flex h-[22px] w-10 shrink-0 items-center rounded-full p-[2px] transition-colors ${sms ? "justify-end bg-palm" : "justify-start bg-line"}`}>
                    <span className="h-[18px] w-[18px] rounded-full bg-white" />
                  </span>
                  Recordarme por SMS 24 horas antes
                </button>
                <p className="flex items-center gap-[10px] text-[13px] text-ink-soft">
                  <ShieldCheck size={16} className="shrink-0 text-leaf" />
                  Cancela o cambia gratis hasta 2 horas antes, con el enlace de tu confirmación.
                </p>
                {!live && (
                  <div className="card-tail flex flex-col gap-2 bg-flame-soft p-5" role="status">
                    <p className="text-[15px] font-bold text-flame-deep">La reserva en línea abre muy pronto.</p>
                    <p className="text-[14px] leading-[1.55] text-ink-soft">
                      Por ahora confirma esta cita llamando al{" "}
                      <a href={contact.phoneHref} className="font-bold text-ink underline">
                        {contact.phone}
                      </a>
                      . Tu selección te sirve de guía para la llamada.
                    </p>
                  </div>
                )}
              </form>
            </>
          )}

          {view !== 1 && (
            <div>
              <button type="button" onClick={() => setView((view as number) - 1 as View)} className="inline-flex items-center gap-2 text-[14px] font-bold text-ink-soft hover:text-ink">
                <ArrowLeft size={16} />
                Atrás
              </button>
            </div>
          )}
        </main>

        <aside className="lg:w-[340px] lg:shrink-0">
          <div className="card-tail flex flex-col gap-5 bg-sand p-7 max-lg:fixed max-lg:inset-x-0 max-lg:bottom-0 max-lg:z-30 max-lg:rounded-b-none max-lg:rounded-t-[24px] max-lg:border-t max-lg:border-line max-lg:p-5 lg:sticky lg:top-28">
            <p className="text-[12px] font-bold tracking-[0.12em] text-muted max-lg:hidden">TU CITA</p>
            <div className="flex flex-col gap-[14px] max-lg:hidden">
              {chosen.length === 0 && <p className="text-[14px] text-muted">Aún no has escogido servicios.</p>}
              {chosen.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-[15px] font-bold">{s.name}</span>
                    <span className="text-[13px] text-muted">{s.duration}</span>
                  </div>
                  <span className="font-display text-[22px]">{s.price}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-[10px] border-y border-line py-4 max-lg:hidden">
              <MetaRow icon={User} label={view >= 2 || view === 3 ? stylist : "Estilista · por escoger"} strong={view !== 1} />
              <MetaRow icon={Calendar} label={dateLabel && time ? `${dateLabel} · ${time}` : "Fecha y hora · por escoger"} strong={Boolean(dateLabel && time)} />
              <MetaRow icon={Timer} label={`Duración total · ${totalMin ? fmtDuration(totalMin) : "—"}`} />
            </div>
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold">Total estimado</span>
                <span className="text-[12px] text-muted lg:hidden">
                  {chosen.length} {chosen.length === 1 ? "servicio" : "servicios"} · {totalMin ? fmtDuration(totalMin) : "—"}
                </span>
              </div>
              <span className="font-display text-[32px] leading-none tracking-[-0.02em] lg:text-[40px]">${totalPrice}</span>
            </div>
            {view === 3 && !live ? (
              <PrimaryButton label={`Llamar al ${contact.phone}`} href={contact.phoneHref} full icon={ArrowRight} />
            ) : (
              <PrimaryButton
                label={view === 1 ? "Escoger estilista y hora" : view === 2 ? "Continuar a tus datos" : "Confirmar cita"}
                icon={view === 3 ? Check : ArrowRight}
                full
                disabled={!canNext}
                onClick={view === 3 ? undefined : next}
                type={view === 3 ? "submit" : "button"}
                form={view === 3 ? "datos" : undefined}
              />
            )}
            <p className="text-[12px] text-muted max-lg:hidden">Sin depósito. Pagas en el salón.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepHead({ n, title, sub }: { n: number; title: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="text-[12px] font-bold tracking-[0.12em] text-flame">PASO {n} DE 3</p>
      <h1 className="font-display text-[clamp(34px,4vw,56px)] leading-[1.05] tracking-[-0.035em]">{title}</h1>
      {sub && <p className="text-[15px] text-ink-soft md:text-[16px]">{sub}</p>}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">{children}</p>;
}

function MetaRow({ icon: Icon, label, strong }: { icon: typeof User; label: string; strong?: boolean }) {
  return (
    <p className={`flex items-center gap-[10px] text-[14px] ${strong ? "font-semibold text-ink" : "text-ink-soft"}`}>
      <Icon size={16} className="shrink-0 text-ink-soft" />
      {label}
    </p>
  );
}

function MonthCalendar({
  today,
  month,
  setMonth,
  day,
  setDay,
}: {
  today: Date | null;
  month: { y: number; m: number } | null;
  setMonth: (m: { y: number; m: number }) => void;
  day: number | null;
  setDay: (d: number) => void;
}) {
  if (!today || !month) return <div className="h-[360px] flex-1" aria-busy />;
  const first = new Date(month.y, month.m, 1);
  const lead = (first.getDay() + 6) % 7; // semana empieza en lunes
  const daysIn = new Date(month.y, month.m + 1, 0).getDate();
  const isCurrent = month.y === today.getFullYear() && month.m === today.getMonth();
  const limit = new Date(today);
  limit.setDate(limit.getDate() + 60);
  const shift = (d: number) => {
    const t = new Date(month.y, month.m + d, 1);
    setMonth({ y: t.getFullYear(), m: t.getMonth() });
  };
  const cells: (number | null)[] = [...Array(lead).fill(null), ...Array.from({ length: daysIn }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);

  return (
    <div className="flex flex-col gap-[14px] md:max-w-[420px] md:flex-1">
      <div className="flex items-center justify-between">
        <p className="font-display text-[26px] italic tracking-[-0.02em] md:text-[28px]">
          {cap(MONTHS[month.m])} {month.y}
        </p>
        <div className="flex gap-2">
          <button type="button" aria-label="Mes anterior" disabled={isCurrent} onClick={() => shift(-1)} className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-line disabled:opacity-30">
            <ChevronLeft size={16} />
          </button>
          <button type="button" aria-label="Mes siguiente" disabled={new Date(month.y, month.m + 1, 1) > limit} onClick={() => shift(1)} className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-line disabled:opacity-30">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 justify-items-center gap-y-[6px]">
        {WD_SHORT.map((d, i) => (
          <span key={i} className="pb-1 text-[11px] font-bold text-muted">
            {d}
          </span>
        ))}
        {cells.map((n, i) => {
          if (!n) return <span key={`e${i}`} />;
          const date = new Date(month.y, month.m, n);
          const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const closed = date < startToday || date.getDay() === 0 || date > limit;
          const soldout = !closed && soldOutDays.includes(n);
          const isToday = date.getTime() === startToday.getTime();
          const state = closed ? "closed" : soldout ? "soldout" : day === n ? "selected" : isToday ? "today" : "free";
          return <DayCell key={n} n={n} state={state} onSelect={() => setDay(n)} size={42} />;
        })}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-[12px] text-muted">
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-1 w-1 rounded-full bg-leaf" /> Con horarios libres
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="text-disabled line-through">12</span> Agotado
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="h-4 w-4 rounded-full border border-ink" /> Hoy
        </span>
      </div>
    </div>
  );
}

function Confirmation({
  name,
  dateLabel,
  time,
  totalMin,
  stylist,
  services,
  totalPrice,
  phone,
}: {
  name: string;
  dateLabel: string;
  time: string;
  totalMin: number;
  stylist: (typeof stylists)[number];
  services: string[];
  totalPrice: number;
  phone: string;
}) {
  const rows = [
    { icon: Calendar, a: cap(dateLabel), b: `${time} · ${fmtDuration(totalMin)}` },
    { icon: User, a: stylist.name, b: stylist.role },
    { icon: Scissors, a: services.join(" + "), b: `Total estimado $${totalPrice} · pagas en el salón` },
    { icon: MapPin, a: `${contact.street}, ${contact.city}`, b: "Cómo llegar ↗", href: contact.mapsHref },
  ];
  return (
    <div className="min-h-full bg-palm px-5 py-10 md:px-20 md:py-0">
      <div className="mx-auto flex min-h-[100dvh] max-w-[1280px] flex-col gap-10 md:flex-row md:items-center md:gap-24">
        <div className="arch relative mx-auto aspect-[460/640] w-full max-w-[300px] overflow-hidden md:max-w-[460px] md:shrink-0">
          <Image src="/images/generated-7.png" alt="" fill priority sizes="460px" className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-7 md:gap-8">
          <span className="flex items-center gap-3 text-[12px] font-bold tracking-[0.12em] text-gold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-palm">
              <Check size={18} strokeWidth={2.4} />
            </span>
            CITA CONFIRMADA
          </span>
          <h1 className="font-display text-[clamp(48px,6vw,80px)] font-light leading-none tracking-[-0.04em] text-cream">
            ¡Te esperamos,
            <br />
            <em className="italic text-gold">{name}!</em>
          </h1>
          <ul className="card-tail flex max-w-[560px] flex-col bg-palm-2 px-6 py-2 md:px-7">
            {rows.map(({ icon: Icon, a, b, href }, i) => (
              <li key={i} className={`flex items-center gap-4 py-[18px] ${i < rows.length - 1 ? "border-b border-palm-line" : ""}`}>
                <Icon size={18} className="shrink-0 text-gold" />
                <span className="flex flex-col gap-[2px]">
                  <span className="text-[16px] font-bold text-cream">{a}</span>
                  {href ? (
                    <a href={href} className="text-[13px] text-gold hover:underline">
                      {b}
                    </a>
                  ) : (
                    <span className="text-[13px] text-palm-muted">{b}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <LightButton label="Añadir a mi calendario" icon={CalendarPlus} />
            <OutlineButton label="Volver al sitio" href="/" dark />
          </div>
          {phone && <p className="text-[14px] text-palm-muted">Te enviamos la confirmación al {phone}.</p>}
        </div>
      </div>
    </div>
  );
}
