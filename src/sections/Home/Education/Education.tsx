'use client'

import React from 'react';

export const Education = () => {
  return (
    <div className='h-auto w-full p-12 bg-secondary shadow-xl relative'>
      <h3 className="text-text text-4xl absolute top-[-20px] left-2">
        Education
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ul className="list-none p-0 m-0">
          <li className='relative flex gap-4 items-baseline pb-6'>
            <div className='absolute top-4 left-[7px] w-[3px] h-full bg-accent z-0 glow' style={{ transform: 'translateX(-50%)' }}></div>
            <div className='relative flex items-center top-[5px]'>
              <svg
                className="text-text z-10"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle r="7" cx="7" cy="7" fill="white" />
              </svg>
            </div>
            <div className='text-text'>
              <p className='text-2xl mb-1'>Network & <span className="text-accent">Application</span></p>
              <p className='font-semibold mb-1'>SMKN 1 Punggelan | June 2020 - April 2024</p>
              <p>I’m a full-time student in the SIJA program, which stands for Sistem Informatika Jaringan dan Aplikasi (Network and Application Information System). This is the place that introduced me to networking and more.</p>
            </div>
          </li>
          <li className='relative flex gap-4 items-baseline'>
            <div className='relative flex items-center top-[5px]'>
              <svg
                className="text-text z-10"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle r="7" cx="7" cy="7" fill="white" />
              </svg>
            </div>
            <div className='text-text'>
              <p className='text-2xl mb-1'>Bachelor of <span className="text-accent">Engineering</span></p>
              <p className='font-semibold mb-1'>STEKOM University | June 2024 - Present</p>
              <p>I am an undergraduate at STEKOM University pursuing a Bachelor’s Degree in Computer Engineering with a full scholarship.</p>
            </div>
          </li>
        </ul>

        <div className="flex items-center justify-center">
          <img src="assets/static/img/Icons/react.svg" alt="ReactJS" className='h-[200px]'/>
        </div>
      </div>

      <style jsx>{`
        .glow {
          box-shadow: 0 0 8px rgba(255, 105, 135, 0.8); /* Adjust color and intensity */
        }
      `}</style>
    </div>
  );
}