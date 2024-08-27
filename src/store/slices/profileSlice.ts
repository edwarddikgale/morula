import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserProfile } from "profile/types/profile";

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchUserProfile = createAsyncThunk(
    'profile/fetchUserProfile',
    async(userId: string, {rejectWithValue}) =>{
        try{
            const response = await fetch(`${API_URL}/userprofiles/${userId}`);
            if(!response.ok){
                throw new Error(`Failed to fetch user profile with id ${userId}`);
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
    error: string | null;
}

const initialState: UserProfileState = {
    data: null,
    loading: false,
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
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) =>{
            state.loading = false;
            state.data = action.payload.userprofile;
        })
        .addCase(fetchUserProfile.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload?.toString() || "Sorry, seems like something went wrong";
        });
    }
});

export const profileReducer = profileSlice.reducer;