import { BiTime } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { Link } from "react-router-dom";
import { configs } from "./constant";
import useLoadingStore from "../store/trendingStore";
import { GiCrown } from "react-icons/gi";

const PremiumCrown = ({ isPremium }) =>
    isPremium ? (
        <div className="absolute top-2 right-2 z-20">
            <GiCrown className="text-yellow-400 text-[20px] drop-shadow-xl" />
        </div>
    ) : null;

const CardWrapperSeeAll = ({ children, contentId }) => {
    const setLoading = useLoadingStore((s) => s.setLoading);
    setLoading(true);
    localStorage.setItem("prev_route", "seeall");

    return (
        <div>
            <Link to={`/movie-stats/${contentId}`} className="block h-full">
                {children}
            </Link>
        </div>
    );
};

// -------------------- Trending SeeAll --------------------
export const TrendingCardSeeAll = ({
    title,
    subtitle,
    image,
    contentId,
    multiLine = false,
    isPremium = false
}) => {
    if (!contentId) return null;

    return (
        <CardWrapperSeeAll contentId={contentId}>
            <div className="rounded-[15px] relative overflow-hidden h-[250px]">

                <PremiumCrown isPremium={isPremium} />

                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-full rounded-[15px] object-cover"
                    loading="lazy"
                />

                <div className="p-2 absolute bottom-3 left-0 right-0 text-center">
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
        </CardWrapperSeeAll>
    );
};

// -------------------- New Release SeeAll --------------------
const NewReleaseCardSeeAll = ({
    title,
    time,
    views,
    image,
    contentId,
    isPremium = false
}) => {
    if (!contentId) return null;

    return (
        <CardWrapperSeeAll contentId={contentId}>
            <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] relative overflow-hidden p-3">

                <PremiumCrown isPremium={isPremium} />

                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[200px] rounded-[15px] object-cover"
                    loading="lazy"
                />

                <div className="flex justify-between mt-3 text-[10px] lg:text-[12px]">
                    <span className="bg-[#141414] flex justify-center items-center rounded-full px-[10px] py-1 text-[#999] border-2 border-[#2b2b2b]">
                        <BiTime className="pr-[2px]" /> {time}
                    </span>
                    <span className="bg-[#141414] flex justify-center items-center rounded-full px-[10px] py-1 text-[#999] border-2 border-[#2b2b2b]">
                        <IoMdEye /> {views}
                    </span>
                </div>
            </div>
        </CardWrapperSeeAll>
    );
};

// -------------------- Entertainment SeeAll --------------------
const EntertainmentCardSeeAll = ({
    title,
    dates,
    image,
    contentId,
    isPremium = false
}) => {
    if (!contentId) return null;

    return (
        <CardWrapperSeeAll contentId={contentId}>
            <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] relative overflow-hidden p-3">

                <PremiumCrown isPremium={isPremium} />

                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[200px] rounded-[15px] object-cover"
                    loading="lazy"
                />

                <div className="flex justify-center mt-3 text-[10px] lg:text-[12px]">
                    <span className="bg-[#141414] rounded-full px-[10px] py-1 text-[#999] border-2 border-[#2b2b2b]">
                        Release at <span className="text-white">{dates}</span>
                    </span>
                </div>
            </div>
        </CardWrapperSeeAll>
    );
};

// -------------------- Lifestyle SeeAll --------------------
const LifestyleCardSeeAll = ({
    title,
    time,
    views,
    image,
    contentId,
    isPremium = false
}) => {
    if (!contentId) return null;

    return (
        <CardWrapperSeeAll contentId={contentId}>
            <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] relative overflow-hidden p-3">

                <PremiumCrown isPremium={isPremium} />

                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[200px] rounded-[15px] object-cover"
                    loading="lazy"
                />

                <div className="flex justify-between mt-3 text-[10px] lg:text-[12px]">
                    <span className="bg-[#141414] flex items-center justify-center rounded-full px-[6px] py-1 text-[#999] border-2 border-[#2b2b2b]">
                        <BiTime className="pr-[2px]" /> {time}
                    </span>

                    <span className="bg-[#141414] flex items-center justify-center rounded-full px-[6px] py-1 text-[#999] border-2 border-[#2b2b2b]">
                        <IoStar className="text-[#FE0101]" />
                        <IoStar className="text-[#FE0101]" />
                        <IoStar className="text-[#FE0101]" />
                        <IoStarHalf className="text-[#FE0101]" /> {views}
                    </span>
                </div>
            </div>
        </CardWrapperSeeAll>
    );
};

// Export mapping
export const playlistTypeComponentsSeeAll = {
    trending: TrendingCardSeeAll,
    newrelease: NewReleaseCardSeeAll,
    entertainment: EntertainmentCardSeeAll,
    lifestyle: LifestyleCardSeeAll
};
