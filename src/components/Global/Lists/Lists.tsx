/** @format */

"use client";

import React from "react";
import { ListsProps } from "./ListsProps";
import { markupAccents } from "@/utils/Global";
import { AnimateOnView } from "../AnimateOnView";

export const Lists: React.FC<ListsProps> = ({ items }) => {
  return (
    <ul className="list-none p-0 m-0">
      {items.map((item, index) => (
        <AnimateOnView direction="left" key={index} delay={index * 0.1}>
          <li
            key={index}
            className={`relative flex gap-4 items-baseline pb-6 ${
              index === items.length - 1 ? "pb-0" : ""
            }`}
          >
            <div
              className={`absolute top-4 left-[7px] w-[3px] h-full bg-accent z-0 glow ${
                index === items.length - 1 ? "hidden" : ""
              }`}
              style={{ transform: "translateX(-50%)" }}
            ></div>
            <div className="relative flex items-center top-[5px]">
              <svg
                className="text-text z-10"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle r="7" cx="7" cy="7" fill="white" />
              </svg>
            </div>
            <div className="text-text">
              <p
                className="text-2xl mb-1"
                dangerouslySetInnerHTML={{ __html: markupAccents(item.title) }}
              ></p>
              <p
                className="font-semibold mb-1"
                dangerouslySetInnerHTML={{
                  __html: markupAccents(item.details),
                }}
              ></p>
              <p
                dangerouslySetInnerHTML={{
                  __html: markupAccents(item.description),
                }}
              ></p>
            </div>
          </li>
        </AnimateOnView>
      ))}

      <style jsx>{`
        .glow {
          box-shadow: 0 0 8px rgba(255, 105, 135, 0.8); /* Adjust color and intensity */
        }
      `}</style>
    </ul>
  );
};
