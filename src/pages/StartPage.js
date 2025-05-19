import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/singin');
  };

  return (
    <div className='container'>
      <div className="min-h-screen bg-gradient-to-b from-orange-200/70 to-white relative">
        <div
          className="absolute top-0 left-0 w-full h-[100%] flex justify-center items-center bg-cover bg-center z-0"
          style={{ backgroundImage: 'url(/images/singin-bg.png)' }}
        >
          <img
            src='/images/logo-white.png'
            alt='Logo'
            onClick={handleLogoClick}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
