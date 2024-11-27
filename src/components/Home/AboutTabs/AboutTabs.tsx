/** @format */

"use client";

import React from "react";
import { Tabs } from "@/components/Global";
import { FaUser, FaMapMarkerAlt, FaHeart, FaTwitter } from "react-icons/fa";
import { Hello, Hobbies, Origin, Sosmed } from "./Child";
import { useSpring, animated, config } from "@react-spring/web";

interface TabItem {
  name: string;
  icon: JSX.Element;
  component: JSX.Element;
  ariaLabel: string;
  description: string;
}

const tabs: TabItem[] = [
  {
    name: "hello",
    icon: (
      <FaUser
        className="group-hover:scale-110 group-hover:rotate-12"
        aria-hidden="true"
      />
    ),
    component: <Hello />,
    ariaLabel: "About Me",
    description:
      "Personal introduction and background information about Andika Dwi Saputra",
  },
  {
    name: "origin",
    icon: (
      <FaMapMarkerAlt
        className="group-hover:scale-110 group-hover:bounce"
        aria-hidden="true"
      />
    ),
    component: <Origin />,
    ariaLabel: "Location and Origin",
    description:
      "Information about where Andika Dwi Saputra is based and his background",
  },
  {
    name: "hobbies",
    icon: <FaHeart aria-hidden="true" />,
    component: <Hobbies />,
    ariaLabel: "Hobbies and Interests",
    description:
      "Personal interests and activities outside of professional work",
  },
  {
    name: "social",
    icon: <FaTwitter aria-hidden="true" />,
    component: <Sosmed />,
    ariaLabel: "Social Media Presence",
    description: "Social media profiles and professional networks",
  },
];

// About section structured data
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Andika Dwi Saputra",
  description:
    "Full Stack Developer with expertise in React, Next.js, and Laravel",
  knowsAbout: [
    "Web Development",
    "Software Engineering",
    "Full Stack Development",
  ],
  location: {
    "@type": "Place",
    name: "Indonesia",
  },
  sameAs: [
    "https://github.com/Andikss",
    "https://linkedin.com/in/andikadwisaputra",
    "https://instagram.com/andikads__",
  ],
};

export const AboutTabs = () => {
  const fadeIn = useSpring({
    from: { transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  const tabAnimation = useSpring({
    from: { transform: "translateX(-20px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    config: config.wobbly,
  });

  const tabContentAnimation = useSpring({
    from: { transform: "scale(0.95)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: config.gentle,
  });

  return (
    <animated.section
      style={fadeIn}
      className="bg-secondary w-full p-0 h-auto relative overflow-hidden"
      aria-label="About Section"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />

      {/* Enhanced SEO content */}
      <div className="sr-only">
        <h2>About Andika Dwi Saputra</h2>
        <div itemScope itemType="https://schema.org/Person">
          <meta itemProp="name" content="Andika Dwi Saputra" />
          <meta itemProp="jobTitle" content="Full Stack Developer" />
          <p itemProp="description">
            Full Stack Developer specializing in React, Next.js, and Laravel
            development. Based in Indonesia, passionate about creating
            innovative web solutions and maintaining clean, efficient codebases.
          </p>
          {tabs.map((tab) => (
            <div key={tab.name}>
              <h3>{tab.ariaLabel}</h3>
              <meta itemProp="description" content={tab.description} />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Tabs Component */}
      <animated.div
        style={tabAnimation}
        className="relative z-10"
        role="tablist"
        aria-label="About information tabs"
      >
        <Tabs
          tabs={tabs}
          contentRenderer={(activeTab: string) => {
            const tab = tabs.find((t) => t.name === activeTab);
            return tab ? (
              <animated.div
                style={tabContentAnimation}
                role="tabpanel"
                aria-label={tab.ariaLabel}
                tabIndex={0}
                className="py-6 bg-secondary/50 backdrop-blur-sm rounded-lg transition-all duration-300 hover:bg-secondary/60"
              >
                {tab.component}
              </animated.div>
            ) : null;
          }}
        />
      </animated.div>

      {/* Enhanced background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <animated.div
          style={useSpring({
            from: { scale: 0.8 },
            to: { opacity: 1, scale: 1 },
            config: config.molasses,
          })}
          className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"
        />
        <animated.div
          style={useSpring({
            from: { scale: 0.8 },
            to: { opacity: 1, scale: 1 },
            delay: 200,
            config: config.molasses,
          })}
          className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"
        />
      </div>
    </animated.section>
  );
};
