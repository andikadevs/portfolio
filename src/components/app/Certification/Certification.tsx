/** @format */

"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconCalendar, IconBuildingBank } from "@tabler/icons-react";
import { useState, useEffect } from "react";
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

  // Use useEffect to shuffle arrays only on the client-side after hydration
  useEffect(() => {
    shuffleArray(certifications);
  }, [certifications]);

  const renderCertificationCard = (cert: any, index: number) => (
    <div className="group relative flex flex-col h-full mx-1 md:mx-4 rounded-2xl bg-[var(--dark)]/90 backdrop-blur-md border border-[var(--foreground)]/10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-[var(--accent)]/30 hover:-translate-y-1 overflow-hidden">
      {/* Image Section - Triggers Lightbox */}
      <div
        className="relative h-24 md:h-48 w-full overflow-hidden border-b border-[var(--foreground)]/5 cursor-zoom-in"
        onClick={(e) => {
          e.preventDefault(); // Prevent link click if nested (safety)
          setPhotoIndex(index);
          setIsOpen(true);
        }}
      >
        <Image
          src={cert.imgSrc}
          alt={cert.title}
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Zoom Hint Icon (Optional, appears on hover) */}
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white w-4 h-4"
          >
            <path d="m21 21-6-6" />
            <circle cx="10" cy="10" r="7" />
            <line x1="10" x2="10" y1="7" y2="13" />
            <line x1="7" x2="13" y1="10" y2="10" />
          </svg>
        </div>
      </div>

      {/* Content Section - Links to External URL */}
      <Link
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col flex-grow p-2 md:p-5"
      >
        {/* Title Header */}
        <div className="mb-1 md:mb-3">
          <h3 className="text-xs md:text-lg font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-2 md:line-clamp-1">
            {cert.title}
          </h3>
          {/* Expanding Accent Line */}
          <div className="h-1 w-8 bg-[var(--accent)]/50 rounded-full mt-2 transition-all duration-500 group-hover:w-full"></div>
        </div>

        {/* Metadata Row */}
        <div className="hidden md:flex items-center gap-4 text-xs font-medium text-[var(--text)]/60 mb-3">
          <span className="flex items-center bg-[var(--foreground)]/5 px-2 py-1 rounded-md border border-[var(--foreground)]/5">
            <IconCalendar className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {cert.date}
          </span>
          <span className="flex items-center bg-[var(--foreground)]/5 px-2 py-1 rounded-md border border-[var(--foreground)]/5">
            <IconBuildingBank className="w-3.5 h-3.5 mr-1.5 opacity-70" />
            {cert.issuer}
          </span>
        </div>

        {/* Description */}
        <div className="hidden md:block text-[var(--text)]/70 text-xs md:text-sm line-clamp-2 leading-relaxed mb-4">
          {cert.description}
        </div>

        {/* Footer / Action */}
        <div className="mt-auto pt-1 md:pt-4 border-t border-[var(--foreground)]/10 flex items-center justify-between group/link">
          <span className="text-[10px] md:text-sm font-medium text-[var(--text)] group-hover/link:text-[var(--accent)] transition-colors">
            Verify
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-[var(--accent)] transform transition-transform duration-300 group-hover/link:translate-x-1"
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
        </div>
      </Link>
    </div>
  );

  return (
    <section className="py-12 flex flex-col items-center justify-center">
      <div className="space-y-8 w-full flex flex-col items-center justify-center">
        <Marquee
          items={certifications}
          direction="left"
          speed="slow"
          pauseOnHover={true}
          className={cn("!w-[100vw]", className)}
          itemClassName="w-[160px] h-[180px] md:w-[400px] md:h-[420px]" // Fixed height helps marquee alignment
          renderItem={renderCertificationCard}
        />

        <Marquee
          items={certifications}
          direction="right"
          speed="slow"
          pauseOnHover={true}
          className={cn("!w-[100vw]", className)}
          itemClassName="w-[160px] h-[180px] md:w-[400px] md:h-[420px]"
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
