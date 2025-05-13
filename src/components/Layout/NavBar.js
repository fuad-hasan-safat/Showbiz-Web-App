import React from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { VscHistory } from "react-icons/vsc";
import { HiOutlineLogout } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";

const NavBar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-64 bg-[#fff] text-white z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* Close Icon */}
      <div className="flex justify-end p-4 pb-0">
        <button onClick={onClose}>
          <IoClose className='text-[#292626] hover:text-[#FE0101] text-[20px]' />
        </button>
      </div>

      <div className="flex justify-start border-b-2 border-[#ddd] p-4">
        <Link to='/' className='flex justify-start items-center text-[#292626] hover:text-[#FE0101]'><IoIosArrowBack /> Back</Link>
      </div>

      {/* Navigation Links */}
      <div className="p-5 space-y-4 border-b-2 border-[#ddd]">
        <Link to="/profile" className="flex justify-left items-center relative text-[16px] text-[#292626] hover:text-[#FE0101] pl-[30px]" onClick={onClose}>
          <CiUser className='absolute left-0' />
          Profile
        </Link>
        <Link to="/notification" className="flex justify-left items-center relative text-[16px] text-[#292626] hover:text-[#FE0101] pl-[30px]" onClick={onClose}>
        <IoNotificationsOutline className='absolute left-0' />
          Notifications
        </Link>
        <Link to="/" className="flex justify-left items-center relative text-[16px] text-[#292626] hover:text-[#FE0101] pl-[30px]" onClick={onClose}>
        <VscHistory className='absolute left-0' />
          History
        </Link>
        <Link to="/signin" className="flex justify-left items-center relative text-[16px] text-[#292626] hover:text-[#FE0101] pl-[30px]" onClick={onClose}>
          <HiOutlineLogout className='absolute left-0' />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
