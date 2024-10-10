import { createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "actions/types";
import { actionAPI } from "actions/utils/actionAPI";
import { actionGenerator } from "actions/utils/actionGenerator";


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

export interface FetchAiUserActionsProps {limit: number}
export const fetchAiUserActions = createAsyncThunk(
    'action/fetchAiUserActions',
    async ({limit}: FetchAiUserActionsProps, { rejectWithValue }) => {
        try {
            const aiActions: Action[] = await actionGenerator(limit);
            return aiActions;
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