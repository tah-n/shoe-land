'use client'
import React, { Children, useEffect, useRef } from 'react'

interface Type {
  btnType: BtnType;
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement> | SubmitEvent) => void ;
  btnClass?: string;
  disabled?: boolean;
}

type BtnType = 'signin' | 'signup' | 'submit';

const Button = ({btnType,children,onClick,btnClass,disabled} : Type) => {
  const btnRef = useRef(null);

  const styleMap = {
    signin: 'text-2/70 hover:text-2 hover:border m-2 rounded-lg',
    signup: 'text-2/80 hover:text-1 hover:bg-2 border rounded-lg',
    submit: 'text-2/80 font-semibold !text-lg hover:bg-1/90 bg-1 border rounded-lg !w-[80vw] sm:!w-84'
  };

  const className = `w-max h-fit py-2 px-5 text-sm font-dirooz cursor-pointer transition-all duration-700 ease-in flex items-center justify-center`

  return (
    <button 
      disabled={disabled? disabled : false}
      ref={btnRef}
      id='btn'
      className={`${className} ${btnClass} ${styleMap[btnType]}`}
      onClick={onClick}
      type={btnType === 'submit' ?'submit' : 'button'}
      >
      {children}
    </button>
  )
}

export default Button;
