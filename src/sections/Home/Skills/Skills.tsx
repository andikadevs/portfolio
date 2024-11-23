'use client';

import { useState } from 'react';
import { Title } from '@/components/Global';
import Image from 'next/image';
import React from 'react';
import skillsData from './Skills.json'; 
import { SkillsInterface } from './SkillsInterface';
import { useSpring, animated, useInView } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

const skills: SkillsInterface[] = skillsData;

export const Skills: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref] = useInView();

  const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 6;
  const totalSlides = Math.ceil(skills.length / itemsPerView);

  const [slideProps, slideApi] = useSpring(() => ({
    x: 0,
    config: { tension: 280, friction: 60 },
  }));

  const bind = useDrag(({ movement: [mx], direction: [xDir], down, distance: [dx] }) => {
    const threshold = 50;
    if (!down && dx > threshold) {
      const newIndex = xDir > 0
        ? Math.max(0, currentIndex - 1)
        : Math.min(totalSlides - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
      slideApi.start({ x: -newIndex * 100 });
    } else {
      slideApi.start({
        x: down ? -currentIndex * 100 + (mx / window.innerWidth) * 100 : -currentIndex * 100,
      });
    }
  }, {
    axis: 'x',
    filterTaps: true,
    bounds: { left: -100 * (totalSlides - 1), right: 0 },
    rubberband: true,
  });

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? Math.max(0, currentIndex - 1)
      : Math.min(totalSlides - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    slideApi.start({ x: -newIndex * 100 });
  };

  return (
    <section id="skills" aria-label="Skills and Technologies" className="bg-main h-auto w-full mb-10 sm:mb-20">
      <animated.div ref={ref}>
        <Title title="Skills" description="Swipe to explore my toolkit" />

        <div className="relative px-4">
          {/* Navigation Arrows */}
          <button
            onClick={() => handleNavigation('prev')}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-secondary rounded-full shadow-xl hover:bg-accent transition-colors ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
            }`}
            disabled={currentIndex === 0}
            aria-label="Previous skills"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => handleNavigation('next')}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-secondary rounded-full shadow-xl hover:bg-accent transition-colors ${
              currentIndex === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
            }`}
            disabled={currentIndex === totalSlides - 1}
            aria-label="Next skills"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Skills Slider */}
          <div className="overflow-hidden">
            <animated.div
              {...bind()}
              style={{
                ...slideProps,
                transform: slideProps.x.to((x) => `translateX(${x}%)`),
              }}
              className="flex touch-pan-y"
            >
              {skills.map((skill, index) => (
                <animated.div
                  key={index}
                  className="w-[50%] sm:w-[16.666%] flex-shrink-0 p-2"
                >
                  <div className="cursor-pointer relative bg-secondary gap-2 sm:gap-3 flex justify-between flex-col items-center px-2 sm:px-4 py-4 sm:py-8 rounded shadow-xl text-center text-text hover:bg-accent hover:text-secondary transition duration-300 ease-in-out">
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
                        className={`w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-4 ${
                          skill.alt.toLowerCase() === 'react' ? 'animate-rotate' : ''
                        }`}
                      />
                      <h3 className="text-sm sm:text-base md:text-lg">{skill.alt}</h3>
                    </a>
                  </div>
                </animated.div>
              ))}
            </animated.div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                slideApi.start({ x: -index * 100 });
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? 'bg-accent w-4' : 'bg-secondary'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </animated.div>
    </section>
  );
};
