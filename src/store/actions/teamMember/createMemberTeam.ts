import { createAsyncThunk } from "@reduxjs/toolkit";
import { TeamMember } from "team/types";
import { teamMemberService } from "team/services/teamMemberService";
import { delay } from "../../slices/profileSlice";


export const createTeamMember = createAsyncThunk(
    'teammember/createTeamMember',
    async (team: TeamMember, { rejectWithValue }) => {
        try {
            const response = await teamMemberService.createTeamMember(team);
            await delay(1000);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
