import NavLink from '@/components/NavLink';
import { navLinks } from './navbarLinks';
import { twMerge } from 'tailwind-merge';

const MobileNavbar = () => {
  return (
    <nav
      className={twMerge(
        'lg:hidden',
        'bg-main',
        'w-full h-16',
        'fixed z-10 bottom-0',
        'flex items-center'
      )}
    >
      <div className={twMerge('flex justify-between', 'w-11/12', 'm-auto')}>
        {navLinks.map((navLink, i) => (
          <NavLink href={navLink.path} key={crypto.randomUUID()}>
            {({ isActive }) => (
              <div className="flex flex-col items-center">
                {navLink.unvisitedIcon}
                <p className="text-white">{navLink.text}</p>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavbar;
