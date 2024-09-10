import React from 'react';
import { Lists } from '@/components/Global';
import items from './Items.json';

export const Education: React.FC = () => {
  return (
    <div id='education' className='h-auto w-full p-12 bg-secondary shadow-xl relative mb-[100px]'>
      <h3 className="text-text text-4xl absolute top-[-20px] left-4">
        Education
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Lists items={items} />

        <div className="flex items-center justify-center">
          <img 
            src="assets/static/img/Icons/react.svg" 
            alt="ReactJS" 
            className='h-[200px] animate-rotate'
          />
        </div>
      </div>
    </div>
  );
};
