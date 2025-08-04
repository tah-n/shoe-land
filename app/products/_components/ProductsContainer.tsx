"use client"
import { Parse , initParse } from '@/lib/parse';
import { useCartStore } from '@/lib/useProps';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoBagHandleOutline } from 'react-icons/io5';

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



const ProductsContainer = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null); 
  const [loading,setLoading] = useState(true); 

    useEffect(() => {
        initParse()
      },[]);

  const fetchProducts = async () => {
    const Products = Parse.Object.extend('Products');
    const query = new Parse.Query(Products);

    try {
      const results = await query.find();
      const parsedResults = results.map((item) => ({
        id: item.id,
        name: item.get('name'),
        price: item.get('price'),
        category: item.get('category'),
        quantity: item.get('quantity'),
        variations: item.get('variations'), // [{ color, image, sizes }]
      }));
      setProducts(parsedResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Products) => {
    const selectedColor = product.variations[0];
    const selectedSize = selectedColor.sizes.find(size => size.inStock);

    if (!selectedSize) {
      alert("موجود نیست");
      return;
  }
    const item = {
      id: product.id + '-' + selectedColor.color + '-' + selectedSize.size, // شناسه یکتا
      name: product.name,
      price: product.price,
      quantity: 1,
      color: selectedColor.color,
      size: selectedSize.size,
      image: selectedColor.pic1,
    };

    useCartStore.getState().addToCart(item);
};  



  return (
    <div className='w-full h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-36 border-t border-t-2/20 gap-2 p-5 pb-24 mt-5 text-2'>
      {loading? 
       <div>
        <div className='newloader' />
       </div>
      : 
        <>
          {products.map((product, i) => (
          <div key={i} className="relative overflow-hidden font-dirooz border border-2/20 rounded-2xl" >
            <Link href={`/products/${product.id}`}>

            {/* add image */}
            <div className=''>
              <img src={product.variations[0].pic1} className='w-full max-h-70' />
            </div>
            {/* add title and price  */}
            <div className='min-h-24 p-2 ' dir='rtl'>
              <p className=''>{product.name}</p>
              <p className='absolute bottom-1 left-2 text-sm text-2/80' dir='ltr'>تومان &nbsp;{product.price.toLocaleString('fa-IR')} </p>

            </div>

            {/* add to cart */}
            <button className='absolute top-2 left-2 cursor-pointer bg-1/80 backdrop-blur-md rounded-sm p-1' onMouseEnter={() => setHoveredProductId(product.id || null)} onMouseLeave={() => setHoveredProductId(null)} onClick={() => handleAddToCart(product)}>
              <div className='w-full h-full relative'>
                  <IoBagHandleOutline size={28} color={'#FEF3E2'} />
                  <div className={`absolute top-5 -left-2 w-24 p-2 bg-gray-800/80 transition-opacity duration-300 ease-in-out text-[10px] rounded-2xl ${hoveredProductId === product.id? 'opacity-100' : 'opacity-0'}`}>
                      <p>
                          افزودن به سبد خرید
                      </p>
                  </div>
              </div>
            </button>
            {/* out of stock */}
            </Link>
          </div>
        ))}
        </>
      }
      

    </div>
  );
};

export default ProductsContainer;