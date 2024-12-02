// teamHandlers.ts
import { TeamMember } from "team/types/";
import { CreateTeamMemberResponse, DeleteTeamMemberResponse, UpdateTeamMemberResponse } from "team/services/teamMemberService";
import { TeamMemberState } from "../states/TeamMemberState";
import { PayloadAction } from "@reduxjs/toolkit";

// Fetch User Action Handlers
export const handleFetchTeamMember = {
    pending: (state: TeamMemberState) => {
        state.loading = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: TeamMemberState, action: PayloadAction<{ teamMember: TeamMember }>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.teamMember;
        state.processingDone = true;
    },
    rejected: (state: TeamMemberState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.data = {} as TeamMember;
        state.error = action.payload?.toString() || "Something went wrong";
        state.processingDone = true;
    }
};

// Fetch User Actions List Handlers
export const handleFetchTeamMembers = {
    pending: (state: TeamMemberState) => {
        state.loading = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: TeamMemberState, action: PayloadAction<{ teamMembers: TeamMember[] }>) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload.teamMembers;
        state.processingDone = true;
    },
    rejected: (state: TeamMemberState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.list = [];
        state.error = action.payload?.toString() || "Something went wrong";
        state.processingDone = true;
    }
};

// Handle fetchEventTeamMembers cases
export const handleFetchEventTeamMembers = {
    pending: (state: TeamMemberState) => {
      state.loading = true;
      state.error = null;
      state.processingDone = false;
    },
    fulfilled: (state: TeamMemberState, action: PayloadAction<{ records: TeamMember[] }>) => {
      state.loading = false;
      state.error = null;
      state.list = action.payload.records;
      state.processingDone = true;
    },
    rejected: (state: TeamMemberState, action: PayloadAction<string | unknown>) => {
      state.loading = false;
      state.list = <TeamMember[]>[];
      state.error = action.payload?.toString() || "Sorry, seems like something went wrong";
      state.processingDone = true;
    }
  };
  
  // Handle fetchAiTeamMembers cases
  export const handleFetchAiTeamMembers = {
    pending: (state: TeamMemberState) => {
      state.loading = true;
      state.error = null;
      state.processingDone = true;
    },
    fulfilled: (state: TeamMemberState, action: PayloadAction<TeamMember[]>) => {
      state.loading = false;
      state.error = null;
      state.list = [...(action.payload as unknown as TeamMember[]), ...state.list];
      state.processingDone = false;
    },
    rejected: (state: TeamMemberState, action: PayloadAction<string | unknown>) => {
      state.loading = false;
      state.error = action.payload?.toString() || "Sorry, seems like something went wrong";
      state.processingDone = true;
    }
  };

// Create User Action Handlers
export const handleCreateTeamMember = {
    pending: (state: TeamMemberState) => {
        state.loading = false;
        state.isCreating = true;
        state.isProcessing = true;
        state.error = null;
        state.processingDone = true;
    },
    fulfilled: (state: TeamMemberState, action: PayloadAction<CreateTeamMemberResponse>) => {
        const {teamMember} = action.payload;

        state.loading = false;
        state.isCreating = false;
        state.data = teamMember;
        state.list = [teamMember,...state.list];
        state.error = null;
        state.processingDone = true;
        state.isProcessing = false;
    },
    rejected: (state: TeamMemberState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.isCreating = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to create action';
        state.processingDone = true;
        state.isProcessing = true;
    }
};

// Update User Action Handlers
export const handleDeleteTeamMember = {
    pending: (state: TeamMemberState) => {
        state.loading = true;
        state.isProcessing = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: TeamMemberState, action: PayloadAction<{response: DeleteTeamMemberResponse | null; index: number}>) => {
        const {index} = action.payload;
        state.loading = false;
        state.error = null;
        state.isProcessing = false;
        state.processingDone = true;
        state.list.splice(index, 1);
    },
    rejected: (state: TeamMemberState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update action';
        state.isProcessing = false;
        state.processingDone = true;
    }
};

// Update User Action Handlers
export const handleEditTeamMember = {
    pending: (state: TeamMemberState) => {
        state.data = null;
    },
    fulfilled: (state: TeamMemberState, action: PayloadAction<TeamMember>) => {
        state.data = action.payload;
    },
    rejected: (state: TeamMemberState) => {
        state.data = null;
    },
};

// Update User Action Handlers
export const handleUpdateTeamMember = {
    pending: (state: TeamMemberState) => {
        state.loading = false;
        state.isProcessing = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: TeamMemberState, action: PayloadAction<UpdateTeamMemberResponse>) => {
        const {teamMember} = action.payload;
        state.loading = false;
        state.data = teamMember;
        const index = state.list.findIndex(item => item._id === teamMember._id);
        if (index !== -1) {// If the action exists, replace it
            state.list[index] = teamMember;
        } else {// If the action doesn't exist, add it to the list
            state.list.push(teamMember);
        }
        state.error = null;
        state.isProcessing = false;
        state.processingDone = true;
    },
    rejected: (state: TeamMemberState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update action';
        state.isProcessing = false;
        state.processingDone = true;
    }
};
