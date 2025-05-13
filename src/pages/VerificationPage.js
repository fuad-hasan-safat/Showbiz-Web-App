import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VerificationPad from '../components/Auth/VerificationPad';

const VerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = location.state?.phone || '9(173)605-76-05';

  const handleComplete = () => {
    navigate('/');
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
        <div className="relative z-10 flex flex-col justify-end items-center min-h-screen pt-20">
          <div className="bg-white rounded-t-3xl shadow-lg w-full p-6 px-0 pb-[2px] pt-[70px] text-center">
              <h1 className="text-[26px] font-medium mb-1 bg-gradient-to-r from-[#FB8408] to-[#FE0101] bg-clip-text text-transparent">Phone verification</h1>
              <p className="mb-2">We sent a code to your number</p>
              <p className=" font-normal text-[#0B0616] mb-6">
                {phoneNumber}
                <span 
                  className="bg-gradient-to-r from-[#FB8408] to-[#FE0101] bg-clip-text text-transparent ml-2 cursor-pointer"
                  onClick={() => navigate('/signin')}
                >
                  Change
                </span>
              </p>
              
              <VerificationPad onComplete={handleComplete} />
          </div>
        </div>
      </div>
</div>
  );
};

export default VerificationPage;

