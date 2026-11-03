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

- `src/app/` — layout (fuentes Cinzel/Playfair Display/Pinyon Script/Manrope vía `next/font`), landing (`page.tsx`) y flujo de reserva (`reservar/`).
- `src/components/primitives.tsx` — biblioteca v3 “Noir & Oro” (design.md §10): Logo, Primary/Outline/LightButton, Kicker, OrnamentTitle, SectionTitle, ArchPhoto, Chip, Tag, ServiceItem, FeatureRow, Step, DayCell, TimeSlot, StylistOption, Field, FooterColumn.
- `src/components/sections/` — Nav, Hero, Services (+ InfoBar), Trust, Features (Cabello/Uñas), Team, Footer.
- `src/components/booking/BookingFlow.tsx` — `/reservar`: 3 pasos (servicios multi-selección → estilista + calendario real del mes/60 días + horas → datos) + confirmación. Demo de UI: `BOOKING_LIVE=false` hasta conectar el backend (ver `?demo=1`).
- `src/lib/data.ts` — copy y datos (servicios, equipo, testimonios, FAQ, contacto, estilistas y horarios demo).
- `src/components/Reveal.tsx` — wrapper client de framer-motion.
- `public/images/` — imágenes del lienzo (`onetouch/generated*.png`); v3 en `public/images/v3/`.

## Diseño

Fuente de verdad: `onetouch/onetouch.pen` (editar solo vía pen.dev MCP) + `design.md` (tokens y specs). Agentes: ver `AGENTS.md`.

## Estado

- **2026-11-03 — rediseño v3 “Noir & Oro” en producción** (lienzo: frame `Onetouch v3 — Landing (Noir & Oro)`; specs en `design.md` §10). Reemplaza v2 “Flamboyán” (§9).
- Landing completa y en paridad con el lienzo (commit `2444a1d`): copy verbatim del canvas (menú de 16 servicios, widget, equipo, resultados, footer), fondo base `$ot-bone`, `design.md` sincronizado. Producción: `https://onetouch-salon.vercel.app/`.
- Fase backend + admin en curso (plan y decisiones en `docs/backend-plan.md`): frame "Onetouch — Admin" en el lienzo con shell + pantalla "Agenda (día)" como borrador; componentes nuevos del admin en la biblioteca; backend Supabase por construir.
- Widget de reserva = demo estática sugerida (con estados seleccionables); conectores reales en la fase backend + admin (ver bullet anterior).
- Datos de contacto del footer todavía placeholder — confirmar con el salón (el link `Cómo llegar ↗` apunta a `#` hasta tener dirección real).
