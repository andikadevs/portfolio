import Link from "next/link";
import { BsEnvelope, BsGithub, BsInstagram, BsLinkedin, BsWhatsapp } from "react-icons/bs";

export const SosmedChain = () => {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-4 items-center">
      <div className="top-6 right-6 w-0 h-[120px] border-1 border-accent z-[1]"></div>

      <div className="flex flex-col gap-3 text-text text-2xl z-[2]">
        <Link href="#" className="transition-transform duration-300 transform hover:rotate-[-15deg]">
          <BsEnvelope/>
        </Link>
        <Link href="#" className="transition-transform duration-300 transform hover:rotate-[-15deg]">
          <BsWhatsapp/>
        </Link>
        <Link href="#" className="transition-transform duration-300 transform hover:rotate-[-15deg]">
          <BsInstagram/>
        </Link>
        <Link href="#" className="transition-transform duration-300 transform hover:rotate-[-15deg]">
          <BsLinkedin/>
        </Link>
        <Link href="#" className="transition-transform duration-300 transform hover:rotate-[-15deg]">
          <BsGithub/>
        </Link>
      </div>
    </div>
  );
};