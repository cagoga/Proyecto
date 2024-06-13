import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Logo from '@/app/ui/logo-dashboard';
import { PowerIcon } from '@heroicons/react/24/outline';
import { logOut } from '@/app/lib/actions';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">

      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-red-950 p-4 md:h-40">
        <div className="w-32 text-white md:w-40">
          <Logo />
        </div>
      </div>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={logOut}>
          <button className="mb-4 flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-red-50 p-3 text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-3 hover:bg-red-900 hover:text-red-600">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Log Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
