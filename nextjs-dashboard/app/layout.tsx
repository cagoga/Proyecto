//Este es el componente que envuelve a toda nuestar pagina como vemos en el return, aquí cargaremos los css globales, modulares, las fuentes y otros elementos para TODA LA PAGINA
import '@/app/ui/global.css';
import {aladin} from '@/app/ui/fonts';
import PrivacityCookies from './ui/privacity-cookies';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=''>
      <body className=' grid-cols h-screen'>
        {children}
      </body>
      <footer className='space-y-5 flex h-5 fixed items-center inset-x-0 bottom-0 self-start bg-red-950 px-6 py-3 text-sm font-medium text-white'>
        Página creada por Carlos Gonzalez Garcia
      </footer>
    
    </html>
  );
}
