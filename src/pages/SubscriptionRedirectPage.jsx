import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSubscriptionStore } from "../store/subscriptionStore";

const SubscriptionRedirectPage = () => {
  const fetchSubData = useSubscriptionStore((s) => s.fetchSubData);
  const getSubscribeStatus = useSubscriptionStore((s) => s.getSubscribeStatus);

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      setLoading(true);

      await fetchSubData();
      const isSubscribed = getSubscribeStatus();

      setStatus(isSubscribed);
      setLoading(false);
    };

    check();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-semibold text-gray-700 animation-pulse">
          Checking subscription...
        </p>
      </div>
    );
  }

  return (
    <div className="container min-h-screen bg-white p-4 flex flex-col items-center">
      {/* Common Back Button */}
      <div
        className="w-full flex items-center gap-2 cursor-pointer mb-6 mt-3"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack className="text-[22px]" />
        <span className="font-medium">Back</span>
      </div>

      {/* Conditional Content */}
      {status ? <SuccessRender /> : <FailedRender />}
    </div>
  );
};

/* ---------------- SUCCESS COMPONENT ---------------- */
const SuccessRender = () => {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="text-[20px] text-[#292626] font-semibold">
        Subscription Successful
      </h2>

      <div className="mt-10 mb-6">
        <img
          src="/images/congratulations.png"
          alt="Success"
          className="w-[240px] object-contain opacity-0 animate-fadeInScale"
        />
      </div>

      <h1 className="text-[28px] font-extrabold text-gray-900">
        🎉 Congratulations!!
      </h1>

      <p className="text-center text-[16px] mt-3 text-gray-700">
        Your subscription has been successfully activated.
      </p>

      {/* Continue Button (common) */}
      <button
        onClick={() => navigate("/home")}
        className="w-full h-[55px] rounded-lg text-white text-[18px] font-semibold mt-10 bg-gradient-to-r from-orange-500 to-red-500 shadow-md"
      >
        Continue
      </button>
    </>
  );
};

/* ---------------- FAILED COMPONENT ---------------- */
const FailedRender = () => {
      const navigate = useNavigate();

  return (
    <>
      <h2 className="text-[20px] text-[#292626] font-semibold">
        Subscription Failed
      </h2>

      <div className="mt-10 mb-6">
        <img
          src="/images/failed.png"
          alt="Failed"
          className="w-[240px] object-contain opacity-0 animate-fadeInScale"
        />
      </div>

      <h1 className="text-[28px] font-extrabold text-red-600">❌ Failed!</h1>

      <p className="text-center text-[16px] mt-3 text-gray-700">
        Your subscription was not activated. <br /> Please try again.
      </p>
         <button
        onClick={() => navigate("/subscription")}
        className="w-full h-[55px] rounded-lg text-white text-[18px] font-semibold mt-10 bg-gradient-to-r from-orange-500 to-red-500 shadow-md"
      >
        Continue
      </button>
    </>
  );
};

export default SubscriptionRedirectPage;
