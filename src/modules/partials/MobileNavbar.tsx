import NavLink from '@/components/NavLink';
import React from 'react';
import { mobileNavLinks } from './navbarLinks';
import { twMerge } from 'tailwind-merge';

const MobileNavbar = () => {
  return (
    <div
      className={twMerge(
        'lg:hidden',
        'fixed bottom-0 left-0 z-50',
        'w-full h-16',
        'bg-main'
      )}
    >
      <div
        className={twMerge(
          'grid',
          'h-full max-w-lg',
          'grid-cols-3',
          'mx-auto',
          'font-medium'
        )}
      >
        {mobileNavLinks.map((nav) => (
          <NavLink key={crypto.randomUUID()} href={nav.path}>
            {({ isActive }) => (
              <div
                className={twMerge(
                  'w-full',
                  'inline-flex flex-col items-center justify-center',
                  'pt-2',
                  isActive ? 'bg-gray-50' : '',
                  'active:bg-gray-50'
                )}
              >
                {isActive ? nav.visitedIcon : nav.unvisitedIcon}
                <span
                  className={twMerge(
                    'text-sm text-white',
                    'mt-2',
                    isActive ? 'text-main' : ''
                  )}
                >
                  {nav.text}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNavbar;
