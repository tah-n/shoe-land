'use client'
import useProps from '@/lib/useProps';
import Image from 'next/image';
import React from 'react'
import SideBarItem from './SideBarItem';

const SidebarMenu = () => {
    const openSideMenu = useProps(state => state.openSideMenu);
  return (
    <div className={`fixed w-full sm:w-[90%] bg-2 h-screen z-30 text-1 transition-all duration-1000 ease-in-out font-lale text-xl pt-[120px] pr-3 ${openSideMenu? 'left-0' : '-left-full'}`}>
      <Image className='absolute bottom-0 left-0' src={'/pics/logoblack.png'} width={80} height={80} alt='logo' />  
      {/* ورود و ثبتنام */}

      {/* fehrest */}
      <SideBarItem text='محصولات' />
      <SideBarItem text='باشگاه مشتریان' />
      <SideBarItem text='آدرس شعب' />
      <SideBarItem text='درباره ما' />
      <SideBarItem text='تماس با ما' />
    </div>
  )
}

export default SidebarMenu;
