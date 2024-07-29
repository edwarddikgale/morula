import React from 'react';
import { IonIcon } from '@ionic/react';
import { alertCircleOutline, hourglassOutline, checkmarkCircleOutline } from 'ionicons/icons';

interface StatusIconProps {
  status: 'new' | 'in-progress' | 'done';
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const statusMap = {
    new: { icon: alertCircleOutline, color: 'red' },
    'in-progress': { icon: hourglassOutline, color: 'orange' },
    done: { icon: checkmarkCircleOutline, color: 'green' },
  };

  const { icon, color } = statusMap[status] || { icon: alertCircleOutline, color: 'gray' };

  return <IonIcon icon={icon} style={{ color: color, marginBottom: "-2px", marginRight: "5px" }} size='medium' />;
};

export default StatusIcon;
