import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Booking } from "@/components/sections/Booking";
import { Team } from "@/components/sections/Team";
import { Results } from "@/components/sections/Results";
import { VisitFaq } from "@/components/sections/VisitFaq";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Booking />
        <Team />
        <Results />
        <VisitFaq />
      </main>
      <Footer />
    </>
  );
}
