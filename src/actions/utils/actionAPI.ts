import { UserAction } from "actions/types";
export const API_URL = process.env.REACT_APP_API_BASE_URL;
const recordName = "user action";

export interface GetActionsResponse {records: UserAction[]};
export interface CreateUserActionResponse {userAction: UserAction};
export interface CreateUserActionResponse {userAction: UserAction};
export interface DeleteUserActionResponse {userAction: UserAction};
export interface UpdateUserActionResponse {userAction: UserAction};

export const actionAPI = {

  async CreateUserAction(formData: any): Promise<CreateUserActionResponse> {
    const response = await fetch(`${API_URL}/userActions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create ${recordName}!`);
    }

    return response.json();
  },

  async UpdateUserAction(formData: any, actionId: string): Promise<UpdateUserActionResponse> {
    const response = await fetch(`${API_URL}/userActions/${actionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${recordName}!`);
    }

    return response.json();
  },

  async DeleteUserAction(actionId: string): Promise<DeleteUserActionResponse>  {
    const response = await fetch(`${API_URL}/userActions/${actionId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${recordName}!`);
    }

    return response.json();
  },

  async getUserAction(actionId: string) {
    const response = await fetch(`${API_URL}/userActions/${actionId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${recordName}!`);
    }

    return await response.json();
  },

  async getActionsByUser(userId: string) {
    const response = await fetch(`${API_URL}/userActions/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch a list of ${recordName}!`);
    }

    return await response.json();
  },
  async getActions(userId: string, eventId: string | undefined | null): Promise<GetActionsResponse> {
    const response = await fetch(`${API_URL}/userActions/user/${userId}?eventId=${eventId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch a list of ${recordName}!`);
    }

    return await response.json();
  },
};
