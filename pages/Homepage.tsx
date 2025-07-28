'use client'
import AboutUs from '@/components/AboutUs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import NewCollection from '@/components/NewCollection';
import SidebarMenu from '@/components/SidebarMenu';
import SignForms from '@/components/SignForms';
import Dropbox from '@/components/ui/Dropbox';
import useProps from '@/lib/useProps';
import React, { useEffect } from 'react';



const Homepage = () => {
  const {openSignIn,openSignUp} = useProps();
  

  return (
    <div className='relative h-auto'>
      {/* navbar */}
      <Navbar />
      <SidebarMenu />
   
      {/* hero section */}
      <Hero />
      {/* add new collection section */}
      <NewCollection />

      {/*  about us part */}
       <AboutUs />

       {/* contact us */}
       <Contact />

       {/* footer */}
       <Footer />

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
    </div>
  )
}

export default Homepage;
