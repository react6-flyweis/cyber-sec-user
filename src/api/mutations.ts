import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { axiosClient } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

// /{{url}}/admin/registration
export function useRegisterMutation() {
  const login = useAuthStore((state) => state.login);
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: {
      name: string;
      email: string;
      mobileNumber: string;
      // password: string;
    }) => {
      try {
        const response = await axiosClient.post("/user/register", data);
        login(response.data.accessToken, response.data.data);
        return response;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Registration failed"
          );
        }
      }
    },
  });
}

export function useLoginMutation() {
  const login = useAuthStore((state) => state.login);
  return useMutation({
    mutationKey: ["login"],
    // mutationFn: async (data: { email: string; password: string }) => {
    mutationFn: async (data: { mobileNumber: string }) => {
      // for demo
      try {
        const response = await axiosClient.post("/user/login", data);
        login(response.data.data.token, response.data.data.UpdatedCategory);
        return response;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
        return Promise.reject(error);
      }
    },
  });
}

// /user/detail put
export function useUpdateUserMutation() {
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (data: {
      name: string;
      email: string;
      address: string;
      mobileNumber: string;
      deviceName: string;
      language: string;
      osVersion: string;
      riskLevel: string;
      threatsDetected: string;
      complianceStatus: string;
    }) => {
      const res = await axios.get("https://api.ipify.org/?format=json");
      const ipAddress = res.data.ip;
      const response = await axiosClient.put("/user/detail", {
        ...data,
        ipAddress,
      });
      return response.data;
    },
  });
}
