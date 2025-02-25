import { Pagination } from 'common/types/list/Pagination';
import { Event } from '../types/Event';
import { EventFormData } from 'event/components/types/eventForm';

export const API_URL = process.env.REACT_APP_API_BASE_URL;

interface GetEventsByUserPayload {
  userId: string, 
  pagination: Pagination,
  searchText?: string,
  category?: string
}

interface GetSprintsResponse {events: any[]};
interface DeleteEventResponse {success: boolean};
interface UpdateEventResponse extends EventFormData {};
interface CreateEventResponse extends EventFormData {};
interface GetEventsByUser {
  events: Event[],
  pagination: Pagination,
}

export const eventsAPI = {
  async createEvent(formData: any): Promise<CreateEventResponse> {
    const response = await fetch(`${API_URL}/events/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Event creation failed!");
    }

    return response.json();
  },

  async deleteEvent(id: string): Promise<DeleteEventResponse> {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Event deletion failed!");
    }

    return response.json();
  },

  async updateEvent(formData: any, id: string): Promise<UpdateEventResponse> {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Event creation failed!");
    }

    return response.json();
  },

  async getEventsByUser(payload: GetEventsByUserPayload): Promise<GetEventsByUser> {
    const { page, pageSize } = payload.pagination;
    const { userId, category, searchText } = payload;
  
    const queryParams = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    if (category) { queryParams.append("category", category);}
    if (searchText) { queryParams.append("searchText", searchText); }
  
    const response = await fetch(
      `${API_URL}/events/user/${userId}?${queryParams.toString()}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to fetch events!");
    }
  
    return await response.json();
  },
  
  async getSprints(userId: string, teamId: string): Promise<GetSprintsResponse> {
    const response = await fetch(`${API_URL}/events/sprints/${userId}?teamId=${teamId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events!");
    }

    return await response.json();
  },

  async countEventsByUser(userId: string) {
    const response = await fetch(`${API_URL}/events/count/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events!");
    }

    return await response.json();
  },

  async getEventById(eventId: string) {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events!");
    }

    return await response.json();    
  },

  async getEventTaskCompletionRates(userId: string, eventIds: string[]){
    const response = await fetch(`${API_URL}/events/taskcompletion/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({eventIds: eventIds}),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch event task completion rate!");
    }

    return await response.json();  
  },

  async getEventSummary(eventId: string){
    const response = await fetch(`${API_URL}/events/summary/${eventId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch event summary for event with id ${eventId}!`);
    }

    return await response.json();  
  },

  async getSprintSummary(eventId: string){
    const response = await fetch(`${API_URL}/scrum/sprint-summary/${eventId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sprint summary for event with id ${eventId}!`);
    }

    return await response.json();  
  },

  async extractEventImpediments(notes: string, eventType: string){
    const response = await fetch(`${API_URL}/scrum/extract-impediments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({notes, eventType})
    });

    if (!response.ok) {
      throw new Error(`Failed to extract impediments event with type ${eventType}!`);
    }

    return await response.json();  
  }
};
