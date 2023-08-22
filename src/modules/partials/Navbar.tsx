'use client';
import React from 'react';
import { navLinks } from './navbarLinks';
import NavLink from '@/components/NavLink';
import { twMerge } from 'tailwind-merge';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
  return (
    <>
      <MobileNavbar />
      <div className={twMerge('sm:w-1/6', 'lg:block', 'hidden')}>
        <h1
          className={twMerge(
            'lg:ml-3 lg:mb-12',
            'text-3xl text-main font-bold text-left',
            'mb-12'
          )}
        >
          Anifusion
        </h1>
        <nav>
          <div className={twMerge('flex flex-col', 'pt-16', 'lg:pt-0')}>
            {navLinks.map((nav) => (
              <NavLink key={crypto.randomUUID()} href={nav.path}>
                {({ isActive }) => (
                  <div className="text-lg py-5">
                    <div
                      className={twMerge(
                        isActive ? 'lg:bg-light-pink' : 'lg:bg-white bg-main',
                        'p-3',
                        'rounded-full',
                        'flex'
                      )}
                    >
                      {nav.visitedIcon}
                      <span
                        className={twMerge(
                          'ml-3',
                          isActive ? 'lg:text-main' : 'lg-text-black'
                        )}
                      >
                        {nav.text}
                      </span>
                    </div>
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
