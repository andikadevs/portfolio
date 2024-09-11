import React from 'react';
import { SocialButtonProps } from './SocialButtonPropsInterface';

export const SocialButton: React.FC<SocialButtonProps> = ({ iconUrl, altText, label, classNames, href }) => {
  return (
    <a href={href} target='_blank'>
      <button
        className={`relative flex items-center justify-center gap-3 text-text px-8 py-2 bg-secondary shadow-xl transition-shadow duration-300 hover:shadow-accent group ${classNames}`}
        style={{ fontWeight: 550 }}
      >
        <img
          src={iconUrl}
          alt={altText}
          height={40}
          width={40}
          className="transition-transform duration-300 group-hover:rotate-[-20deg]"
        />
        {label}
      </button>
    </a>
  );
};
