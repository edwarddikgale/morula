import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { arrowDown, arrowUp } from 'ionicons/icons';

interface LimitedCharsProps{
    text: string,
    limit: number,
    className?: string 
}

const LimitedCharacters: React.FC<LimitedCharsProps> = ({ text, limit, className }: LimitedCharsProps) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const renderContent = () => {
    if (!text || text.length <= limit) {
      return text;
    }

    if (showMore) {
      return text;
    }

    return `${text.substring(0, limit)}...`;
  };

  const renderToggle = () => {
    if (!text || text.length <= limit) {
      return null;
    }

    return (
      <span onClick={toggleShowMore} style={{ cursor: 'pointer' }}>
        {showMore ? (
          <IonIcon icon={arrowUp} />
        ) : (
          <IonIcon icon={arrowDown} />
        )}
      </span>
    );
  };

  return (
    <p className={className || ''}>
      {renderContent()}
      {renderToggle()}
    </p>
  );
};

export default LimitedCharacters;
