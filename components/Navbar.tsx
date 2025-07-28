'use client'
import React, { useEffect, useState } from 'react'
import HamburgerIcon from './HamburgerIcon'
import Image from 'next/image'
import useProps from '@/lib/useProps'
import NavbarItems from './NavbarItems'
import Button from './Button'

const Navbar = () => {
    const openSideMenu = useProps(state => state.openSideMenu);
    const [changeNavBar,setChangeNavBar] = useState(false);
    const isMobile = useProps(state => state.isMobile);

    //function to open signin form
    const handleSignIn = () => {
      useProps.getState().setOpenSignInForm(true);
    }
    const handleSignUp = () => {
      useProps.getState().setOpenSignUpForm(true);
      console.log(useProps.getState().openSignUp)
    }

    // measure if the scroll reaches the end of the nav and then change the navbar
    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;

        if(scrollY >= 85) {
          setChangeNavBar(true)
        } else {
          setChangeNavBar(false);
        }
      }
      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    },[])

  return (
    <div className={`${!openSideMenu && !isMobile && changeNavBar? 'lg:w-[80vw] md:w-[90vw] top-4 border-[1px] border-2/10 shadow-lg rounded-4xl bg-1 left-1/2 -translate-x-1/2' : 'w-full top-0 left-0 translate-x-0'} fixed z-40 h-[85px] flex px-5 items-center transition-all duration-1000 ease-in-out ${openSideMenu? 'backdrop-blur-none' : 'backdrop-blur-2xl bg-1/80'} justify-start md:justify-center`}>
      <Image className='absolute left-5 hidden md:block' src={'/pics/logo.png'} width={70} height={80} alt='logo' />  
      <HamburgerIcon />
      <NavbarItems />
      {/* add signin sign up button here */}
      <div className='absolute top-4 right-4 flex items-center'>
        <Button btnType='signin' onClick={handleSignIn}>
          ورود
        </Button>
        <Button btnType='signup' onClick={handleSignUp}>
          ثبت نام
        </Button>
      </div>
    </div>
  )
}

export default Navbar
