import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
    response.cookies.set("insta-access-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
