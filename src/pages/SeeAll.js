import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import { configs } from "../utils/constant";
import {
  playlistTypeComponentsSeeAll,
  TrendingCardSeeAll,
} from "../utils/SeeallCards";
import { Helmet } from "react-helmet";
import FullscreenLoader from "../components/loader/FullscreenLoader";
import { SkeletonCard } from "../components/loader/SkeletonCard";
import useLoadingStore from "../store/loadingStore";

const SeeAll = () => {
  const { playlistUUID } = useParams();
  const navigate = useNavigate();

  const [playlistDetails, setPlaylistDetails] = useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const setLoading = useLoadingStore((s) => s.setLoading);
  const isLoading = useLoadingStore((s) => s.isLoading);

  // Memoized Card Component according to playlist type
  const CardComponent = useMemo(() => {
    const type = playlistDetails?.playlistType || playlistDetails?.PlaylistType;
    return playlistTypeComponentsSeeAll[type] || TrendingCardSeeAll;
  }, [playlistDetails]);

  // Fetch Playlist Data
  const fetchPlaylistData = useCallback(async (uuid, page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${configs.API_BASE_PATH}/publish/get-playlist-data/${uuid}?page=${page}&contentPerPage=5000`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setPlaylistDetails(result.playlistDetails || {});
        setData(result.data || []);
      } else {
        throw new Error(result.message || "Failed to fetch data");
      }
    } catch (err) {
      setError(err.message);
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/singin");
      return;
    }

    if (playlistUUID) {
      fetchPlaylistData(playlistUUID, 1);
    }
  }, [playlistUUID, fetchPlaylistData, navigate]);

  return (
    <div className="container">
      <div className="bg-white min-h-screen">
        <Header />
        <FullscreenLoader message="Fetching playlist..." />

        <div className="px-4 pb-28">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <Link
              to="/home"
              className="flex justify-start items-center text-[#292626] hover:text-[#FE0101] cursor-help"
            >
              <IoIosArrowBack /> Back
            </Link>

            <h1 className="text-[20px] capitalize font-bold text-[#292626] mb-0">
              {playlistDetails.playlistName || "Loading..."}
            </h1>
          </div>

          <Helmet>
            <title>{playlistDetails.playlistName}</title>
            <meta name="description" content="This is showbiz portal" />
            <meta
              property="og:title"
              content={playlistDetails.playlistName || ""}
            />
          </Helmet>

          {/* Conditional UI States */}
          {isLoading && <p className="text-center text-gray-500">Loading...</p>}

          {!isLoading && error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {!isLoading && !error && data.length === 0 && (
            <p className="text-center text-gray-500">No data found</p>
          )}

          {isLoading && (
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} variant="grid" />
              ))}
            </div>
          )}

          {/* Data Grid */}
          {!isLoading && !error && data.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {data.map((item) => {
                const formattedDate = new Date(
                  item.created_at
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                const time =
                  item.videoLength >= 60
                    ? `${Math.floor(item.videoLength / 60)} min`
                    : `${item.videoLength} sec`;

                return (
                  <CardComponent
                    key={item.contentId}
                    {...item}
                    title={item.contentName}
                    subtitle={item.categoryName}
                    image={item.thumbnailPath}
                    time={time}
                    views={`${(item.viewCount / 1000).toFixed(1)}K`}
                    dates={formattedDate}
                    from={"seeall"}
                  />
                );
              })}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default SeeAll;
