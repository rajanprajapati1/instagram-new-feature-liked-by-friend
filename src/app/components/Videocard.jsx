"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReelSide from "./ReelSide";
import ReelDetails from "./ReelDetails";
import { Volume2, VolumeX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { OAuth } from "../(auth)/configs/Auth";
import { debounce } from "../constants/Debounce";

const VideoCard = ({ sources, info }) => {
  const { user } = OAuth();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setisMuted] = useState(true);
  const videoRef = useRef(null);
  const observerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const router = useRouter();

  const payload = { userId: user?._id };
  const controller = new AbortController();
  const signal = controller.signal;

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/reel/${info.ReelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        signal: signal,
        body: JSON.stringify({ payload: payload }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateViews = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const res = await fetch(`/api/reel?id=${info.ReelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        signal: signal,
        body: JSON.stringify({ payload: payload }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };

  const debouncedUpdateViews = useCallback(debounce(UpdateViews, 1000), []);

  const handleVideoPlay = async () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      setisMuted(false);
    } else {
      setisMuted(true);
    }
  };

  useEffect(() => {
    const video = videoRef?.current;
    const handlePlay = () => {
      video?.play();
      setIsVideoPlaying(true);
      setisMuted(false);
    };

    const handlePause = () => {
      video.pause();
      video.currentTime = 0;
      setIsVideoPlaying(false);
      setisMuted(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video?.currentTime);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handlePlay();
            debouncedUpdateViews();
            router.push(`/instagram?id=${info.ReelId}`, undefined);
          } else {
            handlePause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (video) {
      observerRef.current.observe(video);
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (observerRef.current && video) {
        observerRef.current.unobserve(video);
      }
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  const total = videoRef?.current?.duration;
  const progressPercentage = Math.floor((currentTime / total) * 100);

  return (
    <div className="videocard">
      <div className="mute_btn">
        <button onClick={() => handleMuteToggle()}>
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>
      {!isVideoPlaying && (
        <div className="pause_overlay">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
              color="white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          </button>
        </div>
      )}
      <ReelDetails info={info} user={user} />
      <ReelSide info={info} handleLike={handleLike} />
      <video
        src={sources}
        className="videoplayer"
        ref={videoRef}
        onClick={handleVideoPlay}
        loop
        id={info?.ReelId}
        muted={isMuted}
        key={info?.ReelId}
      ></video>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default VideoCard;
