import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./slices/profileSlice";
import { actionReducer } from "./slices/actionSlice";
import { observationReducer } from "./slices/observationSlice";

export const store = configureStore({
    reducer:{
        profile: profileReducer,
        action: actionReducer,
        observation: observationReducer
    }
});

// Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;