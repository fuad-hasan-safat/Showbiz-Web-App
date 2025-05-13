import React from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from '../components/Auth/PhoneInput';

const SingInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (phone) => {
    navigate('/verify', { state: { phone } });
  };

  return (
    <div className='container'>
      <div className="min-h-screen bg-gradient-to-b from-orange-200/70 to-white relative">
        {/* Background image layer */}
        <div
          className="absolute top-0 left-0 w-full h-[100%] bg-cover bg-center z-0"
          style={{ backgroundImage: 'url(/images/singin-bg.png)' }} 
        ></div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col justify-end items-center min-h-screen pt-15">
          <div className="bg-white rounded-t-3xl shadow-lg w-full p-6 pb-[40px] pt-[90px] text-center">
            <h1 className="text-[25px] font-bold text-orange-500 mb-[40px]">Sign In</h1>

            <PhoneInput onSubmit={handleSubmit} />

            <p className="text-gray-600 mt-[100px]">
              Don't have an account? <span className="text-orange-500 font-semibold">Sign Up</span>
            </p>
            <p className="text-gray-400 text-xs mt-2">*2 taka vat sd charge</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingInPage;
