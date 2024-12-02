// actionSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { TeamState } from "../states/TeamState";
import { 
    fetchTeam, 
    fetchTeams, 
    createTeam, 
    updateTeam, 
} from "../actions/team";
import { 
    handleFetchTeam, 
    handleFetchTeams, 
    handleCreateTeam, 
    handleDeleteTeam,
    handleUpdateTeam, 
} from "../handlers/teamHandlers";

const initialState: TeamState = {
    data: null,
    loading: false,
    processingDone: false,
    isProcessing: false,
    isCreating: false,
    error: null,
    list: [],
    index: null
};

const teamSlice = createSlice({
    name: "team",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeam.pending, handleFetchTeam.pending)
            .addCase(fetchTeam.fulfilled, handleFetchTeam.fulfilled)
            .addCase(fetchTeam.rejected, handleFetchTeam.rejected)

            .addCase(fetchTeams.pending, handleFetchTeams.pending)
            .addCase(fetchTeams.fulfilled, handleFetchTeams.fulfilled)
            .addCase(fetchTeams.rejected, handleFetchTeams.rejected)

            .addCase(createTeam.pending, handleCreateTeam.pending)
            .addCase(createTeam.fulfilled, handleCreateTeam.fulfilled)
            .addCase(createTeam.rejected, handleCreateTeam.rejected)

            /*.addCase(deleteTeam.pending, handleDeleteTeam.pending)
            .addCase(deleteTeam.fulfilled, handleDeleteTeam.fulfilled)
            .addCase(deleteTeam.rejected, handleDeleteTeam.rejected)*/

            .addCase(updateTeam.pending, handleUpdateTeam.pending)
            .addCase(updateTeam.fulfilled, handleUpdateTeam.fulfilled)
            .addCase(updateTeam.rejected, handleUpdateTeam.rejected);
    },
});

export const teamReducer = teamSlice.reducer;
export { createTeam, fetchTeam, fetchTeams, updateTeam };
