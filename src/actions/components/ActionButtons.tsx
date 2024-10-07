// components/ActionButtons.tsx
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { IonIcon } from '@ionic/react';
import { refreshOutline } from 'ionicons/icons';

interface ActionButtonsProps {
  getActions: () => void;
  createCustomAction: () => void;
  handleOpenFeedbackModal?: () => void;
  isLoading: boolean;
  actionList: any[];
  hideExport?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  getActions,
  createCustomAction,
  handleOpenFeedbackModal,
  isLoading,
  actionList,
  hideExport = false
}) => {
  return (
    <div className='row'>
      <div className='col-12 d-flex justify-content-center'>
        <Button variant='btn btn-primary me-2' onClick={getActions} disabled={isLoading}>
          Generate {actionList && actionList.length > 0 ? "more" : ""} Actions {"  "}
          {isLoading ? (
            <Spinner animation='border' variant='light' size='sm' />
          ) : (
            <span>
              <IonIcon icon={refreshOutline} />
            </span>
          )}
        </Button>
        <Button onClick={createCustomAction} variant='btn btn-outline-primary me-2'>
          {" "}
          + Add My Action
        </Button>
        {!hideExport && handleOpenFeedbackModal &&
        <Button variant='success' onClick={handleOpenFeedbackModal}>
          Export Actions to Excel
        </Button>
        }
      </div>
    </div>
  );
};

export default ActionButtons;
