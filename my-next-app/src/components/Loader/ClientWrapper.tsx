'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const RouteLoader = dynamic(() => import('./RouteLoader'), { ssr: false });

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <>
      <RouteLoader />
      {children}
    </>
  );
} 