import React, { useRef, useState } from 'react';
import { handleGetOtp } from '../../utils/functions';
import { useNavigate } from 'react-router-dom';

const VerificationPad = ({ phone, onComplete }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const focusInput = (index) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index].focus();
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Allow only one digit
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      focusInput(index + 1);
    }

    if (newCode.every((digit) => digit !== '')) {
      setTimeout(() => onComplete(newCode.join('')), 300);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (code[index] === '') {
        focusInput(index - 1);
      } else {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  const handleNumberClick = (num) => {
    const nextIndex = code.findIndex((digit) => digit === '');
    if (nextIndex !== -1) {
      const newCode = [...code];
      newCode[nextIndex] = num;
      setCode(newCode);
      focusInput(nextIndex + 1);

      if (nextIndex === 3) {
        setTimeout(() => onComplete(newCode.join('')), 300);
      }
    }
  };

  const handleBackspaceClick = () => {
    const lastFilledIndex = [...code].map((d, i) => (d ? i : -1)).filter(i => i !== -1).pop();
    if (lastFilledIndex !== undefined) {
      const newCode = [...code];
      newCode[lastFilledIndex] = '';
      setCode(newCode);
      focusInput(lastFilledIndex);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-4 mb-8">
        {code.map((digit, index) => (
          <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`w-[60px] h-[60px] text-[26px] text-[#0A0615] text-center font-medium 
            border rounded-[8px] 
            ${digit ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500' : 'text-[#0A0615]'} 
            ${digit ? 'border-red-500' : 'border-[#E5E9EF]'} 
            focus:outline-none focus:border-red-500`}
          />

        ))}
      </div>


      <p className="mb-10 text-center text-[15px] text-[#0B0616]">
        Don't receive your code? 
        <span
        onClick={()=>handleGetOtp(phone, navigate)}
         className="bg-gradient-to-r from-[#FB8408] to-[#FE0101] bg-clip-text text-transparent font-bold cursor-pointer">Resend</span>
      </p>
      {/* <div className='bg-[#F3F3F6] pt-2 px-2 pb-[75px]'>
        <div className="grid grid-cols-3 gap-2 mb-2 leading-none">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              type="button"
              className="bg-[#FCFCFE] text-[#000000] p-4 py-2 rounded-[5px] text-[20px] font-normal"
              onClick={() => handleNumberClick(num.toString())}
            >
              {num}
              {num === 2 && <span className="block">ABC</span>}
              {num === 3 && <span className="block">DEF</span>}
              {num === 4 && <span className="block">GHI</span>}
              {num === 5 && <span className="block">JKL</span>}
              {num === 6 && <span className="block">MNO</span>}
              {num === 7 && <span className="block">PQRS</span>}
              {num === 8 && <span className="block">TUV</span>}
              {num === 9 && <span className="block">WXYZ</span>}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button disabled className="opacity-0">X</button>

          <button
            type="button"
            className="bg-[#FCFCFE] text-[#000000] p-4 py-2 rounded-[5px] text-[20px] font-normal"
            onClick={() => handleNumberClick('0')}
          >
            0
          </button>

          <button
            type="button"
            className="p-4 rounded-full text-center flex justify-center items-center"
            onClick={handleBackspaceClick}
          >
            <img src='/images/delete.png' alt='Delete' />
          </button>
        </div>
      </div> */}
    </>
  );
};

export default VerificationPad;
