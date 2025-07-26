'use client'
import React from 'react'

interface PropTypes {
    text: string;
}

const SideBarItem = ({text} : PropTypes) => {
  return (
    <div className='w-full cursor-pointer h-[60px] shadow-xs flex items-center justify-end'>
      {text}
    </div>
  )
}

export default SideBarItem;
