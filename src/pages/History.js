import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Layout/Header';
import { IoIosArrowBack } from 'react-icons/io';
import Footer from '../components/Layout/Footer';
import { configs } from '../utils/constant';

const History = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [historyItems, setHistoryItems] = useState([]);

    useEffect(() => {
        if (userId) {
            fetchUserHistory(userId);
        }
    }, [userId]);

    const fetchUserHistory = async (userId) => {
        try {
            const response = await fetch(`${configs.API_BASE_PATH}/history/user/${userId}`);
            const data = await response.json();
            // Assuming data is the object with items array
            setHistoryItems(data.items || []);
        } catch (error) {
            console.error('Error fetching history:', error);
            setHistoryItems([]); // Fallback to empty array on error
        }
    };

    return (
        <div className="container bg-white">
            <Header />
            <div className="min-h-screen bg-white p-4">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-4">
                    <Link to="/home" className="flex justify-start items-center text-[#292626] hover:text-[#FE0101]">
                        <IoIosArrowBack /> Back
                    </Link>
                    <h2 className="text-xl font-semibold text-center w-full -ml-10">History</h2>
                </div>
                {/* History Cards */}
                <div className="space-y-4">
                    {historyItems.length > 0 ? (
                        historyItems.map((item) => (
                            <div key={item.id} 
                            onClick={()=> navigate(`/movie-stats/${item.contentId}`)}
                            className="flex bg-[#FDF8F8] rounded-lg p-2 h-[90px] cursor-pointer">
                                {/* Thumbnail */}
                                <img
                                    src={`${configs.API_BASE_PATH}${item.thumbnailPath}`}
                                    alt={item.contentName}
                                    className="w-[52px] h-[74.7px] object-cover rounded-[8px]"
                                />
                                {/* Text Content */}
                                <div className="ml-4 flex flex-col justify-center space-y-[2px] py-[16.8px]">
                                    <h3 className="text-lg font-[400px] text-black text-[12px]">{item.contentName}</h3>
                                    <p className="text-sm text-gray-600">{`Created by ${item.artist}`}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(item.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No history items available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default History;