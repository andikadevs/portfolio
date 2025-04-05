import { PortfolioData } from "@/types";
import { Contact, Certification } from "@/components/app";
import dynamic from "next/dynamic";
import portfolioDataJson from "@/data/Portfolio.json";
import certificationsDataJson from "@/data/Certifications.json";
import { Metadata } from "next";

/**
 * @author Andika Dwi Saputra
 *
 * @description This page is used to display the portfolio data in the portfolio section.
 * @returns {React.ReactNode} The portfolio data is passed to the HeroParallax component.
 */

export const metadata: Metadata = {
  title: "Portfolio | Creative Showcase",
  description:
    "Explore my latest projects and creative work showcasing innovation and technology.",
};

const HeroParallaxClient = dynamic(
  () => import("@/components/ui/HeroParalax").then((mod) => mod.HeroParallax),
  { ssr: true }
);

/**
 * @author Andika Dwi Saputra
 *
 * @description This is the client component for the SwiperCard component.
 * @returns {React.ReactNode} The SwiperCard component is returned.
 */

const SwiperCardClient = dynamic(
  () =>
    import("@/components/ui/Swipercard/SwiperCard").then(
      (mod) => mod.SwiperCard
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

  const transformedData = portfolioData
    .map((item) => {
      if (!item || typeof item !== "object") {
        console.error("Invalid portfolio item:", item);
        return null;
      }

      return {
        title: item.title || "Untitled Project",
        link: item.url && item.url !== "forbidden" ? item.url : "#",
        thumbnail: item.imgSrc || "/static/portfolio/placeholder.webp",
      };
    })
    .filter(
      (item): item is { title: string; link: string; thumbnail: string } =>
        item !== null
    )
    .reverse();

  return (
    <div className="min-h-screen">
      <section className="py-0">
        <HeroParallaxClient
          products={transformedData}
          headerTitle={`Innovative\nPortfolio Collection`}
          headerDescription={`Discover my curated collection of projects that showcase creative problem-solving through technology and design. Each piece represents a unique challenge solved with innovation, precision, and artistic vision.`}
        />
      </section>

      <section className="pt-16 md:pt-24">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-3xl font-bold mb-3 sm:mb-4 text-[var(--text)]">
              Project Details
            </h2>
            <p className="text-base sm:text-lg text-[var(--text)] max-w-2xl mx-auto">
              Explore the specifics of each project with detailed information
              about technologies used and challenges overcome.
            </p>
          </div>
          <div className="p-6 md:p-10 rounded-3xl">
            <SwiperCardClient
              contents={portfolioData.map((item) => ({
                description: item.description,
                title: item.title,
                designation: item.url,
                src: item.imgSrc,
              }))}
              autoplay={true}
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
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

      <section>
        <Contact />
      </section>
    </div>
  );
}
