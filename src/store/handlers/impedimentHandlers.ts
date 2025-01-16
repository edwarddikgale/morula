import { ImpedimentState } from "../states/ImpedimentState";
import { PayloadAction } from "@reduxjs/toolkit";
import { DeleteImpedimentResponse } from "observation/services/impedimentService";
import { Impediment } from "observation/types";

// Fetch Single Impediment
export const handleFetchImpediment = {
    pending: (state: ImpedimentState) => {
        state.loading = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: ImpedimentState, action: PayloadAction<{ impediment: Impediment }>) => {
        state.loading = false;
        state.data = action.payload.impediment;
        state.processingDone = true;
    },
    rejected: (state: ImpedimentState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = action.payload?.toString() || "Failed to fetch impediment";
        state.processingDone = true;
    },
};

// Fetch Impediments List
export const handleFetchImpediments = {
    pending: (state: ImpedimentState) => {
        state.loading = true;
        state.error = null;
    },
    fulfilled: (state: ImpedimentState, action: PayloadAction<{ impediments: Impediment[] }>) => {
        state.loading = false;
        state.list = action.payload.impediments;
    },
    rejected: (state: ImpedimentState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = action.payload?.toString() || "Failed to fetch impediments";
    },
};

// Create Impediment
export const handleCreateImpediment = {
    pending: (state: ImpedimentState) => {
        state.isCreating = true;
    },
    fulfilled: (state: ImpedimentState, action: PayloadAction<{ impediment: Impediment }>) => {
        state.isCreating = false;
        state.list.push(action.payload.impediment);
    },
    rejected: (state: ImpedimentState, action: PayloadAction<string | unknown>) => {
        state.isCreating = false;
        state.error = action.payload?.toString() || "Failed to create impediment";
    },
};

// Update Impediment
export const handleDeleteImpediment = {
    pending: (state: ImpedimentState) => {
        state.isProcessing = true;
    },
    fulfilled: (state: ImpedimentState, action: PayloadAction<{response: DeleteImpedimentResponse, id: string}>) => {
        const {id} = action.payload;
        const {success} = action.payload.response;

        state.isProcessing = false;
        const index = state.list.findIndex((item) => item._id === id);
        if (success && index >= 0) state.list.splice(index,1);
    },
    rejected: (state: ImpedimentState, action: PayloadAction<string | unknown>) => {
        state.isProcessing = false;
        state.error = action.payload?.toString() || "Failed to delete an impediment";
    },
};

// Update Impediment
export const handleUpdateImpediment = {
    pending: (state: ImpedimentState) => {
        state.isProcessing = true;
    },
    fulfilled: (state: ImpedimentState, action: PayloadAction<{ impediment: Impediment }>) => {
        state.isProcessing = false;
        const index = state.list.findIndex((item) => item._id === action.payload.impediment._id);
        if (index >= 0) state.list[index] = action.payload.impediment;
    },
    rejected: (state: ImpedimentState, action: PayloadAction<string | unknown>) => {
        state.isProcessing = false;
        state.error = action.payload?.toString() || "Failed to update impediment";
    },
};
