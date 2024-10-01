import { AgilePattern } from "agilepatterns/types";

export const splitDailyPatterns = (
  patterns: AgilePattern[]
): {
  dailyAntiPatterns: { id: string; key: string }[];
  dailyDesignPatterns: { id: string; key: string }[];
} => {
  const dailyAntiPatterns: { id: string; key: string }[] = [];
  const dailyDesignPatterns: { id: string; key: string }[] = [];

  patterns.forEach((pattern) => {
    const { id, key, type } = pattern;

    if (type === 'anti-pattern') {
      dailyAntiPatterns.push({ id, key });
    } else if (type === 'design-pattern') {
      dailyDesignPatterns.push({ id, key });
    }
  });

  return { dailyAntiPatterns, dailyDesignPatterns };
};
