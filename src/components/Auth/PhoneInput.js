import React, { useState } from 'react';
import { handleGetOtp } from '../../utils/functions';
import { useNavigate } from 'react-router-dom';

const PhoneInput = ({ onSubmit }) => {
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false); // <-- checkbox state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can also validate checkbox here if needed
    if (!isChecked) return alert("Check If you are a human");

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

      {/* Checkbox Section */}
      <div className="mt-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="w-4 h-4"
        />
        <label className="text-sm text-gray-700">
          I am no robot.
        </label>
      </div>
    </form>
  );
};

export default PhoneInput;
