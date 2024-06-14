import { ArrowRightIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'
import Modal from "react-modal";
import { Button } from './button';
import { createCookiePrivacity, createEmptyCookiePrivacity } from '../lib/actions';
import { useState } from 'react';

export default function PrivacityCookies({sendDataToParent}) {

  const [data, setData] = useState(true);
  
  function handleClick() {
    setData(false)
    sendDataToParent(data)
    createCookiePrivacity()
  }
  
  function handleClickEmpty() {
    setData(false)
    sendDataToParent(data)
    createEmptyCookiePrivacity()
  }
    

  return (
    <>
      <form className="space-y-3">
          <div className='item-center text-center'>
            <ClipboardDocumentCheckIcon className="h-16 w-16 inline-block align-middle" />
            <div className='h-16 w-16'></div>
            <p>Las cookies de este sitio web se usan para personalizar el contenido y los anuncios, ofrecer funciones de redes sociales y analizar el tráfico. Además, compartimos información sobre el uso que haga del sitio web con nuestros partners de redes sociales, publicidad y análisis web, quienes pueden combinarla con otra información que les haya proporcionado o que hayan recopilado a partir del uso que haya hecho de sus servicios.</p>
            <div className='flex inline-block align-middle'>
              <AcceptButton />
              <RejectButton />
            </div>
          </div>
      </form>
    </>
  );

  function AcceptButton() {
    return (
      <Button className="mt-4 w-full m-1 bg-red-950" onClick={handleClick}>
        Guardar<ArrowRightIcon className="ml-auto h-5 w-5 text-grey-50" />
      </Button>
  
    );
  }
  function RejectButton() {
    return (
      <Button className="mt-4 w-full m-1 bg-red-950" onClick={handleClickEmpty}>
        Rechazar<ArrowRightIcon className="ml-auto h-5 w-5 text-grey-50" />
      </Button>
    );
  }
}


