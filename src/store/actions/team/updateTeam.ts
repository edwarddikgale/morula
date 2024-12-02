import { createAsyncThunk } from "@reduxjs/toolkit";
import { Team } from "team/types";
import { teamService } from "team/services/teamService";
import { delay } from "../../slices/profileSlice";

export const updateTeam = createAsyncThunk(
    'team/updateTeam',
    async (team: Team, { rejectWithValue }) => {
        try {
            const response = await teamService.updateTeam(team._id!, team);
            await delay(1000);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
