"use client";
import { OAuth } from "@/app/(auth)/configs/Auth";
import {  SquareUser } from "lucide-react";

const page = () => {
  const { user } = OAuth();
  return (
    <div className="w-full h-screen ">
      {user?.posts > 0 ? (
        ""
      ) : (
        <>
          <div className="w-full h-[70vh] flex items-center justify-center gap-4 flex-col">
            <div
              className="memory w-[50px] ring-2 ring-offset-black ring-gray-500
         ring-offset-4  rounded-full items-center flex cursor-pointer justify-center h-[50px] bg-zinc-900"
            >
              <SquareUser size={45} className="text-zinc-700" />
            </div>
            <h1 className="font-bold text-3xl">Photos of you</h1>
            <small>When people tag you in photos, they'll appear here.</small>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
