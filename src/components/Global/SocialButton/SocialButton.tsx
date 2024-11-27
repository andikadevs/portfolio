/** @format */

import React from "react";
import { SocialButtonProps } from "./SocialButtonPropsInterface";

export const SocialButton: React.FC<SocialButtonProps> = ({
  iconUrl,
  altText,
  label,
  classNames,
  href,
}) => {
  return (
    <a href={href} target="_blank" className="w-full md:w-auto">
      <button
        className={`relative hover:scale-105 transition-all duration-400 active:scale-95 flex w-full md:w-auto items-center justify-center gap-3 text-text px-8 py-2 bg-secondary shadow-xl hover:shadow-accent group ${classNames}`}
        style={{ fontWeight: 550 }}
      >
        <img
          draggable={false}
          src={iconUrl}
          alt={altText}
          height={40}
          width={40}
          className="transition-transform duration-300 group-hover:rotate-[-20deg] group-active:rotate-[20deg]"
        />
        {label}
      </button>
    </a>
  );
};
