import React from 'react';
import './rightOverlay.css';
import CloseButton from './CloseButton';

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const RightOverlay: React.FC<OverlayProps> = ({ isOpen, onClose, children }) => {
  return (
    <div>
      <div className={`overlay ${isOpen ? 'open' : ''}`}>
        <div className="overlay-content">
          <div className="d-flex justify-content-end">
            <CloseButton onClick={onClose} />
          </div>
          {children}
        </div>
      </div>      
    </div>
  );
};

export default RightOverlay;
