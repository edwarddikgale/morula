import { createAsyncThunk } from "@reduxjs/toolkit";
import { Impediment } from "observation/types";
import { impedimentService } from "observation/services/impedimentService";

export const fetchEventImpediments = createAsyncThunk(
    "impediment/fetchEventImpediments",
    async (eventId: string, { rejectWithValue }) => {
        try {
            return await impedimentService.getImpedimentsByEvent(eventId);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchImpediment = createAsyncThunk(
    "impediment/fetchImpediment",
    async (id: string, { rejectWithValue }) => {
        try {
            return await impedimentService.getImpediment(id);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


