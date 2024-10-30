import React from "react";
import { Button, Tooltip } from "@/components/Global";
import {
  BsEnvelope,
  BsGithub,
  BsInstagram,
  BsJournalCheck,
  BsLinkedin,
  BsWhatsapp,
  BsYoutube,
} from "react-icons/bs";

export const Footer = () => {
  return (
    <footer
      className="relative bg-dark w-full min-h-[300px] h-auto pb-8 pt-12 flex items-center justify-center flex-col gap-8"
      style={{ zIndex: 997 }}
    >
      <div
        className="absolute bg-main shadow-xl rounded-xl min-h-[180px] py-4 w-[90vw] md:w-[80vw] top-[calc(-50%+90px)] left-1/2 transform -translate-x-1/2 grid grid-cols-1 md:grid-cols-3 gap-4 px-4"
        style={{ zIndex: 998 }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <h3
            className="text-text text-2xl text-center"
            style={{ fontWeight: 550 }}
          >
            Start a Project
          </h3>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <p
            className="text-text text-md text-center"
            style={{ fontWeight: 550 }}
          >
            Interested in working together? We should queue up a time to chat.
            I’ll buy the coffee.
          </p>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <Tooltip hasArrow label="Let`s talk about your interest privately!">
            <a href="https://wa.me/6285743699909" target="_blank">
              <Button variant="outline">
                <BsJournalCheck /> Wrap it up!
              </Button>
            </a>
          </Tooltip>
        </div>
      </div>

      <h4 className="mt-20 text-text text-center text-2xl">
        Living learning &&nbsp;
        <span className="text-accent">
          leveling up <br />
          one day&nbsp;
        </span>
        at a time
      </h4>

      <div className="flex flex-row gap-3 items-center justify-center">
        <Tooltip hasArrow label="Email Me!">
          <a
            target="_blank"
            href="mailto:andikadwisaputra.dev@gmail.com"
            className="transition-transform duration-300 hover:scale-110"
          >
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsEnvelope />
            </div>
          </a>
        </Tooltip>
        <Tooltip hasArrow label="Visit my Instagram Profile!">
          <a
            target="_blank"
            href="https://instagram.com/andikads__"
            className="transition-transform duration-300 hover:scale-110"
          >
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsInstagram />
            </div>
          </a>
        </Tooltip>
        <Tooltip hasArrow label="See me on YouTube!">
          <a
            target="_blank"
            href="https://youtube.com/@andikads__"
            className="transition-transform duration-300 hover:scale-110"
          >
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsYoutube />
            </div>
          </a>
        </Tooltip>
        <Tooltip hasArrow label="Connect with me!">
          <a
            target="_blank"
            href="https://linkedin/in/andikadwisaputra"
            className="transition-transform duration-300 hover:scale-110"
          >
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsLinkedin />
            </div>
          </a>
        </Tooltip>
        <Tooltip hasArrow label="Chat Me!">
          <a
            target="_blank"
            href="https://wa.me/6285743699909"
            className="transition-transform duration-300 hover:scale-110"
          >
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsWhatsapp />
            </div>
          </a>
        </Tooltip>
        <Tooltip hasArrow label="Checkout my GitHub Account!">
          <a
            target="_blank"
            href="https://github.com/Andikss"
            className="transition-transform duration-300 hover:scale-110"
          >
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsGithub />
            </div>
          </a>
        </Tooltip>
      </div>

      <h5 className="text-text">
        Handcrafted by&nbsp;
        <a target="_blank" href="https://github.com/Andikss">
          @andikss
        </a>
      </h5>
    </footer>
  );
};
