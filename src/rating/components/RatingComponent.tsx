import React, { useState } from 'react';
import { RatingItem } from '../types';
import { Star } from './Star';

import "../styles/rating.css";

interface RatingComponentProps {
  title: string; // For the header (Scrum or TIA Rating)
  items: RatingItem[]; // Array of items to be rated (scrum values or TIA aspects)
  onSubmit?: (ratings: Record<string, number>) => void; // Callback for handling form submission
  onChange?: (ratings: Record<string, number>) => void; // Callback for handling form changes
}

// Generic RatingComponent
const RatingComponent: React.FC<RatingComponentProps> = ({ title, items, onSubmit, onChange }) => {
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const handleRating = (name: string, rating: number) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [name]: rating
    }));

    if(onChange){ onChange(ratings)}
  };

  return (
    <div>
      <h1>{title}</h1>
      {items.map((item) => (
        <div key={item.key} className='rating-item'>
          <label>{item.name}: </label>
          {[1, 2, 3, 4, 5].map((starId) => (
            <Star
              key={starId}
              filled={starId <= (ratings[item.name] || item.RatingValue)}
              onClick={() => handleRating(item.name, starId)}
            />
          ))}
          {item.analysis &&
            <p className='mt-2 mb-2'>
              {item.analysis}
            </p>
          }
        </div>
      ))}
      {onSubmit && 
        <button onClick={() => onSubmit(ratings)}>Submit Ratings</button>
      }
    </div>
  );
};

export default RatingComponent;
