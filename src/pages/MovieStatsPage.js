import React, { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { FaShare } from "react-icons/fa"; // FaHeart and FaCommentDots removed as they are in child components
import { useParams } from "react-router-dom";
import { configs } from "../utils/constant";
import LikeButton from "../components/Movie/LikeButton"; // Import LikeButton
import CommentButton from "../components/Movie/CommentButton"; // Import CommentButton
import { Helmet } from "react-helmet";

export default function MovieStatsPage() {
  const { contentID } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoData, setVideoData] = useState(null);
  const [isLikedByUser, setIsLikedByUser] = useState(false); // Still needed for initial prop to LikeButton

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/singin');
    }
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
      getIsLikedContent(contentID); // Fetch initial liked status
    }

    return () => {
      setVideoData(null);
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [contentID, navigate]); // Added navigate to dependency array

  const getVideoData = async (contentID) => {
    try {
      const response = await fetch(
        // Corrected the API URL construction
        `${configs.API_BASE_PATH}/publish/get-content/${contentID}?nocache=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.data && data.data.data) {
        setVideoData(data.data.data);
      } else {
        console.error("Video data not found in response:", data);
        setVideoData(null); // Ensure videoData is null if not found
      }
    } catch (error) {
      console.error("Failed to fetch video data:", error);
      setVideoData(null);
    }
  };

  const getIsLikedContent = async (contentID) => {
    try {
      const response = await fetch(`${configs.API_BASE_PATH}/favorite/check-like/${localStorage.getItem('user_uuid')}/${contentID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Is liked content response:", data.isLiked);
      setIsLikedByUser(data.isLiked);
    } catch (error) {
      console.error("Failed to fetch liked status:", error);
      setIsLikedByUser(false); // Default to false on error
    }
  }

  useEffect(() => {
    if (videoData && contentID) { // Ensure videoData and contentID are present
      console.log("Video data loaded, setting history:", videoData);
      setVideoHistory();
    } else {
      console.log("Video data or contentID not available for history.");
    }
  }, [videoData, contentID]);

  // call history API to set video view

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
      viewCount: videoData?.viewCount + 1 || " ",
      likeCount: videoData?.likeCount || " ",
      commentCount: videoData?.commentCount || " ",
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
      const res = await fetch(`${configs.API_BASE_PATH}/publish/get-content/${contentID}/next`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      });
      const next = await res.json();
      console.log("Next video:", next);
      if (next?.status) navigate(`/movie-stats/${next?.nextContentId}`);
    },
    onSwipedRight: async () => {
      const res = await fetch(`${configs.API_BASE_PATH}/publish/get-content/${contentID}/previous`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      });
      const prev = await res.json();
      console.log("Previous video:", prev);
      if (prev?.status) navigate(`/movie-stats/${prev?.previousContentId}`);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // likehandaller and commentButtonHandler are removed as their logic is now in child components

  // Callback for CommentButton to update comment count in videoData if needed for other parts of MovieStatsPage
  // For now, we assume CommentButton handles its display independently.
  // If MovieStatsPage needs to react to comment count changes (e.g., for other UI elements not part of CommentButton),
  // we would pass a callback like this:
  // const handleCommentAdded = () => {
  //   setVideoData(prevData => ({
  //     ...prevData,
  //     commentCount: (prevData.commentCount || 0) + 1
  //   }));
  // };
  // And pass it to <CommentButton onCommentAdded={handleCommentAdded} ... />

  if (!videoData) {
    return (
      <div className="container">
        <div className="flex justify-center items-center min-h-screen bg-black">
          {/* Improved loading/error message */}
          <p className="text-white text-lg">{contentID ? "Loading video..." : "Video not found"}</p>
        </div>
      </div>
    );
  }

  return contentID && videoData && ( // Ensure videoData is also available before rendering
    <div className="container">
      <Helmet>
        <title>{videoData.contentName}</title>
        <meta name="description" content="This is showbiz portal" />
        <meta property="og:title" content={`${videoData.contentName}`} />
        {/* <meta property="og:image" content="https://example.com/image.jpg" /> */}
        {/* Add more meta tags as needed */}
      </Helmet>
      <div className="flex justify-center items-center relative min-h-screen">
        <div {...swipeHandlers} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[360px] h-[640px]">

          {/* Background Video */}
          <video
            // controls={true} // Consider if controls are needed or if custom controls are sufficient
            autoPlay={true}
            playsInline={true}
            key={contentID}
            ref={videoRef}
            className="w-full h-full rounded-md object-cover"
            loop
          ></video>

          {/* Loading overlay - This might be redundant if the !videoData check above handles it */}
          {/* Consider removing if the top-level !videoData check is sufficient */}
          {/* {!videoData && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
              <p className="text-white">Loading...</p>
            </div>
          )} */}

          {/* Title */}
          <div className="absolute top-4 w-full text-center z-10">
            <p className="text-white text-[20px] font-medium drop-shadow">
              {videoData.contentName.substring(0, 30) || "Loading..."}
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

          {/* Right side icons - Using new components */}
          <div className="absolute bottom-20 right-10 flex flex-col items-center gap-5 text-white text-sm z-10">
            <LikeButton
              contentID={contentID}
              initialLikeCount={videoData.likeCount}
              initialIsLikedByUser={isLikedByUser}
              apiBasePath={configs.API_BASE_PATH}
            />
            <CommentButton
              contentID={contentID}
              initialCommentCount={videoData.commentCount}
              apiBasePath={configs.API_BASE_PATH}
            // onCommentAdded={handleCommentAdded} // Uncomment if MovieStatsPage needs to react to comment count
            />
            <div className="flex flex-col items-center"> {/* Share button remains */}
              <FaShare className="text-2xl" />
              <span>{videoData.shareCount === undefined || videoData.shareCount === null ? 0 : videoData.shareCount}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-[6px] bg-[#000] z-20">
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
