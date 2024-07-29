export const API_URL = process.env.REACT_APP_API_BASE_URL;
const recordName = "user action";

export const actionAPI = {

  async CreateUserAction(formData: any) {
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

  async UpdateUserAction(formData: any, actionId: string) {
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

  async DeleteUserAction(actionId: string) {
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
};
