import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from '../components/Auth/PhoneInput';
import { configs } from '../utils/constant';
import { handleGetOtp } from '../utils/functions';
import { Helmet } from 'react-helmet';

const SingInPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/home');
    }
  }, [navigate])

  return (
    <div className='container'>
      <Helmet>
        <title>Showbiz Login</title>
        <meta name="description" content="This is showbiz portal" />
        <meta property="og:title" content="Showbiz Login" />
        {/* <meta property="og:image" content="https://example.com/image.jpg" /> */}
        {/* Add more meta tags as needed */}
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-orange-200/70 to-white relative">
        <div
          className="absolute top-0 left-0 w-full h-[100%] bg-cover bg-center z-0"
          style={{ backgroundImage: 'url(/images/singin-bg.png)' }}
        ></div>

        <div className="relative z-10 flex flex-col justify-end items-center min-h-screen pt-15">
          <div className="bg-white rounded-t-3xl shadow-lg w-full p-6 pb-[150px] pt-[90px] text-center">
            <h1 className="text-[25px] font-bold text-orange-500 mb-[40px]">Sign In</h1>
            <PhoneInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingInPage;
