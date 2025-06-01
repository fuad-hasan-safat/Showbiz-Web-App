import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CiHome } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { FiUser } from "react-icons/fi";

const Footer = () => {
  const location = useLocation();

  const menuItems = [
    { id: 'home', icon: <CiHome size={30} />, path: '/home' },
    { id: 'search', icon: <IoSearch size={30} />, path: '#' },
    { id: 'time', icon: <IoMdTime size={30} />, path: `/history/${localStorage.getItem('user_uuid')}` },
    { id: 'user', icon: <FiUser size={30} />, path: '/Profile' },
  ];

  return (
    <div className="mt-[60px] fixed bottom-0 left-0 right-0">
      <div className="container">
        <div className='bg-[#E9E9E9] py-3 px-6'>
          <div className="flex justify-between items-center">
            {menuItems.map(item => (
              <Link
                key={item.id}
                to={item.path}
                className={`text-[20px] p-2 px-5 hover:text-[#FE0101] ${
                  location.pathname === item.path ? 'text-[#FE0101]' : 'text-gray-600'
                }`}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
