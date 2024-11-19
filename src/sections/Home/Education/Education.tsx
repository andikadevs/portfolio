import React from 'react';
import { Lists, AnimateOnView } from '@/components/Global';
import items from './Items.json';
import Image from 'next/image';

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": items.map((item, index) => ({
      "@type": "EducationalOccupation",
      "position": index + 1,
      "name": item.title.replace(/[\[\]]/g, ''),
      "description": item.description,
      "educationalLevel": "Bachelor's Degree",
      "dateCreated": item.details.split('|')[1].trim()
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const Education: React.FC = () => {
  return (
    <section 
      id='education' 
      aria-label="Educational Background"
      className='h-auto w-full px-4 md:px-12 pt-12 bg-secondary shadow-xl relative mb-[60px]'
    >
      <h2 className="text-text text-4xl absolute top-[-20px] left-4">
        Education
      </h2>

      <div 
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        itemScope 
        itemType="https://schema.org/EducationalOrganization"
      >
        <AnimateOnView direction="left" className="w-full">
          <article role="list" aria-label="Education history">
            <Lists items={items} />
          </article>
        </AnimateOnView>

        <AnimateOnView direction="up" className="flex items-center justify-center">
          <Image
            draggable={false}
            src="/assets/static/img/Icons/react.svg"
            width={200}
            height={200}
            alt="React.js Technology Icon - One of the key technologies learned during education"
            priority={false}
            loading="lazy"
            className='h-[200px] animate-rotate hidden md:block'
          />
        </AnimateOnView>
      </div>
      <StructuredData />
    </section>
  );
};
