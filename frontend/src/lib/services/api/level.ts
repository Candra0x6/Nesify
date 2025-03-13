import { ApiResponse } from "@/utils/type";
import { Level } from "@prisma/client";
import axios from "axios";

/**
 * Get all levels
 */
export const getLevels = async (): Promise<ApiResponse<Level[]>> => {
  try {
    const response = await axios.get<ApiResponse<Level[]>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/level`
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
 * Create a new level (admin only)
 */
export const createLevel = async (
  levelNumber: number,
  xpThreshold: number,
  rewardName: string,
  rewardDescription?: string,
  rewardValue?: number
): Promise<ApiResponse<Level>> => {
  try {
    const response = await axios.post<ApiResponse<Level>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/level`,
      {
        levelNumber,
        xpThreshold,
        rewardName,
        rewardDescription,
        rewardValue,
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
