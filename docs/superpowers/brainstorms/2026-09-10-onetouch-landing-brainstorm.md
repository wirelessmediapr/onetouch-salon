# Brainstorming: onetouch-landing

**Date Started:** 2026-09-10
**Status:** In Progress
**Current Phase:** alignment
**Final Spec:** <spec path, filled when Status becomes Done>
**Last Updated:** 2026-09-10 19:50 UTC

## Original User Request

> quiero un landing para un website de un salon de belleza que se llama onetouch salon. ya tengo el dominio comprado. el repositorio de github es git@github.com:wirelessmediapr/onetouch-salon.git para que comitees todo, de ahi yo hago elk deploy a vercerl. algo brutal, no aislop. usa un skill adecuado(o varios) para este landing este landing. que contenga imagenes. para las imagenes necesito los prompts para generarlas con fal.ai

---

## Phase A: Alignment Decision Log

### Setup decisions (pre-Phase A)
**Topic slug:** onetouch-landing
**Repo:** git@github.com:wirelessmediapr/onetouch-salon.git cloned into D:\Projects\onetouch.salon (empty repo, branch main)
**Worktree consent:** asked, choice: no (trabajar aquí, sin worktree aislado)
**Timestamp:** 2026-09-10 19:50 UTC

### User constraint (2026-09-10 20:00 UTC)
**Constraint:** usar skills de diseño (ui-ux-pro-max, etc.) para el landing.
**Disposition:** aceptado — se invocarán en Phase B/implementación post-spec (respetando HARD-GATE brainstorming: no implementation skills hasta spec aprobado). Candidatos: ui-ux-pro-max, design-taste-frontend, epic-design, cinematic-landing-director, imagegen-frontend-web, high-end-visual-design.
**Timestamp:** 2026-09-10 20:00 UTC

### Q1: Dirección visual
**Options Presented:**
- A: Dark Luxury Editorial (Recomendado) — negro + champagne/dorado, serif gigante, scroll cinematográfico
- B: Brutalist energético — type oversized, marquee, colores vivos, vibe urbano
- C: Minimal premium calmo — beige/nude, whitespace, soft
**Decision:** A: Dark Luxury Editorial
**Rationale:** usuario eligió recomendado; brutal-premium, cero slop, ideal salón
**Timestamp:** 2026-09-10 20:05 UTC

### Q2: Stack para Vercel
**Options Presented:**
- A: Next.js (Recomendado) — App Router + Tailwind + framer-motion
- B: Astro + Tailwind — más rápido, solo estática
- C: HTML estático — sin build, no escalable
**Decision:** A: Next.js
**Rationale:** usuario eligió recomendado; deploy 1-click Vercel, escalable
**Timestamp:** 2026-09-10 20:07 UTC

### Q3: <pending>
