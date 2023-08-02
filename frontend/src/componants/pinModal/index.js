
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './pinModal.css';
const pinModalContext = React.createContext();
export function PinModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])
  return (
    <>
      <pinModalContext.Provider value={value}>
        {children}
      </pinModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}
export default function PinModal({ onClose, children }) {
  const pinmodalNode = useContext(pinModalContext);
  if (!pinmodalNode) return null;
  return ReactDOM.createPortal(
    <div id="pinmodal">
      <div id="pinmodal-background" onClick={onClose} />
      {/* <div className='nice'> */}
      <div id="pinmodal-content">
        {children}

      </div>
      {/* </div> */}
    </div>,
    pinmodalNode
  );
}