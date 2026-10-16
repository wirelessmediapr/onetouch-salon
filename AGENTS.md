<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — OneTouch Salon

Instrucciones para agentes (OpenCode / Claude / Cursor) trabajando en `wirelessmediapr/onetouch-salon`.

## Proyecto

Landing + reserva en línea (booking) para **OneTouch Salon**, salón de belleza en Puerto Rico.
Dominio: `onetouch.salon` · Deploy: **Vercel** (lo ejecuta el usuario; el agente nunca despliega).

## Estado actual

- **Diseño:** `onetouch/onetouch.pen` (lienzo pen.dev: landing + frame "Onetouch — Componentes") + imágenes `onetouch/generated*.png` + `design.md`.
- **Código (fase actual):** Next.js 16 App Router + Tailwind v4 + framer-motion en `src/`. Landing completa montada desde la biblioteca del lienzo; build verificada (`npm run build`).
- Widget de reserva = demo interactivo estático; conectores reales en fase siguiente. Ver `README.md` para estructura y comandos (`npm run dev`, `npm run build`).

## Fuente de verdad del diseño

1. **`onetouch/onetouch.pen`** — lienzo. Editar solo vía MCP de pen.dev (`pencil` tools), nunca a mano.
2. **`design.md`** — tokens, tipografía, componentes y reglas. Leerlo antes de implementar UI. Si cambias el lienzo, sincroniza `design.md` y `src/` en el mismo commit.
3. **Biblioteca de componentes** dentro del lienzo: frame "Onetouch — Componentes" (nodos `reusable: true`). Equivalente en código: `src/components/primitives.tsx`. Al construir pantallas nuevas, **instanciar** en vez de duplicar (refs en lienzo, imports en código).

## Reglas de diseño (obligatorias)

- Seguir `design.md` §6 (anti-slop): sin gradientes, sombras ni glassmorphism; colores solo de tokens `ot-*` (en `src/app/globals.css`); copy de UI en español.
- Dirección visual aprobada: *warm editorial* con Instrument Serif (display) + Instrument Sans (body), acento terracota `#B9502C`. El brainstorm interrogó Dark Luxury (negro/dorado) pero la decisión final fue el warm editorial actual en el lienzo.
- Voz del copy: español PR, tratamiento femenino directo, precios claros; código en inglés.

## Flujo de trabajo con pen.dev

- El agente puede editar el lienzo con `tools.pencil.execute` cuando el usuario abre el repo `onetouch/onetouch.pen` en pen.dev (o pasando `filePath` absoluto).
- ⚠️ El MCP actúa sobre el archivo **activo** del editor: si el usuario abrió otro `.pen` (p. ej. `pcpr/pcdpr.pen`), las llamadas con `filePath` no alcanzan a onetouch — detenerse y avisar antes de tocar nada.
- `Get` con condición fallida puede recorrer todo el documento (y mezclar contenido de otros proyectos): buscar siempre scopeado al frame conocido y re-leer ids con `Get` al empezar sesión.
- Al crear o mover nodos: marcar el frame con `placeholder: true`, terminarlo y quitar el flag.
- Imágenes: `fal.ai` (el usuario da prompts/pagos, el agente escribe prompts si se le pide). Referencias relativas `./generated-N.png`.

## Git

- Rama: `main`. Commits convencionales (Conventional Commits), asunto conciso en inglés, cuerpo si hace falta; nunca incluir secretos.
- Commit en el mismo cambio: diseño (.pen) + `design.md` + `src/` sincronizados.
- El bloque `nextjs-agent-rules` al inicio de este archivo lo re-crea `next dev`; commitearlo tal cual.

## Secretos (revelar prohibitivo)

- **Nunca** leer/imprimir `.env`, `.env.*`, `*.pem`, `*.key` ni credenciales de Vercel/Cloudflare a menos que el usuario lo autorice explícitamente en ese turno.
- Si un comando haría eco de un token, usar referencia de variable de entorno y redactar la salida.
- Ante la duda: preguntar antes de acceder.

## Pendientes del negocio (avisar, no inventar)

- Dirección, teléfono, horario y correo reales del salón (el lienzo y `src/lib/data.ts` / footer usan placeholders `(000) 000-0000`, `Calle Ejemplo 123`).
- Descripciones cortas de servicios y copy exacto de secciones: verificar contra el lienzo cuando se reabra (en code quedó copy neutral marcado `TODO`).
- Link-out a conectores booking (WhatsApp Business / agendado) cuando arranque la fase de reservas reales.
