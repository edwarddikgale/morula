// types.ts
export interface AgilePattern {
    id: string;
    key: string;
    title: string;
    description: string;
    type: 'anti-pattern' | 'design-pattern';
    tags: string[];
    artifact: 'product-backlog' | 'sprint-backlog' | 'increment';
    eventType: 'daily' | 'refinement' | 'planning' | 'retrospective' | 'research' | 'other';
    agilePrinciples: string[];
    scrumValues: string[];
    scrumPillars: string[];
  }
  