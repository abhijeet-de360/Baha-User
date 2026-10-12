'use client';

import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../../../public/animations/order-success.json';

interface OrderSuccessAnimationProps {
  className?: string;
  loop?: boolean;
}

export const OrderSuccessAnimation: React.FC<OrderSuccessAnimationProps> = ({
  className = 'w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-4',
  loop = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing SVG children to ensure only one animation renders cleanly
    containerRef.current.innerHTML = '';

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay: true,
      animationData,
    });

    return () => {
      anim.destroy();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [loop]);

  return <div ref={containerRef} className={className} />;
};
