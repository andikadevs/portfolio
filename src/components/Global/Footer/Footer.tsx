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

interface SocialLink {
  href: string;
  icon: React.ElementType;
  label: string;
  color: string;
}

export const Footer = () => {
  const socialLinks: SocialLink[] = [
    {
      href: "mailto:andikadwisaputra.dev@gmail.com",
      icon: BsEnvelope,
      label: "Email contact",
      color: "hover:bg-red-500",
    },
    {
      href: "https://instagram.com/andikads__",
      icon: BsInstagram,
      label: "Instagram profile",
      color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
    },
    {
      href: "https://youtube.com/@andikads__",
      icon: BsYoutube,
      label: "YouTube channel",
      color: "hover:bg-red-600",
    },
    {
      href: "https://linkedin/in/andikadwisaputra",
      icon: BsLinkedin,
      label: "LinkedIn profile",
      color: "hover:bg-blue-600",
    },
    {
      href: "https://wa.me/6285743699909",
      icon: BsWhatsapp,
      label: "WhatsApp contact",
      color: "hover:bg-green-500",
    },
    {
      href: "https://github.com/Andikss",
      icon: BsGithub,
      label: "GitHub profile",
      color: "hover:bg-gray-800",
    },
  ];

  const SocialIcon = ({ icon: Icon, label, href, color }: SocialLink) => (
    <Tooltip hasArrow label={label}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className="group inline-block p-3 cursor-pointer"
        aria-label={label}
      >
        <div className="relative">
          <div className={`
            relative z-10
            text-text border-2 border-text 
            rounded-full shadow-lg p-3 text-xl
            transition-all duration-500 ease-in-out
            group-hover:scale-110 group-hover:rotate-[360deg]
            ${color} group-hover:border-transparent group-hover:text-white
            group-hover:shadow-xl group-hover:-translate-y-1
          `}>
            <Icon aria-hidden="true" className="w-5 h-5" />
          </div>
          <div className="
            absolute inset-0 
            rounded-full blur-md opacity-0 
            transition-opacity duration-500 
            group-hover:opacity-20
            bg-current
          "/>
        </div>
      </a>
    </Tooltip>
  );

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
        <span className="
          text-accent relative
          after:content-[''] after:absolute 
          after:bottom-0 after:left-0 
          after:w-full after:h-[2px] 
          after:bg-accent after:transform
          after:origin-left after:scale-x-0
          after:transition-transform after:duration-300
          hover:after:scale-x-100
        ">
          leveling up <br />
          one day&nbsp;
        </span>
        at a time
      </h3>

      <nav 
        className="flex flex-wrap gap-2 items-center justify-center w-full px-4 animate-fade-in"
        aria-label="Social media links"
      >
        {socialLinks.map((link) => (
          <SocialIcon key={link.href} {...link} />
        ))}
      </nav>

      <p className="text-text">
        Handcrafted by&nbsp;
        <a 
          target="_blank" 
          href="https://github.com/Andikss"
          rel="noopener noreferrer"
          aria-label="Visit Andika's GitHub profile"
          className="text-accent hover:underline"
        >
          @andikss
        </a>
      </p>
      <StructuredData />
    </footer>
  );
};
