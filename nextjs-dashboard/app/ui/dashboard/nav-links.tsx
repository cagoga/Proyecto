"use client"  //esta directiva es necesaria ya que por defecto funcionan los componente en servidor, así la transformamos a cliente.

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Sesiones',
    href: '/dashboard/sessions',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Jugadores', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname(); //Con esto vamos a leer el pathname para poder darle funcionalidades de ui/ux como un resalto de pestaña
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-red-50 p-3 text-sm font-medium hover:bg-red-900 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3

            ${pathname === link.href ? 'bg-green-100 text-black' : ''}
            `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
