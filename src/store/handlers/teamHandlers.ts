// teamHandlers.ts
import { Team } from "team/types/";
import { CreateTeamResponse, DeleteTeamResponse, UpdateTeamResponse } from "team/services/teamService";
import { TeamState } from "../states/TeamState";
import { PayloadAction } from "@reduxjs/toolkit";

// Fetch User Action Handlers
export const handleFetchTeam = {
    pending: (state: TeamState) => {
        state.loading = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: TeamState, action: PayloadAction<{ team: Team }>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.team;
        state.processingDone = true;
    },
    rejected: (state: TeamState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.data = {} as Team;
        state.error = action.payload?.toString() || "Something went wrong";
        state.processingDone = true;
    }
};

// Fetch User Actions List Handlers
export const handleFetchTeams = {
    pending: (state: TeamState) => {
        state.loading = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: TeamState, action: PayloadAction<{ teams: Team[] }>) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload.teams;
        state.processingDone = true;
    },
    rejected: (state: TeamState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.list = [];
        state.error = action.payload?.toString() || "Something went wrong";
        state.processingDone = true;
    }
};


// Create User Action Handlers
export const handleCreateTeam = {
    pending: (state: TeamState) => {
        state.loading = false;
        state.isCreating = true;
        state.isProcessing = true;
        state.error = null;
        state.processingDone = true;
    },
    fulfilled: (state: TeamState, action: PayloadAction<CreateTeamResponse>) => {
        const {team} = action.payload;

        state.loading = false;
        state.isCreating = false;
        state.data = team;
        // If the action doesn't exist, add it to the list
        state.list = [team,...state.list];
        state.error = null;
        state.processingDone = true;
        state.isProcessing = false;
    },
    rejected: (state: TeamState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.isCreating = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to create action';
        state.processingDone = true;
        state.isProcessing = true;
    }
};

// Update User Action Handlers
export const handleDeleteTeam = {
    pending: (state: TeamState) => {
        state.loading = true;
        state.isProcessing = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: TeamState, action: PayloadAction<{response: DeleteTeamResponse | null; index: number}>) => {
        const {index} = action.payload;
        state.loading = false;
        state.error = null;
        state.isProcessing = false;
        state.processingDone = true;
        state.list.splice(index, 1);
    },
    rejected: (state: TeamState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update action';
        state.isProcessing = false;
        state.processingDone = true;
    }
};

// Update User Action Handlers
export const handleEditTeam = {
    pending: (state: TeamState) => {
        state.data = null;
    },
    fulfilled: (state: TeamState, action: PayloadAction<Team>) => {
        state.data = action.payload;
    },
    rejected: (state: TeamState) => {
        state.data = null;
    },
};

// Update User Action Handlers
export const handleUpdateTeam = {
    pending: (state: TeamState) => {
        state.loading = false;
        state.isProcessing = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: TeamState, action: PayloadAction<UpdateTeamResponse>) => {
        state.loading = false;
        state.data = action.payload.team;
        const index = state.list.findIndex(item => item._id === action.payload.team._id);
        if (index !== -1) {// If the action exists, replace it
            state.list[index] = action.payload.team;
        } else {// If the action doesn't exist, add it to the list
            state.list.push(action.payload.team);
        }
        state.error = null;
        state.isProcessing = false;
        state.processingDone = true;
    },
    rejected: (state: TeamState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update action';
        state.isProcessing = false;
        state.processingDone = true;
    }
};
