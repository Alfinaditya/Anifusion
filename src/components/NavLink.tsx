import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const NavLink: React.FC<{
  href: string;
  //   className: string;
  children: (props: { isActive: boolean }) => JSX.Element;
}> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link passHref href={href}>
      {children({ isActive })}
    </Link>
  );
};
export default NavLink;
