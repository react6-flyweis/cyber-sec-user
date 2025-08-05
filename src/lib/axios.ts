import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const token = useAuthStore.getState().token;
export const axiosClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
