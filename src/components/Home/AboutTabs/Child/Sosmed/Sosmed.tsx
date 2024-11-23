import { AnimateOnView, Tooltip } from "@/components/Global";
import React from "react";
import {
  BsEnvelope,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";

interface SocialLink {
  icon: React.ElementType;
  label: string;
  href: string;
  color: string;
}

export const Sosmed = () => {
  const socialLinks: SocialLink[] = [
    {
      icon: BsEnvelope,
      label: "Email Me!",
      href: "mailto:andikadwisaputra.dev@gmail.com",
      color: "hover:bg-red-500",
    },
    {
      icon: BsInstagram,
      label: "Visit my Instagram Profile!",
      href: "https://instagram.com/andikads__",
      color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
    },
    {
      icon: BsYoutube,
      label: "See me on YouTube!",
      href: "https://youtube.com/@andikads__",
      color: "hover:bg-red-600",
    },
    {
      icon: BsLinkedin,
      label: "Connect with me!",
      href: "https://linkedin/in/andikadwisaputra",
      color: "hover:bg-blue-600",
    },
    {
      icon: BsWhatsapp,
      label: "Chat Me!",
      href: "https://wa.me/6285743699909",
      color: "hover:bg-green-500",
    },
    {
      icon: BsGithub,
      label: "Checkout my GitHub Account!",
      href: "https://github.com/Andikss",
      color: "hover:bg-gray-800",
    },
  ];

  const SocialIcon = ({ icon: Icon, label, href, color }: SocialLink) => (
    <Tooltip 
      hasArrow 
      label={label}
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className="group relative"
      >
        <div className={`
          relative z-10
          text-text border-2 border-text 
          rounded-full shadow-lg p-3.5 text-xl
          transition-all duration-300 ease-in-out
          hover:scale-110 hover:rotate-[360deg]
          ${color} hover:border-transparent hover:text-white
          hover:shadow-xl hover:-translate-y-1
        `}>
          <Icon />
        </div>
        <div className="
          absolute inset-0 
          rounded-full blur-md opacity-0 
          transition-opacity duration-300 
          group-hover:opacity-20
          bg-current
        "/>
      </a>
    </Tooltip>
  );

  return (
    <AnimateOnView direction="left">
      <div className="relative">
        <h3 className="
          text-text text-3xl mb-6 
          font-bold tracking-wide
        ">
          Social
          <span className="
            text-accent relative
            after:content-[''] after:absolute 
            after:bottom-0 after:left-0 
            after:w-full after:h-[2px] 
            after:bg-accent after:transform
            after:origin-left after:scale-x-0
            after:transition-transform after:duration-300
            hover:after:scale-x-100
          "> Media</span>
        </h3>
        
        <p className="
          text-text mb-6 
          text-lg opacity-80
          hover:opacity-100 
          transition-opacity duration-300
        ">
          Let`s connect and create something amazing together! 🚀
        </p>

        <div className="
          flex flex-wrap gap-4 
          items-center justify-start
          animate-fade-in
        ">
          {socialLinks.map((link, index) => (
            <SocialIcon 
              key={index} 
              {...link} 
            />
          ))}
        </div>
      </div>
    </AnimateOnView>
  );
};
