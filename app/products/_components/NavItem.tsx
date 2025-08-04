'use Client'
import Link from 'next/link';
import React, { MouseEventHandler, useState } from 'react'

const NavItem = ({text, href, onClick} : {
    text: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;

}) => {
    const [showBg,setShowBg] = useState(false);


  return (
    <div className={`relative overflow-hidden text-sm cursor-pointer p-2 rounded-sm transition-all duration-1000 ease-in-out ${showBg? 'text-1': 'text-2'} `} onMouseEnter={() => setShowBg(true)} onMouseLeave={() => setShowBg(false)}>
        <a className='outline-none z-10' href={href} onClick={onClick}>
            {text}
        </a>
        <div className={`absolute w-full h-full bg-2 top-0 transition-all duration-1000 ease-in-out -z-10  ${showBg? 'right-0' : '-right-full'}`} />
    </div>
  )
}

export default NavItem
