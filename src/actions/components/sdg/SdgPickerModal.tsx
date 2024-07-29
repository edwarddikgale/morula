import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import SdgPicker from './SdgPicker';

interface SdgPickerModalProps {
  onCancel: () => void;
  onApply: (sdg: number | undefined) => void;
}

const SdgPickerModal: React.FC<SdgPickerModalProps> = (props: SdgPickerModalProps) => {

  const {onCancel, onApply} = props;
  const [sdg, setSdg] = useState<number>();

  return (
      <Modal show={true} onHide={onCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Generate Selected SDG's Actions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SdgPicker 
            index={1}
            data={{} as any}
            onSelectItem={(sdgVal) => {setSdg(sdgVal)}}
            key={{} as any}
          />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={onCancel}>
                Cancel
            </Button>
            <Button variant="outline-primary" onClick={() => onApply(sdg) }>
                Apply
            </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default SdgPickerModal;
