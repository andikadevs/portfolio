'use client';

import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { GalleryProps } from "./GalleryProps";
import { markupAccents } from "@/utils/Global";
import { useSpring, animated } from "@react-spring/web";

export const Gallery: React.FC<GalleryProps> = ({
  images,
  descriptions,
  titles,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  const animationProps = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1)" : "scale(1)",
    config: { tension: 200, friction: 20 },
  });

  if (!isOpen || !images?.length) return null;

  const hasDescription = descriptions && descriptions.length > 0;

  return (
    <animated.div
      style={animationProps}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl hover:text-accent transition-colors z-[99999]"
      >
        &times;
      </button>

      <button
        onClick={onPrev}
        className="absolute text-4xl left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-accent transition-colors z-[99999]"
      >
        <BiChevronLeft />
      </button>
      <button
        onClick={onNext}
        className="absolute text-4xl right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-accent transition-colors z-[99999]"
      >
        <BiChevronRight />
      </button>

      <img
        draggable={false}
        src={images[currentIndex]}
        alt={titles?.[currentIndex] || `Slide ${currentIndex + 1}`}
        className="max-h-[70vh] sm:max-w-full h-full object-contain"
      />
      {hasDescription && (
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
          <p
            dangerouslySetInnerHTML={{
              __html: markupAccents(descriptions[currentIndex]),
            }}
          ></p>
        </div>
      )}
    </animated.div>
  );
};
