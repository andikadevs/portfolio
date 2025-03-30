import { Hero, About, Experience, Skills } from "@/sections";

export default function Home() {
  return (
    <div className="bg-background relative text-text">
      <Hero />
      <About />
      <Experience />
      <Skills />
    </div>
  );
}
