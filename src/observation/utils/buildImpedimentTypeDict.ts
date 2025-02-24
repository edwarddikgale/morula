import { ImpedimentType } from "observation/types/Impediment";
import impedimentTypeArray from '../data/impedimentTypes.json';

export function buildImpedimentTypeDict(
    impedimentTypes: ImpedimentType[]
  ): Record<string, string> {
    const dict: Record<string, string> = {};
    impedimentTypes.forEach((item) => {
      dict[item.code] = item.title;
    });
    return dict;
}

export const impedimentTypeDict = buildImpedimentTypeDict(impedimentTypeArray);