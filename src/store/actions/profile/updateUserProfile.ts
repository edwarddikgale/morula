import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfile } from "profile/types/profile";
import { profileAPI } from "profile/utils/API";
import { delay } from "../../slices/profileSlice";


export const updateUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async (profile: UserProfile, { rejectWithValue }) => {
        try {
            const response = await profileAPI.updateUserProfile(profile, profile._id || "");
            await delay(1000);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
