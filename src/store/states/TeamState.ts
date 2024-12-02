import { Team } from "team/types";


export interface TeamState {
    data: Team | null;
    list: Team[];
    index: number | null;
    loading: boolean;
    processingDone: boolean;
    isProcessing: boolean;
    isCreating: boolean;
    error: string | null;    
}