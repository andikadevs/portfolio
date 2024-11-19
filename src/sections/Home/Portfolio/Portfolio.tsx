'use client';

import React, { useState } from 'react';
import { PortfolioCard } from '@/components/Home';
import { Gallery, SocialButton, Title, AnimateOnView } from '@/components/Global';
import data from './Portfolio.json';

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": data.map((project, index) => ({
      "@type": "SoftwareApplication",
      "position": index + 1,
      "name": project.title.replace(/[\[\]]/g, ''),
      "description": project.description.replace(/[\[\]]/g, ''),
      "applicationCategory": "Portfolio Project",
      "operatingSystem": "Web Browser",
      "url": project.url !== "forbidden" ? project.url : undefined,
      "softwareRequirements": project.stacks.join(", "),
      "offers": {
        "@type": "Offer",
        "availability": project.url !== "forbidden" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const Portfolio: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [descriptions, setDescriptions]     = useState<string[]>([]);
  const [titles, setTitles]                 = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen]   = useState<boolean>(false);

  const handleImageClick = (images: string[], index: number) => {
    setSelectedImages(images);
    setDescriptions(data.map(item => item.description));
    setTitles(data.map(item => item.title));
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  return (
    <section 
      id='portfolio' 
      aria-label="Portfolio and Projects"
      className='bg-main h-auto w-full px-4 md:px-10 pb-14'
    >
      <AnimateOnView direction="up">
        <Title 
          title='Excellent [Portfolio]'
          description='Check out my wonderful [projects] & [achievements] that I have built throughout my journey!'
        />
      </AnimateOnView>

      <AnimateOnView direction="up" delay={200}>
        <h2 className='relative text-3xl text-text mb-4'>
          Projects
          <div className="border-b-[3px] border-accent w-[80px]" role="presentation"></div>
        </h2>
      </AnimateOnView>

      <div 
        className='mb-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'
        role="list"
        aria-label="Portfolio projects grid"
      >
        {data.map((project, index) => (
          <AnimateOnView 
            key={project.title} 
            direction="up" 
            delay={300 + (index * 100)}
            className='flex-1 h-full'
          >
            <article 
              role="listitem"
              itemScope 
              itemType="https://schema.org/SoftwareApplication"
              className="h-full"
            >
              <PortfolioCard
                title={project.title}
                imgSrc={project.imgSrc}
                description={project.description}
                stacks={project.stacks}
                url={project.url}
                onClick={() => handleImageClick(data.map(item => item.imgSrc), index)}
              />
            </article>
          </AnimateOnView>
        ))}
      </div>

      <AnimateOnView direction="up" delay={600}>
        <div className="flex w-full justify-center">
          <SocialButton
            href='https://github.com/Andikss'
            iconUrl='assets/static/img/Icons/github.svg'
            altText='View all projects on GitHub'
            label='Checkout My GitHub'
            classNames='w-full md:w-auto'
            aria-label="Visit my GitHub profile to see more projects"
          />
        </div>
      </AnimateOnView>

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
      <StructuredData />
    </section>
  );
};
