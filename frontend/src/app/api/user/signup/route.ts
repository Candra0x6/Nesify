import prisma from "@/lib/db";
import { ApiResponse, User } from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<User>>> {
  try {
    const { address } = await req.json();
    if (!address) {
      return NextResponse.json<ApiResponse<User>>(
        {
          result: null,
          error: "Address is required",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    const randomUsername =
      "user_" + Math.random().toString(36).substring(2, 15);

    const existingUser = await prisma.user.findUnique({
      where: {
        walletAddress: address,
      },
    });

    if (existingUser) {
      const response = NextResponse.json<ApiResponse<User>>({
        message: "User found",
        status: 200,
        result: existingUser as User,
        error: null,
      });

      // Set HTTP-only cookie for security
      response.cookies.set({
        name: "user_id",
        value: existingUser.id,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      // Set client-accessible cookie for useUser hook
      response.cookies.set({
        name: "client_user_id",
        value: existingUser.id,
        httpOnly: false, // Can be accessed by client-side JavaScript
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      // Set client-accessible role cookie
      response.cookies.set({
        name: "client_user_role",
        value: "user", // Default to "user" for existing users
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      // Set user session cookie
      response.cookies.set({
        name: "user_session",
        value: JSON.stringify({
          id: existingUser.id,
          address: existingUser.walletAddress,
        }),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    const user = await prisma.user.create({
      data: {
        walletAddress: address,
        username: randomUsername,
      },
    });

    const response = NextResponse.json<ApiResponse<User>>({
      message: "User created",
      status: 201,
      result: user as User,
      error: null,
    });

    // Set user_id cookie (HTTP-only for security)
    response.cookies.set({
      name: "user_id",
      value: user.id,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    // Set client-accessible cookie for useUser hook
    response.cookies.set({
      name: "client_user_id",
      value: user.id,
      httpOnly: false, // Can be accessed by client-side JavaScript
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    // Set client-accessible role cookie
    response.cookies.set({
      name: "client_user_role",
      value: "user", // Default to "user" for new users
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    // Set user session cookie
    response.cookies.set({
      name: "user_session",
      value: JSON.stringify({
        id: user.id,
        address: user.walletAddress,
      }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json<ApiResponse<User>>(
      { result: null, error: "Error", status: 500, message: "Server error" },
      { status: 500 }
    );
  }
}
