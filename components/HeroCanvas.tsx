'use client'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import LoadModel from './LoadModel'



const HeroCanvas = () => {


  return (
    <Canvas camera={{position: [0,0,3], fov: 75}}
      style={{height: 750}}
      className='w-full'
    >
        <ambientLight intensity={5.5} position={[0,0,0]} />
        <pointLight intensity={10} position={[0,0,0]} />
        {/* model */}
        <LoadModel />
        {/* <OrbitControls /> */}
    </Canvas>
  )
}

export default HeroCanvas
