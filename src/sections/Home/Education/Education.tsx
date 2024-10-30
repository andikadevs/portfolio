import React from 'react';
import { Lists, AnimateOnView } from '@/components/Global';
import items from './Items.json';

export const Education: React.FC = () => {
  return (
    <div id='education' className='h-auto w-full px-4 md:px-12 pt-12 bg-secondary shadow-xl relative mb-[60px]'>
      <h3 className="text-text text-4xl absolute top-[-20px] left-4">
        Education
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimateOnView direction="left" className="w-full">
          <Lists items={items} />
        </AnimateOnView>

        <AnimateOnView direction="up" className="flex items-center justify-center">
          <img 
            src="assets/static/img/Icons/react.svg" 
            alt="ReactJS" 
            className='h-[200px] animate-rotate hidden md:block'
          />
        </AnimateOnView>
      </div>
    </div>
  );
};
