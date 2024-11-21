import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "../../slices/profileSlice";
import { actionAPI } from "actions/utils/actionAPI";

interface DeleteUserActionProps{actionId: string | null | undefined, index: number};
export const deleteUserAction = createAsyncThunk(
    'action/deleteUserAction',
    async ({actionId, index}: DeleteUserActionProps, { rejectWithValue }) => {
        try {
            if(!actionId){
                return {response: null, index: index};
            }
            const response = await actionAPI.deleteUserAction(actionId);
            await delay(1000);
            return {response, index};
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
