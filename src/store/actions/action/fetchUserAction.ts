import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionAPI } from "actions/utils/actionAPI";


export const fetchUserActions = createAsyncThunk(
    'action/fetchUserActions',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = actionAPI.getActionsByUser(userId);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

interface FetchEventUserActionsProps{userId: string, eventId: string};
export const fetchEventUserActions = createAsyncThunk(
    'action/fetchEventUserActions',
    async ({userId, eventId}: FetchEventUserActionsProps, { rejectWithValue }) => {
        try {
            const response = actionAPI.getActions(userId, eventId);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchUserAction = createAsyncThunk(
    'action/fetchUserAction',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = actionAPI.getUserAction(id);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);