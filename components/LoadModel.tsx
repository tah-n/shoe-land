'use client'
import useProps from '@/lib/useProps';
import { Html, useGLTF } from '@react-three/drei';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react'

const ShoeModel = dynamic(() => import('./ShoeModel'), { ssr: false });



const LoadModel = () => {
  const {setIsMobile} = useProps()

  //what is the screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800)
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[setIsMobile])


  //load the 3d model
  const shoeModel = useMemo(() => {
    return useGLTF('/models/basketball_shoe.glb')
  },[])


  return (
  <ShoeModel model={shoeModel.scene} />
  )
  
}

export default LoadModel

