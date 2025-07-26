'use client'
import React from 'react'
import HeroCanvas from './HeroCanvas'
import { BackgroundBeams } from './ui/BackgroundBeams'

const Hero = () => {
  return (
    <section id='hero' className='w-full h-screen text-2 max-h-screen overflow-hidden'>
        {/* 3d model */}
        <div className='absolute w-full h-full z-0 '>
            <HeroCanvas />
        </div>
        
        <div className='relative -z-10 text-2 font-extrabold font-lale text-[170px] w-[95vw] m-auto h-[80vh] lg:w-[60vw] '>
          <div className='absolute right-0 top-[50px]'>
              دنیای
          </div>
          <div className='absolute -bottom-[50px] left-0'>
              کفش 
          </div>
        </div>

        <div className='w-max p-2 mt-10 m-auto font-dirooz text-lg '>
          <p>
       بهترین کیفیتها برای هر سلیقه ای 
          </p>
        </div>
        <BackgroundBeams />
    </section>
  )
}

export default Hero
