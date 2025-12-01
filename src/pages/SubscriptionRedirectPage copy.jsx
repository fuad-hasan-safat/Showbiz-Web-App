import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export default function SubscriptionRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data passed via state
  const { pkg, operator } = location.state || {};

  if (!pkg || !operator) {
    return (
      <div className="p-4 text-center mt-10">
        Package not found. <button onClick={() => navigate("/subscription")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="container min-h-screen bg-white p-4 flex flex-col items-center">
      <div
        className="w-full flex items-center gap-2 cursor-pointer mb-6 mt-3"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack className="text-[22px]" />
        <span className="font-medium">Back</span>
      </div>

      <h2 className="text-[20px] text-[#292626] font-semibold">
        Subscription Successful
      </h2>

      <div className="mt-10 mb-6">
        <img src="/images/congratulations.png" alt="Success" className="w-[280px] object-contain" />
      </div>

      <h1 className="text-[28px] font-extrabold text-gray-900">Congratulations!!</h1>

      <p className="text-center text-[16px] mt-3 text-gray-700">
        You subscribed to: <br />
        <b>{pkg.title}</b> <br />
        Charge: <b>৳{pkg.charge}</b>
      </p>

      <div
        style={operator.style}
        className="w-full p-5 rounded-lg border-2 text-white mt-10 shadow-lg"
      >
        <p className="text-[16px] font-semibold">{pkg.title}</p>
        <p className="text-[14px] mt-1">{pkg.renewable}</p>
        <p className="text-[14px]">Validity: {pkg.validity} days</p>
        <p className="text-[32px] font-extrabold mt-3">৳{pkg.charge}</p>
      </div>

      <button
        onClick={() => navigate("/home")}
        style={operator.style}
        className="w-full h-[55px] rounded-lg text-white text-[18px] font-semibold mt-10"
      >
        OK
      </button>
    </div>
  );
}
