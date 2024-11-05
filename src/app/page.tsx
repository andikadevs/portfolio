import { Navbar, Facts, Footer, Particles } from "@/components/Global";
import { About, Certificate, Companies, Education, Experience, Hero, Portfolio, Skills } from "@/sections/Home";

export default function Home() {
  return (
    <main className="bg-main relative">
      <Particles id="particles" />
      <Navbar />
      <Facts />

      {/* Contents */}
      <Hero />
      <About />
      <Companies />
      <Skills />
      <Education />
      <Experience />
      <Portfolio />
      <Certificate />

      <Footer/>
    </main>
  );
}
