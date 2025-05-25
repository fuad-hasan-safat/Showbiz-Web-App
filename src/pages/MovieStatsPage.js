import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaCommentDots, FaShare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { configs } from "../utils/constant";

export default function MovieStatsPage() {
  const { contentID } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/singin');
    }

    // Reset state when contentID changes
    setVideoData(null);
    setProgress(0);
    setIsPlaying(false);

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }

    console.log("Content ID:", contentID);
    if (contentID) {
      getVideoData(contentID);
    }

    return () => {
      // Reset video data when component unmounts or contentID changes
      setVideoData(null);
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [contentID]);

  const getVideoData = async (contentID) => {
    const response = await fetch(
      `${configs.API_BASE_PATH}/publish/get-content/${contentID}?nocache=${Date.now()}`
    );
    const data = await response.json();
    setVideoData(data.data.data);
  };

  useEffect(() => {
    // Check if videoData is loaded
    if (videoData) {
      console.log("Video data loaded:", videoData);
      setVideoHistory();
    } else {
      console.log("Loading video data...");
    }
  }, [videoData]);


  // call history API to get video data

  const setVideoHistory = async () => {
    if (!contentID || !localStorage.getItem('user_uuid')) return;

    const apidata = {
      userId: localStorage.getItem('user_uuid'),
      userPhone: localStorage.getItem('user_phone'),
      contentId: contentID,
      contentName: videoData?.contentName || " ",
      categoryName: videoData?.categoryName || " ",
      categoryUUID: videoData?.categoryUUID || " ",
      contentType: videoData?.contentType || " ",
      description: videoData?.description || " ",
      tags: videoData?.tags || " ",
      filePath: videoData?.filePath || " ",
      thumbnailPath: videoData?.thumbnailPath || " ",
      isPremium: videoData?.isPremium || false,
      artist: videoData?.artist || " ",
      royalty: videoData?.royalty || " ",
      publishStatus: videoData?.publishStatus || " ",
      updateStatus: videoData?.updateStatus || " ",
      videoLength: videoData?.videoLength || " ",
      shareCount: videoData?.shareCount || " ",
      viewCount: videoData?.viewCount || " ",
      likeCount: videoData?.likeCount || " ",
      commentCount:   videoData?.commentCount || " ",
      playlistId: videoData?.playlistId || " ",
      playlistName: videoData?.playlistName || " ",
      isPublished: videoData?.isPublished || false,
    }

    console.log("Setting video history with data:", apidata);

    const response = await fetch(`${configs.API_BASE_PATH}/history/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(apidata)
    });

    const data = await response.json();
    console.log("History set response:", data);

  }

  // Load video with HLS support
  useEffect(() => {
    const video = videoRef.current;
    let hls;

    if (!video || !videoData?.filePath) return;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoData.filePath);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoData.filePath;
    }

    return () => {
      if (hls) {
        hls.destroy(); // Critical cleanup
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [videoData]);



  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Track video progress and play state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        setProgress(percentage);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Initial state check
    setIsPlaying(!video.paused);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [contentID, videoData]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: async () => {
      const res = await fetch(`${configs.API_BASE_PATH}/publish/get-content/${contentID}/next`);
      const next = await res.json();
      console.log("Next video:", next);
      if (next?.status) navigate(`/movie-stats/${next?.nextContentId}`);
    },
    onSwipedRight: async () => {
      const res = await fetch(`${configs.API_BASE_PATH}/publish/get-content/${contentID}/previous`);
      const prev = await res.json();
      console.log("Previous video:", prev);
      if (prev?.status) navigate(`/movie-stats/${prev?.previousContentId}`);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });


  if (!videoData) {
    return (
      <div className="container">
        <div className="flex justify-center items-center min-h-screen bg-black">
          <p className="text-white text-lg">Video not found</p>
        </div>
      </div>
    );
  }

  return contentID && (
    <div className="container">
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div {...swipeHandlers} className="relative w-[100vw] h-[100vh] overflow-hidden">

          {/* Background Video */}
          <video
            // controls={true}
            autoPlay={true}
            playsInline={true}
            key={contentID} // This forces React to create new video element
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
          ></video>

          {/* Add loading overlay */}
          {!videoData && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
              <p className="text-white">Loading...</p>
            </div>
          )}

          {/* Title */}
          <div className="absolute top-4 w-full text-center z-10">
            <p className="text-white text-[20px] font-medium drop-shadow">
              {videoData.contentName || "Loading..."}
            </p>
          </div>

          {/* Play Button */}
          {!isPlaying && (
            <div
              className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onClick={handlePlayPause}
            >
              <div className="border-[5px] border-[#fff] p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-5.197-3.028A1 1 0 008 9.028v5.944a1 1 0 001.555.832l5.197-3.028a1 1 0 000-1.664z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Right side icons */}
          <div className="absolute bottom-20 right-10 flex flex-col items-center gap-5 text-white text-sm z-10">
            <div className="flex flex-col items-center">
              <FaHeart className="text-2xl text-[#FE2C55]" />
              <span>250.5K</span>
            </div>
            <div className="flex flex-col items-center">
              <FaCommentDots className="text-2xl" />
              <span>100K</span>
            </div>
            <div className="flex flex-col items-center">
              <FaShare className="text-2xl" />
              <span>132.5K</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-[6px] bg-[#fff] z-20">
            <div
              className="h-full bg-[#FE2C55] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Overlay click to play/pause */}
          <div className="absolute inset-0 z-0" onClick={handlePlayPause}></div>
        </div>
      </div>
    </div>
  );
}
