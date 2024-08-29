import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "profile/types/profile";
import { CreateProfileResponse, UpdateProfileResponse, profileAPI } from "profile/utils/API";

export const API_URL = process.env.REACT_APP_API_BASE_URL;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async(userId: string, {rejectWithValue}) =>{
        try{
            const response = await fetch(`${API_URL}/userprofiles/${userId}`);
            if(!response.ok){
                const errorMsg = `Failed to fetch user profile with id ${userId}`
                throw new Error(errorMsg);
            }
            const data = response.json();
            return data;
        }
        catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async(profile: UserProfile, {rejectWithValue}) =>{
        try{
            const response = await profileAPI.updateUserProfile(profile, profile._id || "");
            await delay(1000);
            return response;
        }
        catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const createUserProfile = createAsyncThunk(
    'profile/createUserProfile',
    async(profile: UserProfile, {rejectWithValue}) =>{
        try{
            const response = await profileAPI.createUserProfile(profile);
            await delay(1000);
            return response;
        }
        catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

export interface UserProfileState {
    data: UserProfile | null;
    loading: boolean;
    processingDone: boolean;
    isProcessing: boolean;
    error: string | null;
}

const initialState: UserProfileState = {
    data: null,
    loading: false,
    processingDone: false,
    isProcessing: false,
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchUserProfile cases
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.processingDone = false;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload.userprofile;
                state.processingDone = false;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.data = <UserProfile>{};
                state.error = action.payload?.toString() || "Sorry, seems like something went wrong";
                state.processingDone = false;
            })
            // Handle createUserProfile cases
            .addCase(createUserProfile.pending, (state) => {
                state.loading = false;
                state.isProcessing = true;
                state.error = null;
                state.processingDone = false;
            })
            .addCase(createUserProfile.fulfilled, (state, action: PayloadAction<CreateProfileResponse>) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
                state.processingDone = true;
                state.isProcessing = false;
            })
            .addCase(createUserProfile.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = typeof action.payload === 'string' ? action.payload : 'Failed to create profile';
                state.processingDone = true;
                state.isProcessing = false;
            })
            // Handle updateUserProfile cases
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = false;
                state.isProcessing = true;
                state.error = null;
                state.processingDone = false;
            })
            .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UpdateProfileResponse>) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
                state.isProcessing = false;
                state.processingDone = true;
            })
            .addCase(updateUserProfile.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update profile';
                state.isProcessing = false;
                state.processingDone = true;
            });
    },
});


export const profileReducer = profileSlice.reducer;