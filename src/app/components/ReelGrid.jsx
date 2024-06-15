import { Play } from "lucide-react";
import React from "react";

const ReelGrid = ({ reel }) => {
  console.log(reel);
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {reel?.map((video, index) => (
        <div
          key={index}
          className="video-container relative h-[350px] bg-gray-800  rounded-md"
        >
          <video
            src={video?.videoUrl}
            className="w-full h-full object-cover z-10 top-0 bottom-0 left-0 right-0 rounded-md absolute"
          ></video>
          <div className="reel_overlay absolute top-0 bottom-0 z-20 left-0 right-0 rounded-md"></div>
          <div className="views flex items-center z-20 absolute bottom-3 left-2  gap-2">
            <Play size={18} /> <strong>{video?.views?.length}</strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReelGrid;
