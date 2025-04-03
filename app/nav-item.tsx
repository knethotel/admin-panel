'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export function NavItem({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get current route

  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-4 p-2 2xl:my-2 rounded-lg transition-colors text-white ',
        {
          'bg-[#ffffff3b] text-[#EEA720]': pathname === href, // Active state
          'hover:bg-[#ffffff3b] hover:text-[#EEA720]': pathname !== href // Hover effect only if not active
        }
      )}
    >
      {children}
      <span className="text-sm 2xl:text-base font-medium">{label}</span>
    </Link>
  );
}
