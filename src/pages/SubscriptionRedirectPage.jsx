import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useSubscriptionStore } from "../store/subscriptionStore";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const SubscriptionRedirectPage = () => {
  const fetchSubData = useSubscriptionStore((s) => s.fetchSubData);
  const getSubscribeStatus = useSubscriptionStore((s) => s.getSubscribeStatus);

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [iskeyAvailable, setIskeyAvailable] = useState(false);

  const navigate = useNavigate();
  const { search } = useLocation(); // <-- FIX

  useEffect(() => {
    const check = async () => {
      setLoading(true);

      // Read URL params
      const params = new URLSearchParams(search);
      const resultCode = params.get("resultCode");
      const transactionId = params.get("transactionId");
      const cnfmResult = params.get("cnfmResult");

      // Check keys
      if (!resultCode || !transactionId || !cnfmResult) {
        setIskeyAvailable(false);
        setStatus(false); // force failed
        setLoading(false);
        return;
      } else {
        setIskeyAvailable(true);
      }

      // Fetch subscription status
      await fetchSubData();
      const isSubscribed = getSubscribeStatus();

      setStatus(isSubscribed);
      setLoading(false);
    };

    check();
  }, [search]); // <-- add as dependency

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Checking subscription...
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="container min-h-screen bg-white p-4 flex flex-col items-center pb-40">
        {/* Back Button */}
        <div
          className="w-full flex items-center gap-2 cursor-pointer mb-6 mt-3"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack className="text-[22px]" />
          <span className="font-medium">Back</span>
        </div>

        {/* Invalid key UI */}
        {/* Invalid key UI */}
        {!iskeyAvailable && (
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-red-200 p-8 text-center animate-fadeInScale">
            {/* Error Badge */}
            <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-red-500 shadow-md">
              <span className="text-white text-3xl">⚠️</span>
            </div>

            {/* Title */}
            <h2 className="text-[24px] font-extrabold text-red-600 mb-2">
              Invalid Subscription Request
            </h2>

            {/* Description */}
            <p className="text-[16px] text-gray-600 leading-relaxed">
              We are unable to verify your subscription request.
              <br />
              Please try again or contact support for assistance.
            </p>

            {/* CTA */}
            <button
              onClick={() => navigate("/subscription")}
              className="w-full h-[52px] mt-8 rounded-xl text-white text-[18px] font-semibold bg-gradient-to-r from-orange-500 to-red-500 shadow-md hover:opacity-95 transition duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Conditional Content */}
        {/* {status && iskeyAvailable ? <SuccessRender /> : <FailedRender />} */}

        {status && iskeyAvailable && (
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center animate-fadeInScale">
            {/* Success Badge */}
            <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-md">
              <span className="text-white text-3xl">✔️</span>
            </div>

            {/* Title */}
            <h3 className="text-[24px] font-extrabold text-gray-900">
              Request Approved!
            </h3>

            {/* Description */}
            <p className="mt-3 text-[16px] text-gray-600 leading-relaxed">
              Thank you for being a part of the Showbiz family. Your
              subscription has been activated successfully.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/home")}
              className="w-full h-[52px] mt-8 rounded-xl text-white text-[18px] font-semibold bg-gradient-to-r from-orange-500 to-red-500 shadow-md hover:opacity-95 transition duration-200"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
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
