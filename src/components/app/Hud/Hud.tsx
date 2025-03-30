"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Instagram, Github, Linkedin, MessageCircle } from "lucide-react";
import { Menu, Button } from "./Child";

export const Hud = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;
      if (targetElement.closest("button[data-hud-toggle]")) {
        return;
      }

      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      href: "mailto:andikadwisaputra.dev@gmail.com",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "Instagram",
      href: "https://instagram.com/andikads__",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      href: "https://wa.me/6285743699909",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/andikadwisaputra",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/Andikss",
    },
  ];

  return (
    <>
      <Menu ref={menuRef} isOpen={isOpen} menuItems={menuItems} />
      <Button isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
