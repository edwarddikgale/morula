export const API_URL = "https://susact-dev.herokuapp.com/api";
const recordName = "action task";

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

  async UpdateActionTask(formData: any, taskId: string) {
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
