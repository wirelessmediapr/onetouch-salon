# OneTouch Salon — Design System

> **Fuente de verdad:** `onetouch/onetouch.pen` (abrir en pen.dev). Este documento describe los tokens y componentes extraídos del lienzo. Si el diseño cambia, actualizar `onetouch.pen` primero y luego este documento.
>
> **Biblioteca de componentes:** frame `Onetouch — Componentes` en el mismo lienzo (componentes reutilizables marcados con `reusable: true`). Las pantallas instancian esos componentes.

---

## 1. Marca

- **Nombre:** Onetouch Salon
- **Concepto:** "Un solo toque lo cambia todo" — reservar una cita completa en salón en menos de un minuto, sin llamadas.
- **Estilo:** *Warm editorial* premium. Papel cálido + tinta oscura + acento terracota. Serif enorme para titulares, sans pequeña para UI. Sin sombras, sin gradientes, sin glassmorphism — jerarquía por tipografía, acento y espacio.
- **Voz:** Español (Puerto Rico). Trato femenino directo ("¿Lista para tu próximo cambio?"). Precios en dólares, fontanera y sin rodeos.
- **Idioma del código:** los archivos de código (commits, componentes, comentarios) en inglés; el **copy de UI siempre en español**.

---

## 2. Tokens

Las variables con prefijo `ot-*` son el set activo de Onetouch. **Ignorar el set legacy** (`cream`, `ink`, `muted`, `terracotta`, `wine`, `red`, `charcoal`, `line`, `serif`, `sans` — quedaron de un mock anterior, "Minerva").

### 2.1 Color

| Variable | Hex | Uso |
| --- | --- | --- |
| `$ot-bone` | `#F3EDE4` | **Fondo base del lienzo** (body del sitio) + texto principal sobre oscuro |
| `$ot-paper` | `#FBF8F3` | Fondo alterno de secciones claras (Services, Results, NextSlotCard) |
| `$ot-ink` | `#1A1512` | Texto primario + fondo de secciones oscuras (Booking, Footer) |
| `$ot-ink-soft` | `#4A403A` | Cuerpo de texto (subhead, intro) |
| `$ot-muted` | `#857870` | Texto secundario en claro |
| `$ot-line` | `#DDD3C7` | Bordes / reglas en claro |
| `$ot-accent` | `#B9502C` | CTA, enlaces, kickers de sección, precios destacados |
| `$ot-accent-soft` | `#F0D8CB` | Tinte del acento (hover suave, fondos de badge) |
| `$ot-dark-card` | `#251E1A` | Tarjeta/widget sobre sección oscura |
| `$ot-dark-line` | `#3B312B` | Bordes sobre oscuro |
| `$ot-dark-muted` | `#A99B90` | Texto secundario sobre oscuro |

**Hex "inline"** (normalizados como variables el 2026-10-16; registrar siempre variable nueva antes de usar un color que no exista):
- `$ot-accent-warm` (`#E08A66`) — acento-cálido sobre oscuro (kickers, checks, puntas de calendario, enlaces en footer) — el landing aún conserva algunos inline
- `$ot-success` (`#3E8E5A`) — verde "en vivo / abierto"
- `$ot-disabled` (`#6E625A`) — día/hora deshabilitado sobre oscuro
- `$ot-busy` (`#5E534C`) — hora ocupada
- `#FFFFFF` — texto sobre acento
- `#FFFFFF0A` — fondo tenue de días con horarios (filas "hover" del calendario)
- `#B9502C26` — fila de estilista seleccionada (tinte 15%)

**Convención de fondos:** el **fondo base del sitio es `$ot-bone`** (fill del frame landing; Nav y Hero viven sobre él). Secciones con fill propio: `Services` y `Results` = `$ot-paper`, `Booking` y `Footer` = `$ot-ink`. `Team` no tiene fill → hereda bone.

### 2.2 Tipografía

| Variable | Fuente | Rol |
| --- | --- | --- |
| `$ot-display` | **Instrument Serif** | Titulares, precios, wordmark. `normal` (no bold) siempre |
| `$ot-body` | **Instrument Sans** | UI, cuerpo, etiquetas. Un solo peso estándar (400) y `600` para semibold |

**Escala display (px):** `110` (headline hero) · `72` (CTA final) · `64` (título de sección) · `40` (cita) · `34` (wordmark, categorías) · `32` (slot, mes) · `30` (nombres del equipo) · `28` (precios).
**Escala body (px):** `18` (subhead) · `16` (intro / notas) · `15` (enlaces, footer) · `14` (botones, labels) · `13` (metadatos) · `12` (kickers — siempre `600` + mayúsculas) · `11` (micro-título de grupos — `600` + mayúsculas).

