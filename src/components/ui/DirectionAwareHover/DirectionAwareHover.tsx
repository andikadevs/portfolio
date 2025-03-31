"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
}: {
  imageUrl: string;
  children: React.ReactNode | string;
  childrenClassName?: string;
  imageClassName?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "md:h-96 w-60 !h-100 md:w-96 bg-transparent rounded-lg overflow-hidden group relative",
        className
      )}
    >
      <div className="relative h-full w-full">
        <div className="group-hover:block hidden absolute inset-0 w-full h-full bg-black/40 z-10 transition-opacity duration-300" />
        <div className="h-full w-full relative bg-gray-50 dark:bg-black">
          <Image
            alt="Profile image"
            className={cn(
              "h-full w-full object-cover scale-[1.15] group-hover:scale-[1.08] transition-transform duration-300",
              imageClassName
            )}
            width={400}
            height={400}
            sizes="(max-width: 768px) 240px, 400px"
            loading="eager"
            priority={true}
            src={imageUrl}
          />
        </div>
        <div
          className={cn(
            "text-white absolute bottom-4 left-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            childrenClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

DirectionAwareHover.displayName = "DirectionAwareHover";