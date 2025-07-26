"use client";

import useProps from "@/lib/useProps";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    price: number;
    colors: {
        color: string,
        pic1: string,
        pic2: string
    }[];
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [hoveredIndex,setHoveredIndex] = useState<number | null>(null);
  const isMobile = useProps();

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller no-scrollbar relative z-20 w-full overflow-x-scroll ",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-full min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className={`relative w-[220px] md:w-[250px] max-w-full shrink-0 rounded-2xl bg-white overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${(hoveredIndex === idx)? 'sm:h-[27rem] md:h-[29rem]': 'sm:h-[18rem]'} ${isMobile && 'h-[27rem]'}`}
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* add the first image here */}
            <div className="w-full ">
                <Image className="w-full h-full" src={item.colors[0].pic1} alt="product picture" width={150} height={100} />
            </div>
            <blockquote>
              <div className="relative w-full min-h-[6rem] z-20 p-2 flex flex-col gap-1 items-end justify-start font-iransans font-extralight">
                {/* add available colors here */}
                <div className="w-full flex gap-1">
                    {item.colors.map((color,i) => (
                        <div key={i} className="rounded-sm">
                            <Image src={color.pic1} alt="" width={25} height={12} />
                        </div>
                    ))}
                </div>
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] font-normal text-1">
                    {item.name}
                  </span>
                  <span className="absolute left-3 -bottom-1 text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                    {item.price}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
