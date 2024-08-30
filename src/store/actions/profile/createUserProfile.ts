import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfile } from "profile/types/profile";
import { profileAPI } from "profile/utils/API";
import { delay } from "../../slices/profileSlice";


export const createUserProfile = createAsyncThunk(
    'profile/createUserProfile',
    async (profile: UserProfile, { rejectWithValue }) => {
        try {
            const response = await profileAPI.createUserProfile(profile);
            await delay(1000);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
