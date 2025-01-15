import { createAsyncThunk } from "@reduxjs/toolkit";
import { Impediment } from "observation/types";
import { impedimentService } from "observation/services/impedimentService";

export const createImpediment = createAsyncThunk(
    "impediment/createImpediment",
    async (impediment: Impediment, { rejectWithValue }) => {
        try {
            console.log(`calling impedimentService.createImpediment with ${JSON.stringify(impediment)}`);
            const response = await impedimentService.createImpediment(impediment);
            console.log(`response ${JSON.stringify(response)}`);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
