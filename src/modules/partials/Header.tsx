'use client';
import cn from '@/utils/tw';
import React from 'react';

const Header = () => {
  return (
    <h1
      className={cn(
        'lg:ml-3 lg:mb-0',
        'mt-12 mb-4',
        'text-left text-3xl text-main font-bold'
      )}
    >
      Anifusion
    </h1>
  );
};

export default Header;
