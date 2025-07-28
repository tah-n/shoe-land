'use client'
import Image from 'next/image'
import React from 'react'
import AvailableCollections from './AvailableCollections'

const NewCollection = () => {
  return (
    <div className='w-full h-auto overflow-hidden'>
        {/* add new collection banner */}
        <div className='w-screen h-[44vh] sm:h-[55vh] sm:mb-[8rem] bg-2 flex text-1'>
            <div className='relative w-full h-full'>
              <div className='w-full flex items-center justify-start '>
                <Image className='m-auto translate-x-6 sm:w-[500px] sm:m-0 sm:translate-x-0 md:w-[700px] lg:ml-[5rem] xl:ml-[12rem] ' src='/pics/newcollection.png' alt='new collection' width={350} height={50}  />
              </div>

              <div className='absolute text-2 mix-blend-difference top-1/3 left-[8vw] sm:left-[20rem] md:left-[26rem] xl:left-[42rem] w-[10rem] tracking-tighter'>
                <h1 className='text-5xl uppercase font-bodoni sm:text-5xl md:text-5xl lg:text-[5rem]  '>
                    new collection
                </h1>
              </div>
            </div>
        </div>
      
        {/* add available collections */}
        <AvailableCollections />
    </div>
  )
}

export default NewCollection
