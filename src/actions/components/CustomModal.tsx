import React from 'react';
import { Modal } from 'react-bootstrap';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
