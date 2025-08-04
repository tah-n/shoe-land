'use client'
import useProps, { useCartStore } from '@/lib/useProps'
import React, { useEffect } from 'react'

// اینو بذار بالای فایل یا توی فایل utils
function debounce(fn: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const SaveCart = () => {
  const currentUser = useProps(state => state.currentUser);
  const items = useCartStore(state => state.items);

  useEffect(() => {
    if (!currentUser) debounce(() => localStorage.setItem('cart', JSON.stringify(items)), 7000);
    else {
      const saveCartInDB = debounce(async () => {
        try {
          currentUser.set('cart', items);
          await currentUser.save();
        } catch (err) {
          console.log(err);
        }
    }, 7000); 

    if (items.length) saveCartInDB();
    }
   
  }, [items, currentUser]);

  return null;
}

export default SaveCart;