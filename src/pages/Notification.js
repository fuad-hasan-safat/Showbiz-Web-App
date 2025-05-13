import React from 'react';
import { CiYoutube } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const notifications = [
  {
    title: 'New Movie',
    message: 'Barbad movie has been released.',
    date: '12 Jan 2025',
  },
  {
    title: 'New Movie',
    message: 'Barbad movie has been released.',
    date: '12 Jan 2025',
  },
  {
    title: 'New Movie',
    message: 'Barbad movie has been released.',
    date: '12 Jan 2025',
  },
  {
    title: 'New Movie',
    message: 'Barbad movie has been released.',
    date: '12 Jan 2025',
  },
];

const Notification = () => {
  return (
    <div className='container bg-white'>
        <Header />
        <div className="min-h-screen bg-white p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
            <Link to='/' className='flex justify-start items-center text-[#292626] hover:text-[#FE0101]'><IoIosArrowBack /> Back</Link>
            <h2 className="text-xl font-semibold text-center w-full -ml-10">Notifications</h2>
        </div>

        {/* Notification List */}
        <div className="mt-2">
            {notifications.map((notification, index) => (
            <div key={index} className="flex items-start border-t-2 border-[#ddd] gap-3 px-0 py-3">
                <div className="pt-1">
                <CiYoutube className="text-gray-700 text-lg" />
                </div>
                <div>
                <h3 className="font-semibold text-sm">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    <Footer />
    </div>
  );
};

export default Notification;
