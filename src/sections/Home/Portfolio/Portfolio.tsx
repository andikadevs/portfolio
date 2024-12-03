/** @format */

"use client";

import React, { useState } from "react";
import { PortfolioCard } from "@/components/Home";
import { SocialButton, Title, AnimateOnView } from "@/components/Global";
import data from "./Portfolio.json";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.map((project, index) => ({
      "@type": "SoftwareApplication",
      position: index + 1,
      name: project.title.replace(/[\[\]]/g, ""),
      description: project.description.replace(/[\[\]]/g, ""),
      applicationCategory: "Portfolio Project",
      operatingSystem: "Web Browser",
      url: project.url !== "forbidden" ? project.url : undefined,
      softwareRequirements: project.stacks.join(", "),
      offers: {
        "@type": "Offer",
        availability:
          project.url !== "forbidden"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const Portfolio: React.FC = () => {
  const [index, setIndex] = useState(-1);

  const slides = data.map((item) => ({
    src: item.imgSrc,
    title: item.title.replace(/[\[\]]/g, ''),
    description: item.description.replace(/[\[\]]/g, ''),
  }));

  const handleImageClick = (index: number) => {
    setIndex(index);
  };

  return (
    <section
      id="portfolio"
      aria-label="Portfolio and Projects"
      className="bg-main h-auto w-full px-4 md:px-10 pb-14"
    >
      <AnimateOnView direction="up">
        <Title
          title="Excellent [Portfolio]"
          description="Check out my wonderful [projects] & [achievements] that I have built throughout my journey!"
        />
      </AnimateOnView>

      <AnimateOnView direction="up" delay={200}>
        <h2 className="relative text-3xl text-text mb-4">
          Projects
          <div
            className="border-b-[3px] border-accent w-[80px]"
            role="presentation"
          ></div>
        </h2>
      </AnimateOnView>

      <div
        className="mb-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
        role="list"
        aria-label="Portfolio projects grid"
      >
        {data.map((project, index) => (
          <AnimateOnView
            key={project.title}
            direction="up"
            delay={300 + index * 100}
            className="flex-1 h-full"
          >
            <article
              role="listitem"
              itemScope
              itemType="https://schema.org/SoftwareApplication"
              className="h-full"
            >
              <PortfolioCard
                title={project.title}
                imgSrc={project.imgSrc}
                description={project.description}
                stacks={project.stacks}
                url={project.url}
                onClick={() => handleImageClick(index)}
              />
            </article>
          </AnimateOnView>
        ))}
      </div>

      <AnimateOnView direction="up" delay={600}>
        <div className="flex w-full justify-center">
          <SocialButton
            href="https://github.com/Andikss"
            iconUrl="assets/static/img/Icons/github.svg"
            altText="View all projects on GitHub"
            label="Checkout My GitHub"
            classNames="w-full md:w-auto"
            aria-label="Visit my GitHub profile to see more projects"
          />
        </div>
      </AnimateOnView>

      <Lightbox
        plugins={[Captions, Thumbnails]}
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        captions={{ showToggle: true, descriptionMaxLines: 3 }}
      />
      <StructuredData />
    </section>
  );
};
