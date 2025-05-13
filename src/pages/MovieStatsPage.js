import React, { useRef, useState, useEffect } from "react";
import { FaHeart, FaCommentDots, FaShare } from "react-icons/fa";

export default function MovieStatsPage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // for progress bar

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

  // Video progress update
  useEffect(() => {
    const video = videoRef.current;
    const updateProgress = () => {
      if (video?.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        setProgress(percentage);
      }
    };

    video?.addEventListener("timeupdate", updateProgress);
    return () => {
      video?.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div className="container">
      <div className="">
        <div className="flex justify-center items-center min-h-screen bg-black">
          <div className="relative w-[100vw] h-[100vh] overflow-hidden">

            {/* Background Video */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/images/video.mp4"
              loop
              muted
            ></video>

            {/* Title */}
            <div className="absolute top-4 w-full text-center z-10">
              <p className="text-white text-[20px] font-medium drop-shadow">
                Gangubai Kathiawadi
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

            {/* Progress Bar Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[6px] bg-[#fff] z-20">
              <div
                className="h-full bg-[#FE2C55] transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Click to Pause/Play */}
            <div
              className="absolute inset-0 z-0"
              onClick={handlePlayPause}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
