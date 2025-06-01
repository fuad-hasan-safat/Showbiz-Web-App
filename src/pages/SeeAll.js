import useTrendingStore from '../store/trendingStore';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { configs, playlistTypeComponents, sliderSettings, trandingSliderSettings, TrendingCard } from '../utils/constant';
import { playlistTypeComponentsSeeAll, TrendingCardSeeAll } from '../utils/SeeallCards';
import { Helmet } from 'react-helmet';

const SeeAll = () => {
    const { playlistUUID } = useParams();
    const navigate = useNavigate();
    const [playlistDetails, setPlaylistDetails] = useState({});
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        totalData: 0,
        totalPages: 0,
        currentPage: 1,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate('/singin');
        }
        if (playlistUUID) {
            fetchPlaylistData(playlistUUID, 1); // Fetch first page by default
        }
    }, [playlistUUID]);

    const fetchPlaylistData = async (playlistUUID, page) => {
        try {
            setLoading(true);
            const response = await fetch(
                `${configs.API_BASE_PATH}/publish/get-playlist-data/${playlistUUID}?page=${page}&contentPerPage=5000`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();

            if (result.success) {
                setPlaylistDetails(result.playlistDetails);
                setData(result.data);
                setPagination(result.pagination);
            } else {
                throw new Error(result.message || "Failed to fetch data");
            }
        } catch (err) {
            setError(err.message);
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchPlaylistData(playlistUUID, newPage);
        }
    };

    return (
        <div className='container'>

            <div className="bg-white min-h-screen">
                <Header />
                <div className="p-4">
                    <div className='flex justify-between items-center mb-5'>
                        <Link to='/home' className='flex justify-start items-center text-[#292626] hover:text-[#FE0101] cursor-help'>
                            <IoIosArrowBack /> Back
                        </Link>
                        <h1 className="text-[20px] capitalize font-bold text-[#292626] mb-0">
                            {playlistDetails.playlistName || "Loading..."}
                        </h1>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : data.length === 0 ? (
                        <p className="text-center text-gray-500">No data found</p>
                    ) : (
                        <>
                            <Helmet>
                                <title>{playlistDetails.playlistName}</title>
                                <meta name="description" content="This is showbiz portal" />
                                <meta property="og:title" content={`${playlistDetails.playlistName}`} />
                                {/* <meta property="og:image" content="https://example.com/image.jpg" /> */}
                                {/* Add more meta tags as needed */}
                            </Helmet>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                                {data.map((item, index) => {
                                    const CardComponent = playlistTypeComponentsSeeAll[playlistDetails.PlaylistType] || TrendingCardSeeAll;
                                    const formateddate = new Date(item.created_at).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    });
                                    console.log({ item });
                                    return (
                                        <CardComponent
                                            key={`${item.contentId}-${index}-${playlistUUID}-${item.created_at}`}
                                            {...item}
                                            title={item.contentName}
                                            subtitle={item.categoryName}
                                            image={item.thumbnailPath}
                                            time={`${Math.floor(item.videoLength / 60)}h ${item.videoLength % 60}min`}
                                            views={`${item.viewCount / 1000}K`}
                                            dates={`${formateddate}`}
                                        />
                                    );
                                })}
                            </div>

                            {/* Pagination Controls */}
                            {/* <div className="flex justify-center mt-6 gap-2">
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage === 1}
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2">
                                    Page {pagination.currentPage} of {pagination.totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div> */}
                        </>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default SeeAll;