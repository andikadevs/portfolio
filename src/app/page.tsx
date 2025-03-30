import { Hero, About, Education, Experience, Skills } from "@/sections";

export default function Home() {
  return (
    <div className="bg-background relative text-text">
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
    </div>
  );
}
