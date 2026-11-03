"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { DayCell, Kicker, PrimaryButton, SectionTitle, Step, TimeSlot } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { bookingSteps } from "@/lib/data";

// Vista previa del widget: semana demo (2–8 nov 2026). El flujo real vive en /reservar.
const week = [
  { wd: "LUN", n: 2, state: "soldout" as const },
  { wd: "MAR", n: 3, state: "today" as const },
  { wd: "MIÉ", n: 4, state: "free" as const },
  { wd: "JUE", n: 5, state: "free" as const },
  { wd: "VIE", n: 6, state: "soldout" as const },
  { wd: "SÁB", n: 7, state: "free" as const },
  { wd: "DOM", n: 8, state: "closed" as const },
];
const dayNames: Record<number, string> = { 3: "Martes", 4: "Miércoles", 5: "Jueves", 7: "Sábado" };
const dayAbbr: Record<number, string> = { 3: "Mar", 4: "Mié", 5: "Jue", 7: "Sáb" };
const slots = [
  { time: "9:00 AM" },
  { time: "10:30 AM", busy: true },
  { time: "11:00 AM" },
  { time: "12:30 PM" },
  { time: "2:00 PM" },
  { time: "3:00 PM" },
  { time: "4:30 PM", busy: true },
  { time: "5:00 PM" },
];

export function Booking() {
  const [day, setDay] = useState(5);
  const [time, setTime] = useState("11:00 AM");

  return (
    <section id="reservas" className="scroll-mt-4 bg-palm px-5 py-16 md:px-20 md:py-[120px]">
      <div className="ot-container flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
        <div className="flex min-w-0 flex-1 flex-col gap-8 md:gap-12">
          <Reveal className="flex flex-col gap-5">
            <Kicker tone="gold">02 · Reserva en línea</Kicker>
            <SectionTitle line1="Tres pasos." line2="Menos de un minuto." dark accent="gold" />
          </Reveal>
          <ol className="flex flex-col">
            {bookingSteps.map((s) => (
              <li key={s.index} className="flex gap-4 border-t border-palm-line py-5 md:gap-7 md:py-6">
                <span className="font-display text-[28px] font-light italic leading-none text-gold md:text-[40px]">{s.index}</span>
                <div className="flex flex-col gap-1 md:gap-2">
                  <h3 className="font-display text-[21px] tracking-[-0.01em] text-cream md:text-[26px]">{s.title}</h3>
                  <p className="text-[14px] leading-[1.55] text-palm-muted md:text-[15px]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="lg:hidden">
            <PrimaryButton label="Empezar mi reserva" href="/reservar" size="lg" full />
          </div>
        </div>

        <Reveal delay={0.1} className="w-full max-lg:hidden lg:w-[560px] lg:shrink-0">
          <div className="overflow-hidden rounded-[28px_28px_28px_6px] bg-cream">
            <div className="flex items-center gap-5 border-b border-line px-7 py-5">
              <Step num={1} label="Servicios" state="done" />
              <span aria-hidden className="h-px w-6 bg-line" />
              <Step num={2} label="Fecha y hora" state="current" />
              <span aria-hidden className="h-px w-6 bg-line" />
              <Step num={3} label="Confirmar" state="pending" />
            </div>
            <div className="flex flex-col gap-6 p-7">
              <div className="flex items-center gap-[14px] rounded-full border-[1.5px] border-flame bg-flame-soft py-3 pl-3 pr-4">
                <Image src="/images/generated-3.png" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                <span className="flex flex-1 flex-col gap-[2px]">
                  <span className="text-[15px] font-bold">Andrea Ríos</span>
                  <span className="text-[12px] text-muted">Balayage a mano alzada · 180 min</span>
                </span>
                <span aria-hidden className="h-5 w-5 rounded-full border-[6px] border-flame bg-white" />
              </div>
              <div className="flex items-center justify-between">
                <p className="font-display text-[28px] italic tracking-[-0.02em]">Noviembre</p>
                <div className="flex gap-2" aria-hidden>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line">
                    <ChevronLeft size={16} />
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line">
                    <ChevronRight size={16} />
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                {week.map((d) => (
                  <div key={d.n} className="flex flex-col items-center gap-2">
                    <span className="text-[11px] font-bold tracking-[0.08em] text-muted">{d.wd}</span>
                    <DayCell n={d.n} state={day === d.n ? "selected" : d.state} onSelect={() => setDay(d.n)} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-[10px]">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted">
                  {dayNames[day]} {day} · {slots.filter((s) => !s.busy).length} horarios libres
                </p>
                <div className="grid grid-cols-4 gap-[10px]">
                  {slots.map((s) => (
                    <TimeSlot key={s.time} {...s} selected={time === s.time} onSelect={() => setTime(s.time)} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-sand px-7 py-5">
              <div className="flex flex-col gap-[2px]">
                <span className="text-[13px] font-semibold text-ink-soft">
                  {dayAbbr[day]} {day} nov · {time}
                </span>
                <span className="font-display text-[32px] leading-none">$210</span>
              </div>
              <PrimaryButton label="Continuar" href="/reservar" icon={ArrowRight} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
