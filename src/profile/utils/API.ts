import { UserProfile } from "profile/types/profile";

export const API_URL = process.env.REACT_APP_API_BASE_URL;

export interface CreateProfileResponse extends UserProfile {}

export interface UpdateProfileResponse extends UserProfile {}

export const profileAPI = {
  async createUserProfile(formData: any): Promise<CreateProfileResponse>  {
    
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

  async updateUserProfile(data: UserProfile, slug: string): Promise<UpdateProfileResponse> {
    const response = await fetch(`${API_URL}/userprofiles/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    // Parse the JSON from the response
    const result = await response.json();

    // Handle non-2xx responses
    if (!response.ok) {
        const errorMsg = result.message || "Failed to update user profile!";
        throw new Error(errorMsg);
    }

    return result; // Assuming result is of type UserProfile
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
