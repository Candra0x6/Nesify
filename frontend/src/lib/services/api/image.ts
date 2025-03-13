import { ApiResponse } from "@/utils/type";
import { Image } from "@prisma/client";
import axios from "axios";
import { client } from "@/lib/thirdweb-dev";
import { upload } from "thirdweb/storage";

/**
 * Upload an image file to Supabase storage
 * @param file The image file to upload
 * @param userId The ID of the user
 * @returns Promise with the uploaded image information and public URL
 */
export const uploadImage = async (
  file: File,
  userId: string
): Promise<ApiResponse<{ id: string; url: string }>> => {
  try {
    // Get file extension from file name

    // Generate a unique file path

    // Upload file to Supabase
    const url = await upload({
      client: client,
      files: [file],
    });

    // Get the public URL

    // Create or update the image record in the database
    const response = await axios.post<ApiResponse<Image>>("/api/image", {
      userId,
      imageUrl: url,
    });

    return {
      message: "Image uploaded successfully",
      result: {
        id: response.data.result?.id || "",
        url: url,
      },
      error: null,
      status: 200,
    };
  } catch (err) {
    console.error("Error uploading image:", err);
    if (axios.isAxiosError(err)) {
      return {
        message: err.response?.data.message || "Failed to upload image",
        result: null,
        error: err.response?.data.error || "Upload failed",
        status: err.response?.status || 500,
      };
    }
    return {
      message: "Failed to upload image to storage",
      result: null,
      error: err instanceof Error ? err.message : "Unknown error",
      status: 500,
    };
  }
};

/**
 * Get an image by ID through the API
 * This is for images stored before migrating to Supabase
 * @param imageId The ID of the image
 */
export const getImageById = async (
  imageId: string
): Promise<ApiResponse<Image>> => {
  try {
    const response = await axios.get<ApiResponse<Image>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/image?id=${imageId}`
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
 * Update a user's profile image using Supabase storage
 * @param userId The ID of the user
 * @param file The image file to use as the profile image
 */
export const updateUserProfileImage = async (
  userId: string,
  file: File
): Promise<ApiResponse<{ id: string; url: string }>> => {
  try {
    // Upload image to Supabase
    const result = await uploadImage(file, userId);

    if (!result.result) {
      throw new Error(result.error || "Failed to upload image");
    }

    // Update user profile to associate with this image
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      id: userId,
      profileImageUrl: result.result.url,
    });

    return result;
  } catch (error) {
    console.error("Error updating user profile image:", error);
    return {
      message: "Failed to update profile image",
      result: null,
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    };
  }
};
