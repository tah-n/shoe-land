'use client'
import useProps from '@/lib/useProps';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';

const ShoeModel = ({model}: {
    model: THREE.Object3D;
}) => {
  const modelRef = useRef<THREE.Object3D>(null);
  const isMobile = useProps(state => state.isMobile);
  const [mousePos, setMousePos] = useState({ x:0.5, y:0.5 });
  const [hovered, setHovered] = useState(false);
  const initialRotation = useRef(new THREE.Euler(
    0,                      // x
    -Math.PI / 2,           // y
    THREE.MathUtils.degToRad(-50) // z
  ));

    //add small motion animation of the model
    useEffect(() => {
      if(isMobile) return ;

      const handleMouseMove = (e: MouseEvent) => {
        setHovered(true);
        const x = e.clientX / window.innerWidth ;
        const y = e.clientY / window.innerHeight;
        // console.log(x,' + ', y)
        setMousePos({x,y});

      }

      const handleMouseLeave = () => {
      setHovered(false);
    };
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove); 
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    },[isMobile]);

    //use frame for the mouse movement animation
    useFrame(() => {
    if (!modelRef.current) return;

    const rot = modelRef.current.rotation;

    if (hovered) {
      // انیمیشن به سمت موقعیت موس
      const targetY = initialRotation.current.y + (mousePos.x - 0.5) * 0.5;
      const targetX = initialRotation.current.x + (mousePos.y - 0.5) * 0.3;

      rot.y = THREE.MathUtils.lerp(rot.y, targetY, 0.05);
      rot.x = THREE.MathUtils.lerp(rot.x, targetX, 0.05);
    } else {
      // برگشت به چرخش اولیه
      rot.y = THREE.MathUtils.lerp(rot.y, initialRotation.current.y, 0.05);
      rot.x = THREE.MathUtils.lerp(rot.x, initialRotation.current.x, 0.05);
      rot.z = THREE.MathUtils.lerp(rot.z, initialRotation.current.z, 0.05);
    }
  });


  

    //making the model responsive
    const position = isMobile? [0,-0.1,0.2] : [0,-0.3,0];
    const rotation = [initialRotation.current.x, initialRotation.current.y, initialRotation.current.z];
    const scale = isMobile? 0.9 : 1;

  return (
      <primitive 
        object={model}
        ref={modelRef}
        position={position}
        rotation= {rotation}
        scale={scale}
        />
  )
}

export default ShoeModel;
