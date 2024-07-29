import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const NoSdgs = () => {
  return (
    <div className="card my-3">
      <div className="card-body">
        <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faExclamationTriangle} className="me-3 text-warning" size="lg" />
        <p className="warning mb-0" style={{ fontSize: '1.2rem' }}>
            You currently have no SDG's set. To do this you will need to go through a short 3 min rating exercise by clicking the button below.
        </p>
        </div>
      </div>
    </div>
  );
};

export default NoSdgs;
