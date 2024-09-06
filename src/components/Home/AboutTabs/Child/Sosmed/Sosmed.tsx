import Link from 'next/link'
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

      <div className="flex gap-4 text-text text-2xl">
        <Link href="#" className='transition-transform duration-300 transform hover:rotate-[-15deg]'>
          <BsEnvelope/>
        </Link>
        <Link href="#" className='transition-transform duration-300 transform hover:rotate-[-15deg]'>
          <BsInstagram/>
        </Link>
        <Link href="#" className='transition-transform duration-300 transform hover:rotate-[-15deg]'>
          <BsYoutube/>
        </Link>
        <Link href="#" className='transition-transform duration-300 transform hover:rotate-[-15deg]'>
          <BsWhatsapp/>
        </Link>
        <Link href="#" className='transition-transform duration-300 transform hover:rotate-[-15deg]'>
          <BsLinkedin/>
        </Link>
        <Link href="#" className='transition-transform duration-300 transform hover:rotate-[-15deg]'>
          <BsGithub/>
        </Link>
      </div>
    </div>
  )
}
