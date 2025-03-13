import prisma from "@/lib/db";
import { ApiResponse, UserReward } from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<UserReward>>> {
  try {
    const { userId, rewardId } = await req.json();

    if (!userId || !rewardId) {
      return NextResponse.json<ApiResponse<UserReward>>(
        {
          result: null,
          error: "User ID and Reward ID are required",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if the reward exists and belongs to this user
    const userReward = await prisma.userReward.findFirst({
      where: {
        id: rewardId,
        userId: userId,
      },
      include: {
        level: true,
      },
    });

    if (!userReward) {
      return NextResponse.json<ApiResponse<UserReward>>(
        {
          result: null,
          error: "Reward not found for this user",
          message: "Reward not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    // Check if it's already claimed
    if (userReward.claimed) {
      return NextResponse.json<ApiResponse<UserReward>>({
        message: "Reward already claimed",
        status: 400,
        result: userReward,
        error: "This reward has already been claimed",
      });
    }

    // Mark as claimed
    const updatedReward = await prisma.userReward.update({
      where: {
        id: rewardId,
      },
      data: {
        claimed: true,
      },
      include: {
        level: true,
      },
    });

    return NextResponse.json<ApiResponse<UserReward>>({
      message: "Reward claimed successfully",
      status: 200,
      result: updatedReward,
      error: null,
    });
  } catch (error) {
    console.error("Error claiming reward:", error);
    return NextResponse.json<ApiResponse<UserReward>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to claim reward",
        status: 500,
      },
      { status: 500 }
    );
  }
}
