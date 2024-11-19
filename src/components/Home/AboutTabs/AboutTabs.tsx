"use client";

import React from "react";
import { Tabs } from "@/components/Global";
import { FaUser, FaMapMarkerAlt, FaHeart, FaTwitter } from "react-icons/fa";
import { Hello, Hobbies, Origin, Sosmed } from "./Child";

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
    icon: <FaUser aria-hidden="true" />,
    component: <Hello />,
    ariaLabel: "About Me",
    description: "Personal introduction and background information about Andika Dwi Saputra"
  },
  { 
    name: "origin",
    icon: <FaMapMarkerAlt aria-hidden="true" />,
    component: <Origin />,
    ariaLabel: "Location and Origin",
    description: "Information about where Andika Dwi Saputra is based and his background"
  },
  { 
    name: "hobbies",
    icon: <FaHeart aria-hidden="true" />,
    component: <Hobbies />,
    ariaLabel: "Hobbies and Interests",
    description: "Personal interests and activities outside of professional work"
  },
  { 
    name: "social",
    icon: <FaTwitter aria-hidden="true" />,
    component: <Sosmed />,
    ariaLabel: "Social Media Presence",
    description: "Social media profiles and professional networks"
  },
];

// About section structured data
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Andika Dwi Saputra",
  "description": "Full Stack Developer with expertise in React, Next.js, and Laravel",
  "knowsAbout": [
    "Web Development",
    "Software Engineering",
    "Full Stack Development"
  ],
  "location": {
    "@type": "Place",
    "name": "Indonesia"
  },
  "sameAs": [
    "https://github.com/Andikss",
    "https://linkedin.com/in/andikadwisaputra",
    "https://instagram.com/andikads__"
  ]
};

export const AboutTabs = () => {
  return (
    <section 
      className="bg-secondary w-full p-0 h-auto"
      aria-label="About Section"
      itemScope 
      itemType="https://schema.org/AboutPage"
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema)
        }}
      />

      {/* Hidden SEO content */}
      <div className="sr-only">
        <h2>About Andika Dwi Saputra</h2>
        <div itemScope itemType="https://schema.org/Person">
          <meta itemProp="name" content="Andika Dwi Saputra" />
          <meta itemProp="jobTitle" content="Full Stack Developer" />
          <p itemProp="description">
            Full Stack Developer specializing in React, Next.js, and Laravel development.
            Based in Indonesia, passionate about creating innovative web solutions and
            maintaining clean, efficient codebases.
          </p>
          {tabs.map(tab => (
            <div key={tab.name}>
              <h3>{tab.ariaLabel}</h3>
              <meta itemProp="description" content={tab.description} />
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Component */}
      <div 
        role="tablist"
        aria-label="About information tabs"
      >
        <Tabs
          tabs={tabs}
          contentRenderer={(activeTab: string) => {
            const tab = tabs.find((t) => t.name === activeTab);
            return tab ? (
              <div
                role="tabpanel"
                aria-label={tab.ariaLabel}
                tabIndex={0}
              >
                {tab.component}
              </div>
            ) : null;
          }}
        />
      </div>
    </section>
  );
};
