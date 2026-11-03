import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { InfoBar, Services } from "@/components/sections/Services";
import { Trust } from "@/components/sections/Trust";
import { Features } from "@/components/sections/Features";
import { Team } from "@/components/sections/Team";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <InfoBar />
        <Trust />
        <Features />
        <Team />
      </main>
      <Footer />
    </>
  );
}
