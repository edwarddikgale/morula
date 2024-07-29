import React from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="btn btn-outline-dark position-absolute top-0 end-0 m-2 rounded-circle border-2 d-flex align-items-center justify-content-center"
      aria-label="Close"
      onClick={onClick}
      style={{ zIndex: 10, width: '48px', height: '48px' }} // Adjust size as needed
    >
      <IonIcon icon={closeOutline} style={{ fontSize: '1.5rem' }} />
    </button>
  );
};

export default CloseButton;
