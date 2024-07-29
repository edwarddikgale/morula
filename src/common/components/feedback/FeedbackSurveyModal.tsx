import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import FeedbackSurvey from './FeedbackSurvey';

interface FeedbackSurveyModalProps {
  onDoneComponent: JSX.Element;
  onCancel: () => void;
}

const FeedbackSurveyModal: React.FC<FeedbackSurveyModalProps> = ({ onDoneComponent, onCancel }) => {

  
  return (
      <Modal show={true} onHide={onCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Please give us your feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FeedbackSurvey />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onCancel}>
            Cancel
          </Button>
          {onDoneComponent}
        </Modal.Footer>
      </Modal>
  );
};

export default FeedbackSurveyModal;
