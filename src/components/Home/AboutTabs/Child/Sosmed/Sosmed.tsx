import { Tooltip } from '@/components/Global'
import React from 'react'
import { BsEnvelope, BsGithub, BsInstagram, BsLinkedin, BsWhatsapp, BsYoutube } from 'react-icons/bs'

export const Sosmed = () => {
  return (
    <div>
      <h3 className="text-text text-3xl mb-6">
        Social 
        <span className="text-accent"> Media</span>
      </h3>

      <p className='text-text mb-4'>
        Reach me out!
      </p>

      <div className="flex flex-row gap-3 items-center justify-start">
        <Tooltip hasArrow label='Email Me!'>
          <a target='_blank' href="mailto:andikadwisaputra.dev@gmail.com" className="transition-transform duration-300 hover:scale-110">
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsEnvelope />
            </div>
          </a>
        </Tooltip>
        <Tooltip hasArrow label='Visit my Instagram Profile!'>
          <a target='_blank' href="https://instagram.com/andikads__" className="transition-transform duration-300 hover:scale-110">
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsInstagram />
            </div>
          </a>
        </Tooltip>
        <Tooltip hasArrow label='See me on YouTube!'>
          <a target='_blank' href="https://youtube.com/@andikads__" className="transition-transform duration-300 hover:scale-110">
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsYoutube />
            </div>
          </a>
        </Tooltip>
        <Tooltip hasArrow label='Connect with me!'>
          <a target='_blank' href="https://linkedin/in/andikadwisaputra" className="transition-transform duration-300 hover:scale-110">
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsLinkedin />
            </div>
          </a>
        </Tooltip>
        <Tooltip hasArrow label='Chat Me!'>
          <a target='_blank' href="https://wa.me/6285743699909" className="transition-transform duration-300 hover:scale-110">
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsWhatsapp />
            </div>
          </a>
        </Tooltip>
        <Tooltip hasArrow label='Checkout my GitHub Account!'>
          <a target='_blank' href="https://github.com/Andikss" className="transition-transform duration-300 hover:scale-110">
            <div className="text-text border border-text rounded-full shadow-lg p-3 text-xl transition-colors duration-300 hover:bg-accent hover:text-secondary">
              <BsGithub />
            </div>
          </a>
        </Tooltip>
      </div>
    </div>
  )
}
