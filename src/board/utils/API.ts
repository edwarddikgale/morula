export const API_URL = process.env.REACT_APP_API_BASE_URL;

export const eventTasksAPI = {

  async getTasksByEvent(eventId: string, userId: string) {
    const requestUrl = `${API_URL}/events/${eventId}/tasks?userId=${userId}`;
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch event tasks!");
    }

    return await response.json();
  },

  async UpdateActionTask(formData: any, taskId: string) {
    const recordName = 'Action Task';
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
};


