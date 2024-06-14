import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { vampiro } from '@/app/ui/fonts';
import Image from 'next/image';
import PrivacityCookies from '@/app/ui/privacity-cookies';
import PrivacityCookiesModal from '@/app/ui/privacity-cookies';
import { validateCookie, validateCookiePrivacity } from './lib/actions';



export default function PageIndex() {
  const state = validateCookie
  console.log(state)

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={` text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong className={`${vampiro.className}  text-red-900`}>Bienvenido jugador</strong> En esta pagina podras encontrar todo lo que necesitas para empezar tu partida de rol
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-red-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-5 self-start rounded-lg bg-red-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base"
          >
            <span>Sign Up</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image src="/campfireIndex.png" alt="dydlogo" width={1000} height={760} className='hidden md:block' />
          <Image src="/dydMvl.png" alt="dydlogomvl" width={560} height={620} className='block md:hidden' />
        </div>
      </div>
       <PrivacityCookiesModal state={state}/>
     </main>
  );
}
