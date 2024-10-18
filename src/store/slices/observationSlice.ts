// actionSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { EventObservationState } from "../states/EventObservationState";
import { 
    fetchEventObservations
} from "../actions/observation";
import { 
    handleFetchEventObservations
} from "../handlers/observationHandlers";

const initialState: EventObservationState = {
    data: null,
    loading: false,
    processingDone: false,
    isProcessing: false,
    isCreating: false,
    error: null,
    list: [],
    index: null
};

const observationSlice = createSlice({
    name: "observation",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventObservations.pending, handleFetchEventObservations.pending)
            .addCase(fetchEventObservations.fulfilled, handleFetchEventObservations.fulfilled)
            .addCase(fetchEventObservations.rejected, handleFetchEventObservations.rejected)

    },
});

export const observationReducer = observationSlice.reducer;
export { fetchEventObservations };
