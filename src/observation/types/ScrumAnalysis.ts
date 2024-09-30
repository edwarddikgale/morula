interface ScrumValueAnalysis {
    rating: number;
    analysis: string;
  }
  
  interface Hypothesis {
    hypothesis: string;
    explanation: string;
  }
  
  interface ScrumValuesAnalyses{
    commitment: ScrumValueAnalysis;
    focus: ScrumValueAnalysis;
    openness: ScrumValueAnalysis;
    respect: ScrumValueAnalysis;
    courage: ScrumValueAnalysis;
  }

  interface ScrumAnalysisResponse {
    scrum_values_analysis: ScrumValuesAnalyses;
    hypotheses: Hypothesis[];
  }
  
  export type { ScrumValueAnalysis, ScrumValuesAnalyses, Hypothesis, ScrumAnalysisResponse };