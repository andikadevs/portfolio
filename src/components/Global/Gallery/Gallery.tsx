import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { GalleryProps } from './GalleryProps';
import { markupAccents } from '@/utils/Global';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-white text-3xl"
      >
        &times;
      </button>

      <button
        onClick={onPrev}
        className="absolute text-3xl left-[10px] top-1/2 transform -translate-y-1/2 text-white"
      >
        <BiChevronLeft />
      </button>
      <button
        onClick={onNext}
        className="absolute text-3xl right-[10px] top-1/2 transform -translate-y-1/2 text-white"
      >
        <BiChevronRight />
      </button>

      <div className="relative bg-secondary p-4 shadow-xl max-w-[80vw]">
        <div className="overflow-hidden mb-4">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-auto"
          />
        </div>
        <div className="text-white mt-4">
          <h3 className="text-xl mb-2 relative">
            <span dangerouslySetInnerHTML={{ __html: markupAccents(titles[currentIndex]) }} />
            <div className="absolute w-[50px] h-[2px] bg-accent bottom-0"></div>
          </h3>
          <p dangerouslySetInnerHTML={{ __html: markupAccents(descriptions[currentIndex]) }}></p>
        </div>
      </div>
    </div>
  );
};
