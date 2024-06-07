'use client';//Esta linea sirve para especificarle al next que esta pagina sera usada como componente de cliente

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';//Con esta libreria usamos un metodo que pausara la busqueda masiva que creamos al ir actualizando la URL

export default function Search({ placeholder }: { placeholder: string }) {
  //Con lo siguiente vamos a recoger la url que tenemos, mantener su pathname, y reemplazarlo, o editarlo, con una concreta en función de lo que el 
  //usuario escriba en el input
  const searchParams = useSearchParams()//We take the url
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleSearch = useDebouncedCallback((search: string) => { 
    const params = new URLSearchParams(searchParams)

    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }

    params.set('page', '1')
    
    replace(`${pathname}?${params.toString()}`)
  }, 200)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(event) => handleSearch(event.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue={searchParams.get('search')?.toString()}
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

