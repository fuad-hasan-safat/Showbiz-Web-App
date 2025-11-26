import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";



const packages = [
  {
    id: 1,
    title: "Popular",
    price: "02.00",
    duration: "Daily",
    features: ["Unlimited Views", "On Demand"],
  },
  {
    id: 2,
    title: "Daily",
    price: "05.00",
    duration: "Daily",
    features: ["Unlimited Views"],
  },
];

export default function SubscriptionPage() {
  // Set the initial selection to match the 'Popular' plan being selected in the image
  const [selectedPack, setSelectedPack] = useState(packages[0].id); 
  const [phone, setPhone] = useState("");
  // OTP state is kept but the 'Continue' button no longer triggers it.
  const [showOTP, setShowOTP] = useState(false); 
  const [otp, setOtp] = useState(["", "", "", ""]);
  // New state to control the visibility of the Success Page
  const [showSuccessPage, setShowSuccessPage] = useState(false); 

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
  
  // Find the currently selected package details for the success message
  const currentSelectedPackage = packages.find(pkg => pkg.id === selectedPack);

  // --- 1. RENDER CONGRATULATIONS PAGE ---
  if (showSuccessPage) {
    return (
      <div className="container min-h-screen bg-white p-4 flex flex-col items-center">
        {/* Back + Quiz Title - Matches Congratulations.png */}
        <div className="w-full flex justify-start items-center mb-6 mt-3 relative">
          <div
            className="flex items-center gap-2 text-[16px] cursor-pointer text-gray-800 absolute left-0"
            // For demo, go back to subscription page
            onClick={() => setShowSuccessPage(false)} 
          >
            <IoIosArrowBack className="text-[22px]" />
            <span className="font-medium">Back</span>
          </div>
          {/* Quiz title is centered independently */}
          <h2 className="text-[20px] text-[#292626] font-semibold flex-grow text-center">Quiz</h2>
        </div>

        {/* Celebration Image */}
        <div className="my-6 mt-16">
          {/* Using a placeholder for the image URL */}
          <img src="../images/congratulations.png" alt="Celebration" className="w-[280px] h-[180px] object-contain mx-auto" /> 
        </div>

        {/* Congratulations Text */}
        <h1 className="text-center text-[28px] font-extrabold text-gray-900 mb-2 mt-4">
          Congratulations !!
        </h1>

        {/* Subscription Success Message */}
        <p className="text-center text-[16px] text-gray-700 leading-relaxed mb-8">
          You successfully subscribed
          <br />
          <span className="font-semibold">
            {currentSelectedPackage?.duration} on demand pack for <span className="text-[18px]">৳</span>{currentSelectedPackage?.price}
          </span>
        </p>

        {/* Selected Package Card (Exactly replicated from the image) */}
        {currentSelectedPackage && (
          <div
            className={`
              w-full max-w-sm p-5 rounded-[8px]
              bg-red-600 text-white border-2 border-red-600 shadow-lg mx-auto mb-16
            `}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <p className="text-[14px] font-medium">{currentSelectedPackage.title}</p>
              <div className="w-6 h-6 flex items-center justify-center text-[18px] text-white"> 
                ✓
              </div>
            </div>

            {/* Price - Replicated exactly as in the image */}
            <p className="font-extrabold leading-none -mt-1 flex items-baseline">
                <span className="text-[28px]">৳</span>
                <span className="text-[40px] leading-none">{currentSelectedPackage.price}</span>
                <span className="text-[14px] font-medium ml-1"> / {currentSelectedPackage.duration}</span>
            </p>

            {/* Features */}
            <div className="mt-8 space-y-2">
              {currentSelectedPackage.features.map((f, i) => (
                <p key={i} className="text-[15px] flex items-center gap-2">
                  <span className="text-[18px] leading-none"><FaCheck /></span> {f} 
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Ok Button */}
        <button
          onClick={() => setShowSuccessPage(false)} // Example action: go back to the main page or home screen
          className="w-full max-w-sm h-[55px] py-4 rounded-lg text-white text-[18px] font-semibold bg-red-600 shadow-md"
        >
          Ok
        </button>
      </div>
    );
  }

  // --- 2. RENDER SUBSCRIPTION PAGE (DEFAULT) ---
  return (
    <div className="container min-h-screen relative bg-[#fff] p-4">

      {/* Back + Title */}
      <div 
        className="flex items-center gap-2 text-[16px] mb-4 mt-3 cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        <IoIosArrowBack className="text-[22px]" />
        <span className="font-medium">Back</span>
      </div>

      {/* Operator Section */}
      <p className="mt-10 mb-3 font-medium text-[#0B0616]">Select Operator</p>

      <div
        className={`p-4 rounded-lg flex items-center justify-between gap-3 
        ${isRobi ? "bg-[#F8FAFC]" : "bg-gray-100"}`}
      >
        <div className="flex justify-center items-center">
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center
                ${isRobi ? "bg-red-500 border-red-500" : "border-gray-400"}`}
            >
              {isRobi && <FaCheck className="text-white text-[12px]" />}
            </div>
            <img src="/robi.png" alt="Robi Logo" className="w-[40px] pl-2" />
        </div>
        <div className="flex justify-center items-center">
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center
                ${isRobi ? "bg-red-500 border-red-500" : "border-gray-400"}`}
            >
              {isRobi && <FaCheck className="text-white text-[12px]" />}
            </div>
            <img src="/robi.png" alt="Robi Logo" className="w-[40px] pl-2" />
        </div>
        <div className="flex justify-center items-center">
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center
                ${isRobi ? "bg-red-500 border-red-500" : "border-gray-400"}`}
            >
              {isRobi && <FaCheck className="text-white text-[12px]" />}
            </div>
            <img src="/robi.png" alt="Robi Logo" className="w-[40px] pl-2" />
        </div>
      </div>

      <h2 className="text-center text-[20px] text-[#292626] absolute top-6 left-1/2 -translate-x-1/2 font-semibold">Subscription</h2>
      <p className="text-center text-[18px] font-semibold mb-4 text-[#FE0101] mt-6">
        Select a plan
      </p>

      {/* Package Cards - Horizontal Scroll (1st full, 2nd 30% visible) */}
      <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory px-1">
        <div 
            className="flex gap-4"
            // Width setting to force the second item (Daily) to be partially visible (approx. 30%)
            style={{ width: '125%' }} 
        >

          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPack(pkg.id)}
              className={`
                min-w-[260px] lg:min-w-[360px] md:min-w-[360px] sm:min-w-[360px] flex-shrink-0 snap-center
                p-5
                rounded-[8px]
                transition-all duration-300
                ${
                  selectedPack === pkg.id
                    ? "bg-red-600 text-white border-2 border-red-600 shadow-lg"
                    : "bg-white text-black border-2 border-[#FE0101]"
                }
              `}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-2">
                <p className="text-[14px] font-medium">{pkg.title}</p>

                <div
                  className={`
                    w-6 h-6 flex items-center justify-center 
                    text-[18px] font-bold
                    ${
                      selectedPack === pkg.id
                        ? "text-white"
                        : "text-transparent"
                    }
                  `}
                >
                  <FaCheck />
                </div>
              </div>

              {/* Price */}
              <p className="font-extrabold leading-none -mt-1 flex items-baseline">
                <span className="text-[28px]">৳</span>
                <span className="text-[40px] leading-none">{pkg.price}</span>
                <span className="text-[14px] font-medium ml-1"> / {pkg.duration}</span>
              </p>

              {/* Features */}
              <div className="mt-8 space-y-2">
                {pkg.features.map((f, i) => (
                  <p key={i} className="text-[15px] flex items-center gap-2">
                    <span className="text-[18px] leading-none"></span> {f}
                  </p>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Phone Number */}
      <p className="mt-10 mb-2 font-semibold text-[#292626]">Mobile Number</p>
      <input
        type="text"
        placeholder="Phone"
        maxLength={11}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-4 rounded-lg bg-[#F8FAFC] text-[#000] placeholder-[#000] font-semibold outline-none text-[16px]"
      />

      {/* Terms */}
      <p className="text-[12px] text-gray-600 my-20">
        By tapping Continue, you will be charged. Your subscription will
        auto-renew unless you cancel. You agree to our{" "}
        <span className="text-blue-600">Terms</span>.
      </p>

      {/* Continue Button */}
      <button
        disabled={!selectedPack || !isRobi || phone.length !== 11}
        onClick={() => setShowSuccessPage(true)} // Modified to show Congratulations Page
        className={`w-full h-[55px] py-4 rounded-lg text-white text-[18px] font-semibold
          ${
            selectedPack && isRobi && phone.length === 11
              ? "bg-red-600"
              : "bg-red-300 cursor-not-allowed"
          }`}
      >
        Continue
      </button>

      {/* OTP POPUP - Kept but not triggered by 'Continue' button */}
      {showOTP && (
        <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 shadow-lg animate-slideUp">
          <h2 className="text-center text-[20px] font-bold">OTP</h2>
          <p className="text-center text-gray-600 mt-2">
            We sent a code to your number <br />
            <span className="font-semibold">{phone}</span>{" "}
            <button className="text-blue-600 ml-1">Change</button>
          </p>
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