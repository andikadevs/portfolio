import React from "react";
import { Button, Tooltip } from "@/components/Global";
import {
  BsEnvelope,
  BsGithub,
  BsInstagram,
  BsJournalCheck,
  BsLinkedin,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";

const StructuredData = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WPFooter",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@type": "Person",
      "name": "Andika Dwi Saputra",
      "url": "https://github.com/Andikss",
      "sameAs": [
        "https://instagram.com/andikads__",
        "https://youtube.com/@andikads__",
        "https://linkedin/in/andikadwisaputra",
        "https://github.com/Andikss"
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const Footer = () => {
  return (
    <footer
      className="relative bg-dark w-full min-h-[300px] h-auto pb-[40px] pt-[100px] flex items-center justify-center flex-col gap-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div
        className="absolute bg-main shadow-xl rounded-xl min-h-[180px] py-4 w-[90vw] md:w-[80vw] top-[-21%] left-1/2 transform -translate-x-1/2 grid grid-cols-1 md:grid-cols-3 gap-4 px-4"
        role="complementary"
        aria-label="Project collaboration section"
      >
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-text text-2xl text-center font-medium">
            Start a Project
          </h2>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-text text-md text-center font-medium">
            Interested in working together? We should queue up a time to chat.
            I`ll buy the coffee.
          </p>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <Tooltip hasArrow label="Let's talk about your interest privately!">
            <a 
              href="https://wa.me/6285743699909" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via WhatsApp to discuss project collaboration"
            >
              <Button variant="outline">
                <BsJournalCheck aria-hidden="true" /> Wrap it up!
              </Button>
            </a>
          </Tooltip>
        </div>
      </div>

      <h3 className="mt-20 text-text text-center text-2xl">
        Living learning &nbsp;
        <span className="text-accent">
          leveling up <br />
          one day&nbsp;
        </span>
        at a time
      </h3>

      <nav 
        className="flex flex-row gap-3 items-center justify-center flex-wrap w-full px-4"
        aria-label="Social media links"
      >
        {[
          { href: "mailto:andikadwisaputra.dev@gmail.com", icon: BsEnvelope, label: "Email contact" },
          { href: "https://instagram.com/andikads__", icon: BsInstagram, label: "Instagram profile" },
          { href: "https://youtube.com/@andikads__", icon: BsYoutube, label: "YouTube channel" },
          { href: "https://linkedin/in/andikadwisaputra", icon: BsLinkedin, label: "LinkedIn profile" },
          { href: "https://wa.me/6285743699909", icon: BsWhatsapp, label: "WhatsApp contact" },
          { href: "https://github.com/Andikss", icon: BsGithub, label: "GitHub profile" }
        ].map((social) => (
          <a
            key={social.href}
            target="_blank"
            rel="noopener noreferrer"
            href={social.href}
            className="transition-transform duration-300 hover:scale-110"
            aria-label={social.label}
          >
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <social.icon aria-hidden="true" />
            </div>
          </a>
        ))}
      </nav>

      <p className="text-text">
        Handcrafted by&nbsp;
        <a 
          target="_blank" 
          href="https://github.com/Andikss"
          rel="noopener noreferrer"
          aria-label="Visit Andika's GitHub profile"
        >
          @andikss
        </a>
      </p>
      <StructuredData />
    </footer>
  );
};
