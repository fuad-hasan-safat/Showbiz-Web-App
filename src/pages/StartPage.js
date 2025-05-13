import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
    return (
    <div className='container'>
      <div className="min-h-screen bg-gradient-to-b from-orange-200/70 to-white relative">
        <div
          className="absolute top-0 left-0 w-full h-[100%] flex justify-center items-center bg-cover bg-center z-0"
          style={{ backgroundImage: 'url(/images/singin-bg.png)' }} 
        >
            <Link><img src='/images/logo-white.png' alt='Delete' /></Link>
        </div>
      </div>
    </div>
    );
};

export default StartPage;