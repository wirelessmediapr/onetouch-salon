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

- `src/app/` — layout (fuentes Instrument Serif/Sans vía `next/font`) y página que compone las secciones.
- `src/components/primitives.tsx` — biblioteca de componentes (equivale al frame "Onetouch — Componentes" del lienzo): Logo, PrimaryButton, ArrowLink, Eyebrow, Fact, SectionHeader, NextSlotCard, ConsultNote, QuoteBlock, Rating, ServiceRow/Category, TeamCard, FooterColumn, StepBadge, StylistRow, DayCell, TimeChip.
- `src/components/sections/` — Nav, Hero, Services, Booking (widget interactivo demo), Team, Results, Footer.
- `src/lib/data.ts` — copy y datos (servicios, equipo, calendario, horarios).
- `src/components/Reveal.tsx` — wrapper client de framer-motion.
- `public/images/` — imágenes del lienzo (`onetouch/generated*.png`).

## Diseño

Fuente de verdad: `onetouch/onetouch.pen` (editar solo vía pen.dev MCP) + `design.md` (tokens y specs). Agentes: ver `AGENTS.md`.

## Estado

- Widget de reserva = demo estática sugerida (con estados seleccionables); conectores de disponibilidad real en fase siguiente.
- Datos de contacto del footer todavía placeholder — confirmar con el salón.
