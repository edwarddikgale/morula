// src/services/profileAPI.ts
import { api } from "utils/axiosClient";
import { UserProfile } from "profile/types/profile";

export interface CreateProfileResponse extends UserProfile {}
export interface UpdateProfileResponse extends UserProfile {}
export interface GetUserProfileResponse {userprofile: UserProfile}

export const profileAPI = {
  async createUserProfile(formData: Partial<UserProfile>): Promise<CreateProfileResponse> {
    const res = await api.post<CreateProfileResponse>("/userprofiles", formData);
    return res.data;
  },

  async updateUserProfile(data: Partial<UserProfile>, slug: string): Promise<UpdateProfileResponse> {
    const res = await api.patch<UpdateProfileResponse>(`/userprofiles/${slug}`, data);
    return res.data;
  },

  async getProfileByUser(slug: string): Promise<GetUserProfileResponse> {
    const res = await api.get<GetUserProfileResponse>(`/userprofiles/${slug}`);
    return res.data;
  },
};
