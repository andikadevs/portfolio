/** @format */

"use client";

import { useState } from "react";
import {
  IconLink,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconMessageCircle,
  IconBrandFacebook,
  IconSend,
  IconShare,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

interface ShareProps {
  url: string;
  title: string;
}

export const Share: React.FC<ShareProps> = ({ url, title }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setIsMobileMenuOpen(false);
  };

  const shareLinks = [
    {
      icon: <IconLink className="w-5 h-5" />,
      title: "Copy link",
      onClick: handleCopyLink,
      isButton: true,
    },
    {
      icon: <IconBrandTwitter className="w-5 h-5" />,
      title: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
    },
    {
      icon: <IconBrandLinkedin className="w-5 h-5" />,
      title: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    },
    {
      icon: <IconMessageCircle className="w-5 h-5" />,
      title: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`,
    },
    {
      icon: <IconBrandFacebook className="w-5 h-5" />,
      title: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      icon: <IconSend className="w-5 h-5" />,
      title: "Share on Telegram",
      href: `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
    },
  ];

  const buttonClasses =
    "p-3 bg-[var(--dark)] backdrop-blur-sm rounded-full text-text hover:bg-[var(--accent)] hover:text-[var(--background)] cursor-pointer transition-all";

  return (
    <>
      {/* Desktop Share Buttons */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
        {shareLinks.map((link, index) =>
          link.isButton ? (
            <button
              key={index}
              onClick={link.onClick}
              className={buttonClasses}
              title={link.title}
            >
              {link.icon}
            </button>
          ) : (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses}
              title={link.title}
            >
              {link.icon}
            </a>
          )
        )}
      </div>

      {/* Mobile Share Button and Menu */}
      <div className="lg:hidden z-[9998]">
        {/* Mobile Share Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed bottom-3 right-4 bg-[var(--dark)] backdrop-blur-sm text-[var(--text)] p-4 rounded-full 
            shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 
            group border border-[var(--secondary)] z-50 cursor-pointer"
          aria-label="Share this article"
        >
          <IconShare className="w-5 h-5" />
        </button>

        {/* Mobile Share Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-dark/80 z-50"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 20 }}
                className="fixed bottom-0 left-0 right-0 bg-[var(--dark)] backdrop-blur-sm p-6 rounded-t-2xl shadow-xl !z-[9998]"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-text">
                      Share this article
                    </h3>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-text hover:text-[var(--accent)] transition-all cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {shareLinks.map((link, index) =>
                      link.isButton ? (
                        <button
                          key={index}
                          onClick={link.onClick}
                          className="flex flex-col items-center gap-2 text-text hover:text-accent"
                        >
                          <span className="p-3 bg-dark/10 rounded-full">
                            {link.icon}
                          </span>
                          <span className="text-xs">{link.title}</span>
                        </button>
                      ) : (
                        <a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-2 text-text hover:text-accent"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="p-3 bg-dark/10 rounded-full">
                            {link.icon}
                          </span>
                          <span className="text-xs text-center">
                            {link.title}
                          </span>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
