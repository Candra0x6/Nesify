import prisma from "@/lib/db";
import { ApiResponse, LeaderboardEntry } from "@/utils/type";
import { NextResponse, NextRequest } from "next/server";

// GET route to fetch the leaderboard
export async function GET(
  req: NextRequest
): Promise<NextResponse<ApiResponse<LeaderboardEntry[]>>> {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") || 10);
    const page = Number(searchParams.get("page") || 1);
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalUsers = await prisma.user.count();

    // Fetch users ordered by XP (descending) and level (descending)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        xp: true,
        level: true,
        profileImageId: true,
      },
      orderBy: [{ xp: "desc" }, { level: "desc" }],
      skip,
      take: limit,
    });

    // Convert to leaderboard entries
    const leaderboardEntries: LeaderboardEntry[] = users.map((user) => ({
      id: user.id,
      username: user.username,
      xp: user.xp,
      level: user.level,
      profileImageId: user.profileImageId || undefined,
    }));

    return NextResponse.json<ApiResponse<LeaderboardEntry[]>>(
      {
        message: "Leaderboard retrieved successfully",
        status: 200,
        result: leaderboardEntries,
        error: null,
      },
      {
        headers: {
          // Add pagination info to headers
          "X-Total-Count": totalUsers.toString(),
          "X-Page": page.toString(),
          "X-Limit": limit.toString(),
          "X-Total-Pages": Math.ceil(totalUsers / limit).toString(),
        },
      }
    );
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json<ApiResponse<LeaderboardEntry[]>>(
      {
        result: null,
        error: "Internal server error",
        message: "Failed to fetch leaderboard",
        status: 500,
      },
      { status: 500 }
    );
  }
}
