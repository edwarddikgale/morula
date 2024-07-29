// Rating.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { SDG } from 'sdgselection/types/SDG';
import RoundNumber from 'common/components/ui/RoundNumber';


interface IProps{
    index: number,
    sdg: SDG,
    rating: number,
    onRate: (sdgId: number, rate: number) => void
}

const Rating: React.FC<IProps> = ({ index, sdg, rating, onRate }) => {
  return (
    <div className="rating mb-3">
      <RoundNumber text={`${index + 1}`} size={30} />  
      <h5 className='sdg-title'>GOAL {sdg.id} - {sdg.title}</h5>
      <p className='sdg-description'>{sdg.description}</p>
      <div>
        {[1, 2, 3, 4, 5].map((rate) => (
          <span 
            key={rate} 
            className={`rate ${rating >= rate ? 'active' : ''}`} 
            onClick={() => onRate(sdg.id, rate)}
          >
            <FontAwesomeIcon icon={faStar} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
