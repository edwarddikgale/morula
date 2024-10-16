import { AgilePattern } from "agilepatterns/types";

export const splitScrumPatterns = (
  patterns: AgilePattern[]
): {
  scrumAntiPatterns: { id: string; key: string }[];
  scrumDesignPatterns: { id: string; key: string }[];
} => {
  const scrumAntiPatterns: { id: string; key: string }[] = [];
  const scrumDesignPatterns: { id: string; key: string }[] = [];

  patterns.forEach((pattern) => {
    const { id, key, type } = pattern;

    if (type === 'anti-pattern') {
      scrumAntiPatterns.push({ id, key });
    } else if (type === 'design-pattern') {
      scrumDesignPatterns.push({ id, key });
    }
  });

  return { scrumAntiPatterns, scrumDesignPatterns };
};
