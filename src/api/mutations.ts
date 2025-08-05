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
        console.log("Login successful", response.data);
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
// {
//     "name": "John Doe",
//     "email": "john.doe@example.com",
//     "address": "123 Main St, Anytown, USA",
//     "mobileNumber": "+1234567890",
//     "language": "English",
//     "ipAddress": "192.168.1.100",
//     "osVersion": "Windows 10.0.19043",
//     "riskLevel": "Medium",
//     "threatsDetected": "PhishingAttempt",
//     "complianceStatus": "Partial"
// }
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
      ipAddress: string;
      osVersion: string;
      riskLevel: string;
      threatsDetected: string;
      complianceStatus: string;
    }) => {
      const response = await axiosClient.put("/user/detail", data);
      return response.data;
    },
  });
}
