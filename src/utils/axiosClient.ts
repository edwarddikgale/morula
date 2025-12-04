// src/utils/axiosClient.ts
import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import { getAuth } from "firebase/auth";

/**
 * Shared Axios instance for all API calls.
 * Automatically attaches Firebase Bearer token unless `skipAuth` is true.
 */
export const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // e.g. http://localhost:8080/api
  /*withCredentials: true,*/
  headers: new AxiosHeaders({ "Content-Type": "application/json" }),
});

type AuthedConfig = InternalAxiosRequestConfig & { skipAuth?: boolean; _retry?: boolean };

/**
 * REQUEST interceptor: inject Bearer token unless `skipAuth` flag is set
 */
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const cfg = config as AuthedConfig;

    if (cfg.skipAuth) return cfg;

    const auth = getAuth();
    const user = auth.currentUser;

    // If user is logged in, add token
    if (user) {
      const token = await user.getIdToken(false);
      if (token) {
        cfg.headers = cfg.headers ?? new AxiosHeaders();
        cfg.headers.set("Authorization", `Bearer ${token}`);
      }
      else{
         cfg.headers.set("Authorization", `Bearer NOTHING`);
      }
    }

    return cfg;
  },
  (error) => Promise.reject(error)
);

/**
 * RESPONSE interceptor: retry once with a refreshed token on 401
 */
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const cfg = error.config as AuthedConfig | undefined;
    
    // skip retry if flagged or for public endpoints
    if (!cfg || cfg._retry || cfg.skipAuth) throw error;

    if (error.response?.status === 401) {
      const user = getAuth().currentUser;
      if (user) {
        try {
            const fresh = await user.getIdToken(true);
            if (fresh) {
                cfg._retry = true;
                cfg.headers = cfg.headers ?? new AxiosHeaders();
                cfg.headers.set("Authorization", `Bearer ${fresh}`);
                return api(cfg);
            }
            else{
                cfg.headers.set("Authorization", `Bearer NOTHING`);
            }
        } catch {
          // token refresh failed, continue to throw 401
        }
      }
    }

    throw error;
  }
);

/**
 * Example usage:
 * 
 * import { api } from "../utils/axiosClient";
 * 
 * // Authenticated (default)
 * await api.post("/events", formData);
 * 
 * // Public (no auth header)
 * await api.get("/health", { skipAuth: true });
 */
