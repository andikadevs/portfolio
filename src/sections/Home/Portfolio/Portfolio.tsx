'use client';

import React, { useState } from 'react';
import { PortfolioCard } from '@/components/Home';
import { Gallery, Title } from '@/components/Global';
import data from './Portfolio.json';

export const Portfolio: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages(images);
    setDescriptions(data.map(item => item.description));
    setTitles(data.map(item => item.title));
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className='bg-main h-auto w-full px-0 md:px-10 pb-20'>
      <Title 
        title='Excellent [Portfolio]'
        description='Check out my wonderful [projects] & [achievements] that I have built throughout my journey!'
      />
      <div className='grid gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
        {data.map((project, index) => (
          <PortfolioCard
            key={project.title}
            title={project.title}
            imgSrc={project.imgSrc}
            description={project.description}
            stacks={project.stacks}
            url={project.url}
            onClick={() => handleImageClick(data.map(item => item.imgSrc), index)}
          />
        ))}
      </div>
      <Gallery
        images={selectedImages}
        descriptions={descriptions}
        titles={titles}
        currentIndex={currentIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPrev={() => setCurrentIndex(prevIndex => (prevIndex - 1 + selectedImages.length) % selectedImages.length)}
        onNext={() => setCurrentIndex(nextIndex => (nextIndex + 1) % selectedImages.length)}
      />
    </div>
  );
};
