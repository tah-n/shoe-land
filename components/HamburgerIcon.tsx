'use client'
import useProps from '@/lib/useProps';
import React, { useState } from 'react'

const HamburgerIcon = () => {
    const [closeAnimation,setCloseAnimation] = useState(false);
    const openSideMenu = useProps(state => state.openSideMenu);
    const className = `h-[2px] rounded-full transition-all duration-1000 ease-in-out ${openSideMenu ? 'bg-1' : 'bg-2'}`;
    const setOpenSideMenu = useProps(state => state.setOpenSideMenu);

    const handleClick = () => {
        setCloseAnimation(!closeAnimation);
        setOpenSideMenu();
    }


  return (
    <div className={`relative w-max h-max flex flex-col gap-2 items-center p-2 cursor-pointer md:hidden group ${openSideMenu ? 'z-50' : 'z-20'}`} onClick={handleClick}>
        <div className={`${className} w-14 ${closeAnimation? "-rotate-45" : "rotate-0"} `} />
        <div className={`${className} ${closeAnimation? "absolute top-2 w-14 rotate-45" : "w-8 rotate-0"} group-hover:w-14 `} />
    </div>
  )
}

export default HamburgerIcon
