"use client";
import React, {  useState } from "react";
import { OAuth } from "../(auth)/configs/Auth";
import {
  Bookmark,
  Grid3X3,
  Plus,
  Settings,
  SquareUser,
  Video,
} from "lucide-react";
import Link from "next/link";
import PopUpMenu from "./PopUpMenu";
import CommonList from "./CommonList";
import LoadingComponent from "./Loading";

const Profile = ({ children }) => {
  const Items = [
    {
      icons: <Grid3X3 size={18} />,
      name: "Post",
      href: "/profile/",
    },
    {
      icons: <Video size={18} />,
      name: "Reels",
      href: "/profile/reels",
    },
    {
      icons: <Bookmark size={18} />,
      name: "Saved",
      href: "/profile/saved",
    },
    {
      icons: <SquareUser size={18} />,
      name: "Tagged",
      href: "/profile/tagged",
    },
  ];
  const [Active, setActive] = useState("Post");
  const [PopMenu, setPopMenu] = useState(false);
  const [FolPopMenu, setFolPopMenu] = useState({ status: false, name: "" });
  const { user ,Loading } = OAuth();
if(Loading){
  return <LoadingComponent/>;
}
  return (
    <div className="w-full overflow-hidden">
      {PopMenu && <PopUpMenu setPopMenu={setPopMenu} />}
      <div className="w-full h-full flex items-center p-5 flex-col text-white">
        <div className="profileimg_Details w-full flex items-start ml-[14rem]   gap-16">
          <div className="profileimg  w-[200px] h-[200px] px-4 py-4">
            <img
              src={user?.profilePicture}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="parent">
            <div className="Namebox  flex items-center gap-3 py-3 ">
              <h1 className="px-1">{user?.fullName}</h1>
              <button className="px-2 py-1.5 rounded-md bg-zinc-900 font-medium text-[15px] ">
                Edit Profile
              </button>
              <button className="px-2 py-1.5 rounded-md bg-zinc-900 font-medium text-[15px] ">
                View archive
              </button>
              <button
                onClick={() => setPopMenu(true)}
                className="px-2 py-1.5 border-none"
              >
                <Settings />
              </button>
            </div>
            {FolPopMenu.status && (
              <CommonList
                setFolPopMenu={setFolPopMenu}
                name={FolPopMenu.name}
              />
            )}
            <div className="followers py-5 flex items-center gap-14">
              <h1>{user?.posts?.length} posts</h1>
              <h1
                onClick={() =>
                  setFolPopMenu({ status: true, name: "followers" })
                }
              >
                {user?.followers?.length} followers
              </h1>
              <h1
                onClick={() =>
                  setFolPopMenu({ status: true, name: "following" })
                }
              >
                {user?.following?.length} following
              </h1>
            </div>
            <div className="bioandlinks w-[500px] ">
              <p>{user?.bio}</p>
            </div>
            <div className="followedby py-4">
              <p className="font-normal text-sm text-zinc-400">
                Followed by <strong className="text-white">lostsky.dz</strong>{" "}
                and <strong className="text-white">reofl__</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="memories flex  w-[90%] items-center px-3 h-[140px] mt-10 ">
          <div className="b items-center flex justify-center flex-col gap-2">
            <div
              className="memory w-[70px] ring-2 ring-offset-black ring-gray-500
         ring-offset-4  rounded-full items-center flex cursor-pointer justify-center h-[70px] bg-zinc-900"
            >
              <Plus size={65} className="text-zinc-700" />
            </div>
            <h1>New</h1>
          </div>
        </div>
        <div className="line w-[90%] h-[1px] mt-7 bg-zinc-700"></div>
        <div className="table h-auto  w-[90%]">
          <nav className="w-full flex items-center justify-center text-zinc-500 gap-4">
            {Items.map(({ name, icons, href }, i) => {
              return (
                <Link
                  onClick={() => setActive(name)}
                  className={`*:
            flex items-center px-4 py-4 gap-3
            ${
              Active === name
                ? "text-white font-semibold border-t-2 border-white"
                : ""
            }
            `}
                  href={href}
                >
                  {icons}
                  {name}
                </Link>
              );
            })}
          </nav>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Profile;
