"use client";

import React, { useMemo } from 'react';
import Image from 'next/image';
import { SocialButton } from "@/components/Global";
import { AnimateOnView } from "@/components/Global/AnimateOnView";
import certificateData from './Certificate.json';

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": certificateData.certificates.map((cert, index) => ({
      "@type": "EducationalOccupationalCredential",
      "position": index + 1,
      "name": cert.alt,
      "description": cert.description,
      "educationalLevel": "Professional",
      "credentialCategory": "Professional Certification",
      "image": `/assets/static/img/Portfolio/${cert.src}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const Certificate: React.FC = React.memo(() => {
  const { certificates } = certificateData;
  
  const filteredCertificates = useMemo(() => 
    certificates.filter((cert) => cert.src !== "toeic.webp"),
    [certificates]
  );

  return (
    <section
      id="certificate"
      aria-label="Professional Certifications"
      className="bg-secondary relative h-auto w-full p-4 md:px-10 shadow-xl"
    >
      <AnimateOnView direction="up">
        <h2 className="relative text-3xl text-text mb-4">
          Certificates
          <div className="border-b-[3px] border-accent w-[80px]" role="presentation"></div>
        </h2>
      </AnimateOnView>

      <AnimateOnView direction="up" delay={150}>
        <p className="text-text md:w-[50%] w-full mb-8">
          Most of the skills I gained were{" "}
          <span className="text-accent">self-taught.</span> However, I also
          acquired some certifications through testing and competitions.
        </p>
      </AnimateOnView>

      <div className="flex gap-3 flex-col md:flex-row h-full">
        <div 
          className="w-[100%] md:w-[75%] h-full"
          role="list"
          aria-label="Technical certifications grid"
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            {filteredCertificates.map((cert, index) => (
              <AnimateOnView
                key={cert.src}
                direction="up"
                delay={300 + index * 100}
              >
                <figure role="listitem" className="h-full">
                  <Image
                    src={`/assets/static/img/Portfolio/${cert.src}`}
                    alt={cert.alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover shadow-xl cursor-pointer hover:opacity-80 transition-opacity"
                    priority={index < 3}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <figcaption className="sr-only">{cert.description}</figcaption>
                </figure>
              </AnimateOnView>
            ))}
          </div>
        </div>
        <div 
          className="w-[calc(50%-8px)] md:w-[25%] h-full flex flex-1"
          role="complementary"
          aria-label="Featured TOEIC certification"
        >
          <AnimateOnView direction="up" delay={900} className="h-full w-full">
            <figure>
              <Image
                src="/assets/static/img/Portfolio/toeic.webp"
                alt="Advanced TOEIC Certification - Professional English Language Proficiency"
                width={400}
                height={600}
                className="w-full h-full object-cover shadow-xl cursor-pointer hover:opacity-80 transition-opacity"
                priority
              />
              <figcaption className="sr-only">
                High-level English proficiency certification demonstrating advanced business communication skills
              </figcaption>
            </figure>
          </AnimateOnView>
        </div>
      </div>

      <AnimateOnView direction="up" delay={1000}>
        <div className="flex w-full justify-center mt-12 mb-32">
          <SocialButton
            href="https://instagram.com/andikads__"
            iconUrl="assets/static/img/Icons/instagram.svg"
            altText="Visit my Instagram profile"
            label="Follow me on Instagram"
            classNames="w-full md:w-auto"
            aria-label="Follow me on Instagram to see more updates about my professional journey"
          />
        </div>
      </AnimateOnView>
      <StructuredData />
    </section>
  );
});

Certificate.displayName = 'Certificate';
