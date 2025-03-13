import prisma from "@/lib/db";
import { ApiResponse, Mission } from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";

// GET route to fetch all active missions
export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Mission[]>>> {
  try {
    const { searchParams } = new URL(req.url);
    const showActive = searchParams.get("active") !== "false"; // Default to true

    // Current date
    const now = new Date();

    // Fetch missions - if showActive is true, only get active ones
    const missions = await prisma.mission.findMany({
      where: showActive
        ? {
            OR: [
              // No end date, or end date is in the future
              { endDate: null },
              { endDate: { gt: now } },
            ],
            // And start date is null or in the past
            AND: [
              {
                OR: [{ startDate: null }, { startDate: { lte: now } }],
              },
            ],
          }
        : {},
    });

    return NextResponse.json<ApiResponse<Mission[]>>({
      message: `${showActive ? "Active" : "All"} missions retrieved`,
      status: 200,
      result: missions,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching missions:", error);
    return NextResponse.json<ApiResponse<Mission[]>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to fetch missions",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// POST route to create a new mission (admin only)
export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Mission>>> {
  try {
    const { name, description, xpReward, startDate, endDate } =
      await req.json();

    // Validation
    if (!name || !description || xpReward === undefined) {
      return NextResponse.json<ApiResponse<Mission>>(
        {
          result: null,
          error: "Missing required fields",
          message: "Bad request",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Create the mission
    const mission = await prisma.mission.create({
      data: {
        name,
        description,
        xpReward,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    return NextResponse.json<ApiResponse<Mission>>({
      message: "Mission created successfully",
      status: 201,
      result: mission,
      error: null,
    });
  } catch (error) {
    console.error("Error creating mission:", error);
    return NextResponse.json<ApiResponse<Mission>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to create mission",
        status: 500,
      },
      { status: 500 }
    );
  }
}
