// actionSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { UserActionState } from "../states/UserActionState";
import { 
    fetchUserAction, 
    fetchUserActions, 
    createUserAction, 
    deleteUserAction,
    editUserAction,
    updateUserAction,
    fetchAiUserActions, 
    fetchEventUserActions  
} from "../actions/action/";
import { 
    handleFetchUserAction, 
    handleFetchUserActions, 
    handleCreateUserAction, 
    handleDeleteUserAction,
    handleUpdateUserAction, 
    handleFetchEventUserActions,
    handleFetchAiUserActions,
    handleEditUserAction
} from "../handlers/actionHandlers";

const initialState: UserActionState = {
    data: null,
    loading: false,
    processingDone: false,
    isProcessing: false,
    isCreating: false,
    error: null,
    list: [],
    index: null
};

const actionSlice = createSlice({
    name: "action",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAction.pending, handleFetchUserAction.pending)
            .addCase(fetchUserAction.fulfilled, handleFetchUserAction.fulfilled)
            .addCase(fetchUserAction.rejected, handleFetchUserAction.rejected)

            .addCase(fetchUserActions.pending, handleFetchUserActions.pending)
            .addCase(fetchUserActions.fulfilled, handleFetchUserActions.fulfilled)
            .addCase(fetchUserActions.rejected, handleFetchUserActions.rejected)

            .addCase(fetchEventUserActions.pending, handleFetchEventUserActions.pending)
            .addCase(fetchEventUserActions.fulfilled, handleFetchEventUserActions.fulfilled)
            .addCase(fetchEventUserActions.rejected, handleFetchEventUserActions.rejected)

            .addCase(fetchAiUserActions.pending, handleFetchAiUserActions.pending)
            .addCase(fetchAiUserActions.fulfilled, handleFetchAiUserActions.fulfilled)
            .addCase(fetchAiUserActions.rejected, handleFetchAiUserActions.rejected)

            .addCase(createUserAction.pending, handleCreateUserAction.pending)
            .addCase(createUserAction.fulfilled, handleCreateUserAction.fulfilled)
            .addCase(createUserAction.rejected, handleCreateUserAction.rejected)

            .addCase(deleteUserAction.pending, handleDeleteUserAction.pending)
            .addCase(deleteUserAction.fulfilled, handleDeleteUserAction.fulfilled)
            .addCase(deleteUserAction.rejected, handleDeleteUserAction.rejected)


            .addCase(editUserAction.pending, handleEditUserAction.pending)
            .addCase(editUserAction.fulfilled, handleEditUserAction.fulfilled)
            .addCase(editUserAction.rejected, handleEditUserAction.rejected)

            .addCase(updateUserAction.pending, handleUpdateUserAction.pending)
            .addCase(updateUserAction.fulfilled, handleUpdateUserAction.fulfilled)
            .addCase(updateUserAction.rejected, handleUpdateUserAction.rejected);
    },
});

export const actionReducer = actionSlice.reducer;
export { createUserAction, fetchUserAction, fetchUserActions, updateUserAction };
