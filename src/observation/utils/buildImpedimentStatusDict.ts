import { ImpedimentStatus } from "observation/types/Impediment";
import impedimentStatusArray from '../data/impedimentStatus.json';

export function buildImpedimentStatusDict(
    impedimentStatuses: ImpedimentStatus[]
  ): Record<string, string> {
    const dict: Record<string, string> = {};
    impedimentStatuses.forEach((item) => {
      dict[item.value] = item.title;
    });
    return dict;
}

export const impedimentStatusDict = buildImpedimentStatusDict(impedimentStatusArray);