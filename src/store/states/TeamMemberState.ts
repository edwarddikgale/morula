import { TeamMember } from "team/types";


export interface TeamMemberState {
    data: TeamMember | null;
    list: TeamMember[];
    index: number | null;
    loading: boolean;
    processingDone: boolean;
    isProcessing: boolean;
    isCreating: boolean;
    error: string | null;    
}