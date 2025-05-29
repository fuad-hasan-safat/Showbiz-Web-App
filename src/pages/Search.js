import React from 'react';
import Header from '../components/Layout/Header';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Footer from '../components/Layout/Footer';

const Search = () => {
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
            </div>
            <Footer />
        </div>
    );
};

export default Search;