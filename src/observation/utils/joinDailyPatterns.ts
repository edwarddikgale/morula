import { AgilePattern } from "agilepatterns/types";

export const joinDailyPatterns = (
    dailyAntiPatterns: { id: string; key: string }[],
    dailyDesignPatterns: { id: string; key: string }[]
  ): AgilePattern[] => {
  
    const antiPatterns: AgilePattern[] = dailyAntiPatterns.map((pattern) => ({
      id: pattern.id,
      key: pattern.key,
      title: `Anti-Pattern: ${pattern.key}`,  // Just a placeholder title
      description: ``,
      type: 'anti-pattern',
      tags: ['anti-pattern', 'daily'],
      artifact: 'none',
      eventType: 'daily',
      agilePrinciples: [],  // You can add actual principles if available
      scrumValues: [],  // You can add actual scrum values if available
      scrumPillars: [],  // You can add actual scrum pillars if available,
      selected: true,
      subject: ''
    }));
  
    const designPatterns: AgilePattern[] = dailyDesignPatterns.map((pattern) => ({
      id: pattern.id,
      key: pattern.key,
      title: `Design-Pattern: ${pattern.key}`,  // Just a placeholder title
      description: ``,
      type: 'design-pattern',
      tags: ['design-pattern', 'daily'],
      artifact: 'none',
      eventType: 'daily',
      agilePrinciples: [],  // You can add actual principles if available
      scrumValues: [],  // You can add actual scrum values if available
      scrumPillars: [],  // You can add actual scrum pillars if available,
      selected: true,
      subject: ''
    }));
  
    return [...antiPatterns, ...designPatterns];
  };
  