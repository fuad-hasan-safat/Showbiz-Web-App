import { BiTime } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { Link } from "react-router-dom";
import useLoadingStore from "../store/trendingStore";
import { GiCrown } from "react-icons/gi";

export const configs = {
    API_BASE_PATH: process.env.REACT_APP_API_URL,
};

// Slider Settings
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
            settings: { slidesToShow: 1.7, slidesToScroll: 1 }
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
            settings: { slidesToShow: 1.7, slidesToScroll: 1 }
        }
    ]
};

export const entertainmentSliderSettings = ReleasesSliderSettings;
export const lifestyleSliderSettings = ReleasesSliderSettings;

// Wrapper (No crown here!)
const CardWrapper = ({ children, contentId }) => {
    const setLoading = useLoadingStore((s) => s.setLoading);

    localStorage.setItem("prev_route", "home");
    setLoading(true);

    return (
        <div className="px-2">
            <Link to={`/movie-stats/${contentId}`} className="block h-full">
                {children}
            </Link>
        </div>
    );
};

// 🔥 Reusable crown badge
const PremiumCrown = ({ isPremium }) =>
    isPremium ? (
        <div className="absolute top-2 right-2 z-20">
            <GiCrown className="text-yellow-500 text-[20px] drop-shadow-2xl shadow-yellow-500" />
        </div>
    ) : null;

// ---------------- CARDS ----------------

// ⭐ Trending Card
export const TrendingCard = ({ title, subtitle, image, contentId, multiLine = false, isPremium = false }) => {
    if (!contentId) return null;

    return (
        <CardWrapper contentId={contentId}>
            <div className="rounded-[15px] h-[280px] w-full relative overflow-hidden">
                <PremiumCrown isPremium={isPremium} />

                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[280px] rounded-[15px] object-cover"
                    loading="lazy"
                />

                <div className="p-3 absolute bottom-3 left-0 right-0 text-center">
                    {multiLine
                        ? title.split("\n").map((line, i) => (
                              <h4 key={i} className="text-[12px] lg:text-[14px] text-white font-medium">
                                  {line}
                              </h4>
                          ))
                        : (
                            <h4 className="text-[12px] lg:text-[14px] text-white font-medium">
                                {title}
                            </h4>
                          )}

                    <p className="text-white text-[10px] mt-1">{subtitle}</p>
                </div>
            </div>
        </CardWrapper>
    );
};

// ⭐ New Release Card
const NewReleaseCard = ({ title, time, views, image, contentId, isPremium = false }) => {
    if (!contentId) return null;

    return (
        <CardWrapper contentId={contentId}>
            <div className="bg-[#292626] border border-[#262626] rounded-[10px] relative p-3 overflow-hidden">

                <PremiumCrown isPremium={isPremium} />

                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[220px] rounded-[12px] object-cover"
                />

                <div className="flex justify-between mt-3 text-[10px] lg:text-[12px]">
                    <span className="bg-[#141414] flex items-center rounded-full px-[10px] py-1 text-[#999] border border-[#2b2b2b]">
                        <BiTime className="mr-1" /> {time}
                    </span>

                    <span className="bg-[#141414] flex items-center rounded-full px-[10px] py-1 text-[#999] border border-[#2b2b2b]">
                        <IoMdEye className="mr-1" /> {views}
                    </span>
                </div>
            </div>
        </CardWrapper>
    );
};

// ⭐ Entertainment Card
const EntertainmentCard = ({ title, dates, image, contentId, isPremium = false }) => {
    if (!contentId) return null;

    return (
        <CardWrapper contentId={contentId}>
            <div className="bg-[#292626] border border-[#262626] rounded-[10px] p-3 relative overflow-hidden">

                <PremiumCrown isPremium={isPremium} />

                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[220px] rounded-[12px] object-cover"
                />

                <div className="flex justify-center mt-3 text-[10px] lg:text-[12px]">
                    <span className="bg-[#141414] rounded-full px-[10px] py-1 text-[#999] border border-[#2b2b2b]">
                        Release at <span className="text-white">{dates}</span>
                    </span>
                </div>
            </div>
        </CardWrapper>
    );
};

// ⭐ Lifestyle Card
const LifestyleCard = ({ title, time, views, image, contentId, isPremium = false }) => {
    if (!contentId) return null;

    return (
        <CardWrapper contentId={contentId}>
            <div className="bg-[#292626] border border-[#262626] rounded-[10px] p-3 relative overflow-hidden">

                <PremiumCrown isPremium={isPremium} />

                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[220px] rounded-[12px] object-cover"
                />

                <div className="flex justify-between mt-3 text-[10px] lg:text-[12px]">
                    <span className="bg-[#141414] flex items-center rounded-full px-[8px] py-1 text-[#999] border border-[#2b2b2b]">
                        <BiTime className="mr-1" /> {time}
                    </span>

                    <span className="bg-[#141414] flex items-center rounded-full px-[8px] py-1 text-[#999] border border-[#2b2b2b]">
                        <IoStar className="text-[#FE0101]" />
                        <IoStar className="text-[#FE0101]" />
                        <IoStar className="text-[#FE0101]" />
                        <IoStarHalf className="text-[#FE0101]" /> {views}
                    </span>
                </div>
            </div>
        </CardWrapper>
    );
};

// Component Mappings
export const playlistTypeComponents = {
    trending: TrendingCard,
    newrelease: NewReleaseCard,
    entertainment: EntertainmentCard,
    lifestyle: LifestyleCard,
};

export const sliderSettings = {
    trending: trandingSliderSettings,
    newrelease: ReleasesSliderSettings,
    entertainment: entertainmentSliderSettings,
    lifestyle: lifestyleSliderSettings,
};
