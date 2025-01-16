import { createAsyncThunk } from "@reduxjs/toolkit";
import { Impediment } from "observation/types";
import { impedimentService } from "observation/services/impedimentService";

export const createImpediment = createAsyncThunk(
    "impediment/createImpediment",
    async (impediment: Impediment, { rejectWithValue }) => {
        try {
            const response = await impedimentService.createImpediment(impediment);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
