interface ScrumValueAnalysis {
    rating: number;
    analysis: string;
  }
  
  interface Hypothesis {
    hypothesis: string;
    explanation: string;
  }
  
  interface ScrumAnalysisResponse {
    scrum_values_analysis: {
      commitment: ScrumValueAnalysis;
      focus: ScrumValueAnalysis;
      openness: ScrumValueAnalysis;
      respect: ScrumValueAnalysis;
      courage: ScrumValueAnalysis;
    };
    hypotheses: Hypothesis[];
  }
  
  export type { ScrumValueAnalysis, Hypothesis, ScrumAnalysisResponse };