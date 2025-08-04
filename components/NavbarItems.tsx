'use client'
import React from 'react'
import NavItem from './NavItem';
import { useRouter } from 'next/navigation';

const NavbarItems = () => {
  const router = useRouter();

  return (
    <div className='gap-4 font-dirooz hidden md:flex'>
      <NavItem text='تماس با ما' href='#contact'  />
      <NavItem text='درباره ما' href='#about' /> 
      <NavItem text='آدرس شعب' /> 
      <NavItem text='باشگاه مشتریان' /> 
      <NavItem text='محصولات' onClick={() => router.push('/products')} /> 

    </div>
  )
}

export default NavbarItems;
