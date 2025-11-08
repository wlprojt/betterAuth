'use client'

import CountUp from './CountUp';
import React from 'react'
import MagicBento from './MagicBento'

const Hometwo = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-black overflow-hidden">
        <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={12}
            glowColor="132, 0, 255"
        /> 
            
    </div>
    
  )
}

export default Hometwo