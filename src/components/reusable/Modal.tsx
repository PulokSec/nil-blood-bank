import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
interface IModal{
    isOpen:boolean,
    usingFor?:string,
     onClose:()=>void,
     children:React.ReactNode
}

const Modal = ({ isOpen, onClose, children, usingFor }:IModal) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-lg z-10 relative">
            {usingFor === 'search' ? 
            <button
              onClick={onClose}
              className="absolute lg:top-6 md:top-6 top-1 lg:right-6 md:right-6 right-0 md:text-[#FFFFFF] text-black hover:text-gray-700"
            >
           < AiOutlineClose/>
            </button>
            : 
              <button
              onClick={onClose}
              className="absolute lg:top-6 md:top-6 top-10 lg:right-6 md:right-6 right-14 text-[#FFFFFF] hover:text-gray-700"
            >
           < AiOutlineClose/>
            </button>
            }
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
