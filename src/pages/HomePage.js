import React, { useState } from 'react';
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

  const setTrendingData = useTrendingStore((state)=>state.setTrendingData);

  const handleSeeAll = () =>{
    setTrendingData(trandingData);
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


  // Data for sliders
  const trandingData = [
    {
      title: "Bednazi Do",
      subtitle: "Comedy/Drama",
      image: "images/tranding-slide-img-1.png"
    },
    {
      title: "Pushpa",
      subtitle: "Action/Thriller",
      image: "images/tranding-slide-img-2.png"
    },
    {
      title: "DEA ON T NIL\nDeath On The Nile",
      subtitle: "Action/Thriller",
      multiLine: true,
      image: "images/tranding-slide-img-3.webp"
    },
    {
      title: "DEA ON T NIL\nDeath On The Nile",
      subtitle: "Action/Thriller",
      multiLine: true,
      image: "images/tranding-slide-img-4.jpg"
    },
    {
      title: "DEA ON T NIL\nDeath On The Nile",
      subtitle: "Action/Thriller",
      multiLine: true,
      image: "images/tranding-slide-img-5.jpg"
    },
    {
      title: "DEA ON T NIL\nDeath On The Nile",
      subtitle: "Action/Thriller",
      multiLine: true,
      image: "images/tranding-slide-img-6.webp"
    },
    {
      title: "DEA ON T NIL\nDeath On The Nile",
      subtitle: "Action/Thriller",
      multiLine: true,
      image: "images/tranding-slide-img-7.jpg"
    },
    {
      title: "DEA ON T NIL\nDeath On The Nile",
      subtitle: "Action/Thriller",
      multiLine: true,
      image: "images/tranding-slide-img-8.jpg"
    },
    {
      title: "DEA ON T NIL\nDeath On The Nile",
      subtitle: "Action/Thriller",
      multiLine: true,
      image: "images/tranding-slide-img-1.png"
    }
  ];

  const newReleasesData = [
    {
      title: "J A R E D L E T O",
      subtitle: "A NEW MATTER BREAK AWAYS",
      info: "MORBIUS\nEXCLUSIVELY SHOOKS APRIL 1",
      time: "1h 30min",
      views: "2K",
      image: "images/newrelease-slide-img-1.png"
    },
    {
      title: "KILLING MUST TRUST YOURSELF",
      subtitle: "BEAUTY MAN",
      info: "TRAILER RELEASES\n(1) APRIL",
      time: "1h 57min",
      views: "1.5K",
      image: "images/newrelease-slide-img-1.png"
    },
    {
        title: "KILLING MUST TRUST YOURSELF",
        subtitle: "BEAUTY MAN",
        info: "TRAILER RELEASES\n(1) APRIL",
        time: "1h 57min",
        views: "1.5K",
        image: "images/newrelease-slide-img-1.png"
      },
      {
        title: "KILLING MUST TRUST YOURSELF",
        subtitle: "BEAUTY MAN",
        info: "TRAILER RELEASES\n(1) APRIL",
        time: "1h 57min",
        views: "1.5K",
        image: "images/newrelease-slide-img-1.png"
      },
      {
        title: "KILLING MUST TRUST YOURSELF",
        subtitle: "BEAUTY MAN",
        info: "TRAILER RELEASES\n(1) APRIL",
        time: "1h 57min",
        views: "1.5K",
        image: "images/newrelease-slide-img-1.png"
      }
  ];

  const entertainmentData = [
    {
        info: "Released at",
        dates: "14 April 2023",
        title: "Entertainment Images",
        image: "images/entertainment-slide-img-1.png"
    },
    {
        info: "Released at",
        dates: "14 April 2023",
        title: "Entertainment Images",
        image: "images/entertainment-slide-img-1.png"
    },
    {
        info: "Released at",
        dates: "14 April 2023",
        title: "Entertainment Images",
        image: "images/entertainment-slide-img-1.png"
    },
    {
        info: "Released at",
        dates: "14 April 2023",
        title: "Entertainment Images",
        image: "images/entertainment-slide-img-1.png"
    },
    {
      info: "Released at",
      dates: "14 April 2023",
      title: "Entertainment Images",
      image: "images/entertainment-slide-img-1.png"
  }
  ];

  const lifestyleData = [
    {
      hours: "1h 57min",
      views: "20K",
      title:'Lifestyle Images',
      image: "images/lifestyle-slide-img-1.png"
    },
    {
    hours: "1h 57min",
    views: "20K",
    title:'Lifestyle Images',
    image: "images/lifestyle-slide-img-1.png"
    },
    {
    hours: "1h 57min",
    views: "20K",
    title:'Lifestyle Images',
    image: "images/lifestyle-slide-img-1.png"
    },
    {
    hours: "1h 57min",
    views: "20K",
    title:'Lifestyle Images',
    image: "images/lifestyle-slide-img-1.png"
    },
    {
      hours: "1h 57min",
      views: "20K",
      title:'Lifestyle Images',
      image: "images/lifestyle-slide-img-1.png"
    },
    {
      hours: "1h 57min",
      views: "20K",
      title:'Lifestyle Images',
      image: "images/lifestyle-slide-img-1.png"
    },
  ];

  return (
    <div className='container bg-[#fff]'>
      <Header />
      <div className=" text-white min-h-screen pb-30">
        {/* Tabs */}
        <div className="flex mb-5 gap-1 lg:gap-5 px-4">
          {["All", "Entertainment", "Lifestyle"].map((tab, index) => (
            <button
              key={index}
              className={`px-4 lg:px-8 md:px-8 sm:px-8 py-1 border-2 border-[#B8B8B8] rounded-full relative ${activeTab === index ? 'text-[#fff] border-[#FE0101] bg-[#FE0101]' : 'text-[#B8B8B8]'}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Show all sliders when "All" tab is selected */}
          {activeTab === 0 && (
            <>
              {/* Tranding Slider */}
              <div className="mb-10 pl-[10px]">
                <div className="flex justify-between items-center mb-4 pl-[5px] pr-[20px]">
                  <h2 className="text-[20px] text-[#FE0101] font-semibold">Tranding</h2>
                  <Link to="/seeall" onClick={handleSeeAll}>
                    <button className="flex justify-center items-center text-[14px] text-[#FE0101]">See All <FaAngleRight /> </button>
                  </Link>
                </div>
                <Slider {...trandingSliderSettings}>
                  {trandingData.map((item, index) => (
                    <MovieCard key={index} {...item} />
                  ))}
                </Slider>
              </div>

              {/* New Releases Slider */}
              <div className="mb-10 pl-[10px]">
                <div className="flex justify-between items-center mb-4 px-10px">
                  <h2 className="text-[20px] text-[#292626] font-semibold pl-[10px]">New Releases</h2>
                </div>
                <Slider {...ReleasesSliderSettings}>
                  {newReleasesData.map((item, index) => (
                    <NewReleaseCard key={index} {...item} />
                  ))}
                </Slider>
              </div>

              {/* Entertainment Slider */}
              <div className="mb-10 pl-[10px]">
                <h2 className="text-[20px] text-[#292626] pl-[10px] font-semibold mb-3">Entertainment</h2>
                <Slider {...entertainmentSliderSettings}>
                  {entertainmentData.map((item, index) => (
                    <EntertainmentCard key={index} {...item} />
                  ))}
                </Slider>
              </div>

              {/* Lifestyle Slider */}
              <div className="mb-10 pl-[10px]">
                <h2 className="text-[20px] text-[#FE0101] pl-[10px] font-semibold mb-3">Lifestyle</h2>
                <Slider {...lifestyleSliderSettings}>
                  {lifestyleData.map((item, index) => (
                    <LifestyleCard key={index} {...item} />
                  ))}
                </Slider>
              </div>
            </>
          )}

          {/* Show only Entertainment slider when that tab is selected */}
          {activeTab === 1 && (
            <div className="mb-10 pl-[10px]">
              <h2 className="text-[20px] text-[#292626] pl-[10px] font-semibold mb-3">Entertainment</h2>
              <Slider {...entertainmentSliderSettings}>
                {entertainmentData.map((item, index) => (
                  <EntertainmentCard key={index} {...item} />
                ))}
              </Slider>
            </div>
          )}

          {/* Show only Lifestyle slider when that tab is selected */}
          {activeTab === 2 && (
            <div className="mb-10 pl-[10px]">
              <h2 className="text-[20px] pl-[10px] text-[#FE0101] font-semibold mb-3">Lifestyle</h2>
              <Slider {...lifestyleSliderSettings}>
                {lifestyleData.map((item, index) => (
                  <LifestyleCard key={index} {...item} />
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Card Components
const MovieCard = ({ title, subtitle, multiLine = false, image }) => (
  <div className="px-2">
    <div className="rounded-[15px] relative overflow-hidden h-[250px]">
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

const EntertainmentCard = ({ title, info, dates, image }) => (
  <div className="px-2">
     <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] overflow-hidden h-full p-3">
        <img 
            src={image} 
            alt={title}
            className="w-full h-[250px] rounded-[15px] object-cover"
        />
        <div className="flex justify-center text-center mt-3 text-[10px] lg:text-[12px]">
            <span className='bg-[#141414] rounded-full px-[10px] py-1 text-[#999999] border-2 border-[#2b2b2b]'>{info} <p className='text-white inline-block'>{dates}</p></span>
        </div>
    </div>
  </div>
);

const LifestyleCard = ({ title, hours, views, image }) => (
  <div className="px-2">
    <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] overflow-hidden h-full p-3">
        <img 
            src={image} 
            alt={title}
            className="w-full h-[250px] rounded-[15px] object-cover"
        />
        <div className="flex justify-between mt-3 text-[10px] lg:text-[12px]">
            <span className='bg-[#141414] flex justify-center items-center rounded-full px-[8px] py-1 text-[#999999] border-2 border-[#2b2b2b]'><BiTime /> {hours}</span>
            <span className='bg-[#141414] flex justify-center items-center rounded-full px-[8px] py-1 text-[#999999] border-2 border-[#2b2b2b]'><IoStar className='text-[#FE0101]' /> <IoStar className='text-[#FE0101]' /> <IoStar className='text-[#FE0101]' /> <IoStarHalf className='text-[#FE0101]' /> {views}</span>
        </div>
    </div>
  </div>
);

export default HomePage;