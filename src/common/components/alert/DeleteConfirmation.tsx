import React from 'react';
import { IonIcon } from "@ionic/react";
import { trash, close } from "ionicons/icons";
import { Button, Modal } from "react-bootstrap";

interface DeleteConfirmationProps {
  item: any;
  label: string;
  showConfirmation: boolean;
  setShowConfirmation: (show: boolean) => void;
  handleDelete: any;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  item,
  label,
  showConfirmation,
  setShowConfirmation,
  handleDelete,
}: DeleteConfirmationProps) => {
  const itemName = item.name ? item.name : "this";
  const deleteLabel = label ? label : "Delete";

  return (
    <div>
      {showConfirmation ? (
        <Modal show={true} onHide={() => setShowConfirmation(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to {deleteLabel} {itemName}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-danger' onClick={() => handleDelete()}>
              <IonIcon icon={trash} /> {deleteLabel}
            </Button>
            <Button variant='outline-danger' onClick={() => setShowConfirmation(false)}>
              <IonIcon icon={close} /> Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default DeleteConfirmation;
