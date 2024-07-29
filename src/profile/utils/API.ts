export const API_URL = process.env.REACT_APP_API_BASE_URL;

export const profileAPI = {
  async CreateUserProfile(formData: any) {
    
    const response = await fetch(`${API_URL}/userprofiles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user profile!");
    }

    return response.json();
  },

  async UpdateUserProfile(formData: any, slug: string) {
    const response = await fetch(`${API_URL}/userprofiles/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user profile!");
    }

    return response.json();
  },

  async getProfileByUser(slug: string) {
    const response = await fetch(`${API_URL}/userprofiles/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user!");
    }

    return await response.json();
  },
};
