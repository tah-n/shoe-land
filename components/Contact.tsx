'use client'
import React from 'react'
import PhoneNums from './PhoneNums';
import Image from 'next/image';

const Contact = () => {
    const socials = `relative group cursor-pointer rounded-full w-10 h-10 overflow-hidden`;
    const links = ["درباره ما", "باشگاه مشتریان", "آدرس شعب"];
    const hrefs = ['#about','','']

  return (
    <div
        id="contact" 
        className='w-full h-auto text-2 mb-8 md:flex justify-around lg:justify-center lg:gap-56 ' dir='rtl'>
        {/* contact info and address and email */}
        <div className='font-dirooz pr-3'>
            <div>
                <p className='font-semibold mb-3'>
                    اطلاعات تماس
                </p>
                <PhoneNums text='پشتیبانی فروش' numbers={['0218833----','021267----']} />
                <PhoneNums text='سفارش آنلاین' numbers={['0218833----','021267----']} />
                <PhoneNums text='آدرس' address='بزرگراه باکری طبقه همکف فروشگا کفش شولند' />
                <PhoneNums text='ایمیل' address='info@shoeland.com' />
            </div>
            {/* socials */}
            <div className='flex gap-2 '>
                <div className={`${socials}`}>
                    <div className='absolute top-0 h-full w-full rounded-full z-10 bg-1/10 backdrop-brightness-50 group-hover:scale-0 transition-all duration-500 ease-in-out' />
                    <Image src='/socials/instagram.png' alt='' width={50} height={50} />
                </div>
                <div className={`${socials}`}>
                    <div className='absolute top-0 h-full w-full rounded-full z-10 bg-1/10 backdrop-brightness-50 group-hover:scale-0 transition-all duration-500 ease-in-out' />
                    <Image src='/socials/telegram.png' alt='' width={100} height={100} />
                </div>
            </div>

        </div>

      
        <div className='mt-5 flex flex-col gap-2 pr-3'>
            <p className='font-semibold mb-3'>
                لینکها
            </p>
            {/* links */}
            {links.map((link,i) => (
                <div key={i} className='text-sm'>
                    <p>
                        <a href={hrefs[i]}>
                            {link}
                        </a>
                    </p>
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default Contact;
