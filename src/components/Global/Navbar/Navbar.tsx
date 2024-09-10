'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import { FaGithub, FaList } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { Button } from '@/components/Global';
import { BsEnvelope, BsGithub } from 'react-icons/bs';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Portfolio', href: '#portfolio' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = document.querySelector(href) as HTMLElement;
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust offset if necessary
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 80; // Account for offset
    navItems.forEach(item => {
      const section = document.querySelector(item.href) as HTMLElement;
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(item.href);
        }
      }
    });
  };

  useEffect(() => {
    handleScroll(); // Call on initial render
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-0 right-0 z-30">
      {/* Main navbar container */}
      <div
        className={`w-[94vw] mx-auto bg-dark opacity-[0.9] shadow-2xl md:rounded-full px-2 sm:px-3 sm:pr-3 py-2 ${
          isOpen ? 'sm:rounded-3xl' : 'sm:rounded-full'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* GitHub logo */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-gray-400 flex items-center gap-2"
          >
            <FaGithub size={32} />
            <span className='text-xl text-text'>AndikaDS</span>
          </a>

          {/* Desktop Links (hidden on mobile) */}
          <div className="hidden md:flex space-x-6 ml-auto items-center text-text">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`hover:text-gray-400 hover:underline ${
                  activeSection === item.href ? 'text-accent' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
            <Button variant='outline' className='rounded-full'>
              <BsEnvelope /> Email
            </Button>
          </div>

          {/* Hamburger menu icon */} 
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-text hover:text-gray-400 focus:outline-none"
            >
              {isOpen ? <FaX size={24} /> : <FaList size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity,height] duration-300 ease-in-out text-text flex flex-col items-center justify-between ${
            isOpen ? 'h-[90vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-2 mt-8 flex flex-col justify-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`block hover:text-gray-400 text-center ${
                  activeSection === item.href ? 'text-accent' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant='fill' className='rounded-sm shadow-lg w-full'>
              <BsEnvelope/> Email
            </Button>
            <Button variant='outline' className='rounded-sm shadow-lg w-full'>
              <BsGithub/> GitHub
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
