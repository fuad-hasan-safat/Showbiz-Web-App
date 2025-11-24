import React from 'react';
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { VscHistory } from "react-icons/vsc";
import { HiOutlineLogout } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { LuBadgePercent } from "react-icons/lu"; // Subscription look-alike icon

const NavBar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-64 bg-white z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* Close Icon */}
      <div className="flex justify-end p-4 pb-0">
        <button onClick={onClose}>
          <IoClose className="text-[#292626] hover:text-[#FE0101] text-[22px]" />
        </button>
      </div>

      {/* Back Button */}
      <div className="flex items-center gap-2 text-[#292626] hover:text-[#FE0101] border-b border-[#ddd] p-4">
        <button onClick={onClose} className="flex items-center gap-2">
          <IoIosArrowBack className="text-[18px]" />
          <span className="text-[15px] font-medium">Back</span>
        </button>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-6 border-b border-[#ddd]">

        <Link
          to="/profile"
          className="flex items-center gap-3 text-[16px] text-[#292626] hover:text-[#FE0101]"
          onClick={onClose}
        >
          <CiUser className="text-[20px]" />
          Profile
        </Link>

        <Link
          to="/notification"
          className="flex items-center gap-3 text-[16px] text-[#292626] hover:text-[#FE0101]"
          onClick={onClose}
        >
          <IoNotificationsOutline className="text-[20px]" />
          Notifications
        </Link>

        <Link
          to={`/history/${localStorage.getItem('user_uuid')}`}
          className="flex items-center gap-3 text-[16px] text-[#292626] hover:text-[#FE0101]"
          onClick={onClose}
        >
          <VscHistory className="text-[20px]" />
          History
        </Link>

        <Link
          to="/subscription"
          className="flex items-center gap-3 text-[16px] text-[#292626] hover:text-[#FE0101]"
          onClick={onClose}
        >
          <LuBadgePercent className="text-[20px]" />
          Subscription
        </Link>
      </div>

      {/* Logout */}
      <div className="p-4">
        <button
          className="flex items-center gap-3 text-[16px] text-[#292626] hover:text-[#FE0101]"
          onClick={() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_uuid');
            localStorage.removeItem('user_phone');
            onClose();
          }}
        >
          <HiOutlineLogout className="text-[20px]" />
          Logout
        </button>
      </div>

    </div>
  );
};

export default NavBar;
