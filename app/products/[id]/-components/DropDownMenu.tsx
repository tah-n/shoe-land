'use client';
import React, { useEffect, useRef, useState } from 'react';
import Magnifier from './Magnifier';
import { useCartStore } from '@/lib/useProps';

interface Variable {
  color: string;
  sizes: { size: number; inStock: boolean }[];
  pic1: string;
  pic2?: string;
}

interface ProductProps {
  variables: Variable[];
}

const ProductOptions: React.FC<ProductProps> = ({ variables }) => {
  const [selectedColor, setSelectedColor] = useState<Variable | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [mainImage, setMainImage] = useState<string>('');

  const setColor = useCartStore(state => state.setSelectedColor);
  const setSize = useCartStore(state => state.setSelectedSize);

  const thumbnailRefs = useRef<Record<string, HTMLImageElement | null>>({});

  
  useEffect(() => {
    if (!selectedColor && !selectedSize && variables.length > 0) {
      const defaultColor = variables[0];
      const firstAvailable = variables[0].sizes.find((s: any) => s.inStock)
      setSelectedColor(defaultColor);
      setMainImage(defaultColor.pic1);
      setColor(defaultColor.color);
      setSize(firstAvailable?.size ?? 0);
    }
  }, [selectedColor, variables]);

  const handleColorChange = (color: string) => {
    const variable = variables.find((v) => v.color === color);
    setSelectedColor(variable ?? null);
    setSelectedSize(null);
    setMainImage(variable?.pic1 || '');
    setColor(color);
  };

  const handleSizeChange = (size: string) => {
    const s = Number(size);
    setSelectedSize(s);
    setSize(s);
  };

  const handleThumbnailClick = (src: string) => {
    setMainImage(src);
  };

  const thumbnails: string[] = [];
  if (selectedColor?.pic1) thumbnails.push(selectedColor.pic1);
  if (selectedColor?.pic2) thumbnails.push(selectedColor.pic2);

  return (
    <div className="relative space-y-4 text-2 font-dirooz" dir="rtl">
      {selectedColor && (
        <div className="relative mt-4">
          <div className="w-full flex items-center justify-center md:justify-start">
            <Magnifier className='' src={mainImage} zoom={2} width={600} height={550} />
          </div>
          <div className="flex gap-2 overflow-x-auto mt-3 scrollbar-thin scrollbar-thumb-gray-400 md:absolute md:flex-col top-0 right-[608px]">
            {thumbnails.map((src, index) => (
              <img
                key={index}
                ref={(el) => {
                  if (src && el) thumbnailRefs.current[src] = el;
                }}
                src={src}
                alt={`thumb-${index}`}
                className={`w-20 h-24 object-cover border transition-opacity duration-200 cursor-pointer ${
                  src === mainImage ? 'opacity-100' : 'opacity-60'
                }`}
                onClick={() => handleThumbnailClick(src)}
              />
            ))}
          </div>
        </div>
      )}

      <div className='lg:absolute top-5 lg:left-0 xl:left-70'>
        <div className="flex gap-5 items-center">
          <label className="block mb-1">انتخاب رنگ:</label>
          <select
            value={selectedColor?.color ?? ''}
            onChange={(e) => handleColorChange(e.target.value)}
            className="border p-2 rounded px-2 bg-1 w-40"
          >
            {variables.map((v, index) => (
              <option key={index} value={v.color}>
                {v.color}
              </option>
            ))}
          </select>
        </div>

        {selectedColor && (
          <div className='flex gap-4 mt-8'>
            <label className="block mb-1">انتخاب سایز:</label>
            <select
              value={selectedSize ?? ''}
              onChange={(e) => handleSizeChange(e.target.value)}
              className="border p-2 rounded bg-1 w-40"
            >
              {selectedColor.sizes.map((size, i) => (
                <option key={i} value={size.size} disabled={!size.inStock}>
                  {size.size} {size.inStock ? '' : '(ناموجود)'}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductOptions;