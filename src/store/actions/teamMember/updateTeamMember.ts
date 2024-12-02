import { createAsyncThunk } from "@reduxjs/toolkit";
import { TeamMember } from "team/types";
import { teamMemberService } from "team/services/teamMemberService";
import { delay } from "../../slices/profileSlice";

export const updateTeamMember = createAsyncThunk(
    'team/updateTeamMember',
    async (member: TeamMember, { rejectWithValue }) => {
        try {
            const response = await teamMemberService.updateTeamMember(member._id!, member);
            await delay(1000);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
