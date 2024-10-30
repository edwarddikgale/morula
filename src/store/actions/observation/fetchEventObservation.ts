import { createAsyncThunk } from "@reduxjs/toolkit";
import { Observation } from "observation/types/Observation";
import { scrumEventObservationAPI } from "observation/utils/API";

export const fetchEventObservations = createAsyncThunk(
    'observation/fetchEventObservations',
    async (eventId: string, { rejectWithValue }) => {
        try {
            const response = scrumEventObservationAPI.getObservationsByEvent(eventId);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
