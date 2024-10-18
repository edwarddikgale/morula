import { Observation } from "observation/types/Observation";


export interface EventObservationState {
    data: Observation | null;
    list: Observation[];
    index: number | null;
    loading: boolean;
    processingDone: boolean;
    isProcessing: boolean;
    isCreating: boolean;
    error: string | null;    
}