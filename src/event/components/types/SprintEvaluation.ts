interface Attendance {
    dailyAverage: number;
    retro: number;
    refinement: number;
    review: number;
  }
  
  interface PatternDetails {
    id: string;
    key: string;
    type: string;
    title: string;
    description: string;
    tags: string[];
    artifact: string;
    eventType: string;
    agilePrinciples: string[];
    scrumValues: string[];
    scrumPillars: string[];
    subject: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface PatternOccurrence {
    key: string;
    occurrences: number;
    pattern: PatternDetails;
  }
  
  interface HypothesisSummaryItem {
    summary: string;
    rootCause: string;
    impact: string;
  }
  
  interface NoteSummaryItem {
    note: string;
    explanation: string;
  }
  
  interface SprintEvaluation {
    attendance: Attendance;
    designPatterns: PatternOccurrence[];
    antiPatterns: PatternOccurrence[];
    generalObservations: string[];
    hypotheses: string[];
    hypothesisSummary: {
      hypotheses: HypothesisSummaryItem[];
    };
    noteSummary: {
      notes: NoteSummaryItem[];
    };
    actions: string[];
    eventCount: number;
  }

export type {SprintEvaluation};