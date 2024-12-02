import { Team } from "team/types";

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export interface GetTeamsResponse {teams: Team[]};
export interface GetTeamResponse {team: Team};
export interface CreateTeamResponse {team: Team};
export interface UpdateTeamResponse {team: Team};
export interface DeleteTeamResponse {team: Team};

export const teamService = {
  async getTeam(id: string): Promise<GetTeamResponse> {
    const response = await fetch(`${API_URL}/teams/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch team!");
    }

    return response.json();
  },
  // Fetch all teams
  async getTeams(userId: string): Promise<GetTeamsResponse> {
    const response = await fetch(`${API_URL}/teams/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch teams!");
    }

    return response.json();
  },

  // Create a new team
  async createTeam(formData: any): Promise<CreateTeamResponse> {
    const response = await fetch(`${API_URL}/teams/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create team!");
    }

    return response.json();
  },

  // Update an existing team
  async updateTeam(teamId: string, formData: any): Promise<UpdateTeamResponse> {
    const response = await fetch(`${API_URL}/teams/${teamId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update team!");
    }

    return response.json();
  },

  // Delete a team
  async deleteTeam(teamId: string): Promise<DeleteTeamResponse> {
    const response = await fetch(`${API_URL}/teams/${teamId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to delete team!");
    }

    return response.json();
  },
};
