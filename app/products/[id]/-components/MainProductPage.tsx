'use client'
import React, { useEffect, useState } from 'react'
import ButtomBar from '../../_components/ButtomBar'
import Cart from '../../_components/Cart'
import ProductsPage from './ProductsPage'
import { getProductById } from '@/lib/getProductById'
import { notFound } from 'next/navigation'
import { initParse } from '@/lib/parse'
import useProps from '@/lib/useProps'
import Dropbox from '@/components/ui/Dropbox'

const MainProductPage = ({id}: {
    id: string;
}) => {
  const [product,setProduct] = useState<any>(null);
  const openCart = useProps(state => state.openCart);

  useEffect(() => {
    initParse();
    getProductById(id).then(prod => {
      if(!prod) {
        notFound()
      } else {
        setProduct(prod)
      }
    })


  },[id])


  return (
    <>
       <ButtomBar />
        {openCart && <Dropbox setState={useProps.getState().setOpenCart} />}
        <Cart />

        <ProductsPage selectedProduct={product} />
    </>
  )
}

export default MainProductPage
