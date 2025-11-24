import { BiTime } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { Link } from "react-router-dom";
import useLoadingStore from "../store/trendingStore";
const { navigate } = require("react-router-dom");

export const configs = {
    API_BASE_PATH: process.env.REACT_APP_API_URL,
}


// Slider settings
export const trandingSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.8,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1.7,
                slidesToScroll: 1
            }
        }
    ]
};

export const ReleasesSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.8,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1.7,
                slidesToScroll: 1
            }
        }
    ]
};

export const entertainmentSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.8,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1.7,
                slidesToScroll: 1
            }
        }
    ]
};

export const lifestyleSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.8,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    variableWidth: false,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1.7,
                slidesToScroll: 1
            }
        }
    ]
};


const CardWrapper = ({ children, contentId }) => {
    const setLoading = useLoadingStore((s) => s.setLoading);

    localStorage.setItem("prev_route", 'home');
    setLoading(true);

    return(
    <div className="px-2">
        <Link to={`/movie-stats/${contentId}`} className="block h-full">
            {children}
        </Link>
    </div>
)};

export const TrendingCard = ({ title, subtitle, image, contentId, multiLine = false}) => {
    if (!contentId) {
        console.error('Missing contentId in TrendingCard');
        return null;
    }

    return (
        <CardWrapper contentId={contentId} >
            <div className="rounded-[15px] h-[280px] w-full relative overflow-hidden">
                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[280px] rounded-[15px] object-cover"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = '/fallback-image.jpg';
                    }}
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
        </CardWrapper>
    );
};

// New Release Card (other cards follow similar pattern)
const NewReleaseCard = ({ title, time, views, image, contentId}) => {
    if (!contentId) {
        console.error('Missing contentId in NewReleaseCard');
        return null;
    }

    return (
        <CardWrapper contentId={contentId}>
            <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] w-full  overflow-hidden h-full p-3">
                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[220px] rounded-[15px] object-cover"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = '/fallback-image.jpg';
                    }}
                />
                <div className="flex justify-between mt-3 text-[10px] lg:text-[12px]">
                    <span className='bg-[#141414] flex justify-center items-center rounded-full px-[10px] py-1 text-[#999999] border-2 border-[#2b2b2b]'>
                        <BiTime className="pr-[2px]" />{time}
                    </span>
                    <span className='bg-[#141414] flex justify-center items-center rounded-full px-[10px] py-1 text-[#999999] border-2 border-[#2b2b2b]'>
                        <IoMdEye /> {views}
                    </span>
                </div>
            </div>
        </CardWrapper>
    );
};
const EntertainmentCard = ({ title, dates, image, contentId }) => {
    if (!contentId) {
        console.error('Missing contentId in EntertainmentCard');
        return null;
    }

    return (
        <CardWrapper contentId={contentId}>
            <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] w-full  overflow-hidden h-full p-3">
                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[220px] rounded-[15px] object-cover"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = '/fallback-image.jpg';
                    }}
                />
                <div className="flex justify-center text-center mt-3 text-[10px] lg:text-[12px]">
                    <span className='bg-[#141414] rounded-full px-[10px] py-1 text-[#999999] border-2 border-[#2b2b2b]'>
                        Release at <span className='text-white'>{dates}</span>
                    </span>
                </div>
            </div>
        </CardWrapper>
    );
};

const LifestyleCard = ({ title, time, views, image, contentId}) => {
    if (!contentId) {
        console.error('Missing contentId in LifestyleCard');
        return null;
    }

    return (
        <CardWrapper contentId={contentId}>
            <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] overflow-hidden p-3">
                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[220px] rounded-[15px] object-cover"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = '/fallback-image.jpg';
                    }}
                />
                <div className="flex justify-between mt-3 text-[10px] lg:text-[12px]">
                    <span className='bg-[#141414] flex justify-center items-center rounded-full px-[8px] py-1 text-[#999999] border-2 border-[#2b2b2b]'>
                        <BiTime className="pr-[2px]" /> {time}
                    </span>
                    <span className='bg-[#141414] flex justify-center items-center rounded-full px-[8px] py-1 text-[#999999] border-2 border-[#2b2b2b]'>
                        <IoStar className='text-[#FE0101]' />
                        <IoStar className='text-[#FE0101]' />
                        <IoStar className='text-[#FE0101]' />
                        <IoStarHalf className='text-[#FE0101]' /> {views}
                    </span>
                </div>
            </div>
        </CardWrapper>
    );
};

export const playlistTypeComponents = {
    trending: TrendingCard,
    newrelease: NewReleaseCard,
    entertainment: EntertainmentCard,
    lifestyle: LifestyleCard,
    // Add more mappings as needed
};

export const sliderSettings = {
    trending: trandingSliderSettings,
    newrelease: ReleasesSliderSettings,
    entertainment: entertainmentSliderSettings,
    lifestyle: lifestyleSliderSettings,
};