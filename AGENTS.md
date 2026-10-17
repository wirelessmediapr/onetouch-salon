<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — OneTouch Salon

Instrucciones para agentes (OpenCode / Claude / Cursor) trabajando en `wirelessmediapr/onetouch-salon`.

## Proyecto

Landing + reserva en línea (booking) para **OneTouch Salon**, salón de belleza en Puerto Rico.
Dominio: `onetouch.salon` · Deploy: **Vercel** — auto-deploy con cada push a `main` (agente no despliega manualmente; los commits se tratan como deploys: nunca pushear algo roto o experimental).

## Estado actual

- **Diseño:** `onetouch/onetouch.pen` (lienzo pen.dev: landing + frame "Onetouch — Componentes" + frame "Onetouch — Admin" con 6 pantallas completas) + imágenes `onetouch/generated*.png` + `design.md`.
- **Código (fase actual):** Next.js 16 App Router + Tailwind v4 + framer-motion en `src/`. Landing completa montada desde la biblioteca del lienzo; build verificada (`npm run build`). Widget de reserva = demo interactivo estático; conectores reales en fase siguiente. Ver `README.md` para estructura y comandos (`npm run dev`, `npm run build`).
- **Paridad canvas↔code verificada (2026-10-16, commit `2444a1d`):** con el lienzo abierto se cosechó el copy verbatim y se corrigió todo drift: fondo base del sitio = `$ot-bone` (body; Services/Results en paper, Booking/Footer ink), 16 descripciones de servicios reales (ya no TODO), regla ink bajo el header de categoría, widget fiel a lienzo (tarjeta servicio con `Cambiar` + `180 min · $210`, estilistas Andrea/Valeria/Sin preferencia, días 11/13/16/18/24/25/31 = agotados sin punto, celdas 58px, dot 4, "Hoy" stroke dark-muted), cita "Natalia R." + rating verbatim, footer con `Ciudad, PR 00000` + `Cómo llegar ↗` + copyright, CTA nav = pill accent rellena. `design.md` sincronizado a ese estado.
- **Deploys:** `b4fd499` docs → `df4f72f` diseño+.pen → `fc69384` scaffold → `c219471` container 1280 → `655d72d` auto-deploy doc → `2444a1d` paridad canvas. Producción: `https://onetouch-salon.vercel.app/` (QA previa de producción OK: fuentes self-hosted, imágenes, chips del widget; secciones en blanco en capturas stitched = artefacto del capture, con scroll real se ven).
- **Fase backend + admin (2026-10-16):** decisiones cerradas y plan en `docs/backend-plan.md` (Supabase · multi-servicio por cita · SMS+email Twilio/Resend · motor sin buffer, 2 h de anticipación, 60 días, cancelación con link). Lienzo: frame "Onetouch — Admin" con shell compartido + 6 pantallas (Acceso · Agenda (día) · Servicios · Equipo · Clientes · Métricas); componentes nuevos en las rows "Admin Row" (Admin Nav Item, Estado Badge, Filter Chip, Appointment Card) y "Admin Row 2" (Toggle, Input Field, Service Admin Row, Stat Card). Iconos lucide validados: `calendar-check`, `scissors`, `users`, `user`, `trending-up`, `plus`, `log-out`, `search`, `pencil`. Pendiente: pasos 1/4 y éxito del booking público en el lienzo; luego proyecto Supabase + migraciones + seed.

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
- ⚠️ El MCP actúa sobre el archivo **activo** del editor: si el usuario abrió otro `.pen` (p. ej. `pcpr/pcdpr.pen`), las llamadas con `filePath` no alcanzan a onetouch — detenerse y avisar antes de tocar nada. Confirmar siempre con `get_app_state` al empezar sesión.
- `Get` con condición fallida puede recorrer todo el documento (y mezclar contenido de otros proyectos): buscar siempre scopeado al frame conocido y re-leer ids con `Get` al empezar sesión.
- Al crear o mover nodos: marcar el frame con `placeholder: true`, terminarlo y quitar el flag.
- Imágenes: `fal.ai` (el usuario da prompts/pagos, el agente escribe prompts si se le pide). Referencias relativas `./generated-N.png`.

