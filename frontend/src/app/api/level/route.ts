import prisma from "@/lib/db";
import { ApiResponse, Level } from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";

// GET route to fetch all levels
export async function GET(): Promise<NextResponse<ApiResponse<Level[]>>> {
  try {
    // Fetch all levels
    const levels = await prisma.level.findMany({
      orderBy: {
        levelNumber: "asc",
      },
    });

    return NextResponse.json<ApiResponse<Level[]>>({
      message: "Levels retrieved successfully",
      status: 200,
      result: levels,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching levels:", error);
    return NextResponse.json<ApiResponse<Level[]>>(
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

// POST route to create a new level (admin only)
export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Level>>> {
  try {
    const {
      levelNumber,
      xpThreshold,
      rewardName,
      rewardDescription,
      rewardValue,
    } = await req.json();

    // Validation
    if (levelNumber === undefined || xpThreshold === undefined || !rewardName) {
      return NextResponse.json<ApiResponse<Level>>(
        {
          result: null,
          error: "Missing required fields",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if level already exists
    const existingLevel = await prisma.level.findUnique({
      where: {
        levelNumber,
      },
    });

    if (existingLevel) {
      return NextResponse.json<ApiResponse<Level>>(
        {
          result: null,
          error: "Level already exists",
          message: "Level already exists",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Create the level
    const level = await prisma.level.create({
      data: {
        levelNumber,
        xpThreshold,
        rewardName,
        rewardDescription,
        rewardValue: rewardValue || 0,
      },
    });

    return NextResponse.json<ApiResponse<Level>>({
      message: "Level created successfully",
      status: 201,
      result: level,
      error: null,
    });
  } catch (error) {
    console.error("Error creating level:", error);
    return NextResponse.json<ApiResponse<Level>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to create level",
        status: 500,
      },
      { status: 500 }
    );
  }
}
