//Este es el componente que envuelve a toda nuestar pagina como vemos en el return, aquí cargaremos los css globales, modulares, las fuentes y otros elementos para TODA LA PAGINA
import '@/app/ui/global.css';
import {aladin} from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* TODO: un nav con los botones de la pag */}
      <body>
        {children}
      </body>
      <footer className={`${aladin.className} flex justify-center item-center`}>
        <h1 >Esto lo hizo CarlosGlez</h1>
      </footer>
    </html>
  );
}
