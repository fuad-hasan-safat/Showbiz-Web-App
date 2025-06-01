import React, { useEffect, useState } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { BiTime } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import useTrendingStore from '../store/trendingStore';
import { configs, playlistTypeComponents, sliderSettings, trandingSliderSettings, TrendingCard } from '../utils/constant';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const [playlistNames, setPlaylistNames] = useState(["all"]);
  const [homepagedata, setHomepageData] = useState(null);

  const setTrendingData = useTrendingStore((state) => state.setTrendingData);

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/singin');
    }
    fetchHomedata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchHomedata = async () => {
    try {
      const response = await fetch(`${configs.API_BASE_PATH}/publish/grouped-by-playlist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      });
      const data = await response.json();

      if (data.data) {
        const names = ["all"];
        const uuids = [];
        const types = [];

        data.data.forEach(playlist => {
          names.push(playlist.playlistName);
          uuids.push(playlist.playlistUUID);
          types.push(playlist.playlistType);
        });

        setPlaylistNames(names);
        setHomepageData(data.data);
      }
      console.log(data.data);
      setTrendingData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeeAll = () => {
    // setTrendingData(trandingData);
  };




  const renderPlaylistSlider = (homedata) => {
    const { playlistName, playlistType, playlistUUID, items } = homedata;
    const CardComponent = playlistTypeComponents[playlistType];
    const sliderSettingsComponent = sliderSettings[playlistType];
    return (
      <div key={`${playlistName}-${playlistUUID}`} className="mb-10 pl-[10px]">
        <Helmet>
          <title>Showbiz Home</title>
          <meta name="description" content="This is showbiz portal" />
          <meta property="og:title" content="Showbiz Home" />
          {/* <meta property="og:image" content="https://example.com/image.jpg" /> */}
          {/* Add more meta tags as needed */}
        </Helmet>
        <div className="flex justify-between items-center mb-4 pl-[5px] pr-[20px]">
          <h2 className="text-[20px] capitalize text-[#FE0101] font-semibold">{playlistName}</h2>
          <Link to={`/seeall/${playlistUUID}`} onClick={handleSeeAll}>
            <button className="flex justify-center items-center text-[14px] text-[#FE0101]">See All <FaAngleRight /></button>
          </Link>
        </div>
        <Slider {...sliderSettingsComponent}>
          {items.map((item, index) => {
            const formateddate = new Date(item.created_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });
            return (
              <CardComponent
                key={`${item.contentId}-${index}-${playlistUUID}-${item.created_at}`}
                title={item.contentName}
                subtitle={item.categoryName}
                image={item.thumbnailPath}
                time={`${Math.floor(item.videoLength / 60)}h ${item.videoLength % 60}min`}
                views={`${item.viewCount / 1000}K`}
                dates={`${formateddate}`}
                contentId={item.contentId}
              />
            );
          })}
        </Slider>
      </div>
    );
  };

  return (
    <div className='container bg-[#fff]'>
      <Header />
      <div className="text-white min-h-screen">
        <div className='pb-28'>
        {/* Tabs */}
        <div className="relative max-w-[540px] w-full">
          <div className="flex mb-5 gap-1 lg:gap-4 px-4 overflow-x-auto no-scrollbar">
            {playlistNames.map((playlist, index) => (
              <button
                key={index}
                className={`flex-shrink-0 px-4 lg:px-5 md:px-5 sm:px-5 py-1 capitalize border-2 border-[#B8B8B8] rounded-full whitespace-nowrap relative ${activeTab === index
                    ? 'text-[#fff] border-[#FE0101] bg-[#FE0101]'
                    : 'text-[#B8B8B8]'
                  }`}
                onClick={() => {
                  setActiveTab(index);
                }}
              >
                {playlist}
              </button>
            ))}
          </div>
        </div>



        {/* Content */}
        <div className="space-y-8">
          {homepagedata && activeTab === 0 && (
            <>
              {homepagedata.map(renderPlaylistSlider)}
            </>
          )}

          {homepagedata && activeTab !== 0 && activeTab <= homepagedata.length && (
            renderPlaylistSlider(homepagedata[activeTab - 1])
          )}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;