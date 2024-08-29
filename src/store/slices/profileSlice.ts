import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "profile/types/profile";
import { UpdateProfileResponse, profileAPI } from "profile/utils/API";

export const API_URL = process.env.REACT_APP_API_BASE_URL;

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
            return response;
        }
        catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

export const createUserProfile = createAsyncThunk(
    'profile/updateUserProfile',
    async(profile: UserProfile, {rejectWithValue}) =>{
        try{
            const response = await profileAPI.CreateUserProfile(profile);
            if(!response.ok){
                const errorMsg = `Failed to create user profile with id ${profile._id }`;
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

export interface UserProfileState {
    data: UserProfile | null;
    loading: boolean;
    processingDone: boolean;
    error: string | null;
}

const initialState: UserProfileState = {
    data: null,
    loading: false,
    processingDone: false,
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchUserProfile.pending, (state) =>{
            state.loading = true;
            state.error = null;
            state.processingDone = false;
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) =>{
            state.loading = false;
            state.error = null;
            state.data = action.payload.userprofile;
            state.processingDone = false;
        })
        .addCase(fetchUserProfile.rejected, (state, action) =>{
            state.loading = false;
            state.data = <UserProfile>{};
            state.error = action.payload?.toString() || "Sorry, seems like something went wrong";
            state.processingDone = false;
        })
        .addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.processingDone = false;
        })
        .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UpdateProfileResponse>) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            state.processingDone = true;
            console.log(`payload: ${JSON.stringify(action.payload)}`);
            console.log(`updateUserProfile.fulfilled`);
        })
        .addCase(updateUserProfile.rejected, (state, action: PayloadAction<string | unknown>) => {
            state.loading = false;
            state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update profile';
            state.processingDone = true;
            console.log(`updateUserProfile.rejected`);
        });
    }
});

export const profileReducer = profileSlice.reducer;