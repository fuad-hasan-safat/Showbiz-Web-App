import React, { useEffect, useMemo, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

import { playlistTypeComponents, sliderSettings } from "../utils/constant";

import FullscreenLoader from "../components/loader/FullscreenLoader";
import { SkeletonCard } from "../components/loader/SkeletonCard";
import { Helmet } from "react-helmet";

import { usePlaylistStore } from "../store/playlistStore";
import { configs } from "../utils/constant";
import useLoadingStore from "../store/loadingStore";

const HomePage = () => {
  const navigate = useNavigate();
  const setLoading = useLoadingStore((s) => s.setLoading);

  const [activeTab, setActiveTab] = useState(0);

  // Zustand state
  const {
    playlists,
    trending,
    banner,
    loading,
    fetchPlaylists,
    fetchTrending,
    fetchBanner,
  } = usePlaylistStore();

  // Fetch data on mount
  useEffect(() => {
    fetchPlaylists();
    fetchTrending();
    fetchBanner();
    setLoading(false);
  }, []);

  // Prepare playlist names for tabs
  const playlistNames = useMemo(() => {
    if (!playlists?.length) return ["all"];
    return ["all", ...playlists.map((p) => p.playlistName)];
  }, [playlists]);

  // Navigation
  const handleSeeAll = (playlistUUID) => {
    navigate(`/seeall/${playlistUUID}`);
  };

  // ==============================
  // 🔥 Render TRENDING
  // ==============================
  const renderTrendingSlider = () => {
    if (!trending || !trending.items?.length) return null;

    const { playlistUUID, playlistType, items } = trending;

    const CardComponent = playlistTypeComponents[playlistType];
    const sliderSettingsComponent = sliderSettings[playlistType];

    if (!CardComponent) return null;

    return (
      <div className="mb-10 pl-[10px]">
        <Helmet>
          <title>Showbiz Home</title>
        </Helmet>

        <div className="flex justify-between items-center mb-4 pl-[5px] pr-[20px]">
          <h2 className="text-[20px] capitalize text-[#FE0101] font-semibold">
            Trending
          </h2>

          <button
            className="flex justify-center items-center text-[14px] text-[#FE0101]"
            onClick={() => handleSeeAll(playlistUUID)}
          >
            See All <FaAngleRight />
          </button>
        </div>

        <Slider {...sliderSettingsComponent}>
          {items.map((item, index) => {
            const formattedDate = new Date(item.created_at).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            );

            return (
              <CardComponent
                key={`${item.contentId}-${playlistUUID}-${index}`}
                title={item.contentName}
                subtitle={item.categoryName}
                image={item.thumbnailPath}
                time={`${Math.floor(item.videoLength / 3600)}h ${(
                  (item.videoLength % 3600) /
                  60
                ).toFixed(2)}min`}
                views={`${(item.viewCount / 1000).toFixed(1)}K`}
                dates={formattedDate}
                contentId={item.contentId}
                isPremium={item.isPremium}
              />
            );
          })}
        </Slider>
      </div>
    );
  };

  // ==============================
  // 🧨 Render Banner (Between trending + playlists)
  // ==============================
  const renderBannerSection = () => {
    if (!banner || !banner.isActive) return null;

    return (
      <div
        className="relative mb-10 px-[15px] cursor-pointer"
        onClick={() => navigate("/quiz/quiz-rule")}
      >
        <img
          src={`${configs.API_BASE_PATH}${banner.imageUrl}`}
          alt={banner.title}
          className="rounded-xl w-full h-[135px] object-cover shadow-md"
        />

        {/* {(banner.ctaText) && (
          <div className="absolute bottom-3 right-4 backdrop-blur-md bg-white px-4 py-2 rounded-lg text-gray-500 text-base font-semibold shadow-lg">
            {banner.ctaText}
          </div>
        )} */}
      </div>
    );
  };

  // ==============================
  // 🔥 Render Playlist Slider
  // ==============================
  const renderPlaylistSlider = (playlistData) => {
    if (!playlistData) return null;

    const { playlistName, playlistType, playlistUUID, items } = playlistData;

    const CardComponent = playlistTypeComponents[playlistType];
    const sliderSettingsComponent = sliderSettings[playlistType];

    if (!CardComponent) return null;

    return (
      <div key={`${playlistUUID}`} className="mb-10 pl-[10px]">
        <Helmet>
          <title>Showbiz Home</title>
        </Helmet>

        <div className="flex justify-between items-center mb-4 pl-[5px] pr-[20px]">
          <h2 className="text-[20px] capitalize text-[#FE0101] font-semibold">
            {playlistName}
          </h2>

          <button
            className="flex justify-center items-center text-[14px] text-[#FE0101]"
            onClick={() => handleSeeAll(playlistUUID)}
          >
            See All <FaAngleRight />
          </button>
        </div>

        <Slider {...sliderSettingsComponent}>
          {items.map((item, index) => {
            const formattedDate = new Date(item.created_at).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            );

            return (
              <CardComponent
                key={`${item.contentId}-${playlistUUID}-${index}`}
                title={item.contentName}
                subtitle={item.categoryName}
                image={item.thumbnailPath}
                time={`${Math.floor(item.videoLength / 3600)}h ${(
                  (item.videoLength % 3600) /
                  60
                ).toFixed(2)}min`}
                views={`${(item.viewCount / 1000).toFixed(1)}K`}
                dates={formattedDate}
                contentId={item.contentId}
                isPremium={item.isPremium}
              />
            );
          })}
        </Slider>
      </div>
    );
  };

  // ==============================
  // 🔥 RENDER UI
  // ==============================
  return (
    <div className="container bg-[#fff]">
      <Header />

      <FullscreenLoader message="Loading content..." />

      <div className="text-white min-h-screen">
        <div className="pb-28">
          {/* Tabs */}
          <div className="relative max-w-[540px] w-full">
            <div className="flex mb-5 gap-1 lg:gap-4 px-4 overflow-x-auto no-scrollbar">
              {playlistNames.map((playlist, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 px-4 lg:px-5 py-1 capitalize border-2 rounded-full whitespace-nowrap ${
                    activeTab === index
                      ? "text-white border-[#FE0101] bg-[#FE0101]"
                      : "text-[#B8B8B8] border-[#B8B8B8]"
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {playlist}
                </button>
              ))}
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="space-y-8">
            {/* Loader */}
            {loading && (
              <div className="mb-10 pl-[10px]">
                <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-[200px] flex-shrink-0">
                      <SkeletonCard variant="slider" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TRENDING */}
            {!loading &&
              trending &&
              trending.items?.length > 0 &&
              renderTrendingSlider()}

            {/* QUIZ BANNER */}
            {!loading && renderBannerSection()}

            {/* PLAYLISTS */}
            {!loading && playlists?.length > 0 && (
              <>
                {activeTab === 0 && playlists.map(renderPlaylistSlider)}

                {activeTab !== 0 &&
                  activeTab <= playlists.length &&
                  renderPlaylistSlider(playlists[activeTab - 1])}
              </>
            )}

            {/* No content */}
            {!loading && !playlists?.length && (
              <p className="text-center text-gray-400">No content available</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
