import React from "react";
import Profile from "../components/Profile";

const layout = ({ children }) => {
  return (
    <div className="w-[80%] flex flex-col ml-[20%] h-auto overflow-y-scroll">
      <Profile children={children} />
    </div>
  );
};

export default layout;
