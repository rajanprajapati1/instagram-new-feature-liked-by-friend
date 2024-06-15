import { MongoDbCon } from "@/app/(auth)/configs/db.config";
import { Reel } from "@/app/(auth)/models/Reel";
import { NextResponse } from "next/server";

// UPdating likes
export async function PUT(req, res) {
  await MongoDbCon();
  try {
    const { id } = res.params;
    const { payload } = await req.json();
    const reel = await Reel.findOne({ ReelId: id });
    if (!reel) {
      return NextResponse.json({ error: "Reel not found" }, { status: 404 });
    }
    const userAlreadyLiked = reel.likes.some(
      (like) => like.userId.toString() === payload.userId
    );

    if (userAlreadyLiked) {
      return NextResponse.json(
        { error: "User Already Liked" },
        { status: 400 }
      );
    }

    reel.likes.push(payload);
    await reel.save();

    return NextResponse.json({ likedReel: reel });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
