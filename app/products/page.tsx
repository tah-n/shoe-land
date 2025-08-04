"use client"
import React, { useEffect } from 'react'
import NewNavBar from './_components/NewNavBar'
import Cart from './_components/Cart'
import useProps from '@/lib/useProps'
import ButtomBar from './_components/ButtomBar'
import SearchBar from './_components/SearchBar'
import ProductsContainer from './_components/ProductsContainer'
import SignForms from '@/components/SignForms'
import Dropbox from '@/components/ui/Dropbox'
import FetchCurrentUser from '@/components/FetchCurrentUser'

const Products = () => {
  const isMobile = useProps(state => state.isMobile);
  const {setIsMobile} = useProps();
  const {openSignIn,openSignUp,openCart} = useProps();

  

  //what is the screen width
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 540)
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },[setIsMobile])
  

  return (
    <div className='relative w-full h-auto'>
      <FetchCurrentUser>
        {!isMobile? <NewNavBar /> : <ButtomBar />}
        {openCart && <Dropbox setState={useProps.getState().setOpenCart} />}
        <Cart />

        {/* search bar */}
        <SearchBar />

        {/* filter bar */}

        {/* products */}
        <ProductsContainer />



        
        {/* sign forms */}
        {openSignIn && 
        <>
        <SignForms type='signin' setState={useProps.getState().setOpenSignInForm} />
        <Dropbox setState={useProps.getState().setOpenSignInForm} />
        </>
        }

        {openSignUp && (
        <>
          <SignForms type="signup" setState={useProps.getState().setOpenSignUpForm} />
          <Dropbox setState={useProps.getState().setOpenSignUpForm} />
        </>
        )}

      
      </FetchCurrentUser>
    </div>
  )
}

export default Products
