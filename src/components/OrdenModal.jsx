import ReactModal from 'react-modal';
import {
    ModalOverlay, ModalContainer, CloseButton 
  } from "./styles/Modal";

ReactModal.setAppElement('#root'); 

const OrdenConfirmModal = ({ isOpen, closeModal, content }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Ejemplo de Modal"
    >
      <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        {content}
      </ModalContainer>
    </ModalOverlay>
    </ReactModal>
  );
};

export default OrdenConfirmModal;
