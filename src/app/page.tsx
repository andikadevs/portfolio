import { About, Compaines, Hero } from "@/sections/Home";

export default function Home() {
  return (
    <main className="bg-main">
      <Hero/>
      <About/>
      <Compaines/>
    </main>
  );
}
