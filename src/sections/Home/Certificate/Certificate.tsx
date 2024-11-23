/** @format */

"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { SocialButton } from "@/components/Global";
import { AnimateOnView } from "@/components/Global/AnimateOnView";
import certificateData from "./Certificate.json";
import { Gallery } from "@/components/Global/Gallery/Gallery";

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: certificateData.certificates.map((cert, index) => ({
      "@type": "EducationalOccupationalCredential",
      position: index + 1,
      name: cert.alt,
      description: cert.description,
      educationalLevel: "Professional",
      credentialCategory: "Professional Certification",
      image: `/assets/static/img/Portfolio/${cert.src}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const Certificate: React.FC = React.memo(() => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { certificates } = certificateData;

  const filteredCertificates = useMemo(
    () =>
      certificates.filter((cert) => !cert.src.toLowerCase().includes("toeic")),
    [certificates]
  );

  const handleImageClick = (index: number) => {
    const allCertificates = [
      ...filteredCertificates,
      certificates.find((cert) => cert.src.toLowerCase().includes("toeic")),
    ];

    setSelectedImages(
      allCertificates.map((cert) => `/assets/static/img/Portfolio/${cert?.src}`)
    );
    setDescriptions(allCertificates.map((cert) => cert?.description || ""));
    setTitles(allCertificates.map((cert) => cert?.alt || ""));
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  return (
    <section
      id="certificate"
      aria-label="Professional Certifications"
      className="bg-secondary relative h-auto w-full p-4 sm:px-10 shadow-xl"
    >
      <AnimateOnView direction="up">
        <h2 className="relative text-3xl text-text mb-4">
          Certificates
          <div
            className="border-b-[3px] border-accent w-[80px]"
            role="presentation"
          ></div>
        </h2>
      </AnimateOnView>

      <AnimateOnView direction="up" delay={150}>
        <p className="text-text sm:w-[50%] w-full mb-8">
          Most of the skills I gained were{" "}
          <span className="text-accent">self-taught.</span> However, I also
          acquired some certifications through testing and competitions.
        </p>
      </AnimateOnView>

      <div className="w-full">
        <div
          className="w-full"
          role="list"
          aria-label="Technical certifications grid"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-4 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCertificates.map((cert, index) => (
                <AnimateOnView
                  key={cert.src}
                  direction="up"
                  delay={300 + index * 100}
                >
                  <figure role="listitem" className="break-inside-avoid">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={`/assets/static/img/Portfolio/${cert.src}`}
                        alt={cert.alt}
                        fill
                        className="object-cover shadow-xl cursor-pointer hover:opacity-80 transition-opacity"
                        priority={index < 3}
                        loading={index < 3 ? "eager" : "lazy"}
                        onClick={() => handleImageClick(index)}
                      />
                    </div>
                    <figcaption className="sr-only">
                      {cert.description}
                    </figcaption>
                  </figure>
                </AnimateOnView>
              ))}
            </div>
            <div className="lg:col-span-1 grid grid-cols-1 gap-4">
              <AnimateOnView direction="up" delay={600}>
                <figure role="listitem" className="break-inside-avoid h-full">
                  <div className="aspect-[4/5] sm:aspect-auto relative h-full">
                    <Image
                      src="/assets/static/img/Portfolio/toeic.webp"
                      alt="Advanced TOEIC Certification"
                      fill
                      className="object-cover shadow-xl cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleImageClick(filteredCertificates.length)}
                    />
                  </div>
                  <figcaption className="sr-only">
                    Advanced TOEIC Certification
                  </figcaption>
                </figure>
              </AnimateOnView>
            </div>
          </div>
        </div>
      </div>

      <AnimateOnView direction="up" delay={1000}>
        <div className="flex w-full justify-center mt-12 mb-16">
          <SocialButton
            href="https://instagram.com/andikads__"
            iconUrl="assets/static/img/Icons/instagram.svg"
            altText="Visit my Instagram profile"
            label="Follow me on Instagram"
            classNames="w-full sm:w-auto"
            aria-label="Follow me on Instagram to see more updates about my professional journey"
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
        onPrev={() =>
          setCurrentIndex(
            (prevIndex) =>
              (prevIndex - 1 + selectedImages.length) % selectedImages.length
          )
        }
        onNext={() =>
          setCurrentIndex(
            (nextIndex) => (nextIndex + 1) % selectedImages.length
          )
        }
      />
      <StructuredData />
    </section>
  );
});

Certificate.displayName = "Certificate";
