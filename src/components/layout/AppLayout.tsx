'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { TopAnnouncement } from '@/components/layout/TopAnnouncement';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { SmoothScroll } from '@/components/providers/SmoothScroll';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up';

  return (
    <SmoothScroll>
      {!isAuthPage && <TopAnnouncement />}
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <Footer />}
      <CartDrawer />
    </SmoothScroll>
  );
};
