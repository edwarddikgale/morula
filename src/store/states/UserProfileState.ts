import { UserProfile } from "profile/types/profile";


export interface UserProfileState {
    data: UserProfile | null;
    loading: boolean;
    processingDone: boolean;
    isProcessing: boolean;
    error: string | null;
}
