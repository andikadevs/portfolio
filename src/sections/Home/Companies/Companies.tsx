/** @format */

"use client";

import React from "react";

export const Companies = () => {
  const companyLogos = [
    {
      src: "/assets/static/img/Companies/Akastra.png",
      alt: "Akastra Toyota Logo",
      height: "h-8 sm:h-10",
    },
    {
      src: "/assets/static/img/Companies/Toploker.png",
      alt: "Toploker.com Logo",
      height: "h-8 sm:h-10",
    },
    {
      src: "/assets/static/img/Companies/DIGITEK.png",
      alt: "PT Digital Bisnis Ekonomi Logo",
      height: "h-20 sm:h-24",
    },
    {
      src: "/assets/static/img/Companies/STEKOM.png",
      alt: "Stekom University Logo",
      height: "h-8 sm:h-10",
    },
  ];

  return (
    <section
      id="companies"
      aria-label="Trusted Companies"
      className="bg-secondary flex flex-col shadow-xl items-center py-6 overflow-hidden mb-12 relative"
    >
      <h2 className="text-text mb-3">
        Companies that <span className="text-accent">trusted me!</span>
      </h2>
      <div
        className="flex overflow-hidden bg-secondary w-full relative"
        role="marquee"
        aria-label="Scrolling company logos"
      >
        <div className="animate-loop-scroll flex space-x-16 items-center">
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex space-x-16 items-center">
              {companyLogos.map((logo, index) => (
                <img
                  key={`${groupIndex}-${index}`}
                  loading="lazy"
                  draggable={false}
                  src={logo.src}
                  alt={logo.alt}
                  className={`max-w-none grayscale hover:grayscale-0 ${logo.height} shrink-0 object-contain transition-all duration-300 ease-in-out hover:scale-110`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
