import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { GalleryProps } from "./GalleryProps";
import { markupAccents } from "@/utils/Global";

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
  if (!isOpen || !images?.length) return null;

  const hasDescription = descriptions && descriptions.length > 0;
  const hasTitle = titles && titles.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]">
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

      <div className="relative bg-secondary p-4 shadow-xl md:w-[80vw] md:h-[80vh] w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
        <div className="w-full md:h-[80%] h-[85%] flex justify-center items-center">
          <img
            draggable={false}
            src={images[currentIndex]}
            alt={titles?.[currentIndex] || `Slide ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain mb-3"
          />
        </div>
        {(hasTitle || hasDescription) && (
          <div className="text-white w-full md:h-[20%] h-auto">
            {hasTitle && (
              <h3 className="text-xl mb-2 relative">
                <span
                  dangerouslySetInnerHTML={{
                    __html: markupAccents(titles[currentIndex]),
                  }}
                />
                <div className="absolute w-[50px] h-[2px] bg-accent bottom-0"></div>
              </h3>
            )}
            {hasDescription && (
              <p
                dangerouslySetInnerHTML={{
                  __html: markupAccents(descriptions[currentIndex]),
                }}
              ></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
