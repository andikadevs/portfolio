/** @format */

import { PortfolioData } from "@/types";
import { Contact, Certification, Companies } from "@/components/app";
import dynamic from "next/dynamic";
import portfolioDataJson from "@/data/Portfolio.json";
import certificationsDataJson from "@/data/Certifications.json";
import { Metadata } from "next";
import Image from "next/image";

/**
 * @author Andika Dwi Saputra
 *
 * @description This page is used to display the portfolio data in the portfolio section.
 * @returns {React.ReactNode} The portfolio data is passed to the HeroParallax component.
 */

export const metadata: Metadata = {
  title: "Portfolio | Andika Dwi Saputra - Fullstack Developer",
  description:
    "Browse through Andika Dwi Saputra's professional projects and achievements showcasing expertise in Next.js, React, Laravel, and other web technologies.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio | Andika Dwi Saputra - Fullstack Developer",
    description:
      "Browse through Andika Dwi Saputra's professional projects and achievements showcasing expertise in Next.js, React, Laravel, and other web technologies.",
    url: "/portfolio",
  },
};

const HeroParallaxClient = dynamic(
  () => import("@/components/ui/HeroParalax").then((mod) => mod.HeroParallax),
  { ssr: true }
);

const DraggableCardClient = dynamic(
  () =>
    import("@/components/ui/DraggableCard").then(
      (mod) => mod.DraggableCardBody
    ),
  { ssr: true }
);

/**
 * @author Andika Dwi Saputra
 *
 * @description This function is used to get the portfolio data from the local JSON file.
 * @returns {PortfolioData} The portfolio data is returned.
 */
async function getPortfolioData() {
  return portfolioDataJson as PortfolioData;
}

/**
 * @author Andika Dwi Saputra
 * @description This is the main component for the portfolio page.
 * @returns {React.ReactNode} The portfolio data is passed to the HeroParallax component.
 */
