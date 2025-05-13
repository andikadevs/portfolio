/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconCalendar, IconBuildingBank } from "@tabler/icons-react";
import { useState, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { CertificationGridProps } from "@/types";
import { Marquee } from "@/components/ui/Marquee/Marquee";

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function Certification({
  certifications,
  className,
}: CertificationGridProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Create slides array for lightbox
  const slides = certifications.map((cert) => ({
    src: cert.imgSrc,
    title: cert.title,
    description: cert.description,
  }));

  // Create two different random orders of certifications
  const firstRandomOrder = useMemo(
    () => shuffleArray(certifications),
    [certifications]
  );
  const secondRandomOrder = useMemo(
    () => shuffleArray(certifications),
    [certifications]
  );

  const renderCertificationCard = (cert: any, index: number) => (
    <div className="group block rounded-xl overflow-hidden bg-[var(--foreground)] border border-[var(--foreground)] transition-all duration-300 hover:shadow-lg hover:bg-[var(--foreground)] hover:border-[var(--foreground)] h-full mx-4">
      {/* Image with gradient overlay */}
      <div
        className="relative h-48 w-full overflow-hidden cursor-pointer"
        onClick={() => {
          setPhotoIndex(index);
          setIsOpen(true);
        }}
      >
        <Image
          src={cert.imgSrc}
          alt={cert.title}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
      </div>

      {/* Content */}
      <Link
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2">
            {cert.title}
          </h3>

          <div className="text-[var(--text)] text-sm line-clamp-2 leading-relaxed">
            {cert.description}
          </div>

          <div className="flex items-center text-[var(--text)] text-xs pt-2 space-x-4">
            <span className="flex items-center">
              <IconCalendar className="w-3.5 h-3.5 mr-1.5 inline" />
              {cert.date}
            </span>
            <span className="flex items-center">
              <IconBuildingBank className="w-3.5 h-3.5 mr-1.5 inline" />
              {cert.issuer}
            </span>
          </div>
        </div>

        {/* View Certificate indicator */}
        <div className="px-4 py-2 border-t border-[var(--foreground)]">
          <span className="text-[var(--accent)] text-sm font-medium flex items-center">
            View Certificate
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );

  return (
    <section className="py-12 flex flex-col items-center justify-center">
      <div className="space-y-8 w-full flex flex-col items-center justify-center">
        <Marquee
          items={firstRandomOrder}
          direction="left"
          speed="slow"
          pauseOnHover={true}
          className={cn("!w-[100vw]", className)}
          itemClassName="w-[400px]"
          renderItem={renderCertificationCard}
        />

        <Marquee
          items={secondRandomOrder}
          direction="right"
          speed="slow"
          pauseOnHover={true}
          className={cn("!w-[100vw]", className)}
          itemClassName="w-[400px]"
          renderItem={renderCertificationCard}
        />
      </div>

      {/* Lightbox */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={photoIndex}
        plugins={[Zoom, Fullscreen, Thumbnails, Captions]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
        }}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
        }}
        captions={{ showToggle: true, descriptionTextAlign: "center" }}
      />
    </section>
  );
}
