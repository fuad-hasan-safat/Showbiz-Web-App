import React, { useEffect, useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { Link } from 'react-router-dom';
import { configs } from '../utils/constant';

const ProfileEdit = () => {
  const fileInputRef = useRef(null);
  const [userdata, setuserData] = useState(null)
  

  useEffect(()=>{
    const user_phone = localStorage.getItem('user_phone');
    if(user_phone){
        fetchProfileData(user_phone)
    }

  },[])

  const fetchProfileData = async (phone) => {
    const response = await fetch(`${configs.API_BASE_PATH}/registercms/getprofile/${phone}`);

    const data = await response.json();
    console.log("Profile:: ", data);
    setuserData(data);
  }

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setuserData((prev) => ({
        ...prev,
        image: imageUrl
      }));
    }
  };

  
  const profileImage = userdata?.image ? `${configs.API_BASE_PATH}${userdata.profile_image}` : 'https://i.ibb.co/4pDNDk1/avatar.png';

  return userdata &&(
    <div className='container bg-white'>
        <Header />
        <div className="min-h-screen bg-white p-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 mb-10 border-b-2 border-[#ddd]">
            <Link to='/' className='flex justify-start items-center text-[#292626] hover:text-[#FE0101]'><IoIosArrowBack className='hover:text-[#FE0101]' /> Back</Link>
            <h2 className="text-xl font-semibold text-center w-full -ml-10">Profile</h2>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center mb-8 relative">
            <div className="relative w-24 h-24">
            <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#4e507e] shadow-md"
            />
            <div
                onClick={handleImageClick}
                className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md cursor-pointer"
            >
                <FaCamera className="text-sm text-[#4e507e]" />
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
            <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
                type="text"
                value={userdata.name}
                onChange={(e) => setuserData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-3 outline-none"
            />
            </div>

            <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
                type="text"
                value={userdata.phone}
                readOnly
                className="w-full border border-gray-200 bg-gray-100 text-gray-500 rounded-md px-3 py-3 outline-none cursor-not-allowed"
            />
            </div>
            <div>
                <button className="w-full py-3 rounded-md text-white font-semibold bg-gradient-to-r from-orange-400 to-red-500 mt-10">
                Save Changes
                </button>
            </div>
         </div>
        </div>
        <Footer />
    </div>
  );
};

export default ProfileEdit;
