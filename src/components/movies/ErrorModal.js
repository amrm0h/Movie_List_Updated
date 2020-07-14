import React, { useContext, useState } from 'react'
import { MovieContext } from '../../dataFetching/contextProvider/ContextProvider';
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const ErrorModal = () => {
   const { error } = useContext(MovieContext);
   const [ isOpen, setIsOpen ] = useState(!!error);

   return (
      <Modal
         className="modal"
         overlayClassName="modal_overlay"
         isOpen={isOpen}
         contentLabel="Error Block"
         ariaHideApp={false}
         onRequestClose={() => setIsOpen(false)}
      >
         <h1><FontAwesomeIcon icon={faExclamationCircle} /></h1>
         <p>{error}</p>
         <button
            onClick={() => setIsOpen(!isOpen)}
         >
            Okay
         </button>
      </Modal>
   )
}

export default ErrorModal
