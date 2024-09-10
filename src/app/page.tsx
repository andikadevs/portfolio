import { Navbar } from "@/components/Global";
import { About, Certificate, Compaines, Education, Experience, Hero, Portfolio, Skills } from "@/sections/Home";

export default function Home() {
  return (
    <main className="bg-main relative">

      <Navbar/>

      <Hero/>
      <About/>
      <Compaines/>
      <Skills/>
      <Education/>
      <Experience/>
      <Portfolio/>
      <Certificate/>
    </main>
  );
}
