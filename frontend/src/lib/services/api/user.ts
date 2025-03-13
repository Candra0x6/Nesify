import {
  ApiResponse,
  DailyLogin,
  RewardWithLevel,
  UserLevel,
} from "@/utils/type";
import { User } from "@prisma/client";
import axios from "axios";

/**
 * Get user data by ID
 * @param userId The ID of the user
 */
export const getUserById = async (
  userId: string
): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.get<ApiResponse<User>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user?id=${userId}`
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

/**
 * Get user data by wallet address
 * @param walletAddress The wallet address of the user
 */
export const getUserByWalletAddress = async (
  walletAddress: string
): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.get<ApiResponse<User>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user?walletAddress=${walletAddress}`
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

/**
 * Update user data
 * @param userId The ID of the user
 * @param updates Object containing the fields to update (username and/or profileImageUrl)
 */
export const updateUser = async (
  userId: string,
  updates: {
    username?: string;
    profileImageUrl?: string;
    role?: string;
  }
): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.put<ApiResponse<User>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
      {
        id: userId,
        ...updates,
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

/**
 * Create a new user
 * @param username The username for the new user
 * @param walletAddress The wallet address for the new user
 * @param profileImageUrl Optional URL for the user's profile image
 */
export const createUser = async (
  username: string,
  walletAddress: string,
  profileImageUrl?: string
): Promise<ApiResponse<User>> => {
  try {
    const response = await axios.post<ApiResponse<User>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
      {
        username,
        walletAddress,
        profileImageUrl,
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

/**
 * Record a daily login for the user
 */
export const recordDailyLogin = async (
  userId: string
): Promise<ApiResponse<DailyLogin>> => {
  try {
    const response = await axios.post<ApiResponse<DailyLogin>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/daily-login`,
      {
        userId,
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

/**
 * Get the user's login history
 */
export const getUserLoginHistory = async (
  userId: string
): Promise<ApiResponse<DailyLogin[]>> => {
  try {
    const response = await axios.get<ApiResponse<DailyLogin[]>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/daily-login?userId=${userId}`
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

/**
 * Get the user's rewards
 */
export const getUserRewards = async (
  userId: string
): Promise<ApiResponse<RewardWithLevel[]>> => {
  try {
    const response = await axios.get<ApiResponse<RewardWithLevel[]>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/rewards?userId=${userId}`
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

/**
 * Get user level information
 * @param userId The ID of the user
 */
export const getUserLevel = async (
  userId: string
): Promise<ApiResponse<UserLevel>> => {
  try {
    const response = await axios.get<ApiResponse<UserLevel>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/level?userId=${userId}`
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