### 2.3 Radios, bordes, espaciado

- **Radios:** imágenes `4` · cards/notas/chips `6` · widget grande `8` · pastillas (buttons/badges/radio) `999` · muestra del legend `3`.
- **Bordes:** siempre `1`, solo `strokeWidth` por lado (`bottom` para filas de menú y Book Link; `right`/`left` para columnas del widget; `top` para summary). Color = `$ot-line` en claro, `$ot-dark-line` en oscuro.
- **Padding de secciones:** `[120, 80]` (secciones) · hero `[32, 80, 88, 80]` · nav `[28, 80]` · footer `[120, 80, 40, 80]`.
- **Contenedor:** el contenido vive en un `ot-container` interno (`max-width: 1280px`, centrado) — equivale a 1440 − 2×80. Los **fondos** (paper/ink) siguen full-bleed a todo el ancho de la ventana. En código: las 7 secciones aplican `ot-container` de `src/app/globals.css`.
- **Gaps:** `48–80` entre bloques; `24–32` dentro de grupos; `8–10` en texto.
- **Sombras/gradientes/blur:** prohibidos. El efecto "premium" sale del contraste papel/tinta, el serif gigante y el kicker.

---

## 3. Componentes (biblioteca reutilizable)

Nombres de la biblioteca del lienzo (`Onetouch — Componentes`). Todas instancias vía `ref`.

| Componente | Specs clave | Estados / overrides |
| --- | --- | --- |
| **Logo** | `Onetouch` (34 display, `$ot-ink`) + `SALON` (11/600, `$ot-muted`), gap 10, align end | — |
| **Botón primario** | pill r999, fill `$ot-accent`, pad `[16,28]`, gap 8: label 16/600 blanco + icono `arrow-right` 18 blanco | label / icono a gusto; tamaño compacto en nav (pad `[12,22]`, 14px, mismo fill accent — texto blanco en el lienzo) |
| **Botón secundario** | fila: label 15/600 `$ot-ink` + icono 16 `$ot-ink` — sin caja | en dark: label/icon `$ot-bone` |
| **NavLink** | texto 15 `$ot-ink-soft` | hover → `$ot-ink` |
| **Eyebrow** | regla 32×1 `$ot-ink` + texto 12/600 `$ot-ink`  mayúsculas, gap 10 | en oscuro: ambos `$ot-bone` |
| **Fact** | value 36 display `$ot-ink` + label 13 `$ot-muted`, gap 2 | valor/label libres |
| **Section Header** | fila align-end: [kicker 12/600 `$ot-accent` ("01 — SECCIÓN") + título 64 display `$ot-ink`] a la izquierda, intro fixed-width 380–400 16 `$ot-ink-soft` a la derecha | numeración correlativa 01–04; en oscuro intro `$ot-dark-muted` |
| **NextSlotCard** | card 300 r6 `$ot-paper` pad `[18,22]` gap 10: fila [punto verde 8 `#3E8E5A` + kicker 11/600 `PRÓXIMO HORARIO LIBRE` `$ot-muted`], slot 32 display `$ot-ink`, fila [quién 13 `$ot-ink-soft` + arrow 18 `$ot-accent`] | contenido dinámico de reserva |
| **Service Row** | pad `[18,0]`, gap 24, align center, **bottom stroke 1** `$ot-line`: [nombre 16 `$ot-ink` + desc 14 `$ot-muted`] (fill) · duración 13 `$ot-muted` · precio 28 display `$ot-ink` | — |
| **Service Category** | header: categoría 34 display `$ot-ink` + "desde $X" 13 `$ot-muted` (space-between, pb 12) + **regla inferior 1 `$ot-ink`** + 4×Service Row; ancho ~300 | 4 categorías: Cabello, Color, Uñas, Rostro & cejas |
| **ConsultNote** | r6 `$ot-bone` pad `[24,28]` space-between align-center: [icon + texto 16] | enlace: 15/600 + arrow 16, `$ot-accent` |
| **Paso (booking step)** | fila gap 10 align-center: badge (28, r999, **1-stroke `$ot-dark-line`**, num 12 `$ot-dark-muted`) + label 14 `$ot-bone` | hecho: icon `check` `#E08A66`; **actual**: badge fill `$ot-accent`, num blanco 12/600, label 14/600 |
| **StylistRow** | r6 pad `[10,12]` gap 12 align-center: avatar 40 r999 (imagen) + [nombre 14/600 `$ot-bone` + especialidad 12 `$ot-dark-muted`] + radio 18 r999 | **seleccionada**: fila bg `#B9502C26`, radio stroke **5** `$ot-accent`; sin preferencia: avatar fill `$ot-dark-line` |
| **DayCell** | 58 r6 center gap 5: num 16 `$ot-bone` + dot 4 `#E08A66` | **seleccionado**: bg `$ot-accent` + num blanco 16/600 + dot blanco; **hoy**: stroke 1 `$ot-dark-muted` (dot visible); **disponible-fila**: bg `#FFFFFF0A` (dot visible); **pasado / agotado-cerrado**: num `#6E625A` + dot `opacity 0` (sin punto) + celda deshabilitada |
| **TimeChip** | r6 pad `[10,0]` center width propio: hora 14 | **disponible**: stroke 1 `$ot-dark-line`, texto `$ot-bone`; **seleccionada**: bg `$ot-accent`, blanco 14/600; **ocupado**: texto `#5E534C` |
| **TeamCard** | ancho ~300: retrato fill_container h340 r4 (imagen cover) + [nombre 30 display, rol 13/600 `$ot-accent`, especialidades 14 `$ot-muted`] + BookLink: fila gap 8, **bottom stroke 1**, pad `[0,0,4,0]`: 14/600 `$ot-ink` + arrow 16 `$ot-ink` | persona dinámica |
| **QuoteBlock** | ancho 420 vertical gap 16: apertura `“` 120 display `$ot-accent` + cita 40 display `$ot-ink` (fixed-width) + [nombre 15/600 + detalle 14 `$ot-muted`] | — |
| **Rating** | fila gap 8: 5× `star` 20 `$ot-accent` + texto 14 `$ot-ink-soft` | — |
| **FooterColumn** | vertical gap 4: heading 11/600 `$ot-dark-muted` mayúsculas + líneas 15 `$ot-bone`; enlace externo → `#E08A66` + `↗` | VISÍTANOS / HORARIO / CONTACTO |
| **Admin Nav Item** | fila gap 10 align-center, pad `[10,12]`, r6, width fill: icono 18 + label 14 `$ot-dark-muted` (vive en el sidebar ink del admin) | **activo**: fila bg `#B9502C26` + icono/label `$ot-accent-warm` (label 14/600) |
| **Estado Badge** | pill r999 pad `[4,10]`: label 11/600 mayúsculas | **pendiente** `$ot-accent` sobre `#B9502C26` · **confirmada** `$ot-success` sobre `#3E8E5A26` · **completada** `$ot-muted` sobre `#85787026` · **cancelada** `$ot-disabled` sobre `#6E625A26` |
| **Filter Chip** | pill r999 pad `[7,14]`, stroke 1 `$ot-line`: label 13 `$ot-ink-soft` | **activo**: fill/stroke `$ot-ink` + label `$ot-bone` 13/600 |
| **Appointment Card** | card r6 pad `[12,14]` gap 6, fill `$ot-paper` stroke `$ot-line`, width `fill_container(280)`: fila [hora 12/600 `$ot-ink-soft` + precio 14 display `$ot-ink`] (space-between) + clienta 15/600 `$ot-ink` + servicios 12 `$ot-muted` + Estado Badge | clienta/servicios/precio dinámicos; badge por estado |

