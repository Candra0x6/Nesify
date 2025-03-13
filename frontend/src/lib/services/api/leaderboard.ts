import { ApiResponse, LeaderboardEntry } from "@/utils/type";
import axios from "axios";

export interface LeaderboardResponse extends ApiResponse<LeaderboardEntry[]> {
  pagination?: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Get the leaderboard
 * @param page Page number, starting from 1
 * @param limit Number of entries per page
 */
export const getLeaderboard = async (
  page: number = 1,
  limit: number = 10
): Promise<LeaderboardResponse> => {
  try {
    const response = await axios.get<ApiResponse<LeaderboardEntry[]>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard?page=${page}&limit=${limit}`
    );

    // Extract pagination info from headers
    const totalCount = Number(response.headers["x-total-count"]) || 0;
    const actualPage = Number(response.headers["x-page"]) || page;
    const actualLimit = Number(response.headers["x-limit"]) || limit;
    const totalPages = Number(response.headers["x-total-pages"]) || 1;

    return {
      message: response.data.message,
      result: response.data.result,
      error: response.data.error,
      status: response.status,
      pagination: {
        totalCount,
        page: actualPage,
        limit: actualLimit,
        totalPages,
      },
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
