import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAction } from "actions/types/";
import { CreateUserActionResponse, UpdateUserActionResponse } from "actions/utils/actionAPI";
import { fetchUserAction, fetchUserActions, createUserAction, updateUserAction } from "../actions/action/";
import { UserActionState } from "../states/UserActionState";
import { fetchEventUserActions } from "store/actions/action/fetchUserAction";

export const API_URL = process.env.REACT_APP_API_BASE_URL;
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const initialState: UserActionState = {
    data: null,
    loading: false,
    processingDone: false,
    isProcessing: false,
    error: null,
    list: [],
    index: null
};

const actionSlice = createSlice({
    name: "action",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchUserAction cases
            .addCase(fetchUserAction.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.processingDone = false;
            })
            .addCase(fetchUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload.useraction;
                state.processingDone = false;
            })
            .addCase(fetchUserAction.rejected, (state, action) => {
                state.loading = false;
                state.data = <UserAction>{};
                state.error = action.payload?.toString() || "Sorry, seems like something went wrong";
                state.processingDone = false;
            })
            .addCase(fetchUserActions.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.processingDone = false;
            })
            .addCase(fetchUserActions.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.list = action.payload.records;
                state.processingDone = false;
            })
            .addCase(fetchUserActions.rejected, (state, action) => {
                state.loading = false;
                state.list = <UserAction[]>[];
                state.error = action.payload?.toString() || "Sorry, seems like something went wrong";
                state.processingDone = false;
            })  
            .addCase(fetchEventUserActions.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.processingDone = false;
            })
            .addCase(fetchEventUserActions.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.list = action.payload.records;
                state.processingDone = false;
            })
            .addCase(fetchEventUserActions.rejected, (state, action) => {
                state.loading = false;
                state.list = <UserAction[]>[];
                state.error = action.payload?.toString() || "Sorry, seems like something went wrong";
                state.processingDone = false;
            })           
            // Handle createUserAction cases
            .addCase(createUserAction.pending, (state) => {
                state.loading = false;
                state.isProcessing = true;
                state.error = null;
                state.processingDone = false;
            })
            .addCase(createUserAction.fulfilled, (state, action: PayloadAction<CreateUserActionResponse>) => {
                state.loading = false;
                state.data = action.payload.userAction;
                state.error = null;
                state.processingDone = true;
                state.isProcessing = false;
            })
            .addCase(createUserAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = typeof action.payload === 'string' ? action.payload : 'Failed to create action';
                state.processingDone = true;
                state.isProcessing = false;
            })
            // Handle updateUserAction cases
            .addCase(updateUserAction.pending, (state) => {
                state.loading = false;
                state.isProcessing = true;
                state.error = null;
                state.processingDone = false;
            })
            .addCase(updateUserAction.fulfilled, (state, action: PayloadAction<UpdateUserActionResponse>) => {
                state.loading = false;
                state.data = action.payload.userAction;
                state.error = null;
                state.isProcessing = false;
                state.processingDone = true;
            })
            .addCase(updateUserAction.rejected, (state, action: PayloadAction<string | unknown>) => {
                state.loading = false;
                state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update action';
                state.isProcessing = false;
                state.processingDone = true;
            });
    },
});


export const actionReducer = actionSlice.reducer;
export {createUserAction, fetchUserAction, updateUserAction};