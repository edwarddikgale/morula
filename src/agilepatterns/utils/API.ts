import { ScrumPattern } from "agilepatterns/types/AgilePattern";
import { UserProfile } from "profile/types/profile";

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export interface GetScrumPatternsResponse {records: ScrumPattern[]};

export const scrumAPI = {
  async getPatterns(query?: any): Promise<GetScrumPatternsResponse>  {
    
    const {eventType} = query;
    const response = await fetch(`${API_URL}/scrum/patterns/${eventType}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to get scrum patterns!");
    }

    return response.json();
  },
}