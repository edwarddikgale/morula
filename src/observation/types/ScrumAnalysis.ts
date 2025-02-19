interface ScrumValueAnalysis {
    rating: number;
    analysis: string;
  }
  
  interface Hypothesis {
    _id?: string;
    hypothesis: string;
    explanation: string;
    probability: number;
    context?: string;
    createAt?: Date;
    updatedAt?: Date;
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