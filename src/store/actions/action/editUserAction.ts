import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserAction } from "actions/types";

export const editUserAction = createAsyncThunk(
    'action/editUserAction',
    async (action: UserAction, { rejectWithValue }) => {
        try {
            console.log(`Editing user action ${JSON.stringify(action)}`);
            // Since we are just editing locally, we can directly resolve the action.
            return Promise.resolve(action);
        } catch (error) {
            // In case of any unexpected errors, we can reject with a value.
            return rejectWithValue("Failed to edit action");
        }
    }
);

