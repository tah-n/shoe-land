'use client'
import React, { useEffect, useRef, useState } from 'react'
import useProps from '@/lib/useProps';
import gsap from 'gsap';
import { RiErrorWarningFill } from "react-icons/ri";

interface Type {
    type: 'text' | 'password' | 'email';
    placeholder?: string;
    className?: string;
    label?: string;
    required?: boolean;
    value?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    warningText?: string;
}

const Inputs = ({type,placeholder,className,label,required,value,onChange,warningText}: Type) => {
    const inputClass = '!outline-none p-2 border rounded-md bg-1 w-[80vw] sm:w-84 text-2';
    const [movePlaceHolder,setMovePlaceHolder] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const showWarning = useProps(state => state.showWarningPwd);

    const handleFocus = () => {
        setMovePlaceHolder(true);
    }

    const handleBlur = () => {
        if(inputRef.current && inputRef.current.value === '') {
          setMovePlaceHolder(false);
        }
    }

   

    useEffect(() => {
      if(!showWarning) return

       const timeOutForWarning = setTimeout(() => {
        useProps.getState().setShowWarningPwd(false);
      },7000)
      timeOutForWarning
      

      return () => clearTimeout(timeOutForWarning);
    },[showWarning])

    useEffect(() => {
      if(!showWarning) return
      gsap.fromTo('.warning', {
        opacity: 1
      } ,{
        delay: 7,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      })
    },[showWarning])

  return (
    <div className='relative w-full h-full flex items-center justify-center'>
      <label className='relative'>
        <span className={`absolute text-sm font-bold transition-all duration-500 ease-linear ${movePlaceHolder? '-top-5 left-4 text-1' : 'left-2 top-2 text-2/80'}`}>
            {label}
        </span>
        <input ref={inputRef} className={`${inputClass} ${className}`} type={type} placeholder={placeholder} onFocus={handleFocus} onBlur={handleBlur} value={value} onChange={onChange}  />
      </label>
         {showWarning && (
          <div className='warning absolute -bottom-4 font-bold w-[80vw] sm:w-84 h-fit text-xs text-red-700 font-dirooz flex gap-1 items-center' dir='rtl'>
               {warningText? <RiErrorWarningFill /> : null}
               <p>{warningText}</p>
          </div>
        )} 
    </div>
  )
}

export default Inputs

