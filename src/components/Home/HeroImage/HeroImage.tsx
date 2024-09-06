import Image from 'next/image'
import React from 'react'

export const HeroImage = () => {
  return (
    <Image
        src="/assets/static/img/hero-dark.webp" 
        className="absolute inset-0 object-cover z-0"
        alt="Hero Image Illustration" 
        layout="fill"
    />
  )
}
