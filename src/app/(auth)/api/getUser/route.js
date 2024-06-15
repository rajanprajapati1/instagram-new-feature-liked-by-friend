import jwt from "jsonwebtoken";
import { User } from "../../models/user";
import { JWT_SECRET } from "../signIn/route";
import { MongoDbCon } from "../../configs/db.config";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await MongoDbCon();
  try {
    const token = req.cookies.get("insta-access-token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    let tokenVerify;
    try {
      tokenVerify = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return NextResponse.json(
          { error: "Token expired, please log in again" },
          { status: 401 }
        );
      }
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findOne({ _id: tokenVerify.id })
      .populate("videos")
      .populate("followers")
      .populate("following")
      .select(`-password`);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      msg: "success",
      user: "user",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Failed", error: error });
  }
}
