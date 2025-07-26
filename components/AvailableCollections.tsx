'use client'
import React from 'react'
import Collection from './Collection';
import { womenWear } from '@/lib/assets'


const AvailableCollections = () => {
  return (
    <div className=''>
        {/* women's wear  */}
        <Collection 
            header='کفش رسمی زنانه'
            items={womenWear}
            pauseOnHover={true}
            direction='left'
            speed='normal'
        />     
         {/*men's wear  */}
         <Collection 
            header='کفش رسمی مردانه'
            items={womenWear}
            pauseOnHover={true}
            direction='right'
            speed='normal'
        /> 
        {/* sport */}
        <Collection 
            header='اسپرت'
            items={womenWear}
            pauseOnHover={true}
            direction='left'
            speed='normal'
        /> 
    </div>
  )
}

export default AvailableCollections;
