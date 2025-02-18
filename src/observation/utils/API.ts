import { ScrumAnalysisResponse } from "observation/types/ScrumAnalysis";
import { Observation } from "../types/Observation";
import { ScrumPattern } from "agilepatterns/types/AgilePattern";

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export interface CreateDailyObservationResponse extends Observation {}

export interface UpdateDailyObservationResponse extends Observation {}

export interface DeleteObservationResponse {success: boolean}

export interface FetchEventObservationsResponse {observations: Observation[]}

export interface AnalyseScrumEventPayload {description?: string, notes: string, eventType: string, antiPatterns?: ScrumPattern[], designPatterns?: ScrumPattern[]}
export const scrumEventObservationAPI = {

  async analyseScrumEvent(details: AnalyseScrumEventPayload): Promise<ScrumAnalysisResponse> {
    const response = await fetch(`${API_URL}/scrum/analyze-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
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
  async deleteObservation(_id: string): Promise<DeleteObservationResponse> {
    const response = await fetch(`${API_URL}/observation/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    // Parse the JSON from the response
    const result = await response.json();

    // Handle non-2xx responses
    if (!response.ok) {
        const errorMsg = result.message || "Failed to delete event observation!";
        throw new Error(errorMsg);
    }

    return result; // Assuming result is of type UserProfile
  },
  async getObservationsByEvent(eventId: string): Promise<FetchEventObservationsResponse> {
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
