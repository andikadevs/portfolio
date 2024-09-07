import React from 'react';
import { Title } from '@/components/Global';

const projects = [
  // Example project data
  { id: 1, title: 'Project 1', imgSrc: 'assets/static/img/Portfolio/attendify.webp', description: 'Description of Project 1' },
  { id: 2, title: 'Project 2', imgSrc: 'assets/static/img/Portfolio/attendify.webp', description: 'Description of Project 2' },
  { id: 3, title: 'Project 3', imgSrc: 'assets/static/img/Portfolio/attendify.webp', description: 'Description of Project 3' },
  // Add more projects as needed
];

export const Portfolio: React.FC = () => {
  return (
    <div className='bg-main h-auto w-full px-6 pb-20'>
      <Title
        title='Portfolio'
        description='Check out my wonderful [projects] & [achievements] that I have built throughout my journey!'
        className='mb-6'
      />
      <div className='grid gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
        {projects.map((project) => (
          <div
            key={project.id}
            className='bg-secondary shadow-xl rounded-lg overflow-hidden flex flex-col p-3'
          >
            <img
              src={project.imgSrc}
              alt={project.title}
              className='w-full h-48 object-cover mb-3'
            />
            <div className='flex-1 text-text'>
              <h3 className='text-2xl font-semibold mb-2'>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
