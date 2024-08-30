import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "profile/types/profile";
import { CreateProfileResponse, UpdateProfileResponse } from "profile/utils/API";
import { fetchUserProfile } from "../actions/profile/fetchUserProfile";
import { updateUserProfile } from "../actions/profile/updateUserProfile";
import { createUserProfile } from "../actions/profile/createUserProfile";
import { UserProfileState } from "../states/UserProfileState";

export const API_URL = process.env.REACT_APP_API_BASE_URL;
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
export {createUserProfile, fetchUserProfile, updateUserProfile};