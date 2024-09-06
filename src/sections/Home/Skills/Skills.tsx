import { Title } from '@/components/Global';
import Image from 'next/image';
import React from 'react';
import skillsData from './skills.json'; 
import { Skill } from './Skills';

const skills: Skill[] = skillsData;

export const Skills: React.FC = () => {
  return (
    <div className='bg-main h-auto w-full pb-20'>
      <Title
        title='Skills'
        description='Toolkits that help me [complete] all of my [projects]'
      />
      <div className='grid gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
        {skills.map((skill, index) => (
          <a
            key={index}
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            className='cursor-pointer bg-secondary gap-3 flex flex-col items-center px-4 py-8 rounded shadow-xl text-center text-text hover:bg-accent hover:text-secondary transition duration-300 ease-in-out'
          >
            <Image src={skill.src} alt={skill.alt} width={100} height={100} />
            <p className='text-lg'>{skill.alt}</p>
          </a>
        ))}
      </div>
    </div>
  );
};
