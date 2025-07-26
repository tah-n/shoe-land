'use client'
import Image from 'next/image'
import React from 'react'

const AboutUs = () => {
  return (
    <section 
      id='about' 
      className='w-full h-screen mt-44 md:mt-[20rem]'
      dir='rtl'
    >
        
        <div className='relative w-full h-auto min-h-[36rem] md:mt-50'>
            <div className='relative w-full h-[32rem] -skew-y-12'>
                <div className='absolute top-0 w-full p-4 h-[22rem] bg-2 shadow-1 shadow-lg z-0 '>
                </div>
                <div className='absolute bottom-0 w-full h-[10rem] bg-2 -z-10 '>
                </div>
            </div>
            {/* the text */}
             <div className='absolute top-3 lg:-top-16 font-dirooz z-10 p-4 text-1'>
                <h1 className='text-xl font-semibold mb-4'>
                    درباره ما
                </h1>
                <p className='tracking-wider leading-7 mix-blend-luminosity text-sm lg:text-[15px]'>
                    <span>
                    به فروشگاه شولند خوش آمدید!
                    </span>
                <br/>
                <br/>
                    ما در اینجا باور داریم که کفش فقط یک پوشش برای پا نیست؛ بلکه بخشی از شخصیت شماست.
                <br/>    
                <br/>    
                    شولند با هدف فراهم‌کردن مجموعه‌ای متنوع از جدیدترین و باکیفیت‌ترین کفش‌ها برای همه سلیقه‌ها و سنین راه‌اندازی شده است.
                <br/>    
                <br/>    
                </p>
            </div>
            {/* image */}
            <div className='absolute -top-46 -left-10 md:-top-64 lg:-top-[22rem]'>
                <Image className='md:w-[500px] lg:w-[600px] xl:w-[800px] ' src='/pics/Aire Jordan Nike.png' alt='' width={400} height={200} />
            </div>
            {/* add the foot prints */}
        </div>
       
    </section>
  )
}

export default AboutUs


// // 🔹 ارسال سریع و آسان
//             <br/>    
//                 🔹 ضمانت اصالت کالا
//             <br/>    

//                 🔹 امکان بازگشت تا ۷ روز
//             <br/>    
//                 🔹 پشتیبانی دوستانه و پاسخ‌گو
//             <br/>    
//             <br/>    
//                 در شولند، هدف ما فراتر از فروش کفش است؛ ما می‌خواهیم تجربه‌ای دل‌نشین از خرید آنلاین برایتان بسازیم.
//                  از اینکه که به ما اعتماد می‌کنید و بخشی از مسیرتان را با شولند قدم می‌زنید متشکریم. 
        //  هرکدومشونو یه دیو کن بزار توی نوار پایینی