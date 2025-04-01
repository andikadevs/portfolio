import { Button } from "@/components/ui/Button";
import { Hero, About, Education, Experience, Skills } from "@/sections";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background relative text-text">
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <div className="flex justify-center py-16">
        <Button href="/portfolio" variant="primary" icon={<ArrowRightIcon />}>
          View My Portfolio
        </Button>
      </div>
    </div>
  );
}
