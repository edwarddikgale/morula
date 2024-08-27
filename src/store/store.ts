import { configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./slices/profileSlice";

export const store = configureStore({
    reducer:{
        profile: profileReducer
    }
});

// Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;