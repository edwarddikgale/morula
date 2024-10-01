import { ScrumAnalysisResponse } from "observation/types/ScrumAnalysis";
import { Observation } from "../types/Observation";

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export interface CreateDailyObservationResponse extends Observation {}

export interface UpdateDailyObservationResponse extends Observation {}

export const dailyObservationAPI = {

  async analyseScrumNotes(notes: string): Promise<ScrumAnalysisResponse> {
    const response = await fetch(`${API_URL}/scrum/analyze-scrum`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({notes: notes}),
    });

    if (!response.ok) {
      throw new Error("Failed to analyse scrum notes!");
    }

    return response.json();
  },
  async createObservation(formData: any): Promise<CreateDailyObservationResponse>  {
    
    const response = await fetch(`${API_URL}/scrum/observation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create scrum event observation!");
    }

    return response.json();
  },

  async updateObservation(data: Observation, _id: string): Promise<UpdateDailyObservationResponse> {
    const response = await fetch(`${API_URL}/scrum/observation/${_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    // Parse the JSON from the response
    const result = await response.json();

    // Handle non-2xx responses
    if (!response.ok) {
        const errorMsg = result.message || "Failed to update scrum event observation!";
        throw new Error(errorMsg);
    }

    return result; // Assuming result is of type UserProfile
  },

  async getObservationsByEvent(eventId: string) {
    const response = await fetch(`${API_URL}/observation/event/${eventId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to get event observations!");
    }

    return await response.json();
  },
};
