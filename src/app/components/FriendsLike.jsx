"use client";
import React from "react";

const FriendsLike = ({ info, user }) => {
  const reel = info?.likes;
  const followers = user?.followers;

  const userFollowers = followers?.map((follower) => follower?._id);
  const likedByFollowers = reel?.filter((like) =>
    userFollowers?.includes(like?.userId?._id)
  );
  const likedByFollowersIds = Array.from(
    likedByFollowers
      .reduce((map, like) => {
        const id = like.userId?.username;
        if (!map.has(id)) {
          map.set(id, like.userId);
        }
        return map;
      }, new Map())
      .values()
  ).slice(0, 6);
  return (
    <div className="FriendsLike">
      {likedByFollowersIds?.map((val, i) => {
        return (
          <div className="likedby">
            <img src={val?.profilePicture} alt="" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 26 26"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default FriendsLike;
