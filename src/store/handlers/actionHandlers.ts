// userActionHandlers.ts
import { UserAction, Action } from "actions/types/";
import { CreateUserActionResponse, DeleteUserActionResponse, UpdateUserActionResponse } from "actions/utils/actionAPI";
import { UserActionState } from "../states/UserActionState";
import { PayloadAction } from "@reduxjs/toolkit";

// Fetch User Action Handlers
export const handleFetchUserAction = {
    pending: (state: UserActionState) => {
        state.loading = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: UserActionState, action: PayloadAction<{ useraction: UserAction }>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.useraction;
        state.processingDone = false;
    },
    rejected: (state: UserActionState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.data = {} as UserAction;
        state.error = action.payload?.toString() || "Something went wrong";
        state.processingDone = false;
    }
};

// Fetch User Actions List Handlers
export const handleFetchUserActions = {
    pending: (state: UserActionState) => {
        console.log(`Fetching user actions`);
        state.loading = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: UserActionState, action: PayloadAction<{ records: UserAction[] }>) => {
        state.loading = false;
        state.error = null;
        console.log(`Fetched user actions`);
        state.list = action.payload.records;
        state.processingDone = false;
    },
    rejected: (state: UserActionState, action: PayloadAction<string | unknown>) => {
        console.log(`Fetching user actions FAILED`);
        state.loading = false;
        state.list = [];
        state.error = action.payload?.toString() || "Something went wrong";
        state.processingDone = false;
    }
};

// Handle fetchEventUserActions cases
export const handleFetchEventUserActions = {
    pending: (state: UserActionState) => {
      state.loading = true;
      state.error = null;
      state.processingDone = false;
    },
    fulfilled: (state: UserActionState, action: PayloadAction<{ records: UserAction[] }>) => {
      state.loading = false;
      state.error = null;
      state.list = action.payload.records;
      state.processingDone = false;
    },
    rejected: (state: UserActionState, action: PayloadAction<string | unknown>) => {
      state.loading = false;
      state.list = <UserAction[]>[];
      state.error = action.payload?.toString() || "Sorry, seems like something went wrong";
      state.processingDone = false;
    }
  };
  
  // Handle fetchAiUserActions cases
  export const handleFetchAiUserActions = {
    pending: (state: UserActionState) => {
      state.loading = true;
      state.error = null;
      state.processingDone = false;
    },
    fulfilled: (state: UserActionState, action: PayloadAction<Action[]>) => {
      console.log(`Hello...`);  
      state.loading = false;
      state.error = null;
      state.list = [...(action.payload as unknown as UserAction[]), ...state.list];
      state.processingDone = false;
    },
    rejected: (state: UserActionState, action: PayloadAction<string | unknown>) => {
      state.loading = false;
      state.list = <UserAction[]>[];
      state.error = action.payload?.toString() || "Sorry, seems like something went wrong";
      state.processingDone = false;
    }
  };

// Create User Action Handlers
export const handleCreateUserAction = {
    pending: (state: UserActionState) => {
        state.loading = false;
        state.isProcessing = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: UserActionState, action: PayloadAction<CreateUserActionResponse>) => {
        state.loading = false;
        state.data = action.payload.userAction;
        state.error = null;
        state.processingDone = true;
        state.isProcessing = false;
    },
    rejected: (state: UserActionState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to create action';
        state.processingDone = true;
        state.isProcessing = false;
    }
};

// Update User Action Handlers
export const handleDeleteUserAction = {
    pending: (state: UserActionState) => {
        state.loading = false;
        state.isProcessing = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: UserActionState, action: PayloadAction<DeleteUserActionResponse>) => {
        state.loading = false;
        state.error = null;
        state.isProcessing = false;
        state.processingDone = true;
    },
    rejected: (state: UserActionState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update action';
        state.isProcessing = false;
        state.processingDone = true;
    }
};

// Update User Action Handlers
export const handleEditUserAction = {
    pending: (state: UserActionState) => {
        state.data = null;
    },
    fulfilled: (state: UserActionState, action: PayloadAction<UserAction>) => {
        state.data = action.payload;
    },
    rejected: (state: UserActionState) => {
        state.data = null;
    },
};

// Update User Action Handlers
export const handleUpdateUserAction = {
    pending: (state: UserActionState) => {
        state.loading = false;
        state.isProcessing = true;
        state.error = null;
        state.processingDone = false;
    },
    fulfilled: (state: UserActionState, action: PayloadAction<UpdateUserActionResponse>) => {
        state.loading = false;
        state.data = action.payload.userAction;
        state.error = null;
        state.isProcessing = false;
        state.processingDone = true;
    },
    rejected: (state: UserActionState, action: PayloadAction<string | unknown>) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to update action';
        state.isProcessing = false;
        state.processingDone = true;
    }
};
