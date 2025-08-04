'use client'
import React from 'react'

interface PropTypes {
    text: string;
    href?: string;
    onClick?: () => void;
}

const SideBarItem = ({text,href,onClick} : PropTypes) => {
  return (
    <div className='w-full cursor-pointer h-[60px] shadow-xs flex items-center justify-end' onClick={onClick}>
      <a href={href}>
        {text}
      </a>
    </div>
  )
}

export default SideBarItem;
