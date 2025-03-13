import { ApiResponse } from "@/utils/type";
import { Ticket } from "@prisma/client";
import axios from "axios";

/**
 * Get all tickets
 */
export const getTickets = async (): Promise<ApiResponse<Ticket[]>> => {
  try {
    const response = await axios.get<ApiResponse<Ticket[]>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ticket`
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
 * Get tickets for a specific user
 * @param userId The ID of the user
 */
export const getUserTickets = async (
  userId: string
): Promise<ApiResponse<Ticket[]>> => {
  try {
    const response = await axios.get<ApiResponse<Ticket[]>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ticket?userId=${userId}`
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
 * Get a ticket by ID
 * @param id The ID of the ticket
 */
export const getTicketById = async (
  id: string
): Promise<ApiResponse<Ticket>> => {
  try {
    const response = await axios.get<ApiResponse<Ticket>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ticket?id=${id}`
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
 * Create a new ticket
 * @param tokenId The token ID of the ticket (must be unique)
 * @param eventId The event ID associated with the ticket
 * @param userId The ID of the user who owns the ticket
 * @param validated Whether the ticket is validated
 * @param purchaseDate Optional purchase date
 * @param buyerName Optional buyer name
 */
export const createTicket = async (
  tokenId: string,
  eventId: string,
  userId: string,
  validated?: boolean,
  purchaseDate?: Date,
  buyerName?: string
): Promise<ApiResponse<Ticket>> => {
  try {
    const response = await axios.post<ApiResponse<Ticket>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ticket`,
      {
        tokenId,
        eventId,
        userId,
        validated,
        purchaseDate,
        buyerName,
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
 * Update an existing ticket
 * @param id The ID of the ticket to update
 * @param updates Object containing the fields to update
 */
export const updateTicket = async (
  id: string,
  updates: {
    tokenId?: string;
    eventId?: string;
    userId?: string;
    validated?: boolean;
    purchaseDate?: Date;
    buyerName?: string;
  }
): Promise<ApiResponse<Ticket>> => {
  try {
    const response = await axios.put<ApiResponse<Ticket>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ticket`,
      {
        id,
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
 * Delete a ticket by ID
 * @param id The ID of the ticket to delete
 */
export const deleteTicket = async (
  id: string
): Promise<ApiResponse<Ticket>> => {
  try {
    const response = await axios.delete<ApiResponse<Ticket>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ticket?id=${id}`
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
 * Validate a ticket
 * This is a convenience method that calls updateTicket with validated=true
 * @param id The ID of the ticket to validate
 */
export const validateTicket = async (
  id: string
): Promise<ApiResponse<Ticket>> => {
  return updateTicket(id, { validated: true });
};
