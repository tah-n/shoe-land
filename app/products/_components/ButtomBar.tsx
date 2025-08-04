'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import useProps from '@/lib/useProps';
import { useRouter } from 'next/navigation';
import { IoBagHandleOutline } from "react-icons/io5";
import { CiShop } from "react-icons/ci";
import { LiaUser } from "react-icons/lia";
import Parse from 'parse';
import Dropbox from '@/components/ui/Dropbox';


const ButtomBar = () => {
    const router = useRouter();
    const [showButton,setShowButton] = useState(false);

      const handleLogOut = async() => {
      await Parse.User.logOut();
      useProps.getState().setCurrentUser(null);
    }

    
  return (
    <div className='fixed bottom-0 bg-1 shadow-2xl shadow-2 w-full h-[4.5rem] flex items-center px-2 text-[11px] text-2 font-dirooz z-50'>
      <div className=' bg-1 w-1/2 border-r-[3px] border-2/50 flex items-center justify-center cursor-pointer' onClick={() => setShowButton(true)}>
        <div className='flex flex-col items-center justify-center gap-1'>
          <LiaUser size={26} color={'#FEF3E2'} />
          <p>اکانت</p>
       </div>
       {/* add logout button */}
       <div className={`absolute ${showButton ? "-top-full left-1/2 -translate-x-1/2 z-50 ":"left-0 top-0 w-1 h-1 -z-10 "} overflow-hidden transition-all duration-200 ease-in `}>
          <button className='bg-1 border rounded-md text-lg cursor-pointer p-5 px-8 w-max mx-2 ' onClick={handleLogOut}>
            خروج از حساب کاربری
          </button>
       </div>
      </div>  

      {showButton && <Dropbox setState={setShowButton} />}

      <div className='w-1/2 bg-1 border-r-[3px] border-2/50 flex items-center justify-center cursor-pointer' onClick={() => router.push('/')}>
        <div className='flex flex-col items-center justify-center gap-1'>
          <Image src={'/pics/home.png'} alt='' width={26} height={26} />
          <p>خانه</p>
       </div>
      </div>  
 
      <div className='w-1/2 flex items-center justify-center border-r-[3px] border-2/50 cursor-pointer ' onClick={() => useProps.getState().setOpenCart(true)}>
        <div className='flex flex-col items-center justify-center gap-1'>
        <IoBagHandleOutline size={26} color={'#FEF3E2'} />
        <p>سبد خرید</p>
        </div>
      </div>

       <div className='w-1/2 flex items-center justify-center cursor-pointer ' onClick={() => router.push('/products')}>
        <div className='flex flex-col items-center justify-center gap-1'>
        <CiShop size={26} color={'#FEF3E2'} />
        <p>محصولات</p>
        </div>
      </div>
     
    </div>
  )
}

export default ButtomBar

