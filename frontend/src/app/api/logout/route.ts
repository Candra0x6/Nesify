import { NextResponse } from "next/server";

export async function POST() {
  // Create response
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Clear HTTP-only cookies
  response.cookies.set({
    name: "user_id",
    value: "",
    httpOnly: true,
    expires: new Date(0), // Expire immediately
    path: "/",
  });

  response.cookies.set({
    name: "user_session",
    value: "",
    httpOnly: true,
    expires: new Date(0), // Expire immediately
    path: "/",
  });

  // Clear client-accessible cookies
  response.cookies.set({
    name: "client_user_id",
    value: "",
    httpOnly: false,
    expires: new Date(0), // Expire immediately
    path: "/",
  });

  response.cookies.set({
    name: "client_user_role",
    value: "",
    httpOnly: false,
    expires: new Date(0), // Expire immediately
    path: "/",
  });

  return response;
}
