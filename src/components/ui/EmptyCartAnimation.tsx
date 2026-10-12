'use client';

import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../../../public/animations/empty-cart.json';

interface EmptyCartAnimationProps {
  className?: string;
}

export const EmptyCartAnimation: React.FC<EmptyCartAnimationProps> = ({
  className = 'w-56 h-56 sm:w-64 sm:h-64 mx-auto',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing SVG children to strictly ensure only ONE animation renders
    containerRef.current.innerHTML = '';

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
    });

    return () => {
      anim.destroy();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
};
