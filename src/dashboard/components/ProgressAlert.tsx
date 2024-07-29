import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { getVariantByPercentage } from 'dashboard/utils/variantPercentage';

interface ProgressAlertProps {
  data: any;
  emptyText: string;
  completedText?: string;
  completionRateEval: (data: any) => number;
}

const ProgressAlert: React.FC<ProgressAlertProps> = ({ data, emptyText, completedText, completionRateEval }) => {
  const completionRate = data ? completionRateEval(data) : 0;

  if (!data || completionRate === 0) {
    return (
      <div className="alert alert-warning d-flex align-items-center warning" role="alert">
        <FontAwesomeIcon icon={faExclamationTriangle} color='red' className="me-2" />
        {emptyText}
      </div>
    );
  }

  if (completionRate === 100) {
    return (
      <div className="d-flex align-items-center" role="alert">
        <FontAwesomeIcon icon={faCheckCircle} color='green' className="me-2" />
        {completedText || "Completed"}
      </div>
    );
  }

  return (
    <div>
      <ProgressBar 
        now={completionRate} 
        variant={getVariantByPercentage(completionRate)} 
        label={`${completionRate}%`} />
    </div>
  );
};

export default ProgressAlert;
