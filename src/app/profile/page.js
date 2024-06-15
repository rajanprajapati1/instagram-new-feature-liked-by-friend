"use client"
import { Plus } from "lucide-react";
import { OAuth } from "../(auth)/configs/Auth";

const page = () => {
  const {user} = OAuth()
return <div className="w-full h-screen">
  {user?.posts > 0 ? ""  : (<>
    <div className="w-full h-[70vh] flex items-center justify-center gap-4 flex-col">
    <div
            className="memory w-[50px] ring-2 ring-offset-black ring-gray-500
         ring-offset-4  rounded-full items-center flex cursor-pointer justify-center h-[50px] bg-zinc-900"
          >
            <Plus size={45} className="text-zinc-700" />
          </div>
          <h1 className="font-bold text-3xl">No posts yet</h1>
    </div>
  </>)}
  </div>;
};

export default page;
