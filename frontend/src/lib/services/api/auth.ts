import { ApiResponse, User } from "@/utils/type";
import axios from "axios";

export const signup = async (address: string): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.post<ApiResponse<User>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`,
      {
        address,
      }
    );
    return {
      message: response.data.message,
      result: response.data.result,
      error: response.data.error,
      status: response.status,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return {
        message: err.response?.data.message,
        result: null,
        error: err.response?.data.error,
        status: err.response?.status || 500,
      };
    }
    return {
      message: "An unexpected error occurred",
      result: null,
      error: "Internal server error",
      status: 500,
    };
  }
};
