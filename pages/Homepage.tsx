'use client'
import AboutUs from '@/components/AboutUs';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import NewCollection from '@/components/NewCollection';
import SidebarMenu from '@/components/SidebarMenu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Homepage = () => {


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
    </div>
  )
}

export default Homepage;
