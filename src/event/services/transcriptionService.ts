import { Transcription } from "event/types/Transcription";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const transcriptionService = {
    async createTranscription(formData: Partial<Transcription>) {
      const response = await fetch(`${API_URL}/event/transcriptions/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Transcription creation failed!");
      }
  
      return response.json();
    },
  
    async getTranscription(id: string): Promise<any> {
      const response = await fetch(`${API_URL}/event/transcriptions/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch transcription!");
      }
  
      return response.json();
    },
  
    async updateTranscription(id: string, formData: Partial<Transcription>): Promise<any> {
      const response = await fetch(`${API_URL}/event/transcriptions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Transcription update failed!");
      }
  
      return response.json();
    },
  
    async deleteTranscription(id: string): Promise<any> {
      const response = await fetch(`${API_URL}/event/transcriptions/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error("Transcription deletion failed!");
      }
  
      return response.json();
    },
  };
  