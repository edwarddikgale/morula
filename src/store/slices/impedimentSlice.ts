import { createSlice } from "@reduxjs/toolkit";
import { ImpedimentState } from "../states/ImpedimentState";
import {
    fetchImpediment,
    fetchEventImpediments,
    createImpediment,
    updateImpediment,
} from "../actions/impediment";
import {
    handleFetchImpediment,
    handleFetchImpediments,
    handleCreateImpediment,
    handleUpdateImpediment,
} from "../handlers/impedimentHandlers";

const initialState: ImpedimentState = {
    data: null,
    list: [],
    index: null,
    loading: false,
    processingDone: false,
    isProcessing: false,
    isCreating: false,
    error: null,
};

const impedimentSlice = createSlice({
    name: "impediment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImpediment.pending, handleFetchImpediment.pending)
            .addCase(fetchImpediment.fulfilled, handleFetchImpediment.fulfilled)
            .addCase(fetchImpediment.rejected, handleFetchImpediment.rejected)
            .addCase(fetchEventImpediments.pending, handleFetchImpediments.pending)
            .addCase(fetchEventImpediments.fulfilled, handleFetchImpediments.fulfilled)
            .addCase(fetchEventImpediments.rejected, handleFetchImpediments.rejected)
            .addCase(createImpediment.pending, handleCreateImpediment.pending)
            .addCase(createImpediment.fulfilled, handleCreateImpediment.fulfilled)
            .addCase(createImpediment.rejected, handleCreateImpediment.rejected)
            .addCase(updateImpediment.pending, handleUpdateImpediment.pending)
            .addCase(updateImpediment.fulfilled, handleUpdateImpediment.fulfilled)
            .addCase(updateImpediment.rejected, handleUpdateImpediment.rejected);
    },
});

export const impedimentReducer = impedimentSlice.reducer;
export { createImpediment, fetchImpediment, fetchEventImpediments, updateImpediment };
