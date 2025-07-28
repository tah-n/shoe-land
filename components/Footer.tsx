'use client'
import React from 'react'

const Footer = () => {
  return (
    <footer className='relative w-full text-2 text-xs font-dirooz h-[5rem] pt-[2.5rem] '>
      <div className='absolute top-0 w-[85vw] h-[1px] left-1/2 -translate-x-1/2 bg-2 rounded-xl' />  
      <div className='w-full pl-6 text-center h-fit'>
        <span dir='rtl' className='relative w-fit'>
            کلیه حقوق این سایت متعلق به فروشگاه اینترنتی شولند میباشد.
            <span>
                2025
            </span>
            <img className='absolute right-full' src='/socials/copy.png' alt='' width={11} height={11} />
        </span>
      </div>
    </footer>
  )
}

export default Footer;
