import React from 'react';
import { twMerge } from 'tailwind-merge';

const Empty = ({ text }: { text: string }) => {
  return <p className={twMerge('text-center ', 'm-auto mt-10')}>{text}</p>;
};

export default Empty;
