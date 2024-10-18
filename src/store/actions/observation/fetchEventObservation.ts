import { createAsyncThunk } from "@reduxjs/toolkit";
import { Observation } from "observation/types/Observation";
import { dailyObservationAPI } from "observation/utils/API";

export const fetchEventObservations = createAsyncThunk(
    'observation/fetchEventObservations',
    async (eventId: string, { rejectWithValue }) => {
        try {
            const response = dailyObservationAPI.getObservationsByEvent(eventId);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
