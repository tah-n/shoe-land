'use client'
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

const CloseButton = ({setState} : {
    setState: (value: boolean) => void;
}) => {
    const topLine = useRef<HTMLDivElement>(null);
    const middleLine = useRef<HTMLDivElement>(null);
    const bottomLine = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.to('.topLine', {
            x: 21,
            delay: 0.2,
            duration: 0.5,
            ease: 'power2'
        });
        gsap.to('.bottomLine', {
            x: 21,
            delay: 0.2,
            duration: 0.5,
            ease: 'power2'
        });
        gsap.to('.middleLine', {
            rotate: 0,
            delay: 0.2,
            duration: 0.5,
            ease: 'power2'
        });

    },[])



  return (
    <div className='absolute top-2 right-4 w-24 h-16 scale-75 cursor-pointer group' onClick={() => setState(false)}>
      {/* make an arrow */}
      <div className='relative w-full h-full flex items-center justify-center group-hover:translate-x-4 transition-all duration-300 ease-in-out '>
        <div ref={topLine} className='topLine absolute top-3 bg-1 w-12 h-3 rounded-2xl rotate-45' />
        <div ref={middleLine} className='middleLine absolute bg-1 w-20 h-3 rounded-2xl rotate-90' />
        <div ref={bottomLine} className='bottomLine absolute bottom-3 bg-1 w-12 h-3 rounded-2xl -rotate-45 ' />
      </div>
    </div>
  )
}

export default CloseButton;
