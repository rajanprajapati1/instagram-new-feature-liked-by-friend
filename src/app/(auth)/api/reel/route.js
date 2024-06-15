import { NextResponse } from "next/server";
import { Reel } from "../../models/Reel";
import { MongoDbCon } from "../../configs/db.config";
import { User } from "../../models/user";

export async function GET(req, res) {
 
  await MongoDbCon();
  await User();
  try {
    const reel = await Reel.find({}).populate("user").populate({
      path: "likes.userId",
      select: "profilePicture username _id",
    });
    return NextResponse.json({ reels: reel, length: reel.length });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}

export async function PUT(req, res) {
  await MongoDbCon();
  const query = req.nextUrl.searchParams.get("id");
  try {
    const { payload } = await req.json();
    const reel = await Reel.findOne({ ReelId: query });
    if (!reel) {
      return NextResponse.json({ error: "Reel not found" }, { status: 404 });
    }
    const userAlreadyViewed = reel.views.some(
      (view) => view.userId.toString() === payload.userId
    );

    if (userAlreadyViewed) {
      return NextResponse.json(
        { error: "User Already Viewed" },
        { status: 400 }
      );
    }

    reel.views.push(payload);
    await reel.save();

    return NextResponse.json({ reel, length: reel.views.length });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
