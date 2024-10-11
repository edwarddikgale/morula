import { UserAction } from "actions/types/";


export interface UserActionState {
    data: UserAction | null;
    list: UserAction[];
    index: number | null;
    loading: boolean;
    processingDone: boolean;
    isProcessing: boolean;
    isCreating: boolean;
    error: string | null;    
}