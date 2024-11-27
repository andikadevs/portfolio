/** @format */

import React from "react";
import { AnimateOnView, Button } from "@/components/Global";
import {
  FaChrome,
  FaCode,
  FaDownload,
  FaServer,
  FaWhatsapp,
} from "react-icons/fa";

export const Hello: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/static/data/curriculum-vitae.pdf";
    link.download = "curicullum-vitae.pdf";
    link.click();
  };

  return (
    <AnimateOnView direction="left">
      <div className="min-h-[400px] flex justify-center flex-col">
        <h3 className="flex items-center gap-2 text-text text-3xl mb-4">
          <FaChrome /> Fullstack <span className="text-accent">Developer</span>
        </h3>

        <p className="text-text">
          Hi, I`m Andika Dwi Saputra, a passionate{" "}
          <span className="text-accent">Fullstack Developer</span> with
          expertise in building modern web applications. I specialize in
          creating seamless user experiences and robust backend solutions. Let`s
          explore my work together!
        </p>

        <div className="flex gap-3 flex-wrap my-5">
          <span className="inline-flex whitespace-nowrap text-text items-center gap-1">
            <FaCode className="text-accent" /> Frontend Development
          </span>
          <span className="inline-flex whitespace-nowrap text-text items-center gap-1">
            <FaServer className="text-accent" /> Backend Solutions
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="flex-1 sm:flex-none whitespace-nowrap" variant="outline" onClick={handleDownload}>
            <FaDownload /> Download CV
          </Button>

          <a target="_blank" className="flex-1 sm:flex-none sm:flex-0 flex" href="https://wa.me/6285743699909">
            <Button className="flex-1 sm:flex-0 whitespace-nowrap" variant="fill">
              <FaWhatsapp /> Contact Me
            </Button>
          </a>
        </div>
      </div>
    </AnimateOnView>
  );
};
