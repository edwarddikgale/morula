import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserAction } from "actions/types";
import { actionAPI } from "actions/utils/actionAPI";
import { delay } from "store/slices/profileSlice";

export const updateUserAction = createAsyncThunk(
    'action/updateUserAction',
    async (action: UserAction, { rejectWithValue }) => {
        try {
            const response = await actionAPI.createUserAction(action);
            await delay(1000);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);