import { ApiResponse, Mission, MissionCompletionRes } from "@/utils/type";
import axios from "axios";

/**
 * Get all active missions
 */
export const getMissions = async (): Promise<ApiResponse<Mission[]>> => {
  try {
    // If userId is provided, get completed missions for that user
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/mission`;

    const response = await axios.get<ApiResponse<Mission[]>>(url);
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
export const getCompletedMissionsByUserId = async (
  userId: string
): Promise<ApiResponse<Mission[]>> => {
  try {
    // If userId is provided, get completed missions for that user
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/mission/complete?userId=${userId}`;

    const response = await axios.get<ApiResponse<Mission[]>>(url);
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
 * Create a new mission (admin only)
 */
export const createMission = async (
  name: string,
  description: string,
  xpReward: number,
  startDate?: Date,
  endDate?: Date
): Promise<ApiResponse<Mission>> => {
  try {
    const response = await axios.post<ApiResponse<Mission>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/mission`,
      {
        name,
        description,
        xpReward,
        startDate,
        endDate,
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
 * Complete a mission for a user
 * @param userId The ID of the user
 * @param missionId The ID of the mission to complete
 */
export const completeMission = async (
  missionId: string,
  userId: string
): Promise<ApiResponse<MissionCompletionRes>> => {
  try {
    const response = await axios.post<ApiResponse<MissionCompletionRes>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/mission/complete`,
      {
        userId,
        missionId,
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
 * Get completed missions for a user
 */
export const getCompletedMissions = async (
  userId: string
): Promise<ApiResponse<MissionCompletionRes[]>> => {
  try {
    const response = await axios.get<ApiResponse<MissionCompletionRes[]>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/mission/complete?userId=${userId}`
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
