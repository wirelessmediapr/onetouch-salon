# AGENTS.md — OneTouch Salon

Instrucciones para agentes (OpenCode / Claude / Cursor) trabajando en `wirelessmediapr/onetouch-salon`.

## Proyecto

Landing + reserva en línea (booking) para **OneTouch Salon**, salón de belleza en Puerto Rico.
Dominio: `onetouch.salon` · Deploy: **Vercel** (lo ejecuta el usuario; el agente nunca despliega).

## Estado actual

- Solo existe **diseño**: `onetouch/onetouch.pen` (lienzo pen.dev) + imágenes `onetouch/generated*.png` y documentación en `docs/`.
- **No hay código todavía.** Stack acordado (ver `docs/superpowers/brainstorms/2026-09-10-onetouch-landing-brainstorm.md`): Next.js App Router + Tailwind + framer-motion.

## Fuente de verdad del diseño

1. **`onetouch/onetouch.pen`** — lienzo. Editar solo vía MCP de pen.dev (`pencil` tools), nunca a mano.
2. **`design.md`** — tokens, tipografía, componentes y reglas. Leerlo antes de implementar UI. Si cambias el lienzo, sincroniza `design.md` en el mismo commit.
3. **Biblioteca de componentes** dentro del lienzo: frame "Onetouch — Componentes" (nodos `reusable: true`). Al construir pantallas nuevas, **instanciar** esos componentes (refs) en lugar de duplicar nodos.

## Reglas de diseño (obligatorias)

- Seguir `design.md` §6 (anti-slop): sin gradientes, sombras ni glassmorphism; colores solo de tokens `ot-*`; copy de UI en español.
- Dirección visual aprobada: *warm editorial* con Instrument Serif (display) + Instrument Sans (body), acento terracota `#B9502C`. El brainstorm interrogó Dark Luxury (negro/dorado) pero la decisión final fue el warm editorial actual en el lienzo.
- Voz del copy: español PR, tratamiento femenino directo, precios claros; código en inglés.

## Flujo de trabajo con pen.dev

- El agente puede editar el lienzo con `tools.pencil.execute` cuando el usuario abre el repo `onetouch/onetouch.pen` en pen.dev (o pasando `filePath` absoluto).
- Al crear o mover nodos: marcar el frame con `placeholder: true`, terminarlo y quitar el flag.
- Leer estructura con `Get` + visitor antes de tocar; no adivinar ids.
- Imágenes: `fal.ai` (el usuario da prompts/pagos, el agente escribe prompts si se le pide). Referencias relativas `./generated-N.png`.

## Git

- Rama: `main`. Commits convencionales (Conventional Commits), asunto conciso en inglés, cuerpo si hace falta; nunca incluir secretos.
- Commit en el mismo cambio: diseño (.pen) + `design.md` actualizados juntos.

## Secretos (revelar prohibitivo)

- **Nunca** leer/imprimir `.env`, `.env.*`, `*.pem`, `*.key` ni credenciales de Vercel/Cloudflare a menos que el usuario lo autorice explícitamente en ese turno.
- Si un comando haría eco de un token, usar referencia de variable de entorno y redactar la salida.
- Ante la duda: preguntar antes de acceder.

## Pendientes del negocio (avisar, no inventar)

- Dirección, teléfono, horario y correo reales del salón (el lienzo usa placeholders `(000) 000-0000`, `Calle Ejemplo 123`).
- Link-out a conectores booking (WhatsApp Business / agendado) cuando arranca el stack de código.
