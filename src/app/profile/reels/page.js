"use client";
import { OAuth } from "@/app/(auth)/configs/Auth";
import ReelGrid from "@/app/components/ReelGrid";
import { Video } from "lucide-react";

const page = () => {
  const { user } = OAuth();
  const hasVideos = user?.videos && user?.videos?.length > 0;
  const PolyFill = Array.from({ length: 10 });

  return (
    <div className="w-full h-full">
      {hasVideos ? (
        <ReelGrid reel={user?.videos}/>
      ) : (
        <>
          <div className="w-full h-[70vh] flex items-center justify-center gap-4 flex-col">
            <div
              className="memory w-[50px] ring-2 ring-offset-black ring-gray-500
         ring-offset-4  rounded-full items-center flex cursor-pointer justify-center h-[50px] bg-zinc-900"
            >
              <Video size={27} className="text-zinc-700" />
            </div>
            <h1 className="font-bold text-3xl">No Reels</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
