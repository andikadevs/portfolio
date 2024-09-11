import { Tooltip } from "@/components/Global";
import Link from "next/link";
import { BsEnvelope, BsGithub, BsInstagram, BsLinkedin, BsWhatsapp } from "react-icons/bs";

export const SosmedChain = () => {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-4 items-center">
      <div className="top-6 right-6 w-0 h-[120px] border border-1 border-accent z-[1]"></div>

      <div className="flex flex-col gap-3 text-text text-2xl z-[2]">
        <Tooltip hasArrow position="left" label="Email Me!">
          <Link href="#">
            <BsEnvelope className="transition-transform duration-300 transform hover:rotate-[-15deg]"/>
          </Link>
        </Tooltip>
        <Tooltip hasArrow position="left" label="Visit my Instagram Profile">
          <Link href="#">
            <BsInstagram className="transition-transform duration-300 transform hover:rotate-[-15deg]"/>
          </Link>
        </Tooltip>
        <Tooltip hasArrow position="left" label="Chat Me!">
          <Link href="#">
            <BsWhatsapp className="transition-transform duration-300 transform hover:rotate-[-15deg]"/>
          </Link>
        </Tooltip>
        <Tooltip hasArrow position="left" label="Connect with me!">
          <Link href="#">
            <BsLinkedin className="transition-transform duration-300 transform hover:rotate-[-15deg]"/>
          </Link>
        </Tooltip>
        <Tooltip hasArrow position="left" label="Checkout my GitHub Account!">
          <Link href="#">
            <BsGithub className="transition-transform duration-300 transform hover:rotate-[-15deg]"/>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};