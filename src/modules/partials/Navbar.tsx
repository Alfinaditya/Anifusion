'use client';
import React from 'react';
import { navLinks } from './navbarLinks';
import NavLink from '@/components/NavLink';
import Brand from '@/app/brand.svg';
import MobileNavbar from './MobileNavbar';
import Image from 'next/image';
import Link from 'next/link';
import cn from '@/utils/tw';

const Navbar = () => {
  return (
    <>
      <MobileNavbar />
      <div className={cn('lg:flex', 'w-16', 'flex-col items-center', 'hidden')}>
        <nav
          className={cn(
            'h-full',
            'fixed z-10',
            'space-y-48',
            'bg-main',
            'max-h-max'
          )}
        >
          <ul>
            <Link href="/">
              <li
                className={cn(
                  'p-5',
                  'border-dashed border-b border-slate-300',
                  'active:bg-light-pink'
                )}
              >
                <Image
                  width={200}
                  className="w-6 h-6"
                  height={200}
                  alt="d"
                  src={Brand}
                />
              </li>
            </Link>
            {navLinks.map((nav) => (
              <NavLink key={crypto.randomUUID()} href={nav.path}>
                {({ isActive }) => (
                  <li
                    className={cn(
                      'p-5',
                      isActive ? 'bg-light-pink' : '',
                      'active:bg-light-pink'
                    )}
                  >
                    {isActive ? nav.visitedIcon : nav.unvisitedIcon}
                  </li>
                )}
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>
      {/* </div> */}
    </>
  );
};

export default Navbar;
