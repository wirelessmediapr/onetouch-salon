# OneTouch Salon — Landing

Landing estática del salón (español PR), generada desde el diseño en `onetouch/onetouch.pen`.

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind v4 (tokens en `src/app/globals.css`, mapeados 1:1 desde `design.md`)
- framer-motion (reveals sutiles) · lucide-react (iconos)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verificación de build
```

## Estructura

- `src/app/` — layout (fuentes Fraunces/Manrope vía `next/font`), landing (`page.tsx`) y flujo de reserva (`reservar/`).
- `src/components/primitives.tsx` — biblioteca v2 “Flamboyán” (equivale al frame "Onetouch v2 — Componentes" del lienzo): Logo, Primary/Outline/LightButton, ArrowLink, Kicker, SectionTitle, Chip, LiveBadge, Tag, ServiceItem, Stat, StylistCard, Testimonial, Step, DayCell, TimeSlot, StylistOption, Field, FooterColumn.
- `src/components/sections/` — Nav, Hero, Marquee, Services (filtro por categoría), Booking (vista previa interactiva), Team, Results, VisitFaq, Footer.
- `src/components/booking/BookingFlow.tsx` — `/reservar`: 3 pasos (servicios multi-selección → estilista + calendario real del mes/60 días + horas → datos) + confirmación. Demo de UI: `BOOKING_LIVE=false` hasta conectar el backend (ver `?demo=1`).
- `src/lib/data.ts` — copy y datos (servicios, equipo, testimonios, FAQ, contacto, estilistas y horarios demo).
- `src/components/Reveal.tsx` — wrapper client de framer-motion.
- `public/images/` — imágenes del lienzo (`onetouch/generated*.png`).

## Diseño

Fuente de verdad: `onetouch/onetouch.pen` (editar solo vía pen.dev MCP) + `design.md` (tokens y specs). Agentes: ver `AGENTS.md`.

## Estado

- **2026-11-03 — rediseño v2 “Flamboyán” en producción** (lienzo: frames `Onetouch v2 — *`; specs en `design.md` §9). Reemplaza el warm editorial `ot-*`.
- Landing completa y en paridad con el lienzo (commit `2444a1d`): copy verbatim del canvas (menú de 16 servicios, widget, equipo, resultados, footer), fondo base `$ot-bone`, `design.md` sincronizado. Producción: `https://onetouch-salon.vercel.app/`.
- Fase backend + admin en curso (plan y decisiones en `docs/backend-plan.md`): frame "Onetouch — Admin" en el lienzo con shell + pantalla "Agenda (día)" como borrador; componentes nuevos del admin en la biblioteca; backend Supabase por construir.
- Widget de reserva = demo estática sugerida (con estados seleccionables); conectores reales en la fase backend + admin (ver bullet anterior).
- Datos de contacto del footer todavía placeholder — confirmar con el salón (el link `Cómo llegar ↗` apunta a `#` hasta tener dirección real).
