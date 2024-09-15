import React from 'react';
import scrumPillars from './data/scrumPillars.json'; // Assume you have this JSON file for TIA values
import RatingComponent from './components/RatingComponent';
import { RatingItem } from './types';

const scrumPillarItems: RatingItem[] = scrumPillars as RatingItem[];
const ScrumPillarRating = () => {
  const handleTiaSubmit = (ratings: Record<string, number>) => {
    console.log('TIA Ratings:', ratings);
  };

  return (
    <RatingComponent
      title="Rate Scrum Pillars (TIA)"
      items={scrumPillarItems}
      onSubmit={handleTiaSubmit}
    />
  );
};

export default ScrumPillarRating;
