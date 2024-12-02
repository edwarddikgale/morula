// actionSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { TeamMemberState } from "../states/TeamMemberState";
import { 
    fetchTeamMember, 
    fetchTeamMembers, 
    createTeamMember, 
    updateTeamMember, 
} from "../actions/teamMember";
import { 
    handleFetchTeamMember, 
    handleFetchTeamMembers, 
    handleCreateTeamMember, 
    handleDeleteTeamMember,
    handleUpdateTeamMember, 
} from "../handlers/teamMemberHandlers";

const initialState: TeamMemberState = {
    data: null,
    loading: false,
    processingDone: false,
    isProcessing: false,
    isCreating: false,
    error: null,
    list: [],
    index: null
};

const teamMemberSlice = createSlice({
    name: "teamMember",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeamMember.pending, handleFetchTeamMember.pending)
            .addCase(fetchTeamMember.fulfilled, handleFetchTeamMember.fulfilled)
            .addCase(fetchTeamMember.rejected, handleFetchTeamMember.rejected)

            .addCase(fetchTeamMembers.pending, handleFetchTeamMembers.pending)
            .addCase(fetchTeamMembers.fulfilled, handleFetchTeamMembers.fulfilled)
            .addCase(fetchTeamMembers.rejected, handleFetchTeamMembers.rejected)

            .addCase(createTeamMember.pending, handleCreateTeamMember.pending)
            .addCase(createTeamMember.fulfilled, handleCreateTeamMember.fulfilled)
            .addCase(createTeamMember.rejected, handleCreateTeamMember.rejected)

            /*.addCase(deleteTeamMember.pending, handleDeleteTeamMember.pending)
            .addCase(deleteTeamMember.fulfilled, handleDeleteTeamMember.fulfilled)
            .addCase(deleteTeamMember.rejected, handleDeleteTeamMember.rejected)*/

            .addCase(updateTeamMember.pending, handleUpdateTeamMember.pending)
            .addCase(updateTeamMember.fulfilled, handleUpdateTeamMember.fulfilled)
            .addCase(updateTeamMember.rejected, handleUpdateTeamMember.rejected);
    },
});

export const teamMemberReducer = teamMemberSlice.reducer;
export { createTeamMember, fetchTeamMember, fetchTeamMembers, updateTeamMember };
