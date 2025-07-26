'use client'
import React from 'react'
import NavItem from './NavItem';

const NavbarItems = () => {
  return (
    <div className='gap-4 font-dirooz hidden md:flex'>
      <NavItem text='تماس با ما' />
      <NavItem text='درباره ما' /> 
      <NavItem text='آدرس شعب' /> 
      <NavItem text='باشگاه مشتریان' /> 
      <NavItem text='محصولات' /> 

    </div>
  )
}

export default NavbarItems;
