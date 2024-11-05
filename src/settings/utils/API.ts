export const API_URL = process.env.REACT_APP_API_BASE_URL;

export const orgSettingsAPI = {
  async createSettings(formData: any) {
    const response = await fetch(`${API_URL}/orgsettings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Settings creation failed!");
    }

    return response.json();
  },

  async updateSettings(formData: any, slug: string) {
    const response = await fetch(`${API_URL}/orgsettings/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update org settings!");
    }

    return response.json();
  },

  async getOrgSettingsByUser(userId: string) {
    const response = await fetch(`${API_URL}/orgsettings/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user!");
    }

    return await response.json();
  },
};
