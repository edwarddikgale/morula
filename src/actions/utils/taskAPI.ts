import { ActionTask } from "actions/types";

export const API_URL = process.env.REACT_APP_API_BASE_URL;
const recordName = "action task";

export interface UpdateActionTaskResponse{ actionTask: ActionTask}

export const actionTaskAPI = {
  async CreateActionTask(formData: any) {
    const response = await fetch(`${API_URL}/ActionTasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create ${recordName}!`);
    }

    return response.json();
  },

  async UpdateActionTask(formData: ActionTask, taskId: string): Promise<UpdateActionTaskResponse> {
    const response = await fetch(`${API_URL}/ActionTasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${recordName}!`);
    }

    return response.json();
  },

  async DeleteActionTask(taskId: string) {
    const response = await fetch(`${API_URL}/ActionTasks/${taskId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${recordName}!`);
    }

    return response.json();
  },

  async getTasksByAction(actionId: string) {
    const response = await fetch(`${API_URL}/ActionTasks/action/${actionId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch a ${recordName}!`);
    }

    return await response.json();
  },
};
