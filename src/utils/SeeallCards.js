import { BiTime } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { Link } from "react-router-dom";
import { configs } from "./constant";
const { navigate } = require("react-router-dom");

const CardWrapperSeeAll = ({ children, contentId }) => (
    <div className="">
        <Link to={`/movie-stats/${contentId}`} className="block h-full">
            {children}
        </Link>
    </div>
);

export const TrendingCardSeeAll = ({ title, subtitle, image, contentId, multiLine = false }) => {
    if (!contentId) {
        console.error('Missing contentId in TrendingCard');
        return null;
    }

    return (
        <CardWrapperSeeAll contentId={contentId}>
            <div className="rounded-[15px] relative overflow-hidden h-[250px]">
                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-full rounded-[15px] object-cover"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = '/fallback-image.jpg';
                    }}
                />
                <div className="p-2 absolute bottom-3 left-0 right-0 text-center">
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
        </CardWrapperSeeAll>
    );
};

// New Release Card (other cards follow similar pattern)
const NewReleaseCardSeeAll = ({ title, time, views, image, contentId }) => {
    if (!contentId) {
        console.error('Missing contentId in NewReleaseCard');
        return null;
    }

    return (
        <CardWrapperSeeAll contentId={contentId}>
            <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] overflow-hidden h-full p-3">
                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[200px] rounded-[15px] object-cover"
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
        </CardWrapperSeeAll>
    );
};
const EntertainmentCardSeeAll = ({ title, dates, image, contentId }) => {
    if (!contentId) {
        console.error('Missing contentId in EntertainmentCard');
        return null;
    }

    return (
        <CardWrapperSeeAll contentId={contentId}>
            <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] overflow-hidden h-full p-3">
                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[200px] rounded-[15px] object-cover"
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
        </CardWrapperSeeAll>
    );
};

const LifestyleCardSeeAll = ({ title, time, views, image, contentId }) => {
    if (!contentId) {
        console.error('Missing contentId in LifestyleCard');
        return null;
    }

    return (
        <CardWrapperSeeAll contentId={contentId}>
            <div className="bg-[#292626] border-2 border-[#262626] rounded-[10px] overflow-hidden p-3">
                <img
                    src={`${configs.API_BASE_PATH}${image}`}
                    alt={title}
                    className="w-full h-[200px] rounded-[15px] object-cover"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = '/fallback-image.jpg';
                    }}
                />
                <div className="flex justify-between mt-3 text-[8px] lg:text-[12px]">
                    <span className='bg-[#141414] flex justify-center items-center rounded-full px-[6px] py-1 text-[#999999] border-2 border-[#2b2b2b]'>
                        <BiTime className="pr-[2px]" /> {time}
                    </span>
                    <span className='bg-[#141414] flex justify-center items-center rounded-full px-[6px] py-1 text-[#999999] border-2 border-[#2b2b2b]'>
                        <IoStar className='text-[#FE0101]' />
                        <IoStar className='text-[#FE0101]' />
                        <IoStar className='text-[#FE0101]' />
                        <IoStarHalf className='text-[#FE0101]' /> {views}
                    </span>
                </div>
            </div>
        </CardWrapperSeeAll>
    );
};

export const playlistTypeComponentsSeeAll = {
    trending: TrendingCardSeeAll,
    newrelease: NewReleaseCardSeeAll,
    entertainment: EntertainmentCardSeeAll,
    lifestyle: LifestyleCardSeeAll,
    // Add more mappings as needed
};