### Blocs decorativos confirmados del lienzo (no reutilizables: one-offs con layout propio)

- **Widget de reserva** (`$ot-dark-card` r8 stroke `$ot-dark-line`): Steps (badges + connectors 48×1) arriba → Columns [Selection | Calendar | Times] con strokes laterales → Summary (TotalRow + CTA + fine print 12). Tarjeta de servicio: nombre 15/600 `$ot-bone` + botón `Cambiar` 13 `#E08A66` a la derecha + meta 13 `$ot-dark-muted` (`180 min · $210`).
- **Calendario:** header [mes 34 display + 2 botones chevron r999 stroke 1], weekdays 11/600, semanas 4 celdas, legend (dot 4 = libre, muestra = agotado/cerrado, caja stroke `$ot-dark-muted` = hoy). Filas de estilista del widget: Andrea (Colorista senior), Valeria (Colorista), Sin preferencia (Primer horario libre).
- **Collage de resultados:** gran img + stack 340 de dos imgs, gap 16, radios 4.
- **Footer:** CTA final (72 display + botón) / Info columns / **Giant Wordmark** `Onetouch` 300 display color `$ot-dark-card` / bottom bar (13 `$ot-dark-muted` + 3 iconos sociales 18 `$ot-dark-muted`).

---

## 4. Copy inventory (fuente: lienzo)

