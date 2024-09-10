import { Button } from "@/components/Global"
import { FaChrome, FaDownload, FaWhatsapp } from "react-icons/fa"

export const Hello = () => {
  return (
    <div className="min-h-[400px] flex justify-center flex-col">
      <h3 className="flex items-center gap-2 text-text text-3xl mb-4">
        <FaChrome/> Fullstack <span className="text-accent">Developer</span>
      </h3>

      <p className="text-text mb-5">
        Hello there! I`m Andika Dwi Saputra, and I`m a <span className="text-accent">Fullstack Developer!</span> Feel free to check out my portfolio!
      </p>

      <div className="flex gap-3">
        <Button variant="outline">
          <FaDownload/>Download CV
        </Button>

        <Button variant="fill">
          <FaWhatsapp/> Contact Me
        </Button>
      </div>
    </div>
  )
}
