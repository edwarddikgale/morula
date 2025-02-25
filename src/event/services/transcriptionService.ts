import { Transcription } from "event/types/Transcription";

const API_URL = process.env.REACT_APP_API_BASE_URL;
export interface CreateTranscriptionResponse extends Transcription{}
export interface UpdateTranscriptionResponse extends Transcription{}
export interface PatchTranscriptionResponse extends Transcription{}
export interface GetEventTranscriptionsResponse { transcriptions: Transcription[]}

export const transcriptionService = {
    async createTranscription(formData: Partial<Transcription>): Promise<CreateTranscriptionResponse> {
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
  
    async getEventTranscriptions(eventId: string): Promise<GetEventTranscriptionsResponse> {
      const response = await fetch(`${API_URL}/event/transcriptions/event/${eventId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch transcriptions!");
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
  
    async updateTranscription(id: string, formData: Partial<Transcription>): Promise<UpdateTranscriptionResponse> {
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

    async linkTransToEvent(id: string, eventId: string): Promise<PatchTranscriptionResponse> {
        const response = await fetch(`${API_URL}/event/transcriptions/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({eventId: eventId}),
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
  