### API de `execute` (lecciones 2026-10)

- `Get(id, visitor)` recorre plana un subárbol; los nodos traen sus `children` inline al hacer `JSON.stringify(n)`, pero **no hay `parentCtx`** en esa forma — para saber el padre, dump de un nodo por id con `Get(id, n => { if (n.id === id) Print(JSON.stringify(n)) ; return false })` y leer los children inline (útil para encontrar shapes internos como el `Dot` de calendario: `opacity: 0` = oculto).
- Los ids de nodos persisten entre sesiones (Day s8FyyE etc.), pero re-verificar con `get_app_state` / `Get` antes de editar.
- En el `input` del execute NO usar escapes `\n`/`\u` (SyntaxError): pasar código multilinea como template con saltos reales, y evitar template literals anidados con `\n` dentro.
- `n.stroke` no existe en todos los nodos — los strokes pueden no exponerse; las reglas/divisores visuales se validan mejor por `get_app_state` + captura o leyendo el JSON completo del nodo.
- Browser integrado: puede quedar trabado con `A capture is already running` (el attempt de unlock con `load-page` no siempre funciona). Requirió reinicio de la app en pen.dev. Verificación alternativa cuando la captura falla: `fetch` a `localhost:3000` contra el HTML servido + medidas por tokens (los colores son deterministas del CSS).
- `ctx.problems` puede reportar "clipped" **falsos** dentro del mismo `execute` que creó los nodos (layout aún sin asentar): dio decenas de falsos positivos el 2026-10-16 y cero en el call siguiente. Verificar en un call posterior antes de "arreglar" nada.
- Variables: `GetVariables()` para inventario; `SetVariables({...})` mergea sin pisar existentes (registrados 2026-10-16: `ot-accent-warm`, `ot-success`, `ot-disabled`, `ot-busy`); tintes con alpha van inline (`#B9502C26`, `#FFFFFF66`).
- `Get(document, ...)` sin visitor está bloqueado (guard): para leer la raíz, visitor con `ctx.depth === 0` + `ctx.skipChildren()`.
- Los valores asignados sin `const`/`let` persisten como globales entre llamadas de `execute` ("Global variables carry over") — útil para reusar ids entre calls.
- `filePath` es requerido en `tools.pencil.execute` aunque la doc del MCP lo llame opcional.

## Git

- Rama: `main`. Commits convencionales (Conventional Commits), asunto conciso en inglés, cuerpo si hace falta; nunca incluir secretos.
- Commit en el mismo cambio: diseño (.pen) + `design.md` + `src/` sincronizados.
- El bloque `nextjs-agent-rules` al inicio de este archivo lo re-crea `next dev`; commitearlo tal cual.

## Secretos (revelar prohibitivo)

- **Nunca** leer/imprimir `.env`, `.env.*`, `*.pem`, `*.key` ni credenciales de Vercel/Cloudflare a menos que el usuario lo autorice explícitamente en ese turno.
- Si un comando haría eco de un token, usar referencia de variable de entorno y redactar la salida.
- Ante la duda: preguntar antes de acceder.

## Pendientes del negocio (avisar, no inventar)

- Dirección, teléfono, horario y correo reales del salón: el lienzo y `src/lib/data.ts` / footer usan placeholders `(000) 000-0000`, `Calle Ejemplo 123`, `Ciudad, PR 00000`. El link `Cómo llegar ↗` del footer apunta a `href="#"` — apuntarlo a Google Maps con la dirección real.
- ~~Descripciones de servicios~~ ✅ verificar 2026-10-16: todas tomadas verbatim del lienzo (`src/lib/data.ts`), sin `TODO(salón)` pendiente en el copy del menú.
- Reservas reales: decisiones cerradas el 2026-10-16 — ver `docs/backend-plan.md` (Supabase · multi-servicio · SMS+email Twilio/Resend · cancelación con link · motor 2 h/60 días sin buffer). Próximo: terminar pantallas del canvas admin → proyecto Supabase + migraciones + seed.
- QA pendiente en producción de `2444a1d`: confirmar visualmente el fondo bone, reglas de categoría, días agotados y footer (deploy fue por commit; la captura del browser de pen.dev estaba trabada — ver línea sobre reinicio).
