// userActionHandlers.ts
import { Observation } from "observation/types/Observation";
import { EventObservationState } from "../states/EventObservationState";
import { PayloadAction } from "@reduxjs/toolkit";

// Fetch User Actions List Handlers
export const handleFetchEventObservations = {
    pending: (state: EventObservationState) => {
        state.loading = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: EventObservationState, action: PayloadAction<{ observations: Observation[] }>) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload.observations;
        state.processingDone = false;
    },
    rejected: (state: EventObservationState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.list = [];
        state.error = action.payload?.toString() || "Something went wrong";
        state.processingDone = false;
    }
};

