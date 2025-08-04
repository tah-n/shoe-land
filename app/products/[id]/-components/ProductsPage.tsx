'use client'
import useProps, { useCartStore } from '@/lib/useProps'
import Image from 'next/image';
import React, { useState } from 'react'
import ProductOptions from './DropDownMenu';
import { toast } from 'react-toastify';
import CloseButton from '@/components/ui/CloseButton';

type Products = {
    id: string | undefined;
    name: string;
    price: number;
    category: string;
    variations:{
        color: string;
        sizes: {
            size: number;
            inStock: boolean;
        }[];
        pic1: string;
        pic2?: string;
    }[]
    quantity: number;
}

const ProductsPage = ({selectedProduct} : {
  selectedProduct: any;
}) => {
    const {selectedColor,selectedSize} = useCartStore();

     const handleAddToCart = (product: Products | null) => {
      if(product === null) return ;
      if(selectedColor === '') {
        toast.warn('لطفا یک رنگ انتخاب کنید')
      }
      if(selectedSize === 0) {
        toast.warn('لطفا یک سایز انتخاب کنید')
      } else {

      const pic = product.variations.find((i) => i.color === selectedColor);

      const item = {
        id: product.id + '-' + selectedColor + '-' + selectedSize, // شناسه یکتا
        name: product.name,
        price: product.price,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
        image: pic?.pic1,
      };
  
      useCartStore.getState().addToCart(item);
      toast.success('به سبد خرید اضافه شد')

      }
     
  }; 


  if(selectedProduct === undefined)  return null;
  return (
    <main className='w-full h-auto border-t border-t-2/20 gap-2 p-5 pb-24 mt-5 text-2 overflow-hidden'>
      <div className='w-full'>
        <div className='text-2 text-3xl font-semibold font-dirooz mb-5' dir='rtl'>
          <p>
            {selectedProduct?.name}
          </p>
        </div>

        {/* images */}
        <div className='w-full'>          
            <div>
                {selectedProduct !== null && 
                    <ProductOptions variables={selectedProduct.variations} />
                }
            </div>
        </div>

       <div className='absolute bottom-40 block text-xl font-dirooz w-full lg:top-90 xl:left-50'>
          <p className='' dir='ltr'>تومان &nbsp;{selectedProduct?.price.toLocaleString('fa-IR')} </p>
        </div> 
        

       {/* add to cart */}
       <button 
         className='w-full sm:absolute sm:bottom-24 lg:top-[400px] lg:left-5 xl:left-50 lg:w-[30vw] sm:w-[50vw] h-12 font-dirooz font-semibold cursor-pointer bg-2 text-1 text-center rounded-sm p-1 mt-5 ' 
         onClick={() => handleAddToCart(selectedProduct)}
         >
               <p>
                 افزودن به سبد خرید
               </p>
       </button>
      </div>
    </main>
  )
}

export default ProductsPage;
