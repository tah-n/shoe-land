'use client'
import Image from 'next/image'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const Footprints = () => {
  const divsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    gsap.to(divsRef.current, {
      opacity: 1,
      stagger: 0.3, 
      duration: 2,
      ease: 'power2.out',
    })
  }, [])

  const baseClassName = 'absolute opacity-0 transition-transform'

  const footprints = [
    { class: 'bottom-1 right-8 rotate-12', src: '/pics/rightfp.png' },
    { class: 'bottom-12 right-14 rotate-12', src: '/pics/leftfp.png' },
    { class: 'bottom-[8rem] right-4 rotate-45', src: '/pics/rightfp.png' },
    { class: 'bottom-[12rem] right-5 rotate-45', src: '/pics/leftfp.png' },
    { class: 'bottom-[17rem] -right-2 rotate-0', src: '/pics/rightfp.png' },
    { class: 'bottom-[20rem] right-9 -rotate-45', src: '/pics/leftfp.png' },
    { class: 'bottom-[25rem] right-8 -rotate-12', src: '/pics/rightfp.png' },
    { class: 'bottom-[28rem] right-24 -rotate-45', src: '/pics/leftfp.png' },
    { class: 'bottom-[32rem] right-26 -rotate-45', src: '/pics/rightfp.png' },
    { class: 'bottom-[34rem] right-46 -rotate-45', src: '/pics/leftfp.png' },
    { class: 'bottom-[37.5rem] right-46 -rotate-45', src: '/pics/rightfp.png' },
    { class: 'bottom-[35rem] left-36 -rotate-90', src: '/pics/leftfp.png' },
    { class: 'bottom-[37.5rem] left-24 -rotate-90', src: '/pics/rightfp.png' },
    { class: 'bottom-[33rem] left-12 -rotate-90', src: '/pics/leftfp.png' },
    { class: 'bottom-[35.5rem] left-0 -rotate-90', src: '/pics/rightfp.png' },
  ]

  return (
    <div className="absolute w-full h-full opacity-35 -z-10 pointer-events-none">
      {footprints.map((fp, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) divsRef.current[i] = el
          }}
          className={`${baseClassName} ${fp.class}`}
        >
          <Image src={fp.src} alt='' width={50} height={50} />
        </div>
      ))}
    </div>
  )
}

export default Footprints