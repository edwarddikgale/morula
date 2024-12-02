import { createAsyncThunk } from "@reduxjs/toolkit";
import { teamMemberService } from "team/services/teamMemberService";

export const fetchTeamMembers = createAsyncThunk(
    'teamMember/fetchTeamMembers',
    async (teamId: string, { rejectWithValue }) => {
        try {
            const response = teamMemberService.getTeamMembers(teamId);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTeamMember = createAsyncThunk(
    'teamMember/fetchTeamMember',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = teamMemberService.getTeamMember(id);
            return response;
        }
        catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

