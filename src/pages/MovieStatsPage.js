import React, { useRef, useState, useEffect, useCallback } from "react";
import Hls from "hls.js";
import { useSwipeable } from "react-swipeable";
import { useNavigate, useParams } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import { configs } from "../utils/constant";
import LikeButton from "../components/Movie/LikeButton";
import CommentButton from "../components/Movie/CommentButton";
import { Helmet } from "react-helmet";
import useLoadingStore from "../store/loadingStore";
import FullscreenLoader from "../components/loader/FullscreenLoader";

export default function MovieStatsPage() {
  const { contentID } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoData, setVideoData] = useState(null);
  const [playlistData, setPlaylistdata] = useState(null);
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [error, setError] = useState(null);

  const setLoading = useLoadingStore((s) => s.setLoading);
  const isLoading = useLoadingStore((s) => s.isLoading);

  /* ---------------------------------------------
     When contentID changes, show the fullscreen loader
  ----------------------------------------------*/
  useEffect(() => {
    if (contentID) {
      setLoading(true);
      // clear previous states
      setVideoData(null);
      setPlaylistdata(null);
      setError(null);
      setProgress(0);
      setIsPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentID]);

  /* ----------------------------------------------------
      NAV GUARD (auth) + initial data fetch
  ---------------------------------------------------- */
  useEffect(() => {
    if (contentID) {
      getVideoData(contentID);
      getIsLikedContent(contentID);
    }

    // cleanup on unmount
    return () => {
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.removeAttribute("src");
        v.load();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentID, navigate]);

  /* ----------------------------------------------------
      GET VIDEO DATA
  ---------------------------------------------------- */
  const getVideoData = async (id) => {
    try {
      setError(null);
      const response = await fetch(
        `${configs.API_BASE_PATH}/publish/get-content/${id}?nocache=${Date.now()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch video data: ${response.status}`);
      }

      const data = await response.json();
      if (data?.data?.data) {
        setVideoData(data.data.data);
        // playlistDetails might be in response.data.playlistDetails
        setPlaylistdata(data.data.playlistDetails || null);
      } else {
        setVideoData(null);
        setPlaylistdata(null);
        throw new Error("Video data missing in response");
      }
    } catch (err) {
      console.error(err);
      setVideoData(null);
      setPlaylistdata(null);
      setError(err.message || "Failed to load video");
      setLoading(false);
    }
  };

  /* ----------------------------------------------------
      GET LIKED STATUS
  ---------------------------------------------------- */
  const getIsLikedContent = async (id) => {
    try {
      const response = await fetch(
        `${configs.API_BASE_PATH}/favorite/check-like/${localStorage.getItem(
          "user_uuid"
        )}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch liked status");
      }

      const data = await response.json();
      setIsLikedByUser(Boolean(data.isLiked));
    } catch (err) {
      console.error("Failed to fetch liked status:", err);
      setIsLikedByUser(false);
    }
  };

  /* ----------------------------------------------------
      SAVE WATCH HISTORY (best-effort)
  ---------------------------------------------------- */
  useEffect(() => {
    if (videoData && contentID) {
      // fire and forget
      (async () => {
        try {
          if (!localStorage.getItem("user_uuid")) return;
          const apidata = {
            userId: localStorage.getItem("user_uuid"),
            userPhone: localStorage.getItem("user_phone"),
            contentId: contentID,
            contentName: videoData?.contentName || "",
            categoryName: videoData?.categoryName || "",
            categoryUUID: videoData?.categoryUUID || "",
            contentType: videoData?.contentType || "",
            description: videoData?.description || "",
            tags: videoData?.tags || "",
            filePath: videoData?.filePath || "",
            thumbnailPath: videoData?.thumbnailPath || "",
            isPremium: videoData?.isPremium || false,
            artist: videoData?.artist || "",
            royalty: videoData?.royalty || "",
            publishStatus: videoData?.publishStatus || false,
            updateStatus: videoData?.updateStatus || "",
            videoLength: videoData?.videoLength || 0,
            shareCount: videoData?.shareCount || 0,
            viewCount: (videoData?.viewCount || 0) + 1,
            likeCount: videoData?.likeCount || 0,
            commentCount: videoData?.commentCount || 0,
            playlistId: playlistData?.PlaylistUUID ?? playlistData?.playlistUUID ?? null,
            playlistName: playlistData?.playlistName ?? null,
            isPublished: Boolean(videoData?.publishStatus),
          };

          await fetch(`${configs.API_BASE_PATH}/history/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify(apidata),
          });
        } catch (err) {
          // history errors should not block the user; just log
          console.error("Failed to create watch history", err);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoData, contentID, playlistData]);

  /* ----------------------------------------------------
      LOAD HLS + manage loader lifecycle
      Hide loader when video can play or HLS parsed
  ---------------------------------------------------- */
  useEffect(() => {
    const v = videoRef.current;
    let hls;
    if (!v || !videoData?.filePath) {
      return;
    }

    const handleCanPlay = () => {
      // video is ready to play -> hide loader
      setLoading(false);
      setIsPlaying(!v.paused);
    };

    // Attach listeners early so canplay is handled
    v.addEventListener("canplay", handleCanPlay);
    v.addEventListener("error", () => {
      setLoading(false);
    });

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoData.filePath);
      hls.attachMedia(v);

      // When manifest parsed / first level ready
      const onManifestParsed = () => {
        // Mark ready; can still wait for canplay if needed
        // Many streams fire canplay shortly after
        // but ensure loader hidden if manifest parsed early
        setLoading(false);
      };

      hls.on(Hls.Events.MANIFEST_PARSED, onManifestParsed);
      hls.on(Hls.Events.ERROR, (event, data) => {
        console.warn("HLS error", event, data);
      });
    } else if (v.canPlayType && v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = videoData.filePath;
      // leave loader until canplay
    }

    // ensure autoplay/muted state respects isMuted
    v.muted = isMuted;

    return () => {
      v.removeEventListener("canplay", handleCanPlay);
      v.removeEventListener("error", () => {});
      if (hls) {
        hls.destroy();
      }
      try {
        v.removeAttribute("src");
        v.load();
      } catch (e) {
        // ignore
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoData, isMuted]);

  /* ----------------------------------------------------
      PLAY / PAUSE
  ---------------------------------------------------- */
  const handlePlayPause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {}); // ignore play promise errors
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  /* ----------------------------------------------------
      MUTE / UNMUTE
  ---------------------------------------------------- */
  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  /* ----------------------------------------------------
      PROGRESS
  ---------------------------------------------------- */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const updateProgress = () => {
      if (v.duration) {
        setProgress((v.currentTime / v.duration) * 100);
      }
    };

    v.addEventListener("timeupdate", updateProgress);
    setIsPlaying(!v.paused);

    return () => v.removeEventListener("timeupdate", updateProgress);
  }, [contentID, videoData]);

  /* ----------------------------------------------------
      SWIPE (UP = NEXT, DOWN = PREVIOUS)
      Set loader before navigating to next/prev
  ---------------------------------------------------- */
  const swipeHandlers = useSwipeable({
    onSwipedUp: async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${configs.API_BASE_PATH}/publish/get-content/${contentID}/next`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const next = await res.json();
        if (next?.status && next.nextContentId) {
          navigate(`/movie-stats/${next.nextContentId}`);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Swipe next failed", err);
        setLoading(false);
      }
    },

    onSwipedDown: async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${configs.API_BASE_PATH}/publish/get-content/${contentID}/previous`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        const prev = await res.json();
        if (prev?.status && prev.previousContentId) {
          navigate(`/movie-stats/${prev.previousContentId}`);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Swipe prev failed", err);
        setLoading(false);
      }
    },

    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  /* ----------------------------------------------------
      BACK navigation: smart behavior + loader
  ---------------------------------------------------- */
  const handleBack = () => {
    const prev = localStorage.getItem("prev_route");
    // show loader while transitioning
    setLoading(true);

    if (prev === "seeall") {
      // prefer navigating to saved playlist page if playlist UUID present
      const pid =
        playlistData?.PlaylistUUID ?? playlistData?.playlistUUID ?? null;
      if (pid) {
        navigate(`/seeall/${pid}`);
        return;
      }
      // fallback to history
      navigate(-1);
      return;
    }

    // default to home
    navigate("/home");
  };

  /* ----------------------------------------------------
      RENDER
  ---------------------------------------------------- */
  if (!videoData && !isLoading) {
    // This condition avoids double showing the built-in Loading video...
    // If loader is active via global store, FullscreenLoader will show.
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <p className="text-white text-lg">{error ? error : "Loading video..."}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-black relative">
      <Helmet>
        <title>{videoData?.contentName ?? "Video"}</title>
      </Helmet>

      {/* Global fullscreen loader */}
      <FullscreenLoader message="Preparing video..." />

      <div {...swipeHandlers} className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          playsInline
          key={contentID}
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          loop
        ></video>

        {/* TOP BAR — Back | Title | Volume */}
        <div className="absolute top-5 left-0 right-0 z-30 flex justify-between items-center px-5">
          {/* BACK BUTTON */}
          <div onClick={handleBack} className="cursor-pointer">
            <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
              <circle cx="25" cy="25" r="23" stroke="white" strokeWidth="3" />
              <polyline
                points="28,15 18,25 28,35"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* TITLE (Center) */}
          <p className="text-white text-[16px] font-semibold truncate max-w-[60%] text-center">
            {videoData?.contentName}
          </p>

          {/* VOLUME / MUTE BUTTON */}
          <div className="cursor-pointer" onClick={toggleMute}>
            {isMuted ? (
              <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="23" stroke="white" strokeWidth="3" />
                <path d="M18 20L24 20L30 15V35L24 30H18V20Z" fill="white" />
                <line
                  x1="33"
                  y1="19"
                  x2="39"
                  y2="31"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="39"
                  y1="19"
                  x2="33"
                  y2="31"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="23" stroke="white" strokeWidth="3" />
                <path d="M18 20L24 20L30 15V35L24 30H18V20Z" fill="white" />
                <path
                  d="M33 20C35 22 35 28 33 30"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        </div>

        {/* ▶⏸ PLAY / PAUSE (Center) */}
        {!isPlaying && (
          <div
            className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClick={handlePlayPause}
          >
            {/* PLAY ICON */}
            <svg width="80" height="80" viewBox="0 0 50 50" fill="none">
              <circle cx="25" cy="25" r="23" stroke="white" strokeWidth="3" />
              <polygon points="20,16 36,25 20,34" fill="white" />
            </svg>
          </div>
        )}

        {/* RIGHT SIDE ICONS */}
        <div className="absolute bottom-20 right-6 flex flex-col items-center gap-6 text-white z-20">
          <LikeButton
            contentID={contentID}
            initialLikeCount={videoData?.likeCount}
            initialIsLikedByUser={isLikedByUser}
            apiBasePath={configs.API_BASE_PATH}
          />

          <CommentButton
            contentID={contentID}
            initialCommentCount={videoData?.commentCount}
            apiBasePath={configs.API_BASE_PATH}
          />

          <div className="flex flex-col items-center">
            <FaShare className="text-3xl" />
            <span>{videoData?.shareCount || 0}</span>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-black/50 z-20">
          <div
            className="h-full bg-[#FE2C55] transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* CLICK ANYWHERE TO PAUSE */}
        <div className="absolute inset-0" onClick={handlePlayPause}></div>
      </div>
    </div>
  );
}
