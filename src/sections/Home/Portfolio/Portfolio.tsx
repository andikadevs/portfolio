import React from 'react';
import { Title } from '@/components/Global';
import { PortfolioCard } from '@/components/Home';
import data from './Portfolio.json'

export const Portfolio: React.FC = () => {
  return (
    <div className='bg-main h-auto w-full px-6 pb-20'>
      <Title
        title='Portfolio'
        description='Check out my wonderful [projects] & [achievements] that I have built throughout my journey!'
        className='mb-6'
      />
      <div className='grid gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
        {data.map((project) => (
          <PortfolioCard
            key={project.title}
            title={project.title}
            imgSrc={project.imgSrc}
            description={project.description}
            stacks={project.stacks}
            url={project.url}
          />
        ))}
      </div>
    </div>
  );
};
