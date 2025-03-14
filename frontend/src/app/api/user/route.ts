import prisma from "@/lib/db";
import { ApiResponse } from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";
import { Role, User } from "@prisma/client";

// GET route to fetch user data by ID
export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<User | null>>> {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const walletAddress = url.searchParams.get("walletAddress");

    if (!id && !walletAddress) {
      return NextResponse.json<ApiResponse<null>>(
        {
          result: null,
          error: "Missing required parameter: id or walletAddress",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    let user: User | null = null;

    if (id) {
      // Fetch user by ID
      user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          profileImage: true,
        },
      });
    } else if (walletAddress) {
      // Fetch user by wallet address
      user = await prisma.user.findUnique({
        where: {
          walletAddress,
        },
        include: {
          profileImage: true,
        },
      });
    }

    if (!user) {
      return NextResponse.json<ApiResponse<null>>(
        {
          result: null,
          error: "User not found",
          message: "User not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<User>>({
      message: "User retrieved successfully",
      status: 200,
      result: user,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json<ApiResponse<null>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to fetch user",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// PUT route to update user data
export async function PUT(
  req: NextRequest
): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const { id, username, profileImageUrl, role } = await req.json();

    // Validation
    if (!id) {
      return NextResponse.json<ApiResponse<User>>(
        {
          result: null,
          error: "Missing required field: id",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return NextResponse.json<ApiResponse<User>>(
        {
          result: null,
          error: "User not found",
          message: "User not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    // Prepare the update data
    const updateData: {
      username?: string;
      profileImageId?: string;
      role?: Role;
    } = {};
    if (username !== undefined) updateData.username = username;
    if (role !== undefined) updateData.role = role;
    // Handle profile image if provided
    if (profileImageUrl) {
      // Check if the user already has a profile image
      if (existingUser.profileImageId) {
        // Update the existing image
        await prisma.image.update({
          where: {
            id: existingUser.profileImageId,
          },
          data: {
            url: profileImageUrl,
            updatedAt: new Date(),
          },
        });
      } else {
        // Create a new image
        const newImage = await prisma.image.create({
          data: {
            url: profileImageUrl,
          },
        });

        // Update user with new profile image ID
        updateData.profileImageId = newImage.id;
      }
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: updateData,
      include: {
        profileImage: true,
      },
    });

    const response = NextResponse.json<ApiResponse<User>>({
      message: "User updated successfully",
      status: 200,
      result: updatedUser,
      error: null,
    });

    response.cookies.set({
      name: "user_role",
      value: updatedUser.role,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json<ApiResponse<User>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to update user",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// POST route to create a new user
export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const { username, walletAddress, profileImageUrl } = await req.json();

    // Validation
    if (!username || !walletAddress) {
      return NextResponse.json<ApiResponse<User>>(
        {
          result: null,
          error:
            "Missing required fields: username and walletAddress are required",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if user with the same wallet address already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        walletAddress,
      },
    });

    if (existingUser) {
      return NextResponse.json<ApiResponse<User>>(
        {
          result: null,
          error: "User with this wallet address already exists",
          message: "User already exists",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Create the user with or without profile image
    let newUser;

    if (profileImageUrl) {
      // Create a new image
      const newImage = await prisma.image.create({
        data: {
          url: profileImageUrl,
        },
      });

      // Create user with profile image
      newUser = await prisma.user.create({
        data: {
          username,
          walletAddress,
          profileImageId: newImage.id,
        },
        include: {
          profileImage: true,
        },
      });
    } else {
      // Create user without profile image
      newUser = await prisma.user.create({
        data: {
          username,
          walletAddress,
        },
        include: {
          profileImage: true,
        },
      });
    }

    return NextResponse.json<ApiResponse<User>>({
      message: "User created successfully",
      status: 201,
      result: newUser,
      error: null,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json<ApiResponse<User>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to create user",
        status: 500,
      },
      { status: 500 }
    );
  }
}
