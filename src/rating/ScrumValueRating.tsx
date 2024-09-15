import React from 'react';
import scrumValues from './data/scrumValues.json'; // Assume you have this JSON file for TIA values
import RatingComponent from './components/RatingComponent';
import { RatingItem } from './types';

const scrumPillarItems: RatingItem[] = scrumValues as RatingItem[];
const ScrumValueRating = () => {
  const handleTiaSubmit = (ratings: Record<string, number>) => {
    console.log('TIA Ratings:', ratings);
  };

  return (
    <RatingComponent
      title=""
      items={scrumPillarItems}
      onChange={handleTiaSubmit}
    />
  );
};

export default ScrumValueRating;
