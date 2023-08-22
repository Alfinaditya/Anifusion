'use client';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Header = () => {
  return (
    <h1
      className={twMerge(
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
