import openAiActions from "./openAiActions";
import RandomActionGenerator from "./randomActionGenerator";
import {Action} from '../types/Action';

export const actionGenerator = (selectedSdg: number): Promise<Action[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let rndAGen: any;

      rndAGen = new RandomActionGenerator(selectedSdg, false);

      const aiActions: any[] = [await openAiActions.getActionBySdg(selectedSdg as number)];
      const globalActions: any[] = rndAGen.getRandomActions(2);

      resolve([...globalActions, ...aiActions]);
    } catch (error) {
      console.error(error);
      reject(error); // Reject the promise in case of an error
    }
  });
};
