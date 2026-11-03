export type ServiceItem = {
  name: string;
  desc: string;
  duration: string;
  price: string;
  tag?: string;
};

export type ServiceCategory = {
  name: string;
  from: string;
  items: ServiceItem[];
};

// Menú completo (usado en /reservar y en los bloques destacados de la landing v3).
export const serviceCategories: ServiceCategory[] = [
  {
    name: "Cabello",
    from: "desde $40",
    items: [
      { name: "Corte & estilizado", desc: "Lavado, corte a la medida y secado", duration: "60 min", price: "$55" },
      { name: "Blowout", desc: "Secado con volumen y brillo", duration: "45 min", price: "$40" },
      { name: "Keratina alisadora", desc: "Elimina el frizz hasta por 4 meses", duration: "150 min", price: "$180", tag: "Más pedido" },
      { name: "Peinado para eventos", desc: "Recogidos, ondas y novias", duration: "60 min", price: "$75" },
    ],
  },
  {
    name: "Color",
    from: "desde $35",
    items: [
      { name: "Color de raíz", desc: "Retoque de un solo tono", duration: "90 min", price: "$85" },
      { name: "Balayage a mano alzada", desc: "Luz natural, crecimiento suave", duration: "180 min", price: "$210", tag: "Firma de la casa" },
      { name: "Babylights", desc: "Reflejos finos y luminosos", duration: "150 min", price: "$165" },
      { name: "Gloss matizante", desc: "Brillo y corrección de tono", duration: "30 min", price: "$35" },
    ],
  },
  {
    name: "Uñas",
    from: "desde $25",
    items: [
      { name: "Manicura clásica", desc: "Limado, cutícula y esmalte", duration: "40 min", price: "$25" },
      { name: "Manicura en gel", desc: "Acabado brillante hasta 3 semanas", duration: "60 min", price: "$40" },
      { name: "Pedicura spa", desc: "Exfoliación, masaje y esmalte", duration: "60 min", price: "$45" },
      { name: "Uñas esculpidas", desc: "Acrílico o polygel, diseño a elección", duration: "90 min", price: "$65" },
    ],
  },
  {
    name: "Rostro & cejas",
    from: "desde $22",
    items: [
      { name: "Facial hidratante", desc: "Limpieza profunda y mascarilla", duration: "60 min", price: "$70" },
      { name: "Diseño de cejas", desc: "Cera o pinza según tu rostro", duration: "30 min", price: "$22" },
      { name: "Laminado de cejas", desc: "Cejas peinadas y definidas", duration: "45 min", price: "$55" },
      { name: "Lifting de pestañas", desc: "Curvatura natural por 6 semanas", duration: "60 min", price: "$65" },
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


export const minutesOf = (duration: string) => Number(duration.replace(/\D/g, ""));
export const priceOf = (price: string) => Number(price.replace(/\D/g, ""));

export const allServices = serviceCategories.flatMap((c) => c.items.map((i) => ({ ...i, category: c.name })));

// TODO(salón): testimonios 2 y 3 son placeholders del lienzo — confirmar.
export const testimonials = [
  { quote: "“Salí con el rubio que llevaba años buscando. Reservé a las 11 de la noche desde el celular.”", name: "Natalia R.", detail: "Balayage con Andrea", image: "/images/generated-6.png" },
  { quote: "“Camila entendió mis rizos a la primera. Por fin un corte que no tengo que planchar.”", name: "Gabriela M.", detail: "Corte con Camila", image: "/images/generated-2.png" },
  { quote: "“Puntuales, precios claros y el gel me duró tres semanas completas.”", name: "Yarelis T.", detail: "Manicura en gel con Sofía", image: "/images/generated-4.png" },
];

export const bookingSteps = [
  { index: "01", title: "Escoge tus servicios", body: "Combina corte, color y uñas en una sola cita. Ves el total y la duración al instante." },
  { index: "02", title: "Tu estilista y tu hora", body: "Elige con quién, o deja que te demos el primer horario libre. Disponibilidad real, 60 días adelante." },
  { index: "03", title: "Confirma con tu celular", body: "Te llega la confirmación por SMS y email, con un enlace para cambiar o cancelar." },
];

// TODO(salón): respuestas a confirmar (depósito, ATH Móvil, tardanza).
export const faqs = [
  { q: "¿Puedo cancelar o mover mi cita?", a: "Sí. Con el enlace de tu confirmación puedes cancelar o cambiar la hora hasta 2 horas antes, sin cargos." },
  { q: "¿Necesito pagar un depósito?", a: "No. Reservas sin depósito y pagas en el salón al terminar tu servicio." },
  { q: "¿Puedo reservar varios servicios a la vez?", a: "Claro. Escoge todos los que quieras en el paso 1 y calculamos la duración total de tu cita." },
  { q: "¿Con cuánta anticipación puedo reservar?", a: "Puedes reservar desde 2 horas antes hasta 60 días adelante, según la disponibilidad de cada estilista." },
  { q: "¿Qué pasa si llego tarde?", a: "Te esperamos hasta 15 minutos. Después de eso puede que tengamos que acortar o mover tu servicio." },
  { q: "¿Aceptan ATH Móvil?", a: "Sí, además de efectivo y tarjetas de crédito o débito." },
];

// TODO(salón): datos reales de contacto (placeholders del lienzo).
export const contact = {
  street: "Calle Ejemplo 123",
  city: "Ciudad, PR 00000",
  parking: "Estacionamiento gratis al frente",
  hours: "Lun – Sáb · 9:00 AM – 7:00 PM",
  hoursShort: "Lun – Sáb · 9 AM – 7 PM",
  closed: "Domingo cerrado",
  phone: "(000) 000-0000",
  phoneHref: "tel:+10000000000",
  email: "hola@onetouchsalon.com",
  instagram: "@onetouchsalon",
  mapsHref: "#",
};

export type Stylist = { name: string; role: string; image?: string; next: string };

export const stylists: Stylist[] = [
  { name: "Sin preferencia", role: "Primer horario libre", next: "Te damos el primer horario libre" },
  { name: "Andrea Ríos", role: "Colorista senior", image: "/images/generated-3.png", next: "próximo: mañana 10:30 AM" },
  { name: "Valeria Cruz", role: "Colorista", image: "/images/generated-5.png", next: "próximo: hoy 3:00 PM" },
  { name: "Camila Ortiz", role: "Estilista & cortes", image: "/images/generated-2.png", next: "próximo: jueves 9:00 AM" },
  { name: "Sofía Méndez", role: "Uñas & cejas", image: "/images/generated-4.png", next: "próximo: hoy 5:00 PM" },
];

export type Slot = { time: string; busy?: boolean };

// Demo estática hasta conectar el motor de disponibilidad (docs/backend-plan.md).
export const slotGroups: { label: string; slots: Slot[] }[] = [
  { label: "Mañana", slots: [{ time: "9:00 AM" }, { time: "10:30 AM", busy: true }, { time: "11:00 AM" }, { time: "11:30 AM" }] },
  { label: "Tarde", slots: [{ time: "12:30 PM" }, { time: "2:00 PM" }, { time: "3:00 PM", busy: true }, { time: "4:30 PM" }, { time: "5:00 PM" }] },
];

// Días sin horarios (demo): agotados en el mes visible.
export const soldOutDays = [6, 11, 20];

// ===== Landing v3 “Noir & Oro” (lienzo: Onetouch v3 — Landing) =====

export type Highlight = { name: string; icon: "scissors" | "palette" | "sparkles" | "hand" | "eye" | "flower"; from: string; image: string };

export const highlights: Highlight[] = [
  { name: "Cortes & peinados", icon: "scissors", from: "Desde $55", image: "/images/v3/svc-cortes.jpg" },
  { name: "Color & balayage", icon: "palette", from: "Desde $85", image: "/images/v3/svc-color.jpg" },
  { name: "Keratina", icon: "sparkles", from: "Desde $180", image: "/images/v3/svc-keratina.jpg" },
  { name: "Uñas", icon: "hand", from: "Desde $25", image: "/images/v3/svc-unas.jpg" },
  { name: "Cejas & pestañas", icon: "eye", from: "Desde $22", image: "/images/v3/svc-cejas.jpg" },
  { name: "Faciales", icon: "flower", from: "Desde $70", image: "/images/v3/svc-faciales.jpg" },
];

export const commitments = ["Manos expertas", "Productos premium", "Atención personal", "Higiene estricta", "Resultados constantes"];

const pick = (names: string[]) => names.map((n) => allServices.find((s) => s.name === n)!);

export const features = [
  {
    id: "cabello",
    kicker: "01 · Cabello",
    line1: "Cabello sano",
    line2: "empieza con manos expertas.",
    body: "Brillo, suavidad y confianza con tratamientos a la medida de tu cabello.",
    image: "/images/v3/cabello.jpg",
    alt: "Estilista lavando el cabello de una clienta en el salón",
    items: pick(["Corte & estilizado", "Keratina alisadora", "Balayage a mano alzada", "Peinado para eventos"]),
  },
  {
    id: "unas",
    kicker: "02 · Uñas",
    line1: "Uñas bonitas,",
    line2: "tú feliz.",
    body: "Manicura y pedicura con acabado impecable que dura semanas.",
    image: "/images/v3/unas.jpg",
    alt: "Manicurista aplicando esmalte en gel color nude",
    items: pick(["Manicura en gel", "Pedicura spa", "Uñas esculpidas", "Manicura clásica"]),
  },
];

// TODO(salón): año de apertura (placeholder derivado de los “9 años” de v2).
export const since = "2017";
