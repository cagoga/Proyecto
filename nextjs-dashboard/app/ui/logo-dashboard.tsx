import {vampiro} from '@/app/ui/fonts';
import { FireIcon } from '@heroicons/react/16/solid';

export default function Logo() {
  return (
    <div
      className={`${vampiro.className} flex flex-col space-x-12 space-y-4 items-center  leading-none text-white `}
    >
      <div></div>
      <FireIcon className="grid h-16 w-16" />
    
      <p className=" text-[44px]">Campfire</p>
    </div>
  );
}