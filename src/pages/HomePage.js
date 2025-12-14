import React, { useEffect, useMemo, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

import {
  playlistTypeComponents,
  sliderSettings,
  configs,
} from "../utils/constant";

import { usePlaylistStore } from "../store/playlistStore";

import FullscreenLoader from "../components/loader/FullscreenLoader";
import { SkeletonCard } from "../components/loader/SkeletonCard";

/** playlists excluded from tabs */
const EXCLUDED_TAB_TYPES = ["trending", "newrelease"];

const HomePage = () => {
  const navigate = useNavigate();

  /** tab state must be stable (NOT index based) */
  const [activeTab, setActiveTab] = useState("all");

  const {
    playlists,
    trending,
    banner,
    loading,
    fetchPlaylists,
    fetchTrending,
    fetchBanner,
  } = usePlaylistStore();

  // -----------------------------------
  // Fetch data
  // -----------------------------------
  useEffect(() => {
    fetchTrending();
    fetchPlaylists();
    fetchBanner();
  }, []);

  // -----------------------------------
  // Separate playlists
  // -----------------------------------
  const newReleasePlaylist = useMemo(
    () => playlists.find((p) => p.playlistType === "newrelease"),
    [playlists]
  );

  const tabPlaylists = useMemo(
    () =>
      playlists.filter(
        (p) => !EXCLUDED_TAB_TYPES.includes(p.playlistType)
      ),
    [playlists]
  );

  // -----------------------------------
  // Tabs (UUID based)
  // -----------------------------------
  const tabs = useMemo(() => {
    return [
      { key: "all", label: "all" },
      ...tabPlaylists.map((p) => ({
        key: p.playlistUUID,
        label: p.playlistName,
      })),
    ];
  }, [tabPlaylists]);

  // -----------------------------------
  // Visible playlists (TAB CONTROLLED)
  // -----------------------------------
  const visiblePlaylists = useMemo(() => {
    // When "all" tab is selected, show all tabPlaylists (excluding trending/newrelease)
    if (activeTab === "all") return tabPlaylists;

    // When a specific tab is selected, show only that playlist
    return tabPlaylists.filter(
      (p) => p.playlistUUID === activeTab
    );
  }, [activeTab, tabPlaylists]);

  // -----------------------------------
  // Should show always visible sections (only on "all" tab)
  // -----------------------------------
  const shouldShowAlwaysVisibleSections = useMemo(() => {
    return activeTab === "all";
  }, [activeTab]);

  // -----------------------------------
  // Helpers
  // -----------------------------------
  const handleSeeAll = (uuid) => navigate(`/seeall/${uuid}`);

  const renderPlaylist = (playlist, titleOverride) => {
    if (!playlist?.items?.length) return null;

    const { playlistUUID, playlistType, items, playlistName } = playlist;
    const Card = playlistTypeComponents[playlistType];
    const sliderConfig = sliderSettings[playlistType];

    if (!Card) return null;

    return (
      <div key={playlistUUID} className="mb-10 pl-[10px]">
        <div className="flex justify-between items-center mb-4 px-[5px]">
          <h2 className="text-[20px] font-semibold text-[#FE0101] capitalize">
            {titleOverride || playlistName}
          </h2>

          <button
            className="flex items-center text-[#FE0101]"
            onClick={() => handleSeeAll(playlistUUID)}
          >
            See All <FaAngleRight />
          </button>
        </div>

        <Slider {...sliderConfig}>
          {items.map((item, i) => (
            <Card
              key={`${item.contentId}-${i}`}
              title={item.contentName}
              subtitle={item.categoryName}
              image={item.thumbnailPath}
              time={`${Math.floor(item.videoLength / 3600)}h ${(
                (item.videoLength % 3600) /
                60
              ).toFixed(2)}min`}
              views={`${(item.viewCount / 1000).toFixed(1)}K`}
              dates={new Date(item.created_at).toLocaleDateString("en-GB")}
              contentId={item.contentId}
              isPremium={item.isPremium}
            />
          ))}
        </Slider>
      </div>
    );
  };

  const renderBanner = () => {
    if (!banner?.isActive) return null;

    return (
      <div
        className="mb-10 px-[15px] cursor-pointer"
        onClick={() => navigate("/quiz/quiz-rule")}
      >
        <img
          src={`${configs.API_BASE_PATH}${banner.imageUrl}`}
          alt={banner.title}
          className="w-full h-[135px] object-cover rounded-xl"
        />
      </div>
    );
  };

  // -----------------------------------
  // UI
  // -----------------------------------
  return (
    <div className="container bg-white">
      <Header />
      <FullscreenLoader message="Loading content..." />

      <div className="pb-28 min-h-screen">
        {/* Tabs */}
        <div className="flex gap-2 px-4 mb-5 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1 rounded-full border-2 capitalize ${
                activeTab === tab.key
                  ? "bg-[#FE0101] text-white border-[#FE0101]"
                  : "border-[#B8B8B8] text-[#B8B8B8]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="px-4 flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} variant="slider" />
            ))}
          </div>
        )}

        {!loading && (
          <>
            {/* ALWAYS VISIBLE SECTIONS - ONLY ON "ALL" TAB */}
            {shouldShowAlwaysVisibleSections && (
              <>
                {renderPlaylist(trending, "Trending")}
                {renderBanner()}
                {newReleasePlaylist && renderPlaylist(newReleasePlaylist)}
              </>
            )}

            {/* TAB CONTROLLED PLAYLISTS */}
            {visiblePlaylists.map(renderPlaylist)}
            
            {/* Show message when no playlists found for selected tab */}
            {!loading && visiblePlaylists.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No content available for this category.
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;