"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  DayCell,
  SectionHeader,
  StepBadge,
  StylistRow,
  TimeChip,
} from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import {
  bookingSummary,
  calendarDays,
  teamMembers,
  timeGroups,
} from "@/lib/data";

// Octubre 2026: el día 1 cae jueves (índice 3 en semana LU-first).
const weekdayLabels = ["LU", "MA", "MI", "JU", "VI", "SÁ", "DO"];
const dayNames = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const dayAbbr = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const weekdayOf = (day: number) => (3 + day - 1) % 7;
const meridiemOf = (time: string) => (Number(time.split(":")[0]) < 12 ? "AM" : "PM");

export function Booking() {
  const [stylist, setStylist] = useState("Andrea Ríos");
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedTime, setSelectedTime] = useState("11:00");

  const groups = timeGroups.map((group) => ({
    ...group,
    rows: group.rows.map((row) =>
      row.map((slot) => ({
        ...slot,
        state:
          slot.state === "busy"
            ? ("busy" as const)
            : slot.time === selectedTime
              ? ("selected" as const)
              : ("free" as const),
      })),
    ),
  }));

  const stylistOptions = [
    ...teamMembers.slice(0, 3).map((m) => ({ name: m.name, role: m.role, image: m.image })),
    { name: "Sin preferencia", role: "La mejor horaria", image: undefined as string | undefined },
  ];

  const who =
    stylist === "Sin preferencia" ? "nuestro equipo" : stylist.split(" ")[0];

  return (
    <section id="reservas" className="flex flex-col gap-14 bg-ink px-6 py-20 md:px-20 md:py-[120px]">
      <Reveal>
        <SectionHeader
          index="02 — Reservas en línea"
          title="Tu cita, en cuatro toques."
          intro="Disponibilidad real de cada estilista, actualizada al minuto. Recibirás confirmación por SMS y un recordatorio el día antes."
          dark
        />
      </Reveal>

      <div className="overflow-hidden rounded-lg border border-dark-line bg-dark-card">
        {/* Pasos */}
        <div className="flex flex-wrap items-center gap-4 border-b border-dark-line px-6 py-6 md:px-10">
          <StepBadge num={1} label="Servicio" state="done" />
          <span aria-hidden className="h-px w-12 bg-dark-line" />
          <StepBadge num={2} label="Estilista" state="done" />
          <span aria-hidden className="h-px w-12 bg-dark-line" />
          <StepBadge num={3} label="Fecha y hora" state="current" />
          <span aria-hidden className="h-px w-12 bg-dark-line" />
          <StepBadge num={4} label="Confirmar" state="pending" />
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] xl:grid-cols-[320px_1fr_340px]">
          {/* Selección */}
          <div className="flex flex-col gap-7 border-dark-line px-6 py-8 md:px-10 lg:border-r">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-dark-muted">Servicio</p>
              <div className="flex flex-col gap-[6px] rounded-md border border-dark-line p-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[14px] font-semibold text-bone">Balayage a mano alzada</p>
                  <p className="font-display text-[34px] leading-none text-bone">{bookingSummary.price}</p>
                </div>
                <p className="text-[13px] text-dark-muted">180 min · incluye matizante</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-dark-muted">Estilista</p>
              {stylistOptions.map((option) => (
                <StylistRow
                  key={option.name}
                  name={option.name}
                  role={option.role}
                  image={option.image}
                  selected={stylist === option.name}
                  onSelect={() => setStylist(option.name)}
                />
              ))}
            </div>
          </div>

          {/* Calendario */}
          <div className="flex flex-col gap-6 px-6 py-8 md:px-10">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[clamp(24px,2.4vw,34px)] text-bone">Octubre 2026</h3>
              <div className="flex gap-2">
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-line text-dark-muted">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </span>
                <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-line text-dark-muted">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-[repeat(7,44px)] justify-center gap-[6px] max-lg:mx-auto">
              {weekdayLabels.map((label) => (
                <span key={label} className="pb-1 text-center text-[11px] font-semibold tracking-[0.08em] text-dark-muted">
                  {label}
                </span>
              ))}
              {calendarDays.map((day, i) =>
                day === null ? (
                  <span key={`empty-${i}`} />
                ) : (
                  <DayCell
                    key={day.n}
                    day={{ ...day, tone: day.tone === "selected" ? "default" : day.tone }}
                    selected={day.tone !== "past" && selectedDay === day.n}
                    onSelect={() => setSelectedDay(day.n)}
                  />
                ),
              )}
            </div>
            <div className="mt-1 flex flex-wrap gap-x-8 gap-y-3">
              <span className="flex items-center gap-2 text-[12px] text-dark-muted">
                <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-accent-warm" />
                Con horarios libres
              </span>
              <span className="flex items-center gap-2 text-[12px] text-dark-muted">
                <span aria-hidden className="text-[13px] text-day-idle">12</span>
                Agotado / cerrado
              </span>
              <span className="flex items-center gap-2 text-[12px] text-dark-muted">
                <span aria-hidden className="h-4 w-4 rounded-[3px] border border-accent" />
                Hoy
              </span>
            </div>
          </div>

          {/* Horarios */}
          <div className="flex flex-col gap-6 border-dark-line px-6 py-8 md:px-10 lg:border-t xl:border-l xl:border-t-0">
            <div>
              <h3 className="font-display text-[clamp(22px,2vw,28px)] text-bone">
                {dayNames[weekdayOf(selectedDay)]} {selectedDay} de octubre
              </h3>
              <p className="text-[13px] text-dark-muted">6 horarios con {who}</p>
            </div>
            {groups.map((group, gi) => (
              <div key={`${group.label}-${gi}`} className="flex flex-col gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-dark-muted">{group.label}</p>
                {group.rows.map((row, ri) => (
                  <div key={ri} className="grid grid-cols-3 gap-2">
                    {row.map((slot) => (
                      <TimeChip
                        key={`${gi}-${ri}-${slot.time}`}
                        slot={slot}
                        onSelect={slot.state === "busy" ? undefined : () => setSelectedTime(slot.time)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <div className="mt-auto flex flex-col gap-4 border-t border-dark-line pt-6">
              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] font-semibold text-bone">Balayage · {stylist}</p>
                  <p className="text-[13px] text-dark-muted">
                    {dayAbbr[weekdayOf(selectedDay)]} {selectedDay} oct · {selectedTime} {meridiemOf(selectedTime)}
                  </p>
                </div>
                <p className="font-display text-[34px] leading-none text-bone">{bookingSummary.price}</p>
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-[16px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Confirmar cita
                <ArrowRight size={18} strokeWidth={1.8} />
              </button>
              <p className="text-[12px] text-dark-muted">{bookingSummary.fine}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
