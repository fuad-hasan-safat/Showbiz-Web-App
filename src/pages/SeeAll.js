import useTrendingStore from '../store/trendingStore';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const SeeAll = () => {
  const trendingData = useTrendingStore((state) => state.trendingData);

  return (
    <div className='container'>
      <div className="bg-white min-h-screen">
        <Header />
        <div className="p-4">
            <div className='flex justify-between items-center mb-5'>
                <Link to='/' className='flex justify-start items-center text-[#292626] hover:text-[#FE0101]'><IoIosArrowBack /> Back</Link>
                <h1 className="text-[20px] font-bold text-[#292626] mb-0">Tranding Movies</h1>
            </div>
            {trendingData.length === 0 ? (
            <p className="text-center text-gray-500">No data found</p>
            ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                {trendingData.map((item, index) => (
                <div key={index} className="rounded-xl overflow-hidden relative shadow-md">
                    <img src={item.image} alt={item.title} className="w-full h-[200px] object-cover" />
                    <div className="p-2 text-center absolute bottom-3 left-0 right-0">
                        {item.multiLine ? (
                            item.title.split('\n').map((line, i) => (
                            <h4 key={i} className="text-[12px] lg:text-[14px] text-white font-medium">{line}</h4>
                            ))
                        ) : (
                            <h4 className="text-[12px] lg:text-[14px] text-white font-medium">{item.title}</h4>
                        )}
                        <p className="text-white text-[10px] mt-1">{item.subtitle}</p>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        <Footer />
        </div>
    </div>
  );
};

export default SeeAll;
