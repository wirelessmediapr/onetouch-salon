export type ServiceItem = {
  name: string;
  desc: string;
  duration: string;
  price: string;
};

export type ServiceCategory = {
  name: string;
  from: string;
  items: ServiceItem[];
};

// Copy del lienzo `onetouch/onetouch.pen` — sección 01 — MENÚ DE SERVICIOS.
// TODO(salón): confirmar las descripciones cortas con el negocio.
export const serviceCategories: ServiceCategory[] = [
  {
    name: "Cabello",
    from: "desde $40",
    items: [
      { name: "Corte & estilizado", desc: "Incluye lavado y consulta de look", duration: "60 min", price: "$55" },
      { name: "Blowout", desc: "Doblado con productos sin sulfatos", duration: "45 min", price: "$40" },
      { name: "Keratina alisadora", desc: "Alisado progresivo con consulta previa", duration: "150 min", price: "$180" },
      { name: "Peinado para eventos", desc: "Recogidos y ondas para tu ocasión", duration: "60 min", price: "$75" },
    ],
  },
  {
    name: "Color",
    from: "desde $35",
    items: [
      { name: "Color de raíz", desc: "Retoque de raíz con mezcla profesional", duration: "90 min", price: "$85" },
      { name: "Balayage a mano alzada", desc: "Iluminación natural pintada a mano", duration: "180 min", price: "$210" },
      { name: "Babylights", desc: "Mechas finas de efecto luz", duration: "150 min", price: "$165" },
      { name: "Gloss matizante", desc: "Brillo y tono entre coloraciones", duration: "30 min", price: "$35" },
    ],
  },
  {
    name: "Uñas",
    from: "desde $25",
    items: [
      { name: "Manicura clásica", desc: "Corte, limado y esmalte tradicional", duration: "40 min", price: "$25" },
      { name: "Manicura en gel", desc: "Esmalte en gel de larga duración", duration: "60 min", price: "$40" },
      { name: "Pedicura spa", desc: "Exfoliación, masaje y esmalte", duration: "60 min", price: "$45" },
      { name: "Uñas esculpidas", desc: "Extensión y diseño a tu medida", duration: "90 min", price: "$65" },
    ],
  },
  {
    name: "Rostro & cejas",
    from: "desde $22",
    items: [
      { name: "Facial hidratante", desc: "Limpieza profunda y mascarilla", duration: "60 min", price: "$70" },
      { name: "Diseño de cejas", desc: "Perfilado con pinza y tintura", duration: "30 min", price: "$22" },
      { name: "Laminado de cejas", desc: "Fijación y volumen natural", duration: "45 min", price: "$55" },
      { name: "Lifting de pestañas", desc: "Curvatura duradera sin extensiones", duration: "60 min", price: "$65" },
    ],
  },
];

export type TeamMember = {
  name: string;
  role: string;
  specialties: string;
  image: string;
};

export const teamMembers: TeamMember[] = [
  { name: "Andrea Ríos", role: "Colorista senior", specialties: "Balayage · rubios · corrección de color", image: "/images/generated-3.png" },
  { name: "Camila Ortiz", role: "Estilista & cortes", specialties: "Cortes bob · cabello rizado · novias", image: "/images/generated-2.png" },
  { name: "Valeria Cruz", role: "Colorista", specialties: "Babylights · gloss · keratina", image: "/images/generated-5.png" },
  { name: "Sofía Méndez", role: "Uñas & cejas", specialties: "Gel · nail art · laminado de cejas", image: "/images/generated-4.png" },
];

export type DayTone = "past" | "default" | "shaded" | "today" | "selected";

export type CalendarDay = { n: number; tone: DayTone };

// Wireframe estático del calendario (octubre 2026), fiel al lienzo.
export const calendarDays: (CalendarDay | null)[] = [
  null, null, null,
  { n: 1, tone: "past" },
  { n: 2, tone: "past" },
  { n: 3, tone: "past" },
  { n: 4, tone: "past" },
  { n: 5, tone: "past" },
  { n: 6, tone: "past" },
  { n: 7, tone: "past" },
  { n: 8, tone: "past" },
  { n: 9, tone: "past" },
  { n: 10, tone: "today" },
  { n: 11, tone: "default" },
  { n: 12, tone: "shaded" },
  { n: 13, tone: "default" },
  { n: 14, tone: "selected" },
  { n: 15, tone: "shaded" },
  { n: 16, tone: "default" },
  { n: 17, tone: "shaded" },
  { n: 18, tone: "default" },
  { n: 19, tone: "shaded" },
  { n: 20, tone: "shaded" },
  { n: 21, tone: "shaded" },
  { n: 22, tone: "shaded" },
  { n: 23, tone: "shaded" },
  { n: 24, tone: "default" },
  { n: 25, tone: "default" },
  { n: 26, tone: "shaded" },
  { n: 27, tone: "shaded" },
  { n: 28, tone: "shaded" },
  { n: 29, tone: "shaded" },
  { n: 30, tone: "shaded" },
  { n: 31, tone: "default" },
];

export type TimeSlotState = "free" | "busy" | "selected";
export type TimeSlot = { time: string; state: TimeSlotState };
export type TimeGroup = { label: string; rows: TimeSlot[][] };

// Horario inicial del lienzo (el widget permite cambiar la selección).
export const timeGroups: TimeGroup[] = [
  {
    label: "MAÑANA",
    rows: [
      [ { time: "9:00", state: "busy" }, { time: "9:30", state: "free" }, { time: "10:00", state: "busy" } ],
      [ { time: "11:00", state: "selected" }, { time: "11:30", state: "free" }, { time: "12:00", state: "busy" } ],
    ],
  },
  {
    label: "TARDE",
    rows: [
      [ { time: "1:30", state: "free" }, { time: "2:00", state: "busy" }, { time: "3:30", state: "free" } ],
      [ { time: "4:00", state: "busy" }, { time: "5:00", state: "free" }, { time: "6:00", state: "busy" } ],
    ],
  },
];

export const bookingSummary = {
  service: "Balayage · Andrea",
  when: "Mié 14 oct · 11:00 AM",
  price: "$210",
  fine: "Sin depósito. Cancela gratis hasta 24 h antes.",
};
