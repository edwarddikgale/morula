import { Impediment } from "observation/types";

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export interface GetImpedimentsResponse {
    impediments: Impediment[];
}
export interface GetImpedimentResponse {
    impediment: Impediment;
}
export interface CreateImpedimentResponse {
    impediment: Impediment;
}
export interface UpdateImpedimentResponse {
    impediment: Impediment;
}
export interface DeleteImpedimentResponse {
    success: boolean
}

export const impedimentService = {
    // Fetch a single impediment by ID
    async getImpediment(id: string): Promise<GetImpedimentResponse> {
        const response = await fetch(`${API_URL}/impediments/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch impediment!");
        }

        return response.json();
    },

    // Fetch all impediments
    async getImpedimentsByEvent(eventId: string): Promise<GetImpedimentsResponse> {
        const response = await fetch(`${API_URL}/impediments/event/${eventId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch impediments!");
        }

        return response.json();
    },
    // Fetch all impediments
    async getImpedimentsByOwner(ownerId: string): Promise<GetImpedimentsResponse> {
        const response = await fetch(`${API_URL}/impediments/owner/${ownerId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch impediments!");
        }

        return response.json();
    },

    // Create a new impediment
    async createImpediment(formData: Partial<Impediment>): Promise<CreateImpedimentResponse> {
        const response = await fetch(`${API_URL}/impediments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to create impediment!");
        }

        return response.json();
    },

    // Update an existing impediment
    async updateImpediment(impedimentId: string, formData: Partial<Impediment>): Promise<UpdateImpedimentResponse> {
        const response = await fetch(`${API_URL}/impediments/${impedimentId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("Failed to update impediment!");
        }

        return response.json();
    },

    // Delete an impediment
    async deleteImpediment(impedimentId: string): Promise<DeleteImpedimentResponse> {
        const response = await fetch(`${API_URL}/impediments/${impedimentId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to delete impediment!");
        }

        return response.json();
    },
};
