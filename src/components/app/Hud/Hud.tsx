"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, Button } from "./Child";
import { IconBrandGithub, IconBrandGmail, IconBrandInstagram, IconBrandLinkedin, IconBrandMedium, IconBrandWhatsapp } from "@tabler/icons-react";

/**
 * @author Andika Dwi Saputra
 *
 * @date 30/03/2025
 * @description Hud component
 */

export const Hud = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * @author Andika Dwi Saputra
   *
   * @description Handle click outside, will close the menu if the user clicks outside the menu
   */

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

  /**
   * @author Andika Dwi Saputra
   *
   * @description Menu items
   */

  const menuItems = [
    {
      icon: <IconBrandGmail className="w-5 h-5" />,
      label: "Email",
      href: "mailto:andikadwisaputra.dev@gmail.com",
    },
    {
      icon: <IconBrandInstagram className="w-5 h-5" />,
      label: "Instagram",
      href: "https://instagram.com/andikads__",
    },
    {
      icon: <IconBrandWhatsapp className="w-5 h-5" />,
      label: "WhatsApp",
      href: "https://wa.me/6285743699909",
    },
    {
      icon: <IconBrandLinkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/andikadwisaputra",
    },
    {
      icon: <IconBrandGithub className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/andikadevs",
    },
    {
      icon: <IconBrandMedium />,
      label: "Medium",
      href: "https://medium.com/@andikads",
    },
  ];

  return (
    <>
      <Menu ref={menuRef} isOpen={isOpen} menuItems={menuItems} />
      <Button isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
