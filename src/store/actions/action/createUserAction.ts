import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "../../slices/profileSlice";
import { UserAction } from "actions/types";
import { actionAPI } from "actions/utils/actionAPI";

interface CreateUserActionProps{action: UserAction, index: number};
export const createUserAction = createAsyncThunk(
    'action/createUserAction',
    async ({action, index}: CreateUserActionProps, { rejectWithValue }) => {
        try {
            delete action.id;
            const response = await actionAPI.createUserAction(action);
            await delay(1000);
            return {response, index};
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
