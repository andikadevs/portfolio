import React from 'react';
import { Button, Tooltip } from '@/components/Global';
import { FaChrome, FaDownload, FaWhatsapp } from 'react-icons/fa';

export const Hello: React.FC = () => {
  const handleDownload = () => {
    const link    = document.createElement('a');
    link.href     = '/assets/static/data/curriculum-vitae.pdf'; 
    link.download = 'curicullum-vitae.pdf';
    link.click();
  };

  return (
    <div className="min-h-[400px] flex justify-center flex-col">
      <h3 className="flex items-center gap-2 text-text text-3xl mb-4">
        <FaChrome /> Fullstack <span className="text-accent">Developer</span>
      </h3>

      <p className="text-text mb-5">
        Hello there! I’m Andika Dwi Saputra, and I’m a <span className="text-accent">Fullstack Developer!</span> Feel free to check out my portfolio!
      </p>

      <div className="flex gap-3">
        <Tooltip hasArrow position='bottom' label='Download my CV'>
          <Button variant="outline" onClick={handleDownload}>
            <FaDownload /> Download CV
          </Button>
        </Tooltip>

        <a target='_blank' href="https://wa.me/6285743699909">
          <Tooltip hasArrow position='bottom' label='Chat me on WhatsApp!'>
            <Button variant="fill">
              <FaWhatsapp /> Contact Me
            </Button>
          </Tooltip>
        </a>
      </div>
    </div>
  );
};
