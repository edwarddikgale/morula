import { Team } from "team/types/Team";

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export interface GetTeamsResponse {teams: Team[]};

export const teamService = {
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
  async createTeam(formData: any) {
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
  async updateTeam(teamId: string, formData: any) {
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
  async deleteTeam(teamId: string) {
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
