"use client";
import React, { useEffect, useState } from "react";
import { OAuth } from "../(auth)/configs/Auth";
import { X } from "lucide-react";

const CommonList = ({ name, setFolPopMenu }) => {
  const { user } = OAuth();
  const [list, setlist] = useState([]);
  useEffect(() => {
    if (user) {
      switch (name) {
        case "followers":
          setlist(user.followers);
          break;
        case "following":
          setlist(user.following);
          break;
        default:
          break;
      }
    }
  }, [name, user]);

  return (
    <div
      // onClick={() => setFolPopMenu({ status: false, name: "" })}
      className="popupmenu  top-0 left-0 right-0 bottom-0"
    >
      <div className="w-[32%] py-2 px-4 rounded-lg bg-zinc-800">
        <div className="navigatio flex justify-end items-center">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <X className="ml-[35%] mr-2" size={22} onClick={() => setFolPopMenu({ status: false, name: "" })}/>
        </div>
        <div className=" h-[50vh] overflow-y-auto">
          {list?.map((user) => (
            <div key={user?._id} className="flex items-center py-2 ">
              <img
                src={user?.profilePicture}
                alt={user?.fullName}
                className="rounded-full mr-2  w-10 h-10"
              />
              <div>
                <p className="text-sm font-semibold">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.fullName}</p>
              </div>
              {name === "followers" ? (
                <button className="px-5 py-2 ml-auto rounded-md hover:bg-zinc-700 bg-zinc-500 text-sm text-white font-semibold">
                  Remove
                </button>
              ) : (
                <button className="px-5 py-2 ml-auto rounded-md hover:bg-zinc-700 bg-zinc-500 text-sm text-white font-semibold">
                  Following
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonList;
