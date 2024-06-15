import { NextResponse } from "next/server";
import { MongoDbCon } from "../../configs/db.config";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import { Reel } from "../../models/Reel";

export const JWT_SECRET = "SUPERSTRONGSECRET";

export async function POST(req, res) {
  await MongoDbCon();
  try {
    const { password, email } = await req.json();
    const user = await User.findOne({ email: email })
      .populate("videos")
      .populate("followers")
      .populate("following");
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "user not found" });
    }
    if (user.password === password) {
      console.log("password match");

      // Create JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1d",
      });
      console.log(process.env.NODE_ENV);
      const response = NextResponse.json({
        user: user,
        loggedIn: true,
        success: true,
      });
      response.cookies.set("insta-access-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
      return response;
    } else {
      return NextResponse.json({ error: "credentials are wrong" });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function GET() {
  await MongoDbCon();
  await Reel();
  try {
    const user = await User.find({}).populate("videos");
    const userlist = user.map((val, i) => val._id);
    return NextResponse.json({ user: user, userlist });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
