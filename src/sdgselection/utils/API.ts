export const API_URL = process.env.REACT_APP_API_BASE_URL;

const recordName = `user sdgs`;

export const userSdgAPI = {
  async CreateUserSdg(formData: any) {
    
    const response = await fetch(`${API_URL}/usersdg`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create ${recordName}!`);
    }

    return response.json();
  },

  async DeleteUserSdg(id: string) {
    const response = await fetch(`${API_URL}/usersdg/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${recordName}!`);
    }

    return response.json();
  },

  async UpdateUserSdg(formData: any, userId: string) {
    const response = await fetch(`${API_URL}/usersdg/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${recordName}!`);
    }

    return response.json();
  },

  async getSdgsByUser(userId: string) {
    const response = await fetch(`${API_URL}/usersdg/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${recordName}!`);
    }

    return await response.json();
  },
};

export default userSdgAPI;
