import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

const packages = [
  {
    id: 1,
    title: "Popular",
    price: "02.00",
    duration: "/ Daily",
    features: ["Unlimited Views", "On Demand"],
  },
  {
    id: 2,
    title: "Daily",
    price: "05.00",
    duration: "/ Daily",
    features: ["Unlimited Views"],
  },
];

export default function SubscriptionPage() {
  const [selectedPack, setSelectedPack] = useState(null);
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const isRobi = phone.startsWith("018") && phone.length === 11;

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next box
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="container min-h-screen bg-[#f7f7f7] p-2">

      {/* Back + Title */}
      <div className="flex items-center gap-2 text-[16px] mb-4">
        <IoIosArrowBack className="text-[22px]" />
        <span className="font-medium">Back</span>
      </div>

      <h2 className="text-center text-[20px] font-semibold">Subscription</h2>
      <p className="text-center text-[18px] font-semibold text-red-600 mt-4">
        Select a plan
      </p>

      {/* Package Cards */}
{/* Mobile Scroll Cards */}
<div className="overflow-x-auto no-scrollbar snap-x snap-mandatory px-1">
  <div className="flex gap-4 w-max">

    {packages.map((pkg) => (
      <div
        key={pkg.id}
        onClick={() => setSelectedPack(pkg.id)}
        className={`
          
          w-[250px]     /* PERFECT for mobile ≤ 479px */
          p-5
          rounded-[22px]
          transition-all duration-300
          ${
            selectedPack === pkg.id
              ? "bg-red-600 text-white border border-red-600"
              : "bg-white text-black border border-[#e4e4e4]"
          }
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-[15px] font-medium">{pkg.title}</p>

          <div
            className={`
              w-6 h-6 rounded-full flex items-center justify-center 
              text-[14px]
              ${
                selectedPack === pkg.id
                  ? "bg-white text-red-600"
                  : "border border-red-500 text-transparent"
              }
            `}
          >
            ✓
          </div>
        </div>

        {/* Price */}
        <p className="text-[34px] font-bold leading-none">
          ৳{pkg.price}
          <span className="text-[16px] font-medium"> / {pkg.duration}</span>
        </p>

        {/* Features */}
        <div className="mt-4 space-y-2">
          {pkg.features.map((f, i) => (
            <p key={i} className="text-[15px] flex items-center gap-2">
              <span className="text-[18px] leading-none">✓</span> {f}
            </p>
          ))}
        </div>
      </div>
    ))}

  </div>
</div>




      {/* Operator Section */}
      <p className="mt-5 mb-2 font-semibold">Select Operator</p>

      <div
        className={`p-4 rounded-lg flex items-center gap-3 
        ${isRobi ? "bg-red-50" : "bg-gray-100"}`}
      >
        <div
          className={`w-5 h-5 rounded border flex items-center justify-center
            ${isRobi ? "bg-red-500 border-red-500" : "border-gray-400"}`}
        >
          {isRobi && <FaCheck className="text-white text-[12px]" />}
        </div>
        <img src="/robi.png" className="w-[40px]" />
      </div>

      {/* Phone Number */}
      <p className="mt-5 mb-2 font-semibold">Mobile Number</p>
      <input
        type="text"
        placeholder="Phone"
        maxLength={11}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-4 rounded-lg bg-gray-100 outline-none text-[16px]"
      />

      {/* Terms */}
      <p className="text-[12px] text-gray-600 mt-4">
        By tapping Continue, you will be charged. Your subscription will
        auto-renew unless you cancel. You agree to our{" "}
        <span className="text-blue-600">Terms</span>.
      </p>

      {/* Continue Button */}
      <button
        disabled={!selectedPack || !isRobi}
        onClick={() => setShowOTP(true)}
        className={`w-full mt-6 py-3 rounded-lg text-white text-[18px] font-semibold
          ${
            selectedPack && isRobi
              ? "bg-red-600"
              : "bg-red-300 cursor-not-allowed"
          }`}
      >
        Continue
      </button>

      {/* OTP POPUP */}
      {showOTP && (
        <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 shadow-lg animate-slideUp">

          <h2 className="text-center text-[20px] font-bold">OTP</h2>
          <p className="text-center text-gray-600 mt-2">
            We sent a code to your number <br />
            <span className="font-semibold">{phone}</span>{" "}
            <button className="text-blue-600 ml-1">Change</button>
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mt-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, idx)}
                className="w-12 h-12 rounded-lg border text-center text-[20px] outline-red-500"
              />
            ))}
          </div>

          <p className="text-center text-[14px] mt-4">
            Didn’t receive code?{" "}
            <button className="text-red-600 font-medium">Resend</button>
          </p>
        </div>
      )}
    </div>
  );
}
