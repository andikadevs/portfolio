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
    { name: "Akastra", logo: "/static/companies/Akastra.png" },
    { name: "DIGITEK", logo: "/static/companies/DIGITEK.png" },
    { name: "STEKOM", logo: "/static/companies/STEKOM.png" },
    { name: "Toploker", logo: "/static/companies/Toploker.png" },
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
            <h2 className="text-3xl sm:text-3xl font-bold mb-3 sm:mb-4 text-[var(--text)]">
              Project Details
            </h2>
            <p className="text-base sm:text-lg text-[var(--text)] max-w-2xl mx-auto">
              Explore the specifics of each project with detailed information
              about technologies used and challenges overcome.
            </p>
          </div>
          <div className="relative min-h-[1900px] p-6 md:p-10 overflow-hidden">
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
                    <div className="group flex flex-col h-full w-80 rounded-2xl bg-[var(--dark)]/90 backdrop-blur-md border border-[var(--foreground)]/10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-[var(--accent)]/30 hover:-translate-y-1 overflow-hidden">
                      {/* Image Container - Adjusted aspect ratio for a more 'card-like' feel */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--foreground)]/5">
                        <Image
                          src={
                            item.imgSrc || "/static/portfolio/placeholder.webp"
                          }
                          alt={item.title}
                          width={320}
                          height={200}
                          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        {/* Gradient overlay - subtle at bottom for text contrast if needed, mostly clear */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Content Container */}
                      <div className="flex flex-col flex-grow p-6 relative">
                        {/* Header */}
                        <div className="mb-3">
                          <h3 className="text-xl font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300">
                            {item.title}
                          </h3>
                          {/* Optional: Add a subtle divider or category tag here if you have one */}
                          <div className="h-1 w-12 bg-[var(--accent)]/50 rounded-full mt-2 transition-all duration-500 group-hover:w-full"></div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-[var(--text)]/70 leading-relaxed line-clamp-3 mb-6">
                          {item.description}
                        </p>

                        {/* Footer / Action Area */}
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--foreground)]/10">
                          {item.url && item.url !== "forbidden" ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link flex items-center text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                            >
                              View Project
                              <span className="ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1">
                                →
                              </span>
                            </a>
                          ) : (
                            <span className="text-xs text-[var(--text)]/40 font-mono">
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
            <h2 className="text-3xl sm:text-3xl font-bold mb-3 sm:mb-4 text-[var(--text)]">
              Certifications & Achievements
            </h2>
            <p className="text-base sm:text-lg text-[var(--text)] max-w-2xl mx-auto">
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
