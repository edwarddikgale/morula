import { createAsyncThunk } from "@reduxjs/toolkit";
import { Team } from "team/types";
import { teamService } from "team/services/teamService";
import { delay } from "../../slices/profileSlice";


export const createTeam = createAsyncThunk(
    'team/createTeam',
    async (team: Team, { rejectWithValue }) => {
        try {
            const response = await teamService.createTeam(team);
            await delay(1000);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
