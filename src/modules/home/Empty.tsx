import cn from '@/utils/tw';
import React from 'react';

const Empty = ({ text }: { text: string }) => {
  return <p className={cn('text-center ', 'm-auto mt-10')}>{text}</p>;
};

export default Empty;
