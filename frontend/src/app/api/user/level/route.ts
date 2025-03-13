import prisma from "@/lib/db";
import { ApiResponse, UserLevel } from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<UserLevel>>> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json<ApiResponse<UserLevel>>({
        message: "Missing UserId ",
        status: 401,
        result: null,
        error: "UserId Not Found",
      });
    }
    // Fetch all levels
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json<ApiResponse<UserLevel>>({
        message: "User not Found",
        status: 401,
        result: null,
        error: "User not found",
      });
    }

    const level = await prisma.level.findFirst({
      where: {
        levelNumber: user?.level + 1,
      },
    });

    if (!level) {
      return NextResponse.json<ApiResponse<UserLevel>>({
        message: "Level not found",
        status: 401,
        result: null,
        error: "User not found",
      });
    }

    const neededXP = (level?.xpThreshold as number) - user.xp;
    const precentXP = level?.xpThreshold - (user.xp / level?.xpThreshold) * 100;

    // Get current level reward info
    const currentLevelInfo = await prisma.level.findFirst({
      where: {
        levelNumber: user.level,
      },
    });

    return NextResponse.json<ApiResponse<UserLevel>>({
      message: "User details found",
      status: 200,
      result: {
        id: level.id,
        userId: user.id,
        currentLevel: user.level,
        neededLevel: level.levelNumber,
        currentXp: user.xp,
        neededXp: neededXP,
        neededPrecent: precentXP,
        currentBadge: level.rewardName,
        currentValue: currentLevelInfo?.rewardValue || 0,
      },
      error: null,
    });
  } catch (error) {
    console.error("Error fetching levels:", error);
    return NextResponse.json<ApiResponse<UserLevel>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to fetch levels",
        status: 500,
      },
      { status: 500 }
    );
  }
}