export default async function PortfolioPage() {
  const portfolioData = await getPortfolioData();
  const certificationsData = certificationsDataJson;

  // Select specific portfolio items and certifications for HeroParallax
  const selectedPortfolioItems = portfolioData
    .filter((item) =>
      [
        "OtoTop",
        "Attendance Management",
        "Akastra - Company Profile",
        "MRS Genius APIs",
        "Project Management",
      ].includes(item.title)
    )
    .map((item) => ({
      title: item.title,
      link: item.url && item.url !== "forbidden" ? item.url : "#",
      thumbnail: item.imgSrc || "/static/portfolio/placeholder.webp",
    }));

  const selectedCertifications = certificationsData
    .filter((cert) =>
      [
        "SQL Advanced Certification",
        "SQL Intermediate Certification",
        "JavaScript Intermediate",
        "Technology Professional",
        "Web Development Certificate",
      ].includes(cert.title)
    )
    .map((cert) => ({
      title: cert.title,
      link: cert.url,
      thumbnail: cert.imgSrc,
    }));

  const transformedData = [
    ...selectedPortfolioItems,
    ...selectedCertifications,
  ];

  const companies = [
    { name: "Akastra", logo: "/static/companies/akastra.webp" },
    { name: "DIGITEK", logo: "/static/companies/digitek.webp" },
    { name: "STEKOM", logo: "/static/companies/stekom.webp" },
    { name: "Toploker", logo: "/static/companies/toploker.webp" },
    { name: "Kerja Malam", logo: "/static/companies/kerjamalam.webp" },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-0">
        <HeroParallaxClient
          products={transformedData}
          headerTitle={`Featured Projects\n& [Certifications]`}
          headerDescription={`Explore my top projects and professional certifications that demonstrate my technical expertise and commitment to excellence in software development.`}
        />
      </section>

      <section className="pt-16 md:pt-24">
        <div className="mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-caveat text-4xl sm:text-5xl font-bold mb-3 text-text">
              Project Details
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-3 w-16 rounded-sm" style={{ background: "var(--tape-yellow)", transform: "rotate(-0.5deg)" }} />
              <div className="h-3 w-10 rounded-sm" style={{ background: "var(--tape-blue)", transform: "rotate(0.5deg)" }} />
            </div>
            <p className="text-base sm:text-lg text-text/70 max-w-2xl mx-auto">
              Explore the specifics of each project with detailed information
              about technologies used and challenges overcome.
            </p>
          </div>
          <div className="relative min-h-[1900px] p-6 md:p-10 overflow-hidden">
            {/* Top Fade */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--background)] to-transparent z-10 pointer-events-none" />

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-10 pointer-events-none" />
            {portfolioData.map((item, index) => {
              // Create a more random but controlled distribution
              const angle = (index * 137.5) % 360; // Golden angle for better distribution
              const radius = 20 + index * 3; // Reduced radius and increment for tighter spacing
              const centerX = 50; // Center X position
              const centerY = 50; // Center Y position

              // Calculate position using polar coordinates
              const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
              const y = centerY + radius * Math.sin((angle * Math.PI) / 180);

              // Random rotation between -12 and 12 degrees
              const rotation = ((index * 5) % 24) - 12;

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    top: `${y}%`,
                    left: `${x}%`,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                    zIndex: portfolioData.length - index,
                  }}
                >
                  <DraggableCardClient>
                    {/* Scrapbook paper card */}
                    <div
                      className="group flex flex-col h-full w-60 sm:w-72 overflow-hidden transition-all duration-300"
                      style={{
                        background: "var(--paper)",
                        border: "1px solid rgba(196,167,125,0.45)",
                        boxShadow: "2px 4px 12px rgba(44,24,16,0.14), 0 1px 3px rgba(44,24,16,0.07)",
                      }}
                    >
                      {/* Tape accent at top */}
                      <div
                        className="h-4 w-full"
                        style={{
                          background: `var(--tape-${["yellow","blue","pink","yellow","blue"][index % 5]})`,
                        }}
                      />

                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={item.imgSrc || "/static/portfolio/placeholder.webp"}
                          alt={item.title}
                          width={288}
                          height={180}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col flex-grow p-4 relative"
                        style={{
                          backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, rgba(196,167,125,0.15) 23px, rgba(196,167,125,0.15) 24px)",
                          backgroundSize: "100% 24px",
                          backgroundPositionY: "10px",
                        }}
                      >
                        <h3 className="font-caveat text-lg sm:text-xl font-bold text-text group-hover:text-accent transition-colors mb-1">
                          {item.title}
                        </h3>

                        <div
                          className="h-1.5 w-10 rounded-sm mb-3 transition-all duration-500 group-hover:w-full"
                          style={{ background: "var(--accent)", opacity: 0.5 }}
                        />

                        <p className="text-xs sm:text-sm text-text/65 leading-relaxed line-clamp-3 mb-4">
                          {item.description}
                        </p>

                        <div className="mt-auto pt-3 border-t border-kraft/25">
                          {item.url && item.url !== "forbidden" ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-caveat text-base text-accent hover:text-text transition-colors cursor-pointer flex items-center gap-1"
                            >
                              View Project →
                            </a>
                          ) : (
                            <span className="font-mono text-xs text-text/40">
                              Internal / Private
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </DraggableCardClient>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-3">
          <div className="mb-12 text-center">
            <h2 className="font-caveat text-4xl sm:text-5xl font-bold mb-3 text-text">
              Certifications & Achievements
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-3 w-14 rounded-sm" style={{ background: "var(--tape-pink)", transform: "rotate(-0.5deg)" }} />
              <div className="h-3 w-10 rounded-sm" style={{ background: "var(--tape-blue)", transform: "rotate(0.5deg)" }} />
            </div>
            <p className="text-base sm:text-lg text-text/70 max-w-2xl mx-auto">
              A showcase of my professional certifications and achievements that
              demonstrate my commitment to continuous learning and expertise.
            </p>
          </div>
          <Certification certifications={certificationsData} />
        </div>
      </section>

      <Companies companies={companies} />

      <section>
        <Contact />
      </section>
    </div>
  );
}
