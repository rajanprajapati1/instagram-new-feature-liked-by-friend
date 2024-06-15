import React from "react";

const LoadingComponent = () => {
  return (
    <div className="w-full loading h-screen object-center flex items-center justify-center bg-white ">
      <img
        src="./loading.png"
        alt="ss"
        className="w-full loading h-full object-contain"
      />
    </div>
  );
};

export default LoadingComponent;
