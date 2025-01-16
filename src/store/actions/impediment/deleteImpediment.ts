import { createAsyncThunk } from "@reduxjs/toolkit";
import { Impediment } from "observation/types";
import { impedimentService } from "observation/services/impedimentService";

export const deleteImpediment = createAsyncThunk(
    "impediment/deleteImpediment",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await impedimentService.deleteImpediment(id);
            return {response, id};
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


