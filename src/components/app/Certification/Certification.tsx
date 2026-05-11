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
    <div
      className="group relative flex flex-col h-full mx-1 md:mx-3 overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--paper)",
        border: "1px solid rgba(196,167,125,0.40)",
        boxShadow: "2px 3px 10px rgba(44,24,16,0.12), 0 1px 2px rgba(44,24,16,0.06)",
      }}
    >
      {/* Tape top strip */}
      <div
        className="h-3 w-full"
        style={{ background: `var(--tape-${["yellow","blue","pink","yellow","blue"][index % 5]})` }}
      />

      {/* Image — Triggers Lightbox */}
      <div
        className="relative h-24 md:h-44 w-full overflow-hidden cursor-zoom-in"
        onClick={(e) => {
          e.preventDefault();
          setPhotoIndex(index);
          setIsOpen(true);
        }}
      >
        <Image
          src={cert.imgSrc}
          alt={cert.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/80 dark:bg-paper/80 p-1 rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21 21-6-6"/><circle cx="10" cy="10" r="7"/><line x1="10" x2="10" y1="7" y2="13"/><line x1="7" x2="13" y1="10" y2="10"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <Link
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col flex-grow p-2 md:p-4"
        style={{
          backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, rgba(196,167,125,0.12) 23px, rgba(196,167,125,0.12) 24px)",
          backgroundSize: "100% 24px",
          backgroundPositionY: "8px",
        }}
      >
        <div className="mb-1 md:mb-2">
          <h3 className="font-caveat text-sm md:text-lg font-bold text-text group-hover:text-accent transition-colors line-clamp-2">
            {cert.title}
          </h3>
          <div
            className="h-1.5 w-8 rounded-sm mt-1 transition-all duration-500 group-hover:w-full"
            style={{ background: "var(--accent)", opacity: 0.5 }}
          />
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-text/55 mb-2 flex-wrap">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-sm border border-kraft/30">
            <IconCalendar className="w-3 h-3" /> {cert.date}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-sm border border-kraft/30">
            <IconBuildingBank className="w-3 h-3" /> {cert.issuer}
          </span>
        </div>

        <div className="hidden md:block text-text/60 text-xs line-clamp-2 leading-relaxed mb-3">
          {cert.description}
        </div>

        <div className="mt-auto pt-2 border-t border-kraft/20 flex items-center justify-between group/link">
          <span className="font-caveat text-sm text-accent group-hover/link:text-text transition-colors">Verify →</span>
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
