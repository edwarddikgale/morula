import { createAsyncThunk } from "@reduxjs/toolkit";
import { Impediment } from "observation/types";
import { impedimentService } from "observation/services/impedimentService";

export const updateImpediment = createAsyncThunk(
    "impediment/updateImpediment",
    async (impediment: Impediment, { rejectWithValue }) => {
        try {
            return await impedimentService.updateImpediment(impediment._id!, impediment);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
