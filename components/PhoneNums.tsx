'use client'
import React from 'react'

interface Type {
    text: string;
    numbers?: string[];
    address?: string;
}

const PhoneNums = ({text,numbers,address}: Type) => {
  return (
    <div className='relative w-fit mb-5 '>
        <div>
            <p>
                {text}:
            </p>
            {numbers?.map((number, i) => (
                <div key={i} className='text-right m-1 text-sm'>
                    <p  dir='ltr' className='cursor-pointer '>
                        <a href={`tel:${number}`}>
                            {number}
                        </a>
                    </p>
                </div>
            ))}
            {address && 
            <p className='text-sm'>
                {text === 'ایمیل'? <a href={`mailto:${address}`}>{address}</a> : address}
            </p>
            }
        </div>
    </div>
  )
}

export default PhoneNums;
