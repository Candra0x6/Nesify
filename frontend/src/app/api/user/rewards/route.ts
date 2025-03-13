import prisma from "@/lib/db";
import { ApiResponse, UserReward } from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";

// GET route to fetch a user's rewards
export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<UserReward[]>>> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json<ApiResponse<UserReward[]>>(
        {
          result: null,
          error: "User ID is required",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Fetch the user's rewards with level information
    const rewards = await prisma.userReward.findMany({
      where: {
        userId,
      },
      include: {
        level: true,
      },
      orderBy: {
        receivedAt: "desc",
      },
    });

    return NextResponse.json<ApiResponse<UserReward[]>>({
      message: "User rewards retrieved",
      status: 200,
      result: rewards,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching user rewards:", error);
    return NextResponse.json<ApiResponse<UserReward[]>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to fetch user rewards",
        status: 500,
      },
      { status: 500 }
    );
  }
}
