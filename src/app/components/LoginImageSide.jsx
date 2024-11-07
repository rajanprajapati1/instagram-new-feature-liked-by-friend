"use client";
import { useEffect, useState } from "react";

const LoginImageSide = () => {
  const images = [
    "https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png",
    "https://www.instagram.com/static/images/homepage/screenshots/screenshot1.png/fdfe239b7c9f.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="first w-[50%] flex justify-end items-center h-screen">
      <div className="main_img w-[72%] h-full flex items-center justify-center ">
        <img
          src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png"
          alt=""
          className="relative w-full h-full mt-16"
        />
        <img
          src={images[currentImageIndex]}
          alt=""
          className="w-[260px] ml-[100px] mt-5 h-[540px] absolute"
        />
      </div>
    </div>
  );
};

export default LoginImageSide;
