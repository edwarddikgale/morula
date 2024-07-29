import { IonIcon } from '@ionic/react';
import { trash, close } from 'ionicons/icons';
import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface DeleteConfirmationProps {
    item: any;
    index: number;
    label: string;
    className?: string;
    onDelete: (item:any, index:number) => void;
    buttonIsCustom?:boolean
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ item, index, label, onDelete, buttonIsCustom = false, className }: DeleteConfirmationProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const itemName = item.name? item.name: 'this';
  const deleteLabel = label? label: 'Delete';

  const handleDelete = () => {
    onDelete(item, index);
    setShowConfirmation(false);
  };

  return (
    <div>
      {showConfirmation ? (
        <Modal show={true} onHide={() => setShowConfirmation(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to {deleteLabel} {itemName}?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleDelete}>
              <IonIcon icon={trash} /> {deleteLabel}
            </Button>
            <Button variant="outline-danger" onClick={() => setShowConfirmation(false)}>
              <IonIcon icon={close} /> Cancel
            </Button>
          </Modal.Footer>
      </Modal>
      ) : (
        <div>
          {buttonIsCustom && 
            <div 
              className={className || "custom-button"}
              onClick={() => setShowConfirmation(true)}
              title={label || "Remove From My List"}
            >
              <IonIcon icon={trash} className="custom-button-icon" />
              <span className='small'>{deleteLabel}</span>
          </div>
          }
          {!buttonIsCustom && 
            <Button variant={className || "outline-danger"} onClick={() => setShowConfirmation(true)} title="Remove From My List">
              <IonIcon icon={trash} /> <span className={className? '' : 'small'}>{deleteLabel}</span>
            </Button>
          }
        </div>
      )}
    </div>
  );
};

export default DeleteConfirmation;
