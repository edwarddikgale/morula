import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const TranscriptionLoader = () => (
  <div className="d-flex justify-content-center align-items-center my-4">
    <Spinner animation="border" role="status" />
    <span className="ms-3">Transcribing audio...</span>
  </div>
);

export default TranscriptionLoader;
