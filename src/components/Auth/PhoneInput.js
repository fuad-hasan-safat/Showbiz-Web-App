import React, { useState } from 'react';
import { handleGetOtp } from '../../utils/functions';
import { useNavigate } from 'react-router-dom';

const PhoneInput = ({ onSubmit }) => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   handleGetOtp(phone, navigate); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 w-full">
        <input 
          type="tel" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-[#F8FAFC] text-[14px] text-[#404B52] w-full h-[53px] p-5 rounded-[4px]" 
          placeholder="Enter phone number"
          required
        />
      </div>
      
      <button 
        type="submit"
        className="w-full h-[55px] bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 rounded-[4px] font-semibold mt-4"
      >
        Next
      </button>
    </form>
  );
};

export default PhoneInput;