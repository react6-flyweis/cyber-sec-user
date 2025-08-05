import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

import type { IResponse } from "@/types/response";
import type { IUserProfile } from "@/types";

// /getUser
export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosClient.get<IResponse<IUserProfile>>(
        "/user/me"
      );
      return data;
    },
    select: (data) => data.data,
  });
};
