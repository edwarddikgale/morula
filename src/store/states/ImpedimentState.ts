import { Impediment } from "observation/types";

export interface ImpedimentState {
    data: Impediment | null;
    list: Impediment[];
    index: number | null;
    loading: boolean;
    processingDone: boolean;
    isProcessing: boolean;
    isCreating: boolean;
    error: string | null;
}
