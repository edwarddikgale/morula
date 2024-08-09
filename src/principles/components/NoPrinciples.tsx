import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const NoPrinciples = () => {
  return (
    <div className="card my-3">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faExclamationTriangle} className="me-3 text-warning" size="lg" />
          <p className="warning mb-0 p-4" style={{ fontSize: '1.2rem' }}>
              You currently have no Agile Principles set. To do this you will need to go through a short 3 min rating exercise by clicking the button below.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoPrinciples;
