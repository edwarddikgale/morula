import { Hypothesis } from "observation/types/ScrumAnalysis";
import {Event} from 'event/types/Event';

export interface ActionGeneratorPayload{
    agilePrinciples?: number[], 
    hypothesisList?: Hypothesis[], 
    event: Event,
    limit: number 
}