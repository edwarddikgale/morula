import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "../../slices/profileSlice";
import { UserAction } from "actions/types";
import { actionAPI } from "actions/utils/actionAPI";


export const createUserAction = createAsyncThunk(
    'action/createUserAction',
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
