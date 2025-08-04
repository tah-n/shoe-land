'use client'
import Button from '@/components/Button';
import useProps from '@/lib/useProps';
import Image from 'next/image';
import React from 'react';
import { GoSearch } from "react-icons/go";


const SearchBar = () => {
  const isMobile = useProps(state => state.isMobile);
  const currentUser = useProps(state => state.currentUser)
    

    //function to open signin form
    const handleSignIn = () => {
      useProps.getState().setOpenSignInForm(true);
    }
    const handleSignUp = () => {
      useProps.getState().setOpenSignUpForm(true);
      console.log(useProps.getState().openSignUp)
    }

   


  return (
   <div className='relative w-[90vw] m-auto pt-26 h-max'>
      {isMobile && 
      <div className='absolute w-full top-4 flex items-center justify-between'>
        <Image src={'/pics/logo.png'} alt='' width={70} height={70} priority />
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
          </div>
          }
      </div>}
      <input className='!outline-none border h-11 rounded-4xl w-full border-2/20 focus:border-2/50 px-4' dir='rtl' />
      <div className='absolute left-4 bottom-[10px] cursor-pointer' onClick={() => console.log('add search')}>
          <GoSearch size={25} color='#FEF3E2' />
      </div>
    </div>
  )
}

export default SearchBar
