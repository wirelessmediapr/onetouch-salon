import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Booking } from "@/components/sections/Booking";
import { Team } from "@/components/sections/Team";
import { Results } from "@/components/sections/Results";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Booking />
        <Team />
        <Results />
      </main>
      <Footer />
    </>
  );
}
