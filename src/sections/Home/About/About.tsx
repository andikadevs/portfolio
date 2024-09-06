import { Title } from '@/components/Global';
import { Profile } from '@/components/Home';
import React from 'react';

export const About = () => {
  return (
    <div className='bg-secondary relative min-h-screen w-full p-6'>
      
      {/* Top Vignette */}
      <div className='hidden lg:block bg-accent h-[300px] w-12 absolute top-0 left-0'></div>
      <div className='hidden lg:block bg-accent h-12 w-[300px] absolute top-0 left-0'></div>

      {/* Bottom Vignette */}
      <div className='hidden lg:block bg-accent h-[300px] w-12 absolute bottom-0 right-0'></div>
      <div className='hidden lg:block bg-accent h-12 w-[300px] absolute bottom-0 right-0'></div>

      <Title
        title='About [Me]'
        description='Let me [introduce] myself and tell you about my journey to becoming a [developer]'
      />

      <div className="h-auto grid grid-cols-1 md:grid-cols-5 w-full z-[1] p-8 relative">
        <div className="col-span-2 md:col-span-2 flex justify-center items-center relative py-6">
          <Profile
            src="/assets/static/img/person.webp"
            alt="Andika Dwi Saputra's Image Profile"
          />
        </div>
        <div className="col-span-3 md:col-span-3">
          
        </div>
      </div>
    </div>
  );
};
