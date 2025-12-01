import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VerificationPad from '../components/Auth/VerificationPad';
import { configs } from '../utils/constant';
import { Helmet } from 'react-helmet';
import { useAuthStore } from '../store/authStore';

const VerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = location.state?.phone || 'Unknown';
  const login = useAuthStore.getState().login;


  const handleComplete = async (props) => {
    console.log({ props })
    try {
      if (!phoneNumber || phoneNumber === 'Unknown') {
        throw new Error('Phone number is missing');
      }

      const response = await fetch(`${configs.API_BASE_PATH}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          otp: props
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'OTP verification failed');
      }
      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user_uuid', data.user.uuid);
      localStorage.setItem('user_phone', data.user.phone);

      // On successful verification
      login(data);
      navigate('/home');
    } catch (error) {
      console.error('Verification failed:', error);
      alert(error.message || 'Failed to verify OTP. Please try again.');
    }
  };

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

        <div className="relative z-10 flex flex-col justify-end items-center min-h-screen pt-20">
          <div className="bg-white rounded-t-3xl shadow-lg w-full p-6 px-0 pb-[2px] pt-[70px] text-center">
            <h1 className="text-[26px] font-medium mb-1 bg-gradient-to-r from-[#FB8408] to-[#FE0101] bg-clip-text text-transparent">
              Phone verification
            </h1>
            <p className="mb-2">We sent a code to your number</p>
            <p className="font-normal text-[#0B0616] mb-6">
              {phoneNumber}
              <span
                className="bg-gradient-to-r from-[#FB8408] to-[#FE0101] bg-clip-text text-transparent ml-2 cursor-pointer"
                onClick={() => navigate('/singin')}
              >
                Change
              </span>
            </p>

            <VerificationPad phone={phoneNumber} onComplete={handleComplete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
