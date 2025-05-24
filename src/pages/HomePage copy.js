import React, { useEffect, useState } from 'react';
import { FaAngleRight } from "react-icons/fa6";
import { BiTime } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import useTrendingStore from '../store/trendingStore';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [playlistNames, setPlaylistNames] = useState(["all"]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistTypes, setPlaylisTypes] = useState([]);
  const [playlistUUIDs, setPlaylistUUIDs] = useState([]);
  const [homepagedata, setHomepageData] = useState(null);

  const setTrendingData = useTrendingStore((state) => state.setTrendingData);


  useEffect(() => {
    fetchHomedata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchHomedata = async () => {
    try {
      const response = await fetch(`http://localhost:3000/publish/grouped-by-playlist`)
      const data = await response.json();

      if (data.data) {
        // Extract playlist metadata
        const names = ["all"]; // Start with 'all' tab
        const uuids = [];
        const types = [];

        data.data.forEach(playlist => {
          names.push(playlist.playlistName);
          uuids.push(playlist.playlistUUID);
          types.push(playlist.playlistType);
        });

        // Set state once after processing all playlists
        setPlaylistNames(names);
        setPlaylisTypes(types);
        setPlaylistUUIDs(uuids);
        setHomepageData(data.data)
      }
      console.log(data.data)
      setTrendingData(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSeeAll = () => {
    // setTrendingData(trandingData);
  }


  // Slider settings
  const trandingSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.7,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: false
  };

  const ReleasesSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1
        }
      }
    ]
  };

  const entertainmentSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1
        }
      }
    ]
  };

  const lifestyleSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.3,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1
        }
      }
    ]
  };



  const playlistTypeComponents = {
    trending: TrendingCard,
    newrelease: NewReleaseCard,
    entertainment: EntertainmentCard,
    lifestyle: LifestyleCard,
    // Add more mappings as needed
  };

  const sliderSettings = {
    trending: trandingSliderSettings,
    newrelease: ReleasesSliderSettings,
    entertainment: entertainmentSliderSettings,
    lifestyle: lifestyleSliderSettings,
  };

  return (
    <div className='container bg-[#fff]'>
      <Header />
      <div className=" text-white min-h-screen pb-30">
        {/* Tabs */}
        <div className="flex mb-5 gap-1 lg:gap-5 px-4">
          {playlistNames.map((playlist, index) => {
            console.log({ playlist })
            return (
              <button
                key={index}
                className={`px-4 lg:px-8 md:px-8 sm:px-8 py-1 border-2 border-[#B8B8B8] rounded-full relative ${activeTab === index ? 'text-[#fff] border-[#FE0101] bg-[#FE0101]' : 'text-[#B8B8B8]'}`}
                onClick={() => {
                  setActiveTab(index);
                  setSelectedPlaylist(playlist)
                }}
              >
                {playlist}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Show all sliders when "All" tab is selected */}
          {activeTab === 0 && (
            <>
              {/* Tranding Slider */}
              {homepagedata && homepagedata.map((homedata, index) => {
                const { playlistName, playlistUUID, playlistType, items } = homedata
                const CardComponent = playlistTypeComponents[playlistType] || TrendingCard;
                const sliderSettingsComponent = sliderSettings[playlistType] || trandingSliderSettings;
                console.log({ items })
                return (
                  <div key={index} className="mb-10 pl-[10px]">
                    <div className="flex justify-between items-center mb-4 pl-[5px] pr-[20px]">
                      <h2 className="text-[20px] text-[#FE0101] font-semibold">{playlistName}</h2>
                      <Link to="/seeall" onClick={handleSeeAll}>
                        <button className="flex justify-center items-center text-[14px] text-[#FE0101]">See All <FaAngleRight /> </button>
                      </Link>
                    </div>
                    <Slider {...sliderSettingsComponent}>

                      {items.map((item, index) => {
                        const formateddate = new Date(item.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })
                        return (
                          <CardComponent
                            key={index}
                            {...item}
                            // Add any additional props needed for specific cards
                            title={item.contentName}
                            subtitle={item.categoryName}
                            image={item.thumbnailPath}
                            time={`${Math.floor(item.videoLength / 60)}h ${item.videoLength % 60}min`}
                            views={`${item.viewCount}K`}
                            dates={`${formateddate}`}
                          />
                        )
                      })}
                    </Slider>
                  </div>
                )
              })}

            </>
          )}

          {activeTab !== 0 && (
           {}
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

// Card Components
const TrendingCard = ({ title, subtitle, multiLine = false, image }) => (
  <div className="px-2">
    <div className="rounded-[15px] relative overflow-hidden h-[250px]">
      <Link to='/' className=' absolute right-0 top-0 bottom-0 left-0'></Link>
      <img
        src={image}
        alt={title}
        className="w-full h-full rounded-[15px] object-cover"
      />
      <div className="p-3 absolute bottom-3 left-0 right-0 text-center">
        {multiLine ? (
          title.split('\n').map((line, i) => (
            <h4 key={i} className="text-[12px] lg:text-[14px] text-white font-medium">{line}</h4>
          ))
        ) : (
          <h4 className="text-[12px] lg:text-[14px] text-white font-medium">{title}</h4>
        )}
        <p className="text-white text-[10px] mt-1">{subtitle}</p>
      </div>
    </div>
  </div>
);

const NewReleaseCard = ({ title, time, views, image }) => (
  <div className="px-2">
    <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] overflow-hidden h-full p-3">
      <Link to='/' className=' absolute right-0 top-0 bottom-0 left-0'></Link>
      <img
        src={image}
        alt={title}
        className="w-full h-[250px] rounded-[15px] object-cover"
      />
      <div className="flex justify-between mt-3 text-[10px] lg:text-[12px]">
        <span className='bg-[#141414] flex justify-center items-center rounded-full px-[10px] py-1 text-[#999999] border-2 border-[#2b2b2b]'><BiTime />{time}</span>
        <span className='bg-[#141414] flex justify-center items-center rounded-full px-[10px] py-1 text-[#999999] border-2 border-[#2b2b2b]'><IoMdEye /> {views}</span>
      </div>
    </div>
  </div>
);

const EntertainmentCard = ({ title, dates, image }) => (
  <div className="px-2">
    <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] overflow-hidden h-full p-3">
      <Link to='/' className=' absolute right-0 top-0 bottom-0 left-0'></Link>
      <img
        src={image}
        alt={title}
        className="w-full h-[250px] rounded-[15px] object-cover"
      />
      <div className="flex justify-center text-center mt-3 text-[10px] lg:text-[12px]">
        <span className='bg-[#141414] rounded-full px-[10px] py-1 text-[#999999] border-2 border-[#2b2b2b]'> Release at <p className='text-white inline-block'>{dates}</p></span>
      </div>
    </div>
  </div>
);

const LifestyleCard = ({ title, time, views, image }) => (
  <div className="px-2">
    <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] overflow-hidden h-full p-3">
      <Link to='/' className=' absolute right-0 top-0 bottom-0 left-0'></Link>
      <img
        src={image}
        alt={title}
        className="w-full h-[250px] rounded-[15px] object-cover"
      />
      <div className="flex justify-between mt-3 text-[10px] lg:text-[12px]">
        <span className='bg-[#141414] flex justify-center items-center rounded-full px-[8px] py-1 text-[#999999] border-2 border-[#2b2b2b]'><BiTime /> {time}</span>
        <span className='bg-[#141414] flex justify-center items-center rounded-full px-[8px] py-1 text-[#999999] border-2 border-[#2b2b2b]'><IoStar className='text-[#FE0101]' /> <IoStar className='text-[#FE0101]' /> <IoStar className='text-[#FE0101]' /> <IoStarHalf className='text-[#FE0101]' /> {views}</span>
      </div>
    </div>
  </div>
);

export default HomePage;