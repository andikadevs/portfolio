import { SosmedChain } from "@/components/Home";
import { AnimateOnView, Particles, Typing } from "@/components/Global";
import { FaChrome } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Andika Dwi Saputra - Full Stack Developer & Software Engineer",
  description: "Experienced Full Stack Developer specializing in React, Next.js, and Laravel development. Building scalable web applications with modern architecture.",
};

const heroSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Person",
    "name": "Andika Dwi Saputra",
    "jobTitle": "Full Stack Developer",
    "description": "Experienced Full Stack Developer specializing in modern web technologies and software engineering",
    "image": "/assets/static/img/avatar.webp",
    "url": "https://andikads.cloud",
    "knowsAbout": [
      "Full Stack Development",
      "Software Engineering",
      "Web Development"
    ]
  }
};

export const Hero = () => {
  const roles = [
    "Fullstack Developer",
    "Software Engineer",
    "Determined Learner"
  ];

  return (
    <section 
      id="home" 
      className="relative bg-main h-[100dvh] w-full"
      aria-label="Hero Section"
      itemScope 
      itemType="https://schema.org/AboutPage"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(heroSchema) }}
      />

      <Particles 
        id="particles" 
        aria-hidden="true" 
      />

      <SosmedChain />

      <div 
        className="relative h-full grid grid-cols-1 md:grid-cols-2 w-full z-[1]"
        itemScope 
        itemType="https://schema.org/Person"
      >
        <div className="flex w-full flex-col md:justify-center md:pl-14 items-center justify-end">
          <AnimateOnView direction="left">
            <div className="flex sm:justify-center flex-col">
              <h1 
                className="flex items-center gap-2 pb-1 text-center text-accent sm:whitespace-nowrap text-3xl md:text-4xl lg:text-5xl border-b-2 border-accent"
                itemProp="jobTitle"
              >
                <FaChrome 
                  className="text-accent" 
                  aria-hidden="true" 
                  role="img" 
                /> 
                <span>Fullstack Developer</span>
              </h1>
              <h2 
                className="text-start text-accent text-xl"
                itemProp="description"
              >
                <span>I`m </span>
                <Typing 
                  texts={roles} 
                  aria-label="Professional roles"
                />
              </h2>

              <div className="sr-only">
                <p itemProp="description">
                  Andika Dwi Saputra is a Full Stack Developer and Software Engineer 
                  specializing in React, Next.js, Laravel, and modern web technologies. 
                  Creating scalable, user-centric applications with clean code practices.
                </p>
                <meta itemProp="name" content="Andika Dwi Saputra" />
                <meta itemProp="email" content="andikadwisaputra.dev@gmail.com" />
                <meta itemProp="url" content="https://andikads.cloud" />
              </div>
            </div>
          </AnimateOnView>
        </div>

        <AnimateOnView direction="up">
          <div>
            <img
              src="/assets/static/img/avatar.webp"
              alt="Andika Dwi Saputra - Full Stack Developer"
              className="p-0 m-0 hidden md:block absolute bottom-0 h-[70%] md:right-8 xl:right-12 xl:h-[80%] object-contain"
              itemProp="image"
              sizes="(max-width: 768px) 0vw, (max-width: 1200px) 50vw, 40vw"
            />
          </div>
        </AnimateOnView>
      </div>
    </section>
  );
};
