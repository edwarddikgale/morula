import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../slices/profileSlice";
import { profileAPI } from '../../../profile/utils/API'

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async (userId: string, { rejectWithValue }) => {
        try {
            //const response = await fetch(`${API_URL}/userprofiles/${userId}`);
            const profile = profileAPI.getProfileByUser(userId);
            return profile;
            /*if (!response.ok) {
                const errorMsg = `Failed to fetch user profile with id ${userId}`;
                throw new Error(errorMsg);
            }
            const data = response.json();
            return data;*/
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
