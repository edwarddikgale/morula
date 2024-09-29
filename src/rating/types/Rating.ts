export interface Rating {
    [key: string]: number;
  }
  
  export interface RatingItem {
    key: string;
    name: string;
    analysis: string;
    ratingValue: number;
  }
  