- Nav: `Servicios · Reservas · Equipo · Galería · Contacto` + CTA `Reservar cita`
- Hero: eyebrow `SALÓN DE BELLEZA · ESTUDIO DE COLOR`; headline `Un solo toque / lo cambia todo.` (2ª línea `$ot-accent`); subhead ya redactado (reserva en 1 minuto, sin llamadas); CTAs `Reservar mi cita` / `Ver servicios y precios`; facts `4.9 · 320 reseñas en Google`, `9 años`, `Hoy · abierto hasta las 7 PM`
- Secciones: `01 — MENÚ DE SERVICIOS` (72px title + intro de precios transparentes), `02 — RESERVAS EN LÍNEA`, `03 — EL EQUIPO`, `04 — RESULTADOS`
- Servicios (completo en lienzo): Cabello desde $40; Color desde $35; Uñas desde $25; Rostro & cejas desde $22
- Footer: `¿Lista para tu próximo cambio?` + `Reservar mi cita`; columnas Visítanos (`Calle Ejemplo 123` / `Ciudad, PR 00000` / `Cómo llegar ↗` en `#E08A66`), Horario (`Lun – Sáb  9:00 AM – 7:00 PM` / `Domingo  cerrado`), Contacto (`(000) 000-0000`, `hola@onetouchsalon.com`, `@onetouchsalon`); bottom bar `© 2026 Onetouch Salon. Todos los derechos reservados.`; **pendiente reemplazar datos reales del salón**

---

## 5. Imágenes

Archivos en `onetouch/`: `generated.png` (hero), `generated-1.png` (servicios), `generated-2..5.png` (equipo), `generated-6..8.png` (resultados/interior). Fill `image` con `mode: "cover"`, radio `4`.

Reglas al generar nuevas con **fal.ai**:
1. Femenino editorial cálido, luz natural de ventana, paleta papel-suelo + terracota.
2. Primera plano/medio para retratos del equipo (mirar a cámara), full-body para haircut/color moments.
3. Nada de texto en imagen, nada de branding inventado.
4. Guardar como `onetouch/generated-N.png` y referenciar `./generated-N.png` en el fill.

---

## 6. Reglas anti-slop (no negociables)

1. **Nunca** inventar gradientes, sombras, bordes redondeados grandes ni glass sobre este sistema.
2. **Nunca** usar colores fuera de los tokens sin registrar variable nueva en el lienzo.
3. Serif = display solamente; jamás usarla en párrafos largos.
4. Los kickers siempre 12px/600/mayúsculas, acompañados de la regla del eyebrow (32×1) o del índice `NN — NOMBRE`.
5. Toda fila del menú compartirá el **bottom stroke** como única línea de división (no cards).
6. Copy en español neutral-caribeño; evitar spanglish salvo términos del oficio (balayage, keratina).
7. Al escalar pantallas nuevas: instanciar los componentes de la biblioteca; no duplicar nodos.

---

## 7. Panel de admin (borrador 2026-10-16)

Vive en el frame **"Onetouch — Admin"** del lienzo (hermano de la landing). Pantallas 1440×900 con `clip: true`. Datos de ejemplo en el diseño; el contenido real vendrá de Supabase (ver `docs/backend-plan.md`).

**Shell — "Admin — Agenda (día)":**

- **Sidebar** 240 fill `$ot-ink`, pad `[28,16,20,16]`, space-between: Logo variante vertical (wordmark `$ot-bone` + sub `SALÓN · ADMIN` `$ot-dark-muted`), caption `GESTIÓN` 11/600 `$ot-dark-muted`, 5 Admin Nav Items (Agenda · Servicios · Equipo · Clientes · Métricas), abajo: divider `$ot-dark-line` + usuaria (avatar 34 r999 "OT" + nombre 13/600 `$ot-bone` + email 11 `$ot-dark-muted`) + `Cerrar sesión` 12 con icono `log-out`.
- **Main** fill `$ot-bone`, pad `[28,40,40,40]` gap 24: fila título (display 40 + sub 14 `$ot-ink-soft`) + Primary Button compacto (`Nueva cita`, pad `[12,22]`, label 14, icono `plus` 16); fila controles (Filter Chips de estilista + nav de día: 2 botones circulares 36 stroke `$ot-line` con `chevron-left/right` + chip `Hoy`); **board** 4 columnas gap 16: header [avatar 30 r999 imagen + nombre 13/600 + `N citas` 11 `$ot-muted`] + Appointment Cards cronológicas intercaladas con chips "libre" (pad `[8,14]`, r6, stroke `$ot-line`, fill `#FFFFFF66`, texto 12 `$ot-muted` centrado).
- Componentes del admin: row **"Admin Row"** de la biblioteca ("Onetouch — Componentes"). Colores nuevos registrados en §2.1.

**Inventario de pantallas:** ✅ Agenda (día) · ⏳ Login, Servicios, Equipo y horarios, Clientes, Métricas · ⏳ pasos 1 (Servicio), 4 (Confirmar) y éxito del booking público en el frame landing (paso 3 existente se reutiliza con datos reales).
