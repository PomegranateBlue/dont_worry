import Header from '@/components/header';
import React, { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main className="px-4">{children}</main>
    </div>
  );
};

export default MainLayout;
