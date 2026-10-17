# Backend & Admin — Plan de fase

> Decisiones cerradas el 2026-10-16. Este documento define los **datos y reglas** de la fase de reservas reales + panel de admin. El **diseño de UI** vive primero en `onetouch/onetouch.pen` (frames "Onetouch — Admin" y "Onetouch — Reservas (flujo)") y se refleja en `src/`.
>
> **Estado al cierre del 2026-10-16:** diseño completo en el lienzo y en `design.md` (landing `2444a1d`, admin `5ef7c85`, flujo de reserva `4520edc`). Retomar en el **milestone 3**: el usuario crea el proyecto Supabase en el dashboard y pasa el **project ref**; luego el agente escribe migraciones + seed.

## Decisiones

- **Alcance:** loop completo — widget público crea citas reales; panel admin las gestiona.
- **Datos/Auth:** Supabase (Postgres + Auth). Admin en `/admin` del mismo app Next.js. Sin app separada.
- **Módulos del admin:** agenda, servicios, equipo/horarios, clientes, métricas.
- **Notificaciones:** SMS (Twilio) + email (Resend). Twilio en PR requiere registro **A2P 10DLC** (trámite de días); Resend requiere DNS de `onetouch.salon`. Si el trámite se atrasa: email primero, SMS al aprobarse.
- **Cancelación de la clienta:** link con token (en email + SMS de confirmación), gratis hasta 24 h antes.
- **Reglas del motor:** sin buffer entre citas · anticipación mínima **2 h** · horizonte **60 días** · **varios servicios por cita** (un servicio adicional suma duración).
- **Zona horaria:** AST (UTC−4, sin DST). Guardar UTC (`timestamptz`), render en AST.
- **Roles MVP:** una cuenta owner (la dueña). Cuentas staff por estilista = fase 2.
- **Multi-servicio:** una cita = un estilista + N servicios. El estilista debe ofrecer **todos** los servicios elegidos. "Sin preferencia" = primera estilista libre que cumpla.

## Schema (Postgres/Supabase)

| Tabla | Campos clave |
|---|---|
| `business_hours` | weekday (0–6), open_time, close_time, is_closed — 1 fila/día |
| `service_categories` | name, sort |
| `services` | category_id, name, description, duration_min, price_cents, active, sort |
| `stylists` | name, role, specialties, photo_url, active, sort |
| `stylist_schedules` | stylist_id, weekday, start_time, end_time (múltiples turnos/día permitidos) |
| `stylist_services` | stylist_id, service_id — qué servicios ofrece cada estilista |
| `time_off` | stylist_id *(null = salón completo)*, start_ts, end_ts, reason |
| `clients` | name, phone, email, notes — dedupe por phone/email |
| `appointments` | client_id, stylist_id, start_ts, end_ts, status (`pending`/`confirmed`/`completed`/`cancelled`/`no_show`), total_price_cents, total_duration_min, notes, cancel_token, created_at, cancelled_at |
| `appointment_services` | appointment_id, service_id, **price_cents + duration_min (snapshot)**, sort |
| `notification_log` | appointment_id, channel (`sms`/`email`), template, status, sent_at, error |
| `profiles` | id (=auth.users), role (`owner`/`staff`), stylist_id nullable |

- `end_ts` y los totales van denormalizados en `appointments` para queries de conflicto y snapshots de precio/duración.
- `clients.notes` alberga notas de la clienta (fórmula de color, alergias, preferencias).

## Motor de disponibilidad

- Slots cada **30 min**, de 9:00 a 7:00 PM (según `business_hours`).
- Un slot es reservable si: cae dentro del horario semanal de la estilista ∩ horario del salón; el rango contiguo `[slot, slot + Σ duración)` no choca con citas activas ni `time_off`; respeta anticipación mínima (2 h desde ahora) y horizonte (60 días).
- Estados del calendario público: `past` (pasado) · `closed` (cerrado/agotado) · `shaded` (con horarios libres) · `today`.
- "Sin preferencia" resuelve a la primera estilista (por `sort`) con hueco.

## Seguridad

- `/admin` protegido: Supabase Auth (email+password) + middleware. **Sin signup público** — solo usuarios invitados.
- El widget público **no** toca la DB directamente: pasa por server actions de Next (validación zod + rate limit). Claves de servicio solo en servidor.
- RLS activo en todas las tablas como defensa en profundidad. PII de clientas (teléfono/email) nunca expuesta a anon.

## Milestones

1. ✅ Decisiones + schema (este doc).
2. ✅ Canvas: frame "Onetouch — Admin" completo (shell, login, agenda, servicios, equipo, clientes, métricas — commit `5ef7c85`) + flujo de reserva público (paso 1 multi-servicio, paso 4 confirmar, éxito — commit `4520edc`, `design.md` §8).
3. ⏳ **Siguiente** — Proyecto Supabase: el **usuario** lo crea en el dashboard y pasa el project ref; el agente escribe migraciones (`supabase/migrations/`) + seed (servicios/equipo desde `src/lib/data.ts`).
4. ⏳ Motor de disponibilidad + server actions (crear/cancelar/reagendar).
5. ⏳ Widget público real (4 pasos).
6. ⏳ Admin UI completa (auth + 5 módulos).
7. ⏳ Notificaciones Resend + Twilio + recordatorio 24 h (cron).
8. ⏳ QA + datos reales del negocio + deploy.

## Cuentas por crear (cuando toque)

- **Supabase**: proyecto nuevo (2 min) — al crearlo, el usuario pasa el **project ref** (código de la URL del dashboard) y la región; las **keys** (anon / service role) se pegan directo en `.env.local` / Vercel env **sin mostrarlas en el chat** (ver guard de secretos en `AGENTS.md`). Service role key solo en servidor.
- **Resend**: verificar dominio `onetouch.salon` (DNS).
- **Twilio**: número PR + registro A2P 10DLC.

## Datos reales pendientes del cliente

- Dirección, teléfono, horario real, email, redes (hoy placeholders en lienzo/`data.ts`/footer).
- Confirmar si el equipo del lienzo (Andrea, Camila, Valeria, Sofía) es real o placeholder.
