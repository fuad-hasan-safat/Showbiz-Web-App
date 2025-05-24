import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from '../components/Auth/PhoneInput';

const SingInPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/home');
    }
  }, [navigate])

  const handleSubmit = async (phone) => {
    try {
      const response = await fetch('http://localhost:3000/auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send OTP');
      }

      // On successful OTP request, navigate to verify page
      navigate('/verify', { state: { phone } });
    } catch (error) {
      console.error('OTP request failed:', error);
      alert(error.message || 'Failed to send OTP. Please try again.');
    }
  };

  return (
    <div className='container'>
      <div className="min-h-screen bg-gradient-to-b from-orange-200/70 to-white relative">
        <div
          className="absolute top-0 left-0 w-full h-[100%] bg-cover bg-center z-0"
          style={{ backgroundImage: 'url(/images/singin-bg.png)' }}
        ></div>

        <div className="relative z-10 flex flex-col justify-end items-center min-h-screen pt-15">
          <div className="bg-white rounded-t-3xl shadow-lg w-full p-6 pb-[150px] pt-[90px] text-center">
            <h1 className="text-[25px] font-bold text-orange-500 mb-[40px]">Sign In</h1>
            <PhoneInput onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingInPage;
