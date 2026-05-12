"use client";

import React from "react";
import { Menu, Button } from "./child";
import { IconBrandGithub, IconBrandGmail, IconBrandInstagram, IconBrandLinkedin, IconBrandMedium, IconBrandWhatsapp } from "@tabler/icons-react";
import { useHud } from "@/hooks/use-hud";

/**
 * @author Andika Dwi Saputra
 *
 * @date 30/03/2025
 * @description Hud component
 */

export const Hud = () => {
  const { isOpen, setIsOpen, menuRef } = useHud();

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
