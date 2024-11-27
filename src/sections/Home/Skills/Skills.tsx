/** @format */

"use client";

import { useState, useEffect } from "react";
import { Title } from "@/components/Global";
import Image from "next/image";
import React from "react";
import skillsData from "./Skills.json";
import { SkillsInterface } from "./SkillsInterface";
import { useSpring, animated, useInView } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const skills: SkillsInterface[] = skillsData;

const MobileSkills = () => {
  const [showScrollHint, setShowScrollHint] = useState(true);

  const springProps = useSpring({
    from: { x: 10, opacity: 0 },
    to: { x: 0, opacity: 1 },
    config: {
      duration: 1000,
    },
    loop: {
      reverse: true,
    },
    pause: !showScrollHint,
  });

  useEffect(() => {
    const container = document.querySelector(".skills-container");
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      if (container && container.scrollLeft > 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setShowScrollHint(false);
        }, 100);
      }
    };

    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative mb-16">
      {showScrollHint && (
        <animated.div
          style={springProps}
          className="absolute right-4 top-[54px] -translate-y-1/2 z-10 text-accent pointer-events-none flex items-center"
        >
          <div className="flex flex-col items-center gap-1">
            <BiChevronRight size={36} />
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>
        </animated.div>
      )}
      <div className="skills-container overflow-x-auto snap-x snap-mandatory w-full scrollbar-hide px-4 scrollbar-hidden">
        <div className="flex gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="snap-center min-w-[160px] !min-h-[160px] flex-shrink-0 p-2"
            >
              <div className="w-full h-full cursor-pointer relative bg-secondary gap-2 flex justify-between flex-col items-center px-2 py-4 rounded shadow-xl text-center text-text hover:bg-accent hover:text-secondary transition duration-300 ease-in-out">
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Learn more about ${skill.alt}`}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <Image
                    draggable={false}
                    src={skill.src}
                    alt={`${skill.alt} logo`}
                    width={50}
                    height={50}
                    className={`w-14 h-14 mb-4 ${
                      skill.alt.toLowerCase() === "react"
                        ? "animate-rotate"
                        : ""
                    }`}
                  />
                  <h3 className="text-sm">{skill.alt}</h3>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DesktopSkills = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const totalSlides = Math.ceil(skills.length / itemsPerView) - 1;

  const [slideProps, slideApi] = useSpring(() => ({
    x: 0,
    config: { tension: 280, friction: 60 },
  }));

  const bind = useDrag(
    ({ movement: [mx], direction: [xDir], down, distance: [dx] }) => {
      const threshold = 50;
      if (!down && dx > threshold) {
        const newIndex =
          xDir > 0
            ? Math.max(0, currentIndex - 1)
            : Math.min(totalSlides - 1, currentIndex + 1);
        setCurrentIndex(newIndex);
        slideApi.start({ x: -(newIndex * (100 / totalSlides)), immediate: false });
      } else {
        slideApi.start({
          x: down
            ? -(currentIndex * (100 / totalSlides)) + (mx / window.innerWidth) * 100
            : -(currentIndex * (100 / totalSlides)),
          immediate: down,
        });
      }
    },
    {
      axis: "x",
      filterTaps: true,
      bounds: { left: -100, right: 0 },
      rubberband: true,
    }
  );

  const handleNavigation = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? Math.max(0, currentIndex - 1)
        : Math.min(totalSlides - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    slideApi.start({ x: -(newIndex * (100 / totalSlides)) });
  };

  return (
    <div className="relative px-4">
      <button
        onClick={() => handleNavigation("prev")}
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-secondary rounded-full shadow-xl hover:bg-accent transition-colors ${
          currentIndex === 0
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100 cursor-pointer"
        }`}
        disabled={currentIndex === 0}
        aria-label="Previous skills"
      >
        <BiChevronLeft size={24} />
      </button>

      <button
        onClick={() => handleNavigation("next")}
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-secondary rounded-full shadow-xl hover:bg-accent transition-colors ${
          currentIndex === totalSlides - 1
            ? "opacity-50 cursor-not-allowed"
            : "opacity-100 cursor-pointer"
        }`}
        disabled={currentIndex === totalSlides - 1}
        aria-label="Next skills"
      >
        <BiChevronRight size={24} />
      </button>

      <div className="overflow-hidden">
        <animated.div
          {...bind()}
          style={{
            ...slideProps,
            transform: slideProps.x.to((x) => `translateX(${x}%)`),
            width: `${skills.length * 220}px`,
            display: 'flex',
          }}
          className="flex"
        >
          {skills.map((skill, index) => (
            <animated.div 
              key={index} 
              style={{ width: '220px', flexShrink: 0 }}
              className="px-3"
            >
              <div className="cursor-pointer relative bg-secondary gap-3 flex justify-between flex-col items-center px-4 py-8 rounded shadow-xl text-center text-text hover:bg-accent hover:text-secondary transition duration-300 ease-in-out">
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Learn more about ${skill.alt}`}
                  className="flex flex-col items-center"
                >
                  <Image
                    draggable={false}
                    src={skill.src}
                    alt={`${skill.alt} logo`}
                    width={50}
                    height={50}
                    className={`w-16 h-16 md:w-20 md:h-20 mb-4 ${
                      skill.alt.toLowerCase() === "react"
                        ? "animate-rotate"
                        : ""
                    }`}
                  />
                  <h3 className="text-base md:text-lg">{skill.alt}</h3>
                </a>
              </div>
            </animated.div>
          ))}
        </animated.div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              slideApi.start({ x: -(index * (100 / totalSlides)) });
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-accent w-4" : "bg-secondary"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const Skills: React.FC = () => {
  const [ref] = useInView();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Check initially
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="skills"
      aria-label="Skills and Technologies"
      className="bg-main h-auto w-full mb-10 sm:mb-20"
    >
      <animated.div ref={ref}>
        <Title title="Skills" description="Swipe to explore my toolkit" />
        {isMobile ? <MobileSkills /> : <DesktopSkills />}
      </animated.div>
    </section>
  );
};
