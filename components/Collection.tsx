'use client'
import React from 'react'
import { InfiniteMovingCards } from './ui/MovingCards'

const Collection = ({items, direction, speed, pauseOnHover, className, header}:
    {
    items: {
    name: string;
    price: number;
    colors: {
        color: string,
        pic1: string,
        pic2: string
    }[];
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  header: string;
}
) => {
  return (
    <div className='w-full'>
        {/* header */}
        <div className='relative w-full min-h-[8rem] font-dirooz font-semibold text-xl text-2 '>
            <h2 className='absolute right-6 bottom-7'>
                {header}
            </h2>
        </div>
        {/* cards */}
        <div className='w-full h-max rounded-md flex flex-col antialiased bg-1 items-center justify-center relative overflow-hidden'>
        <InfiniteMovingCards
            items={items}
            direction={direction}
            speed={speed}
            className={className}
            pauseOnHover={pauseOnHover}
        />
        </div>
      
    </div>
  )
}

export default Collection
