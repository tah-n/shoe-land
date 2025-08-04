'use client'
import CloseButton from '@/components/ui/CloseButton'
import useProps, { useCartStore } from '@/lib/useProps'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";

const Cart = () => {
    const openCart = useProps(state => state.openCart);
    const {items, updateQuantity, removeFromCart} = useCartStore();
    const [counts, setCounts] = useState<{ [key: string]: number }>({});
    const [sum,setSum] = useState(0);

   useEffect(() => {
    const initialCounts: { [key: string]: number } = {};
    items.forEach(item => {
      initialCounts[item.id] = item.quantity ?? 1;
    });
    // setCounts(initialCounts);

    const isEqual = Object.entries(initialCounts).every(([key, val]) => counts[key] === val);

    if (!isEqual) {
        setCounts(initialCounts);
    }

  }, [items]);


    const handleIncrement = (id: string) => {
        const newCount = (counts[id] ?? 1) + 1;
        setCounts(prev => ({ ...prev, [id]: newCount }));
        updateQuantity(id, newCount);
    }

    const handleDecrement = (id: string) => {
        const current = counts[id] ?? 1;
        const newCount = Math.max(current - 1, 1);
        setCounts(prev => ({ ...prev, [id]: newCount }));
        updateQuantity(id, newCount);
    }

    const hendleRemove = (id: string) => {
        removeFromCart(id);
        updateQuantity(id, 0);
    }

    useEffect(() => {
        setSum(0)
        console.log(items)
        items.forEach((item) => {
            setSum(pre => pre + item.price * item.quantity);
        })
    },[items])

  return (
    <div className={`fixed top-0 w-full sm:w-[56vw] lg:w-[35vw] z-40 h-full overflow-y-auto  no-scrollbar bg-2 ${openCart? 'left-0': '-left-full'} transition-all ease-in-out duration-200`}>
      {/* close button */}
      <CloseButton setState={useProps.getState().setOpenCart} />

     <div className='flex flex-col gap-2 mt-24 h-auto font-lale ' dir='rtl'>
         {items.map((item, i) => {
            const count = counts[item.id] ?? item.quantity ?? 1;
            return (
            <div className='relative border-b-3 border-b-1/10 bg-[#F6F6F6]' key={i}>
                <div className='text-1 flex gap-2 p-4'>
                    <div>
                        <Image src={item.image? item.image : ''} alt='' width={100} height={100} />
                    </div>
                    <div>
                       <div className='text-1'>
                            <p className='mb-7'>
                                {item.name}
                            </p>
                            <p className='!font-dirooz'>
                                رنگ:  {item.color}
                            </p>
                            <p className='!font-dirooz'>
                               سایز:  {item.size.toLocaleString('fa')}
                            </p>
                       </div>
                        <div className='max-w-[110px] flex gap-1 px-1 py-1 border-[2px] font-iransans text-sm text-red-600 border-1/10 rounded-md items-center justify-around mt-6 mx-3' dir='ltr'>
                            <div className='cursor-pointer py-1'>
                               {count > 1? (
                                <div onClick={() => handleDecrement(item.id)}>
                                    <span className='pointer-events-none'>-</span>
                                </div>
                                ): (
                                <div className='w-fit h-fit' onClick={() => hendleRemove(item.id)}>
                                    <FaRegTrashCan color='red' size={12} />
                                </div>
                               )}
                            </div>
                            <span className='pointer-events-none'>{count}</span>
                            <div className='cursor-pointer py-1' onClick={() => handleIncrement(item.id)}>
                               <span className='pointer-events-none'>+</span>
                            </div>
                        </div> 
                    </div>
                    {/* price */}
                    <div className='absolute left-4 bottom-4'>
                        <span className='text-1/70'>
                             {(item.price * item.quantity).toLocaleString('fa')}  تومان
                        </span>
                    </div>
                </div>
            </div>
        )})}
     </div>

      
      {/* sum and checkout */}
      {items.length > 0 &&  
      <div className='w-full h-44 mt-60 font-dirooz ' dir='rtl'>
        <div className='m-auto text-1 w-[80%] py-2 flex items-center justify-between '>
            <p>
                هزینه کل:
            </p>
            <p>
               تومان {sum.toLocaleString('fa')}
            </p>
        </div>
        <button className='block text-1 font-dirooz text-lg w-[88%] h-fit py-3 border-[2px] border-1 rounded-md m-auto cursor-pointer'>
            ثبت سفارش
        </button>
      </div>}

     
    </div>
  )
}

export default Cart
