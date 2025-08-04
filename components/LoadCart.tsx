'use client'
import useProps, { useCartStore } from '@/lib/useProps'
import { useEffect } from 'react'

interface CartItems {
  id: string;
    name: string,
    price: number,
    quantity: number,
    color: string,
    size: number,
    image: string,
}

const LoadCart = () => {
    const currentUser = useProps(state => state.currentUser);
    const setItems = useCartStore(state => state.setItems)

      useEffect(() => {
        if(currentUser) {
            const getCart = async() => {
                try {
                    const itemsInDB = currentUser.get('cart');
                    if(itemsInDB?.length) {
                       setItems(itemsInDB)
                    }
                } catch(err) {
                    console.log(err);
                }
            }
            getCart()
        } else {
            const cart = localStorage.getItem('cart');
            if(cart) {
                setItems(JSON.parse(cart));
            }
        }
    },[currentUser])

    
  return null
}

export default LoadCart;
