"use client";
import Link from "next/link";
import { OAuth } from "../(auth)/configs/Auth";
import { navbarItems } from "../constants/NavItems";
import { useState } from "react";

navbarItems;
const InstagramNavbar = () => {
  const [Active, setActive] = useState();
  const { user } = OAuth();

  if (!user) {
    return null;
  }
  return (
    <nav
      className="bg-black border-r-[0.1px]   text-white
     border-gray-500 fixed left-0 top-0 
     h-screen w-[20%] flex flex-col items-start pt-4 "
    >
      <div className="mb-3">
        <Link href="#">
          <img
            src="https://i.ibb.co/kJQhSJB/836891-removebg.png"
            alt="Instagram"
            className="w-full -ml-8"
          />
        </Link>
      </div>
      <div className="flex flex-col space-y-3 overflow-hidden">
        {navbarItems?.map(({ icon, name, href }, index) => (
          <Link
            key={index}
            href={href}
            className="ml-3 py-2.5 rounded-md flex gap-4 px-5 navBar_Menu"
            onClick={() => setActive(name)}
          >
            {icon}
            <h1
              className={`iconname font-normal ${
                Active === name ? "font-bold" : ""
              }`}
            >
              {name}
            </h1>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default InstagramNavbar;
