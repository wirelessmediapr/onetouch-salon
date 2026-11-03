import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Reservar cita — OneTouch Salon",
  description: "Escoge tus servicios, tu estilista y tu hora. Sin llamadas, sin depósito.",
};

export default function ReservarPage() {
  return <BookingFlow />;
}
