import prisma from "@/lib/db";
import { ApiResponse } from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";
import { Image } from "@prisma/client";

// POST route to save image URL from Supabase
export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Image>>> {
  try {
    // Instead of handling file uploads, we now receive the Supabase URL
    const data = await req.json();
    const { userId, imageUrl } = data;

    if (!imageUrl) {
      return NextResponse.json<ApiResponse<Image>>(
        {
          result: null,
          error: "No image URL provided",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Create a new image record
    const image = await prisma.image.create({
      data: {
        url: imageUrl,
      },
    });

    // If a userId is provided, update that user's profile image
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user) {
        // If user already has a profile image, update it
        if (user.profileImageId) {
          await prisma.image.update({
            where: { id: user.profileImageId },
            data: { url: imageUrl },
          });
        } else {
          // Otherwise, set this new image as the profile image
          await prisma.user.update({
            where: { id: userId },
            data: { profileImageId: image.id },
          });
        }
      }
    }

    return NextResponse.json<ApiResponse<Image>>({
      message: "Image saved successfully",
      status: 201,
      result: image,
      error: null,
    });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json<ApiResponse<Image>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to save image",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// GET route to fetch a specific image by ID
export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Image>>> {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json<ApiResponse<Image>>(
        {
          result: null,
          error: "Missing required parameter: id",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    const image = await prisma.image.findUnique({
      where: {
        id,
      },
    });

    if (!image) {
      return NextResponse.json<ApiResponse<Image>>(
        {
          result: null,
          error: "Image not found",
          message: "Image not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<Image>>({
      message: "Image retrieved successfully",
      status: 200,
      result: image,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json<ApiResponse<Image>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to fetch image",
        status: 500,
      },
      { status: 500 }
    );
  }
}
