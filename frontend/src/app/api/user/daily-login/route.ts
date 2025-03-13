import prisma from "@/lib/db";
import { ApiResponse, DailyLogin, User } from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";

// POST route to record a daily login
export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<DailyLogin>>> {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json<ApiResponse<DailyLogin>>(
        {
          result: null,
          error: "User ID is required",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json<ApiResponse<DailyLogin>>(
        {
          result: null,
          error: "User not found",
          message: "User not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    // Get today's date (UTC)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if user has already logged in today
    const existingLogin = await prisma.dailyLogin.findFirst({
      where: {
        userId: userId,
        loginDate: {
          gte: today,
        },
      },
    });

    if (existingLogin) {
      return NextResponse.json<ApiResponse<DailyLogin>>({
        message: "Already logged in today",
        status: 200,
        result: existingLogin,
        error: null,
      });
    }

    // Create a new login record
    const dailyLogin = await prisma.dailyLogin.create({
      data: {
        userId: userId,
        loginDate: new Date(),
      },
    });

    // Award XP for daily login (e.g., 10 XP)
    const XP_REWARD = 10;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: XP_REWARD },
      },
    });

    // Check if user leveled up
    await checkAndUpdateLevel(updatedUser as User);

    return NextResponse.json<ApiResponse<DailyLogin>>({
      message: "Daily login recorded",
      status: 201,
      result: dailyLogin,
      error: null,
    });
  } catch (error) {
    console.error("Error recording daily login:", error);
    return NextResponse.json<ApiResponse<DailyLogin>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to record daily login",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// GET route to fetch a user's login history
export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<DailyLogin[]>>> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json<ApiResponse<DailyLogin[]>>(
        {
          result: null,
          error: "User ID is required",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Fetch the user's login history
    const logins = await prisma.dailyLogin.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        loginDate: "desc",
      },
    });

    return NextResponse.json<ApiResponse<DailyLogin[]>>({
      message: "Daily login history retrieved",
      status: 200,
      result: logins,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching daily login history:", error);
    return NextResponse.json<ApiResponse<DailyLogin[]>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to fetch daily login history",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// Helper function to check if user leveled up and update accordingly
async function checkAndUpdateLevel(user: User) {
  try {
    // Get the next level threshold
    const nextLevel = await prisma.level.findFirst({
      where: {
        levelNumber: user.level + 1,
      },
    });

    // If nextLevel exists and user's XP meets the threshold
    if (nextLevel && user.xp >= nextLevel.xpThreshold) {
      // Update user's level
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          level: nextLevel.levelNumber,
        },
      });

      // Check if the user already has this level's reward
      const existingReward = await prisma.userReward.findFirst({
        where: {
          userId: user.id,
          levelId: nextLevel.id,
        },
      });

      // If not, award the reward
      if (!existingReward) {
        await prisma.userReward.create({
          data: {
            userId: user.id,
            levelId: nextLevel.id,
            receivedAt: new Date(),
          },
        });
      }

      // Recursively check for multiple level-ups
      return checkAndUpdateLevel(updatedUser as User);
    }

    return user;
  } catch (error) {
    console.error("Error checking level:", error);
    return user;
  }
}
