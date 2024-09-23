import React from 'react';
import scrumValues from './data/scrumValues.json'; // Assume you have this JSON file for TIA values
import RatingComponent from './components/RatingComponent';
import { RatingItem } from './types';

const scrumValueItems: RatingItem[] = scrumValues as RatingItem[];

interface IProps{
  
}

const ScrumValueRating = () => {
  const handleValueChange = (ratings: Record<string, number>) => {
    console.log('Value Ratings:', ratings);
  };

  return (
    <RatingComponent
      title=""
      items={scrumValueItems}
      onChange={handleValueChange}
    />
  );
};

export default ScrumValueRating;
