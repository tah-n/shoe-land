'use client';
import React, { useRef, useState } from 'react';

interface MagnifierProps {
  src: string;
  zoom: number;
  width: number;
  height: number;
  className?: string;
}

const Magnifier: React.FC<MagnifierProps> = ({ src, zoom = 2, width = 700, height = 550, className }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setPosition({ x, y });
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Zoomable"
        className="w-full h-full object-cover border rounded "
      />
      {showMagnifier && (
        <div
          className="absolute pointer-events-none rounded-full border-[2px] border-gray-300 shadow-lg hidden sm:block"
          style={{
            top: position.y - 75,
            left: position.x - 75,
            width: 200,
            height: 200,
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${width * zoom}px ${height * zoom}px`,
            backgroundPosition: `-${position.x * zoom - 75}px -${position.y * zoom - 75}px`,
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default Magnifier;