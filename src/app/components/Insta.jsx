"use client";
import React, { useEffect, useState } from "react";
import Videocard from "./Videocard";
import { sources } from "../constants/sources";
import { OAuth } from "../(auth)/configs/Auth";
import LoadingComponent from "./Loading";

const Page = () => {
  const { user } = OAuth();
  const [reels, setreels] = useState([]);

  useEffect(() => {
    const GetReels = async () => {
      try {
        const res = await fetch(`/api/reel`, {
          method: "GET",
        });
        const data = await res.json();
        console.log(data);
        setreels(data?.reels);
      } catch (error) {
        console.log(error);
      }
    };
    GetReels();
  }, [user]);

  return (
    <div className="app_videos mt-2">
      {reels?.length < 0
        ? Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="videocard mt-2  rounded-md bg-zinc-800 animate-pulse flex 
              items-end justify-between "
            >
              <div className="profile w-12 ml-2 mb-16 h-12 rounded-full bg-zinc-500 animate-pulse">
                <div className="description w-[250px] flex flex-col gap-2  ml-14 h-[80px] rounded-md
                  px-2  ">
                  <p className="w-full py-2 px-2 bg-zinc-500 animate-pulse rounded-md"></p>
                  <p className="w-full py-2 px-2 bg-zinc-500 animate-pulse rounded-md"></p>
                  <p className="w-full py-2 px-2 bg-zinc-500 animate-pulse rounded-md"></p>
                 </div>
              </div>
            </div>
          ))
        : reels?.map((src, i) => {
            return <Videocard key={i + 1} info={src} sources={src?.videoUrl} />;
          })}
    </div>
  );
};

export default Page;
