import { Music } from "lucide-react";
import React from "react";
import FriendsLike from "./FriendsLike";

const ReelDetails = ({ info,user }) => {
  return (
    <>
      <div className="ReelDetails">
        <FriendsLike info={info} user={user}/>
        <div className="profile_Details">
          <img src={info?.user?.profilePicture} alt="" />
          <h1>{info?.user?.username}</h1>
          <button>Follow</button>
        </div>
        <div className="description-container">
          <details>
            <summary>Epcot Center</summary>
            <p>
              Epcot is a theme park at Walt Disney World Resort featuring
              exciting attractions, international pavilions, award-winning
              fireworks and seasonal special events.
            </p>
          </details>
        </div>
        <div className="song_Details">
          <div className="scroller">
            <Music size={12} />
            <h2>{info?.song?.name || "unknown song"}</h2>
            <strong>Original Song</strong>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReelDetails;
