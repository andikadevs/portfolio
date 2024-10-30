import { SosmedChain } from "@/components/Home";
import { AnimateOnView, Particles, Typing } from "@/components/Global";
import { FaChrome } from "react-icons/fa";

export const Hero = () => {
  const whatIam = ["Web Developer", "Software Engineer", "Determined Learner"];

  return (
    <div id="home" className="relative bg-main h-[100dvh] w-full">
      <Particles id="particles" />
      {/* <HeroImage /> */}
      <SosmedChain />

      <div className="relative h-screen grid grid-cols-1 md:grid-cols-2 w-full z-[1]">
        <div className="flex w-full flex-col md:justify-center md:pl-14 items-center justify-end">
          <AnimateOnView direction="left">
            <div className="flex justify-center flex-col">
              <h1 className="flex items-center gap-2 pb-1 text-center text-accent whitespace-nowrap text-3xl md:text-4xl lg:text-5xl border-b-2 border-accent">
                <FaChrome className="text-accent" /> Fullstack Developer
              </h1>
              <h2 className="text-start text-accent text-xl">
                {`I’m `}
                <Typing texts={whatIam} />
              </h2>
            </div>
          </AnimateOnView>
        </div>
        <AnimateOnView direction="up">
          <div>
            <img
              draggable={false}
              className="hidden md:block absolute bottom-0 h-[70%] md:right-8 xl:right-12 xl:h-[80%] object-contain"
              src="/assets/static/img/avatar.webp"
              alt="Avatar"
            />
          </div>
        </AnimateOnView>
      </div>
    </div>
  );
};
