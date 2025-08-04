'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import useProps from '@/lib/useProps'
import { BsCart } from "react-icons/bs";
import Button from '@/components/Button'
import NavItem from './NavItem'
import { useRouter } from 'next/navigation'
import Parse from 'parse'


const NewNavBar = () => {
    const openSideMenu = useProps(state => state.openSideMenu);
    const [changeNavBar,setChangeNavBar] = useState(false);
    const isMobile = useProps(state => state.isMobile);
    const router = useRouter();
    const [showBg,setShowBg] = useState(false);
    const currentUser = useProps(state => state.currentUser)
    

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

    
    const handleLogOut = async() => {
      await Parse.User.logOut();
      useProps.getState().setCurrentUser(null);
    }

  return (
    <div className={`${!openSideMenu && !isMobile && changeNavBar? 'lg:w-[80vw] w-[90vw] top-4 border-[1px] border-2/10 shadow-lg rounded-4xl bg-1 left-1/2 -translate-x-1/2' : 'w-full top-0 left-0 translate-x-0'} fixed z-40 h-[85px] flex px-5 items-center transition-all duration-1000 ease-in-out ${openSideMenu? 'backdrop-blur-none' : 'backdrop-blur-2xl bg-1/80'} justify-start`}>
      <div className='relative w-max px-2 flex items-center justify-center gap-5'>
        <Image className='left-5 hidden md:block' src={'/pics/logo.png'} width={70} height={80} alt='logo' /> 
        {/* cart */}
        <div  className={`relative p-2 rounded-md overflow-hidden cursor-pointer`} onMouseEnter={() => setShowBg(true)} onMouseLeave={() => setShowBg(false)} onClick={() => useProps.getState().setOpenCart(true)}>
          <BsCart size={26} color={showBg? '#03001C':'#FEF3E2'} />
          <div className={`absolute w-full h-full bg-2 top-0 transition-all duration-1000 ease-in-out -z-10  ${showBg? 'right-0' : '-right-full'}`} />
        </div> 
        {/* navbaritems */}
        <NavItem text='خانه' onClick={() => router.push('/')} /> 
      </div>

      
      {/* add signin sign up button here */}
      {currentUser === null? 
      <div className='absolute top-4 right-4 flex items-center'>
        <Button btnType='signin' onClick={handleSignIn}>
          ورود
        </Button>
        <Button btnType='signup' onClick={handleSignUp}>
          ثبت نام
        </Button>
      </div> :
      <div className='absolute top-5 right-6 text-center text-2'>
        {currentUser.get('name')}
        <button className='bg-1 border rounded-md text-xs opacity-80 hover:opacity-100 cursor-pointer p-2 mx-2 ' onClick={handleLogOut}>
          خروج
        </button>
      </div>
      }
     
    </div>
  )
}

export default NewNavBar
