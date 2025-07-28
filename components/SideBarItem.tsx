'use client'
import React from 'react'

interface PropTypes {
    text: string;
    href?: string;
}

const SideBarItem = ({text,href} : PropTypes) => {
  return (
    <div className='w-full cursor-pointer h-[60px] shadow-xs flex items-center justify-end'>
      <a href={href}>
        {text}
      </a>
    </div>
  )
}

export default SideBarItem;
