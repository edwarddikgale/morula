import React from 'react';
import scrumValues from './data/scrumValues.json'; // Assume you have this JSON file for TIA values
import RatingComponent from './components/RatingComponent';
import { RatingItem } from './types';
import { ScrumAnalysisResponse } from 'observation/types/ScrumAnalysis';

const scrumValueItems: RatingItem[] = scrumValues as RatingItem[];

interface IProps{
  scrumAnalysis: ScrumAnalysisResponse | null
}

const convertScrumAnalysisToRatingItems = (scrumAnalysis: ScrumAnalysisResponse | null): RatingItem[] | null => {
  if (!scrumAnalysis) return null;

  // Convert scrum_values_analysis into RatingItem[]
  const ratingItems: RatingItem[] = Object.entries(scrumAnalysis.scrum_values_analysis).map(([key, valueAnalysis]) => ({
    key: key,
    name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizing the first letter of the key
    analysis: valueAnalysis.analysis,
    RatingValue: valueAnalysis.rating
  }));

  return ratingItems;
};

const ScrumValueRating: React.FC<IProps> = ({scrumAnalysis}: IProps) => {
 
  const handleValueChange = (ratings: Record<string, number>) => {
    
  };

  const scrumValuesRated = convertScrumAnalysisToRatingItems(scrumAnalysis) || scrumValueItems;

  return (
    <RatingComponent
      title=""
      items={scrumValuesRated}
      onChange={handleValueChange}
    />
  );
};

export default ScrumValueRating;
