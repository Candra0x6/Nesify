import prisma from "@/lib/db";
import {
  ApiResponse,
  MissionCompletion,
  MissionCompletionRes,
  User,
} from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";

// Helper function to check if user leveled up and update accordingly
async function checkAndUpdateLevel(user: User) {
  // Using any type to avoid TypeScript issues
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
            claimed: false, // Set to false initially
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

// POST route to complete a mission
export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<MissionCompletion>>> {
  try {
    const { userId, missionId } = await req.json();

    if (!userId || !missionId) {
      return NextResponse.json<ApiResponse<MissionCompletion>>(
        {
          result: null,
          error: "User ID and Mission ID are required",
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
      return NextResponse.json<ApiResponse<MissionCompletion>>(
        {
          result: null,
          error: "User not found",
          message: "User not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    // Check if mission exists
    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
    });

    if (!mission) {
      return NextResponse.json<ApiResponse<MissionCompletion>>(
        {
          result: null,
          error: "Mission not found",
          message: "Mission not found",
          status: 404,
        },
        { status: 404 }
      );
    }

    // Check if mission is currently active
    const now = new Date();
    if (
      (mission.startDate && mission.startDate > now) ||
      (mission.endDate && mission.endDate < now)
    ) {
      return NextResponse.json<ApiResponse<MissionCompletion>>(
        {
          result: null,
          error: "Mission is not currently active",
          message: "Mission not available",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if user has already completed this mission
    const existingCompletion = await prisma.missionCompletion.findFirst({
      where: {
        userId,
        missionId,
      },
    });

    if (existingCompletion) {
      return NextResponse.json<ApiResponse<MissionCompletion>>({
        message: "Mission already completed",
        status: 200,
        result: existingCompletion,
        error: null,
      });
    }

    // Create mission completion record
    const missionCompletion = await prisma.missionCompletion.create({
      data: {
        userId,
        missionId,
      },
    });

    // Award XP for mission completion
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: mission.xpReward },
      },
    });

    // Check if user leveled up
    await checkAndUpdateLevel(updatedUser as User);

    return NextResponse.json<ApiResponse<MissionCompletion>>({
      message: "Mission completed successfully",
      status: 201,
      result: missionCompletion,
      error: null,
    });
  } catch (error) {
    console.error("Error completing mission:", error);
    return NextResponse.json<ApiResponse<MissionCompletion>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to complete mission",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// GET route to fetch a user's completed missions
export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<MissionCompletionRes[]>>> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json<ApiResponse<MissionCompletionRes[]>>(
        {
          result: null,
          error: "User ID is required",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Fetch the user's completed missions
    const completedMissions = await prisma.missionCompletion.findMany({
      where: {
        userId,
      },
      include: {
        mission: true,
      },
      orderBy: {
        completedAt: "desc",
      },
    });

    return NextResponse.json<ApiResponse<MissionCompletionRes[]>>({
      message: "Completed missions retrieved",
      status: 200,
      result: completedMissions,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching completed missions:", error);
    return NextResponse.json<ApiResponse<MissionCompletionRes[]>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to fetch completed missions",
        status: 500,
      },
      { status: 500 }
    );
  }
}
