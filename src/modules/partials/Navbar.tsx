'use client';
import Link from 'next/link';
import React from 'react';
import { navLinks } from './navbarLinks';
import { usePathname, useSearchParams } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const router = useSearchParams();
  console.log(router.entries);
  return (
    <div className="sm:w-1/6 lg:block hidden">
      <nav>
        <ul className="flex flex-col pt-16 lg:pt-0">
          {navLinks.map((nav, i) => (
            <li key={i} className="text-lg py-5">
              <Link href={nav.path} className="flex">
                {pathname === nav.path ? (
                  <div className="lg:bg-secondary p-3 rounded-full flex">
                    {nav.visitedIcon}
                    <span className="ml-3 lg:text-main text-white">
                      {nav.text}
                    </span>
                  </div>
                ) : (
                  <div className="lg:bg-white bg-main p-3 rounded-full flex">
                    {nav.unvisitedIcon}
                    <span className="ml-3 lg:text-black text-white">
                      {nav.text}
                    </span>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
