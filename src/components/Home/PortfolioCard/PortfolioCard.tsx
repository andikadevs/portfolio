/** @format */

import React from "react";
import Image from "next/image";
import { markupAccents } from "@/utils/Global";
import { PortfolioCardProps } from "./PortfolioCardPropsInterface";
import { Button, Tooltip } from "@/components/Global";
import { FaChrome } from "react-icons/fa";
import { BsSlashCircle } from "react-icons/bs";

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  imgSrc,
  title,
  description,
  stacks,
  url,
  onClick,
}) => {
  return (
    <div className="group h-full bg-secondary hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl rounded-lg overflow-hidden flex flex-col relative">
      <div
        className="relative w-full cursor-pointer overflow-hidden"
        style={{ paddingTop: "60%" }}
        onClick={() => onClick()}
      >
        <Image
          loading="lazy"
          src={imgSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 transition-all duration-300 group-hover:brightness-75"
          draggable={false}
        />
      </div>

      <div className="flex-1 p-4 text-text flex flex-col justify-between gap-4">
        <div>
          <h3
            className="text-xl font-semibold mb-2 text-accent/90"
            dangerouslySetInnerHTML={{ __html: markupAccents(title) }}
          />
          <p
            className="text-sm text-text/80 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: markupAccents(description) }}
          />
        </div>

        <div className="flex justify-between items-center gap-3">
          <div className="flex gap-2 items-center flex-wrap">
            {stacks.map((item, index) => (
              <div key={index} className="relative h-[24px] w-[24px] hover:scale-110 transition-transform">
                <Image
                  src={`/assets/static/img/Icons/${item}.svg`}
                  alt={`${item} Icon`}
                  layout="fill"
                  objectFit="contain"
                  className={`
                      ${item.toLowerCase() === "react" ? "animate-rotate" : ""}
                      drop-shadow-md
                    `}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <Tooltip
            hasArrow
            position="left"
            label={
              url === "forbidden"
                ? "Sorry, I can`t show you this one!"
                : "Checkout this wonderful project!"
            }
          >
            <Button
              variant="outline"
              size="sm"
              disabled={url === "forbidden"}
              className="transition-colors"
            >
              {url === "forbidden" ? (
                <>
                  <BsSlashCircle className="text-accent mr-1" /> Forbidden
                </>
              ) : (
                <>
                  <FaChrome className="mr-1" /> Visit
                </>
              )}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
