"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProfileProps } from "./ProfileProps";

export const Profile: React.FC<ProfileProps> = ({ src, alt }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );

  useEffect(() => {
    const handleResize = () => {
      if (imageRef.current && borderRef.current) {
        const { width, height } = imageRef.current.getBoundingClientRect();
        setImageSize({ width, height });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (imageRef.current && borderRef.current) {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setImageSize({ width, height });
    }
  }, [src]);

  return (
    <div className="relative flex justify-center items-center">
      <div
        ref={borderRef}
        className="absolute border-2 border-dashed border-text"
        style={{
          left: "11%",
          top: "24px",
          width: imageSize.width,
          height: imageSize.height,
        }}
      ></div>
      <img
        draggable={false}
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-[70%] h-auto z-10 shadow-xl"
      />
    </div>
  );
};
