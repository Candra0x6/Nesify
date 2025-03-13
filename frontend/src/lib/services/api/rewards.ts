import { ApiResponse, RewardWithLevel } from "@/utils/type";
import axios from "axios";

/**
 * Get all rewards for a user
 * @param userId The ID of the user
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
 * Claim a reward
 * @param userId The ID of the user
 * @param rewardId The ID of the reward to claim
 */
export const claimReward = async (
  userId: string,
  rewardId: string
): Promise<ApiResponse<RewardWithLevel>> => {
  try {
    const response = await axios.post<ApiResponse<RewardWithLevel>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/rewards/claim`,
      {
        userId,
        rewardId,
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
