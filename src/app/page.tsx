import { About, Certificate, Compaines, Education, Experience, Hero, Portfolio, Skills } from "@/sections/Home";

export default function Home() {
  return (
    <main className="bg-main">
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
