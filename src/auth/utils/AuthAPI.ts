import { AuthFormData } from '../types/AuthFormData';

const API_URL = 'https://example.com/api/auth';

export const authAPI = {
  async login(formData: AuthFormData) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  async register(formData: AuthFormData) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  },
};
