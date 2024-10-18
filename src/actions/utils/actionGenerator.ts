import openAiActions from "./openAiActions";
import RandomActionGenerator from "./randomActionGenerator";
import {Action} from '../types/Action';
import { ActionGeneratorPayload } from "actions/types/ActionGeneratorPayload";

export const actionGenerator = (details: ActionGeneratorPayload): Promise<Action[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let rndAGen: any;

      //rndAGen = new RandomActionGenerator(selectedSdg, false);

      const aiActions: any[] = [await openAiActions.getActions(details)];
      //const globalActions: any[] = rndAGen.getRandomActions(2);

      //resolve([...globalActions, ...aiActions]);
      resolve([...aiActions]);

    } catch (error) {
      console.error(error);
      reject(error); // Reject the promise in case of an error
    }
  });
};
