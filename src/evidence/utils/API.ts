export const API_URL = "https://susact-dev.herokuapp.com/api";
const recordName = "task evidence";

export const TaskEvidenceAPI = {
  async CreateTaskEvidence(formData: any) {
    const response = await fetch(`${API_URL}/TaskEvidence`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create ${recordName}!`);
    }

    return response.json();
  },

  async UpdateTaskEvidence(formData: any, taskId: string) {
    const response = await fetch(`${API_URL}/TaskEvidence/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${recordName}!`);
    }

    return response.json();
  },

  async DeleteTaskEvidence(taskId: string) {
    const response = await fetch(`${API_URL}/TaskEvidence/${taskId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${recordName}!`);
    }

    return response.json();
  },

  async getEvidenceByTask(taskId: string) {
    const response = await fetch(`${API_URL}/TaskEvidence/task/${taskId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch a ${recordName}!`);
    }

    return await response.json();
  },
};
