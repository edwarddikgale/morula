import { createAsyncThunk } from "@reduxjs/toolkit";
import { teamService } from "team/services/teamService";

export const fetchTeams = createAsyncThunk(
    'team/fetchTeams',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = teamService.getTeams(userId);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTeam = createAsyncThunk(
    'team/fetchTeams',
    async (teamId: string, { rejectWithValue }) => {
        try {
            const response = teamService.getTeam(teamId);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

