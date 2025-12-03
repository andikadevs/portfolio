"use client";

import { Marquee } from "@/components/ui/Marquee";
import Image from "next/image";

interface CompaniesProps {
  companies?: { name: string; logo: string }[];
}

export const Companies = ({ companies = [] }: CompaniesProps) => {
  const defaultCompanies = [
    { name: "Akastra", logo: "/static/companies/akastra.webp" },
    { name: "DIGITEK", logo: "/static/companies/digitek.webp" },
    { name: "STEKOM", logo: "/static/companies/stekom.webp" },
    { name: "Toploker", logo: "/static/companies/toploker.webp" },
    { name: "Kerja Malam", logo: "/static/companies/kerjamalam.webp" },
  ];

  const companiesToShow = companies.length > 0 ? companies : defaultCompanies;

  return (
    <section className="py-12 mb-24 flex flex-col items-center justify-center">
      <div className="container mx-auto px-3 mb-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-3xl font-bold mb-3 sm:mb-4 text-[var(--text)]">
            Companies I&apos;ve Worked With
          </h2>
          <p className="text-base sm:text-lg text-[var(--text)] max-w-2xl mx-auto">
            Organizations that have trusted my expertise for their development
            needs.
          </p>
        </div>
      </div>
      <Marquee
        items={companiesToShow}
        direction="left"
        speed="slow"
        pauseOnHover={true}
        className="w-[80vw]"
        renderItem={(company) => (
          <div className="flex items-center justify-center mx-8 h-20 w-auto">
            <Image
              src={company.logo}
              alt={company.name}
              width={160}
              height={60}
              className="h-auto w-auto object-contain max-h-16"
            />
          </div>
        )}
      />
    </section>
  );
};

export default Companies;
