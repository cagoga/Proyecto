'use client'
import Modal from "react-modal";
import PrivacityCookies from './cookie-form';
import { useState } from 'react';


export default function PrivacityCookiesModal() {
  
  const [dataFromChild, setDataFromChild] = useState(true);

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  return (
    <>
      <form className="space-y-3">
        <Modal isOpen={dataFromChild} >
          <PrivacityCookies sendDataToParent={handleDataFromChild}/>
        </Modal>
      </form>
    </>
  );
}

