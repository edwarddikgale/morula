import { TeamMember } from "team/types/TeamMember";

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export interface GetTeamMembersResponse {teamMembers: TeamMember[]};

export const teamMemberService = {
  // Fetch all teams
  async getTeamMembers(teamId: string): Promise<GetTeamMembersResponse> {
    const response = await fetch(`${API_URL}/teammembers/team/${teamId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch team members!");
    }

    return response.json();
  },

  // Create a new team
  async createTeamMember(formData: any) {
    const response = await fetch(`${API_URL}/teammembers/`, {
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
  async updateTeamMember(memberId: string, formData: any) {
    const response = await fetch(`${API_URL}/teammembers/${memberId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update team member!");
    }

    return response.json();
  },

  // Delete a team
  async deleteMember(memberId: string) {
    const response = await fetch(`${API_URL}/teammembers/${memberId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to delete team member!");
    }

    return response.json();
  },
};
