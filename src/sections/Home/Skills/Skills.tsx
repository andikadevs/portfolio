'use client';

import { useState } from 'react';
import { Title, Tooltip } from '@/components/Global';
import Image from 'next/image';
import React from 'react';
import skillsData from './Skills.json'; 
import { SkillsInterface } from './SkillsInterface';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import { useSpring, animated, useInView } from '@react-spring/web';

const skills: SkillsInterface[] = skillsData;

export const Skills: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const [ref, inView] = useInView();

  const itemAnimations = useSpring({
    from: { 
      opacity: 0, 
      transform: 'scale(0.5) rotate(-10deg)',
    },
    to: {
      opacity: inView ? 1 : 0, 
      transform: inView ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-10deg)',
    },
    config: {
      tension: 300,
      friction: 20,
    }
  });

  const scrollAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0px)' : 'translateY(50px)' },
    config: { tension: 300, friction: 20 }
  });

  const gridAnimation = useSpring({
    maxHeight: showAll ? 2000 : 400,
    opacity: 1,
    config: { tension: 280, friction: 60 }
  });

  const buttonAnimation = useSpring({
    scale: showAll ? 0.95 : 1,
    rotate: showAll ? 180 : 0,
    config: { tension: 300, friction: 10 }
  });

  const displayedSkills = showAll ? skills : skills.slice(0, 12);

  return (
    <section 
      id='skills' 
      aria-label="Skills and Technologies"
      className='bg-main h-auto w-full mb-10 sm:mb-20'
    >
      <animated.div ref={ref} style={scrollAnimation}>
        <Title
          title='Skills'
          description='Toolkits that help me [complete] all of my [projects]'
        />
        <animated.div 
          role="list"
          aria-label="Skills grid"
          style={gridAnimation}
          className={`grid gap-3 sm:gap-4 px-2 sm:px-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 transition-all duration-500 ease-in-out overflow-hidden`}
        >
          {displayedSkills.map((skill, index) => (
            <animated.div
              key={index}
              role="listitem"
              style={{
                ...itemAnimations,
                transform: itemAnimations.transform.to(
                  (t) => `${t} scale(${inView ? 1 : 0.5}) rotate(${inView ? 0 : -10}deg)`
                ),
                transition: `all ${index * 100}ms`,
              }}
              className='cursor-pointer relative bg-secondary gap-2 sm:gap-3 flex justify-between flex-col items-center px-2 sm:px-4 py-4 sm:py-8 rounded shadow-xl text-center text-text hover:bg-accent hover:text-secondary transition duration-300 ease-in-out'
            >
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
                  className={`w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-4 ${skill.alt.toLowerCase() === 'react' ? 'animate-rotate' : ''}`} 
                />
                <h3 className='text-sm sm:text-base md:text-lg'>{skill.alt}</h3>
              </a>
            </animated.div>
          ))}
        </animated.div>

        {skills.length > 12 && (
          <animated.div 
            style={scrollAnimation} 
            className='text-center mt-4 sm:mt-8 flex justify-center px-4'
          >
            <animated.button
              onClick={() => setShowAll(!showAll)}
              style={{
                transform: buttonAnimation.scale.to(s => `scale(${s})`),
              }}
              aria-expanded={showAll}
              aria-controls="skills-grid"
              className='relative bg-secondary text-accent px-4 sm:px-6 py-2 sm:py-3 rounded shadow-lg hover:text-secondary hover:bg-accent transition duration-300 ease-in-out flex items-center justify-center group text-sm sm:text-base'
            >
              {showAll ? (
                <>
                  <animated.div
                    style={{
                      transform: buttonAnimation.rotate.to(r => `rotate(${r}deg)`)
                    }}
                  >
                    <MdArrowUpward className='mr-2 transform group-hover:translate-y-[-2px] transition-transform' />
                  </animated.div>
                  Show Less
                </>
              ) : (
                <Tooltip hasArrow position='top' label='Let`s see what else i can do!'>
                  <div className="flex items-center">
                    <animated.div
                      style={{
                        transform: buttonAnimation.rotate.to(r => `rotate(${r}deg)`)
                      }}
                    >
                      <MdArrowDownward className='mr-2 inline transform group-hover:translate-y-[2px] transition-transform' />
                    </animated.div>
                    Show More
                  </div>
                </Tooltip>
              )}
            </animated.button>
          </animated.div>
        )}
      </animated.div>
    </section>
  );
};
